var fs=require('fs');
var parser=require('xml2json');
var Entities = require('html-entities').XmlEntities;

var xmlReadData={

	readCFDStr:function(dataXML,noInvoice){
	        entities = new Entities();
		dataCFD=JSON.parse(parser.toJson(dataXML));

                CFI_STR=entities.decode(entities.decode(dataCFD['soap:Envelope']['soap:Body']['RRT:GenerateInvoiceReply']['ComprobanteStr']));                        
		CFI_JSON=JSON.parse(parser.toJson(CFI_STR.replace('&','&amp;'),{coerce:false}));

                fs.writeFile(__dirname + '/bkXml/' + noInvoice + '.xml',parser.toXml(CFI_JSON).replace('&','&amp;'),function(err){

                        if(err) return console.log(err);

                });
 		//CFI_STR=JSON.parse(parser.toJson(CFI_STR));
		return(CFI_JSON);

	},
	readStringOrg:function(dataJSON){

                data=JSON.parse(parser.toJson(dataJSON));
		CFI_STR_ORG=data['soap:Envelope']['soap:Body']['RRT:GenerateInvoiceReply']['CadenaOriginal'];
		return(CFI_STR_ORG);
		//return(data['soap:Envelope']['soap:Body']['emitirCFDResponse']['emitirCFDResult']['ResponseAdmon']['CFD']['cadenaOriginal']);
		
	},
	readBCtoQR:function(dataBar){

		 dataBCtoQR=JSON.parse(parser.toJson(dataBar));
		 BCtoQR=dataBCtoQR['soap:Envelope']['soap:Body']['RRT:GenerateInvoiceReply']['CodigoDeBarras'];
		 return(BCtoQR);
		 //return(dataJSON["soap:Envelope"]["soap:Body"]["emitirCFDResponse"]["emitirCFDResult"]["ResponseAdmon"]["CFD"]["codigoDeBarras"]);
	}
};

module.exports.xmlReadData=xmlReadData;
