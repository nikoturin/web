var fs=require('fs');
var money=require('./numberToLetter');
var PDFDocument = require('pdfkit');
var createPDF=function(dataJSON,noEInvoice,cadenaOriginal){

// Create a document
	doc = new PDFDocument();

// Pipe it's output somewhere, like to a file or HTTP response
// See below for browser usage
// 
	doc.pipe(fs.createWriteStream("xxxx/" + noEInvoice + '.pdf'));

	noInvoice = doc.linearGradient(200, 0, 400, 20)
	noInvoice.stop(0, 'white')
    	.stop(1, 'black')

	doc.rect(200, 20, 400, 20)
	doc.fill(noInvoice)

        doc.image('xxx_logo.png', 30, 15, {scale : 0.50});

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('white')
   	.text('FACTURA No. ' + noEInvoice,100, 25,{align:'right'})
//Legacy Data of AirLines

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('XXXXXXX SA DE CV',180, 48)

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('R.F.C: XXXX',180, 58)

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('CARR A MIGUEL ALEMAN KM 24',180, 68)

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('XXXXX',180, 78)

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('XXXX',180, 88)

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('MEXICO',180, 98)

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('XXXXX',180, 108)

	doc.font('Times-Roman')
   	.fontSize(8)
   	.fillColor('black')
   	.text('XXXXX ' + dataJSON["cfdi:Comprobante"]["fecha"],180, 118)

//

	dataClient = doc.linearGradient(200, 0, 530, 20)
	dataClient.stop(0, 'black')
          .stop(1, 'white')

	//doc.rect(25, 150, 530, 20)
	doc.rect(25, 135, 530, 20)
	doc.fill(dataClient)

	// Legacy Data of Customer

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('white')
   	.text('Cliente',50, 140,{align:'left'})

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text(dataJSON["cfdi:Comprobante"]["cfdi:Receptor"]["nombre"] ,30, 158)

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('R.F.C:' + dataJSON["cfdi:Comprobante"]["cfdi:Receptor"]["rfc"],30, 168)

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text(dataJSON["cfdi:Comprobante"]["cfdi:Receptor"]["cfdi:Domicilio"]["calle"] + " " + dataJSON["cfdi:Comprobante"]["cfdi:Receptor"]["cfdi:Domicilio"]["noExterior"],30, 178)

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text(dataJSON["cfdi:Comprobante"]["cfdi:Receptor"]["cfdi:Domicilio"]["colonia"],30, 188)

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text(dataJSON["cfdi:Comprobante"]["cfdi:Receptor"]["cfdi:Domicilio"]["localidad"] + " " + dataJSON["cfdi:Comprobante"]["cfdi:Receptor"]["cfdi:Domicilio"]["estado"] + " C.P." + dataJSON["cfdi:Comprobante"]["cfdi:Receptor"]["cfdi:Domicilio"]["codigoPostal"],30, 198)

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text(dataJSON["cfdi:Comprobante"]["cfdi:Receptor"]["cfdi:Domicilio"]["pais"],30, 208)

//

	dataPayments = doc.linearGradient(200, 0, 530, 20)
	dataPayments.stop(0, 'black')
          .stop(1, 'white')

	//doc.rect(25, 250, 530, 20)
	doc.rect(25, 220, 530, 20)
	doc.fill(dataPayments)

	doc.font('Times-Roman')
   	.fontSize(10)
   	.fillColor('white')
   	.text('Productos/Servicios',50, 225,{align:'left'})

//Payments Done

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('Cantidad Clave',30, 248)

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('Concepto',120, 248)

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('Unidad de Medida',320, 248)

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('Precio Unitario',420, 248)

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('Importe',510, 248)

	var x=257;
	var i;
        if(dataJSON["cfdi:Comprobante"]["cfdi:Conceptos"]["cfdi:Concepto"].length===undefined)
	{
                doc.font('Times-Roman')                        
			.fontSize(9)                        
			.fillColor('black')                        
			.text(Math.round(dataJSON["cfdi:Comprobante"]["cfdi:Conceptos"]["cfdi:Concepto"]["cantidad"]*1)/1,30, x);

                doc.font('Times-Roman')       
                        .fontSize(9)          
                        .fillColor('black')   
                        .text(dataJSON["cfdi:Comprobante"]["cfdi:Conceptos"]["cfdi:Concepto"]["descripcion"],120, x);

                doc.font('Times-Roman')                                                
                        .fontSize(9)                                                
                        .fillColor('black')                                                
                        .text(dataJSON["cfdi:Comprobante"]["cfdi:Conceptos"]["cfdi:Concepto"]["unidad"],320, x);

                doc.font('Times-Roman')                                                
                        .fontSize(9)                                                
                        .fillColor('black')                                                
                        .text("$ " + dataJSON["cfdi:Comprobante"]["cfdi:Conceptos"]["cfdi:Concepto"]["valorUnitario"],420, x,{align:'left'});

                doc.font('Times-Roman')
                        .fontSize(9)
                        .fillColor('black')
                        .text("$ " + (dataJSON["cfdi:Comprobante"]["cfdi:Conceptos"]["cfdi:Concepto"]["importe"]).toFixed(2),490, x,{align:'right'})
			
	}
	else
	{
	    for(var i in result=dataJSON["cfdi:Comprobante"]["cfdi:Conceptos"]["cfdi:Concepto"])
	    {
 		doc.font('Times-Roman')
        		.fontSize(9)
        		.fillColor('black')
        		.text(Math.round(dataJSON["cfdi:Comprobante"]["cfdi:Conceptos"]["cfdi:Concepto"][i]["cantidad"]*1)/1,30, x);
                
		doc.font('Times-Roman')                        
			.fontSize(9)                        
			.fillColor('black')                        
			.text(dataJSON["cfdi:Comprobante"]["cfdi:Conceptos"]["cfdi:Concepto"][i]["descripcion"],120, x);				
		
                doc.font('Times-Roman')                                                
			.fontSize(9)                                                
			.fillColor('black')                                                
			.text(dataJSON["cfdi:Comprobante"]["cfdi:Conceptos"]["cfdi:Concepto"][i]["unidad"],320, x);

                doc.font('Times-Roman')                                                
			.fontSize(9)                                                
			.fillColor('black')                                                
			.text("$ " + Math.round(dataJSON["cfdi:Comprobante"]["cfdi:Conceptos"]["cfdi:Concepto"][i]["valorUnitario"]*100)/100,420, x,{align:'left'});

                doc.font('Times-Roman')                                                
			.fontSize(9)                                                
			.fillColor('black')                                                
			.text("$ " + Math.round(dataJSON["cfdi:Comprobante"]["cfdi:Conceptos"]["cfdi:Concepto"][i]["importe"]*100)/100,490, x,{align:'right'})

		x=x+10;
	    }//End for
	}//End Else-If

//Other Charges
        y=435;
        Others=Math.round(dataJSON["cfdi:Comprobante"]["cfdi:Complemento"]["aerolineas:Aerolineas"]["aerolineas:OtrosCargos"]["TotalCargos"]*100)/100;

    if(!Others==0)
    {
	if(dataJSON["cfdi:Comprobante"]["cfdi:Complemento"]["aerolineas:Aerolineas"]["aerolineas:OtrosCargos"]["aerolineas:Cargo"].length===undefined)
	{
		doc.font('Times-Roman')
                    	.fontSize(6)
                        .fillColor('black')
			.text(dataJSON["cfdi:Comprobante"]["cfdi:Complemento"]["aerolineas:Aerolineas"]["aerolineas:OtrosCargos"]["aerolineas:Cargo"]["CodigoCargo"],30, y);//x,y
                doc.font('Times-Roman')
                        .fontSize(6)
                        .fillColor('black')
			.text("$" + Math.round(dataJSON["cfdi:Comprobante"]["cfdi:Complemento"]["aerolineas:Aerolineas"]["aerolineas:OtrosCargos"]["aerolineas:Cargo"]["Importe"]*100)/100,120, y);//x,y

	}
	else
	{
		for( var j in otherCharges=dataJSON["cfdi:Comprobante"]["cfdi:Complemento"]["aerolineas:Aerolineas"]["aerolineas:OtrosCargos"]["aerolineas:Cargo"])
		{ 
                	doc.font('Times-Roman')                        
				.fontSize(6)                        
				.fillColor('black')                        
				.text(dataJSON["cfdi:Comprobante"]["cfdi:Complemento"]["aerolineas:Aerolineas"]["aerolineas:OtrosCargos"]["aerolineas:Cargo"][j]["CodigoCargo"],30, y);//x,y

                        doc.font('Times-Roman')
                                .fontSize(6) 
                                .fillColor('black')
                                .text("$" + Math.round(dataJSON["cfdi:Comprobante"]["cfdi:Complemento"]["aerolineas:Aerolineas"]["aerolineas:OtrosCargos"]["aerolineas:Cargo"][j]["Importe"]*100)/100,120, y);
			y=y-8;
		}
	}
        splitLine = doc.linearGradient(50, 0, 400, 20)
        splitLine.stop(0, 'black')
        doc.rect(30, y, 115, 0)
        doc.fill(splitLine)

	y=y-8;

	doc.font('Times-Roman')
       		.fontSize(6)
                .fillColor('black')
                .text("Complemento Aerolineas",30, y);		

	doc.font('Times-Roman')                                
		.fontSize(6)
                .fillColor('black')                                
		.text("Importe",110, y);    
			
	y=y-8;
   }//End Validate Others value 0
        TUA=Math.round(dataJSON["cfdi:Comprobante"]["cfdi:Complemento"]["aerolineas:Aerolineas"]["TUA"]*100)/100;

	if(!TUA==0)
	{
        	doc.font('Times-Roman')
                	.fontSize(6)                                
			.fillColor('black')                                
			.text("TUA:",30, y);

        	doc.font('Times-Roman')                                
			.fontSize(6)                                
                	.fillColor('black')                                                                
			.text("$" + Math.round(dataJSON["cfdi:Comprobante"]["cfdi:Complemento"]["aerolineas:Aerolineas"]["TUA"]*100)/100,110, y);
	}
	dataTotal = doc.linearGradient(200, 0, 530, 20)
	dataTotal.stop(0, 'black')
          .stop(1, 'white')

	doc.rect(25, 450, 530, 20)
	doc.fill(dataTotal)

//Total Invoice
	
	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('Subtotal',420, 475)//x,y
	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('$' + Math.round(dataJSON["cfdi:Comprobante"]["subTotal"]*100)/100,480, 475,{align:'right'})

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('IVA',420, 485)
	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('$' + Math.round(dataJSON["cfdi:Comprobante"]["cfdi:Impuestos"]["totalImpuestosTrasladados"]*100)/100,480, 485,{align:'right'})

//Total wrote in letter

        doc.font('Times-Roman')
        .fontSize(9)
        .fillColor('black')
        .text('Importe con Letra:' + (money.moneyToLetter(Math.round(dataJSON["cfdi:Comprobante"]["total"]*100)/100, dataJSON["cfdi:Comprobante"]["Moneda"])).toUpperCase() + " " + dataJSON["cfdi:Comprobante"]["Moneda"],30, 495)

	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('Total',420, 495)
	doc.font('Times-Roman')
   	.fontSize(9)
   	.fillColor('black')
   	.text('$' + Math.round(dataJSON["cfdi:Comprobante"]["total"]*100)/100,480, 495,{align:'right'})
//

//Legacy Data from SAT

	splitLine = doc.linearGradient(200, 0, 400, 20)
	splitLine.stop(0, 'black')

	doc.rect(25, 525, 550, 1)
	doc.fill(splitLine)

	doc.font('Times-Roman')
   	.fontSize(7)
   	.fillColor('black')
   	.text('Cadena Original del Complemento de Certificación Digital del SAT:',120, 530)

 	doc.font('Times-Roman')        
	.fontSize(7)        
	.fillColor('black')        
	.text(cadenaOriginal,120, 540)

	doc.font('Times-Roman')
   	.fontSize(7)
   	.fillColor('black')
   	.text('Sello Digital del Emisor:',120, 570)

        doc.font('Times-Roman')
        .fontSize(7)
        .fillColor('black')
        .text(dataJSON["cfdi:Comprobante"]["cfdi:Complemento"]["tfd:TimbreFiscalDigital"]["selloCFD"],120, 580)

	doc.font('Times-Roman')
   	.fontSize(7)
   	.fillColor('black')
   	.text('Sello Digital del SAT:',120, 600)

	size=dataJSON["cfdi:Comprobante"]["cfdi:Complemento"]["tfd:TimbreFiscalDigital"]["selloSAT"].length;
	selloSat=dataJSON["cfdi:Comprobante"]["cfdi:Complemento"]["tfd:TimbreFiscalDigital"]["selloSAT"];

        doc.font('Times-Roman')
        .fontSize(7)
        .fillColor('black')
        .text(selloSat.substr(0,80),120, 610)

        doc.font('Times-Roman')
        .fontSize(7)
        .fillColor('black')
        .text(selloSat.substr(81,size),120, 618)

	doc.font('Times-Roman')
   	.fontSize(7)
   	.fillColor('black')
   	.text('Folio Fiscal:',120, 640)

        doc.font('Times-Roman')
        .fontSize(7)
        .fillColor('black')        
	.text(dataJSON["cfdi:Comprobante"]["cfdi:Complemento"]["tfd:TimbreFiscalDigital"]["UUID"],160, 640)

	doc.font('Times-Roman')
   	.fontSize(7)
   	.fillColor('black')
   	.text('Fecha y Hora de Certificación:',120, 650)

        doc.font('Times-Roman')
        .fontSize(7)
        .fillColor('black')
        .text(dataJSON["cfdi:Comprobante"]["cfdi:Complemento"]["tfd:TimbreFiscalDigital"]["FechaTimbrado"],210, 650)

	doc.font('Times-Roman')
   	.fontSize(7)
   	.fillColor('black')
   	.text('No. de Serie del Certificado del Emisor:',120, 660)

        doc.font('Times-Roman')
        .fontSize(7)
        .fillColor('black')
        .text(dataJSON["cfdi:Comprobante"]["noCertificado"],240, 660)

	doc.font('Times-Roman')
   	.fontSize(7)
   	.fillColor('black')
   	.text('No. de Serie del Certificado del SAT:',120, 670)

       doc.font('Times-Roman')
        .fontSize(7)
        .fillColor('black')
        .text(dataJSON["cfdi:Comprobante"]["cfdi:Complemento"]["tfd:TimbreFiscalDigital"]["noCertificadoSAT"],230, 670)

	doc.font('Times-Roman')
   	.fontSize(7)
   	.fillColor('black')
   	.text('Condiciones de Pago:',120, 680)

	doc.font('Times-Roman')
   	.fontSize(7)
   	.fillColor('black')
   	.text('Forma de Pago:',120, 690)

       doc.font('Times-Roman')
        .fontSize(7)
        .fillColor('black')
        .text(dataJSON["cfdi:Comprobante"]["formaDePago"],170, 690)

	doc.font('Times-Roman')
   	.fontSize(7)
   	.fillColor('black')
   	.text('Método de Pago:',120, 700)

        doc.font('Times-Roman')
        .fontSize(7)
        .fillColor('black')
        .text(dataJSON["cfdi:Comprobante"]["metodoDePago"],180, 700)

	doc.font('Times-Roman')
   	.fontSize(7)
   	.fillColor('black')
   	.text('Número de Cuenta:',120, 710)

        doc.font('Times-Roman')
        .fontSize(7)
        .fillColor('black')
        .text(dataJSON["cfdi:Comprobante"]["NumCtaPago"],180, 710)

// QR IMAGE:

	doc.image('/home/prdvbweb/invoice/handlers/bkImage/' + noEInvoice + '.jpg', 480, 650, {scale : 0.55});

        doc.font('Times-Roman')        
		.fontSize(7)        
		.fillColor('black')        
		.text('*Esta es una representación impresa de un CFDI*',285,712)

// Finalize PDF file
	doc.end();
	console.log("Done pdf");
}

module.exports.createPDF=createPDF;
