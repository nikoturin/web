/*
* GET home page.
*/
var _ =require('underscore');
var tuxcall = require('../bin/wrapTuxNodeJS.node');
var fs=require('fs');
var parser=require('xml2json');
var email=require('../handlers/sendEmail');
var xmlRead=require('../handlers/readXML');
var decodeBC=require('../handlers/decodeQR');
var pdf=require('../handlers/createPDF');

exports.invoice=function(req,res){


	rfc=req.params.rfc;
	if(_.size(req.params.locator)<=0)
	{
		console.log("Empty:");
  		res.render('invoice',{title:'invoice'});
	}
	else
	{
		if(req.params.rfc=="-")
		{req.params.rfc="";}

		searchInvoices="<?xml version='1.0' encoding='UTF-8' standalone='no' ?>\n"+
  			"<RRT:Envelope xmlns:RRT='RRT'>\n"+   
				"<RRT:Body>\n"+
      				"<RRT:GetBookingInvoices>\n"+    
					"<RFCId>" + rfc.replace("&","&amp;") + "</RFCId>\n"+              
					"<Locator>" + req.params.locator + "</Locator>\n"+       
					"<Nombre>" + req.params.apellido + "/" + req.params.nombre + "</Nombre>\n"+
				"</RRT:GetBookingInvoices>\n"+
    				"</RRT:Body>\n"+  
			"</RRT:Envelope>\n";


                /*fs.readFile(__dirname + '/search6Invoice.xml','utf8',function(err,data){
                        if(err)
                        {return console.log(err);}*/

			dataJSON=JSON.parse(parser.toJson(tuxcall.requestTux(searchInvoices,"TCN_SERVICE","STR")));
			res.send(dataJSON["soap:Envelope"]["soap:Body"]["RRT:GetBookingInvoicesReply"]);
			//console.log(req.params.rfc + "--"  + req.params.locator + "--"  + req.params.nombre + "--" + req.params.apellido);
			console.log(dataJSON["soap:Envelope"]["soap:Body"]["RRT:GetBookingInvoicesReply"]);

                //});//If you don't need readFile only delete the function, and keep content.

	}
};
exports.invoiceSend=function(req,res){

	rfc=req.params.rfc;
 	if(_.size(req.params.idInvoice)>0)
	{
		rqstEmail="<?xml version='1.0' encoding='UTF-8' standalone='no' ?>\n"+
 				"<RRT:Envelope xmlns:RRT='RRT'>\n"+
   					"<RRT:Body>\n"+
     						"<RRT:GenerateInvoice>\n"+
							"<RFCId>" + rfc.replace("&","&amp;") + "</RFCId>\n"+
                 					"<InvoiceId>" + req.params.idInvoice + "</InvoiceId>\n"+
     						"</RRT:GenerateInvoice>\n"+
   					"</RRT:Body>\n"+
				"</RRT:Envelope>\n";

            //Waitting for response tcn_service tuxedo            
	    console.time("sendInvoice");
            if(dataJSON=tuxcall.requestTux(rqstEmail,"TCN_SERVICE","STR"));
	    {	
                dataCFD=JSON.parse(parser.toJson(dataJSON));

                if(dataCFD['soap:Envelope']['soap:Body']['RRT:GenerateInvoiceReply']['ComprobanteStr']===undefined)                
		{                        
			if(dataCFD['soap:Envelope']['soap:Body']['RRT:GenerateInvoiceReply']['ErrorCode'])                        
			{                                
				//msg=dataCFD['soap:Envelope']['soap:Body']['RRT:GenerateInvoiceReply']['ErrorCode'] +  ":" + dataCFD['soap:Envelope']['soap:Body']['RRT:GenerateInvoiceReply']['ErrorText'];                                
				//console.log("Code Error:" + dataCFD['soap:Envelope']['soap:Body']['RRT:GenerateInvoiceReply']['ErrorText']);                        
                                if(!JSON.stringify(dataCFD['soap:Envelope']['soap:Body']['RRT:GenerateInvoiceReply']['ErrorText'])=="{}")
                                {                                        msg=dataCFD['soap:Envelope']['soap:Body']['RRT:GenerateInvoiceReply']['ErrorCode'] +  ":" + dataCFD['soap:Envelope']['soap:Body']['RRT:GenerateInvoiceReply']['ErrorText'];
                                }
                                else
                                {
                                        msg=dataCFD['soap:Envelope']['soap:Body']['RRT:GenerateInvoiceReply']['ErrorCode'];
                                }
                                console.log("Code Error:" + JSON.stringify(dataCFD['soap:Envelope']['soap:Body']['RRT:GenerateInvoiceReply']['ErrorText']));
			}                
		}
                else if(JSON.stringify(dataCFD['soap:Envelope']['soap:Body']['RRT:GenerateInvoiceReply']['ComprobanteStr'])=="{}")
                {
                        msg="Error de Comunicacion";
                        console.log("NetWork Error...");
		}
		else
		{
                	outputBC=xmlRead.xmlReadData["readBCtoQR"](dataJSON);
	                decodeBC.decodeBCtoQR(outputBC,req.params.idInvoice + ".jpg");
	                outputXML=xmlRead.xmlReadData["readCFDStr"](dataJSON,req.params.idInvoice);		
			outputSTRORG=xmlRead.xmlReadData["readStringOrg"](dataJSON);
	                pdf.createPDF(outputXML,req.params.idInvoice,outputSTRORG);
			setTimeout(function(){ email.sendEmail(req.params.email,req.params.idInvoice,outputXML["cfdi:Comprobante"]["folio"],outputXML["cfdi:Comprobante"]["serie"]);},1500);
                        msg="El Envio ha sido Satisfactorio";
		}
                console.log("---------TIMEOUT SENDINVOICE-----------");
                console.log("idInvoice:" + req.params.idInvoice + " RFC:" + req.params.rfc);
                console.timeEnd("sendInvoice");
                console.log("---------------------------------------");
                res.send([{Invoice:req.params.idInvoice,Status:msg}]);
		console.log(rqstEmail);
	    }//Second If
	}//First if
};
exports.invoiceDataClient=function(req,res){

       if(req.params.noInt=="-")                
	{req.params.noInt="";}

 rfc=req.params.rfc;
 updateData="<?xml version='1.0' encoding='UTF-8' standalone='no' ?>\n"+
  "<RRT:Envelope xmlns:RRT='RRT'>\n"+
    "<RRT:Body>\n"+
      "<RRT:UpdateRFCInfo>\n"+
          "<RFCId>" + rfc.replace("&","&amp;")  + "</RFCId>\n"+
          "<Nombre>" + req.params.rSocial + "</Nombre>\n"+
          "<Calle>" + req.params.calle  + "</Calle>\n"+
          "<NoExterior>" + req.params.noExt + "</NoExterior>\n"+
          "<NoInterior>" + req.params.noInt + "</NoInterior>\n"+
          "<Colonia>" + req.params.colonia + "</Colonia>\n"+
          "<Localidad>" + req.params.localidad + "</Localidad>\n"+
          "<Estado>" + req.params.estado + "</Estado>\n"+
          "<Pais>" + req.params.pais + "</Pais>\n"+
          "<CodigoPostal>" + req.params.codPostal + "</CodigoPostal>\n"+
          "<Email>" + req.params.email + "</Email>\n"+
      "</RRT:UpdateRFCInfo>\n"+
    "</RRT:Body>\n"+
"</RRT:Envelope>";


        dataJSON=JSON.parse(parser.toJson(tuxcall.requestTux(updateData,"TCN_SERVICE","STR")));
        res.send(dataJSON["soap:Envelope"]["soap:Body"]["RRT:UpdateRFCInfoReply"]);
	console.log("UPDATE_DATA:" + updateData);
};
exports.invoiceSendEmail=function(req,res){

        if(_.size(req.params.noInvoice)>0)
	{setTimeout(function(){ email.sendEmail(req.params.email,req.params.noInvoice);},1500);}
};
exports.invoiceGuide=function(req,res){
res.download(__dirname + '/guide/xxxx.pdf', 'GUIA_FACTURACION.pdf');
};
exports.invoiceEditData=function(req,res){
res.download(__dirname + '/guide/xxxx.pdf', 'GUIA_ACTUALIZACION.pdf');
};
exports.invoiceReSendGuide=function(req,res){
res.download(__dirname + '/guide/xxxx.pdf', 'GUIA_REENVIO.pdf');
};

