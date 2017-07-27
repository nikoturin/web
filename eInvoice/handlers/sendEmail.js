var fs=require('fs');
var nodemailer = require("nodemailer");

var sendEmail=function(mailTo,noInvoice,folio,serie){

	/*var smtpTransport = nodemailer.createTransport("SMTP",{
    		service: "Gmail",
    		auth: {
        	user: "xxxxxx@xxxxx",
        	pass: "xxxx"
    		}
	});*/

        var smtpTransport = nodemailer.createTransport("SMTP",{
                host:"xxx.xxx.xx.xx",
                port:xx,
                requiresAuth:false
        });

	fs.readFile(__dirname + "/bkInvoice/" + noInvoice + ".pdf",function(err,data){
		if(err)
		{console.log(err);}
		else
		{
			var mailOptions = {
    				from: "noreply@xxxx.com",
    				to: "" + mailTo + "",
    				subject: "xxxxx No Factura: " + noInvoice,
    				attachments:[{'filePath': __dirname + "/bkInvoice/" + noInvoice + '.pdf'},
					     {'filePath': __dirname + "/bkXml/" + noInvoice + '.xml'},
                                             {'filename':noInvoice + '.png',                                               
					      'filePath':'xxxxx_logo.png',                                              
					      'cid':noInvoice}],
    				text: "Numero de Factura:" + noInvoice ,
				html: "<html>"+
					"<head>"+
					   "<body>"+
						"<table cellspacing=0 align=center border=0 width='100%'>"+
						  "<table class=N2 cellspacing=0 align=center border=0 style='width:100%;height:1px;'>"+
							"<tr style='position:relative; top:expression(offsetParent.scrollTop);'>"+
                                                                "<td><img src='cid:" + noInvoice + "'></td>"+
							"</tr>"+
							"<tr>"+
								"<td style='width:1%;FONT-WEIGHT: bolder;font-size: 10px;HEIGHT: 21px;VERTICAL-ALIGN: middle;COLOR: #FFFFFF;FONT-FAMILY: Verdana;BACKGROUND-COLOR: #DF0101;TEXT-ALIGN: center;BORDER-STYLE: solid solid solid solid;BORDER-WIDTH: 1px 1px 1px 1px;BORDER-COLOR: #D0D0D0 #D0D0D0 #D0D0D0 #D0D0D0;' ALIGN=CENTER>AEROENLACES NACIONALES SA DE CV</td>"+
				  			"</tr>"+
				  			"<table class=N2 cellspacing=0 align=center border=0 style='width:100%;height:1px;'>"+
								"<p><p>"+
									"<td style='bolder;font-size: 12px;HEIGHT: 21px;VERTICAL-ALIGN: middle;COLOR: #040404;FONT-FAMILY: Verdana;BACKGROUND-COLOR: #FFFFFF;TEXT-ALIGN: justify;' ALIGN=JUSTIFY>"+
										"<p><p>Envia a usted el archivo XML correspondiente al Comprobante Fiscal Digital con <b>Serie: " + serie  + "</b> y <b>Folio: " + folio + "</b>. Asi como su representacion impresa.</p></p>"+
										"<p><p>Este correo electr&oacute;nico ha sido generado autom&aacute;ticamente por el Sistema de Emisi&oacute;n de Comprobantes Digitales por lo que le solicitamos no responder a este mensaje, ya que las respuestas a este correo electr&oacute;nico no ser&aacute;n le&iacute;das. En caso de tener alguna duda referente a la informaci&oacute;n contenida en el Comprobante Fiscal Digital contacte a <b>AEROENLACES NACIONALES SA DE CV</b> para su aclaraci&oacute;n.</p></p>"+
						  				"<p><p>Est&aacute; recibiendo este correo electr&oacute;nico debido a que ha proporcionado la direcci&oacute;n de correo electr&oacute;nico " + mailTo + " a <b>AEROENLACES NACIONALES SA DE CV</b> para hacerle llegar su Factura Electr&oacute;nica.</p></p>"+
						  			"</td>"+
						  		"</p></p>"+
							"</table>"+
						"</table>"+
					"</table>"+
				"</body>"+
			"</head>"+
		    "</html>"
    			}
			smtpTransport.sendMail(mailOptions, function(error, response){
    				if(error)
				{console.log(error + " Serie:" + serie + " Folio:" + folio);}
				else
				{console.log("Message sent: " + response.message + " Serie:" + serie + " Folio:" + folio);}
   			});
	      	}
   });
}

module.exports.sendEmail=sendEmail;
