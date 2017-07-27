Handlebars.registerHelper('list', function(items, options) {

	var margin=30;
	var output="<script type='text/javascript' src='javascripts/utils/validate.js'></script>"+
		     "<link rel='stylesheet' type='text/css' href='stylesheets/esqueleto.css' />"+
		  "<div align='center' style='position:absolute;width:800px;top:50%;left:0%;BACKGROUND-COLOR:#F4FA58'>"+
                      "<div style='float:left;width:100px;padding:8px;background:#DF0101'><b style='font-size:12px;COLOR:#FFF;'>#</b></div>"+
                      "<div style='float:left;width:100px;padding:8px;background:#DF0101'><b style='font-size:12px;COLOR:#FFF;'>No</b></div>"+
                      "<div style='float:left;width:100px;padding:8px;background:#DF0101'><b style='font-size:12px;COLOR:#FFF;'>Estado</b></div>"+
                      "<div style='float:left;width:100px;padding:8px;background:#DF0101'><b style='font-size:12px;COLOR:#FFF;'>Fecha Pago</b></div>"+
                      "<div style='float:left;width:100px;padding:8px;background:#DF0101'><b style='font-size:12px;COLOR:#FFF;'>Total</b></div>"+
                      "<div style='float:left;width:100px;padding:8px;background:#DF0101'><b style='font-size:12px;COLOR:#FFF;'>Moneda</b></div>"+
                      "<div style='float:left;width:87px;padding:8px;background:#DF0101'><b style='font-size:12px;COLOR:#FFF;'>Re-Envio PDF</b></div>"+
                  "</div>";
			
	if(items.length===undefined)
	{
		output=output + "<div align='center' style='position:absolute;width:800px;top:50%;left:0%;BACKGROUND-COLOR:#D8D8D8;margin:" + margin + "px 0 0 0;'>";
                elem=(options.fn(items)).split(" ");


                adding="<div style='float:left;width:100px;padding:8px;background:#D8D8D8'><b style='font-size:12px;COLOR:#FFF;'>" + elem[0] + "</b></div>";
                adding=adding + "<div style='float:left;width:100px;padding:8px;background:#D8D8D8'><b style='font-size:12px;COLOR:#FFF;'>" + elem[1] + "</b></div>";
                adding=adding + "<div style='float:left;width:100px;padding:8px;background:#D8D8D8'><b style='font-size:12px;COLOR:#FFF;'>" + elem[2] + "</b></div>";
                adding=adding + "<div style='float:left;width:100px;padding:8px;background:#D8D8D8'><b style='font-size:12px;COLOR:#FFF;'>" + Math.round(elem[3]*100)/100 + "</b></div>";
                adding=adding + "<div style='float:left;width:100px;padding:8px;background:#D8D8D8'><b style='font-size:12px;COLOR:#FFF;'>" + elem[4] + "</b></div>";
		
		if(elem[1]=="Y")
		{
              		output=output + "<div style='float:left;width:100px;padding:8px;background:#D8D8D8'><input type='checkbox' id='" + elem[0] + "' name=" + elem[0] + " disabled ></div>";
			output=output + adding;
                        output=output + "<div style='float:left;width:10px;padding:8px;background:#D8D8D8'><a href='#' id='btn-sendResend' class='btn btn-sendResend' name='" + elem[0] + "'></a></div>";

		}
		else
		{
              		output=output + "<div style='float:left;width:100px;padding:8px;background:#D8D8D8'><input type='checkbox' id='" + elem[0] + "' name=" + elem[0] + " ></div>";
			output=output + adding;
		}	
                output=output + "</div>";
		margin=50+margin;
	
	}
	else
	{
		for(var i=0, l=items.length; i<l; i++)
		{
			output=output + "<div align='center' style='position:absolute;width:800px;top:50%;left:0%;BACKGROUND-COLOR:#D8D8D8;margin:" + margin + "px 0 0 0;'>";
			elem=(options.fn(items[i])).split(" ");
			
                        adding="<div style='float:left;width:100px;padding:8px;background:#D8D8D8'><b style='font-size:12px;COLOR:#FFF;'>" + elem[0] + "</b></div>";
                        adding=adding + "<div style='float:left;width:100px;padding:8px;background:#D8D8D8'><b style='font-size:12px;COLOR:#FFF;'>" + elem[1] + "</b></div>";
                        adding=adding + "<div style='float:left;width:100px;padding:8px;background:#D8D8D8'><b style='font-size:12px;COLOR:#FFF;'>" + elem[2] + "</b></div>";
                        adding=adding + "<div style='float:left;width:100px;padding:8px;background:#D8D8D8'><b style='font-size:12px;COLOR:#FFF;'>" + Math.round(elem[3]*100)/100 + "</b></div>";
                        adding=adding + "<div style='float:left;width:100px;padding:8px;background:#D8D8D8'><b style='font-size:12px;COLOR:#FFF;'>" + elem[4] + "</b></div>";
	
			if(elem[1]=="Y")
			{
			      	output=output + "<div style='float:left;width:90px;padding:8px;background:#D8D8D8'><input type='checkbox' id='" + elem[0] + "' name=" + elem[0] + " disabled ></div>";
				output=output + adding;
				output=output + "<div style='float:left;width:10px;padding:8px;background:#D8D8D8'><a href='#' id='btn-sendResend' class='btn btn-sendResend' name='" + elem[0] + "'></a></div>";
			}
			else
			{
			  	output=output + "<div style='float:left;width:100px;padding:8px;background:#D8D8D8'><input type='checkbox' id='" + elem[0] + "' name=" + elem[0] + "></div>";
				output=output + adding;
			}	
			output=output + "</div>";
			margin=margin+35;
		}	

		margin=10+margin;
	}
	output=output + "<div align='center' style='position:absolute;Verdana;BACKGROUND-COLOR: #D8D8D8;border-radius: 9px 9px 9px 9px; width:800px;top:50%;left:50%;margin:" + margin + "px 0 0 -400px;'>"+   
        	"<div align='left' style='width:666px;height:20px;top:50%;left:100%;BACKGROUND-COLOR:##D8D8D8'>"+
                        "<input type='text' id='trfc'  value='RFC:' style='height:14px;BACKGROUND-COLOR:#D8D8D8;border-width:0;font-size:12px;box-shadow: none;' readonly/>"+

                        "<input type='text' id='trsocial' value='RAZON SOCIAL:' style='height:14px;BACKGROUND-COLOR:#D8D8D8;border-width:0;font-size:12px;box-shadow: none;' readonly/>"+
                        "<input type='text' id='tcalle'  value='CALLE:' style='height:14px;BACKGROUND-COLOR:#D8D8D8;border-width:0;font-size:12px;box-shadow: none;' readonly/>"+
                "</div>"+
                "<div align='left' style='width:666px;height:40px;top:50%;left:100%;BACKGROUND-COLOR:#D8D8D8'>"+
                        "<input type='text' id='resrfc'  style='height:14px;'  />"+
                        "<input type='text' id='razonSocial'  style='height:14px;' />"+
                        "<input type='text' id='calle' style='height:14px;'  />"+
                "</div>"+
                "<div align='left' style='width:666px;height:20px;top:50%;left:100%;BACKGROUND-COLOR:##D8D8D8'>"+
                        "<input type='text' id='texterior'  value='No. EXT.:' style='height:14px;width:42px;BACKGROUND-COLOR:#D8D8D8;border-width:0;font-size:12px;box-shadow: none;' readonly/>"+

                        "<input type='text' id='tinterior' value='No. INT' style='height:14px;width:50px;BACKGROUND-COLOR:#D8D8D8;border-width:0;font-size:12px;box-shadow: none;' readonly/>"+

                        "<input type='text' id='tcolonia'  value='COLONIA:' style='height:14px;width:250px;BACKGROUND-COLOR:#D8D8D8;border-width:0;font-size:12px;box-shadow: none;' readonly/>"+

                        "<input type='text' id='tlocalidad'  value='LOCALIDAD:' style='height:14px;BACKGROUND-COLOR:#D8D8D8;border-width:0;font-size:12px;box-shadow: none;' readonly/>"+

                        "<!--input type='text' id='testado'  value='ESTADO:' style='height:14px;width:70px;BACKGROUND-COLOR:#D8D8D8;border-width:0;font-size:12px;box-shadow: none;' readonly/-->"+
                "</div>"+
                "<div align='left' style='width:666px;height:40px;top:50%;left:100%;BACKGROUND-COLOR:#D8D8D8'>"+
                        "<input type='text' id='noExterior'  style='height:14px;width:50px'  />"+
                        "<input type='text' id='noInterior'  style='height:14px;width:50px' />"+
                        "<input type='text' id='colonia' style='height:14px;width:250px'  />"+
                        "<input type='text' id='localidad' style='height:14px;width:255px;'  />"+
                        "<!--input type='text' id='estado' style='height:14px;width:110px;'  /-->"+
                "</div>"+
                "<div align='left' style='width:666px;height:20px;top:50%;left:100%;BACKGROUND-COLOR:##D8D8D8'>"+
                        "<input type='text' id='testado'  value='ESTADO:' style='height:14px;width:120px;BACKGROUND-COLOR:#D8D8D8;border-width:0;font-size:12px;box-shadow: none;' readonly/>"+
                        "<input type='text' id='tpais' value='PAIS:' style='height:14px;width:120px;BACKGROUND-COLOR:#D8D8D8;border-width:0;font-size:12px;box-shadow: none;' readonly/>"+
                        "<input type='text' id='tcodigoPostal'  value='CODIGO POSTAL:' style='height:14px;width:130px;BACKGROUND-COLOR:#D8D8D8;border-width:0;font-size:12px;box-shadow: none;' readonly/>"+
 			"<input type='text' id='temail'  value='EMAIL(S):' style='height:14px;width:60px;BACKGROUND-COLOR:#D8D8D8;border-width:0;font-size:12px;box-shadow: none;' readonly/>"+
                "</div>"+
                "<div align='left' style='width:666px;height:40px;top:50%;left:100%;BACKGROUND-COLOR:#D8D8D8'>"+
                        "<input type='text' id='estado'  style='height:14px;width:120px;'  />"+
                        "<input type='text' id='pais'  style='height:14px;width:129px;' />"+
                        "<input type='text' id='codigoPostal' style='height:14px;width:129px'  />"+
                        "<input type='text' id='email' style='height:14px;width:230px'  />"+
                "</div>"+
                "<div align='right' style='width:777px;height:40px;top:50%;left:100%;BACKGROUND-COLOR:#D8D8D8'>"+
                        "<input type='hidden' id='pivot' >"+
                        "<!--a href='#' id='btn-sendQuestion' class='btn btn-invoice'></a-->"+
                        "<a href='#' id='btn-sendQuestion' class='btn btn-search'>FACTURAR</a>"+
                "</div>"+
	"</div>";
	
	return output;

});//End helper
