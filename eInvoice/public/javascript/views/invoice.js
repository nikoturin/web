define(["backbone","jquery","underscore","handlebars","collections/invoice","collections/invoiceRecord"],function(Backbone,$,_,Handlebars,Invoice,InvoiceRec){


	var searchInvoice=Backbone.View.extend({

		      el:"body",
	   tagName:"tr",
	 className:"invoice",
	    events:{
			'click a.btn-sendResend' : 'sendResend',
			'click #btn-searchInvoice':'searchingInvoices',
			'click #btn-sendInvoice':'sendInvoice',
			'click #btn-sendQuestion':'sendQuestion',
			'click #btn-close':'sendClose'
			
	   },
	   render:function(model){
		
	   },
           sendResend:function(e){

            	 	var invoiceResend=new Invoice();
			var invoiceReSendPdf=new Invoice();
	                //alert("Testing:" + e.target.name + "vs" + $("#resrfc").val());
                
			$(document).ready(function(){
				$("#backgroundPopup").fadeOut("normal");
        	               	$("#toPopup").fadeOut("normal");
			});

			$("#toPopup").remove();

			var htmlWait="<div id='toPopup'>"+
        				"<tr>"+
                				"<div cellspacing='0' border='0' align='center' style='width:100%;'>"+
							"<b style='font-size: 25px'>Estimado cliente, su factura se est&aacute; Re-enviando; en breve le ser&aacute; enviada a su correo electr&oacute;nico de contacto</b>"+
                				"</div>"+
        				"</tr>"+
        				"<tr>"+
                				"<table cellspacing='0' border='0' align='center' style='width:100%;'>"+
                        				"<td ALIGN=CENTER><img src='images/spinner.gif'></td>"+
                				"</table>"+
        				"</tr>"+
    			       	"</div>"+
    			       	"<!--div class='loader'></div-->"+
			      	"<div id='backgroundPopup'></div>";
			      	
      		if(!$("#noInterior").val())
          		{$("#noInterior").val("-")}

	      	var putInvoice=$("#resrfc").val() + "/" + $("#razonSocial").val() + "/" + $("#calle").val() + "/" + $("#noInterior").val() + "/" + $("#noExterior").val() + "/" + $("#colonia").val() + "/" + $("#localidad").val() + "/" + $("#estado").val() + "/" + $("#pais").val() + "/" + $("#codigoPostal").val() + "/" + $("#email").val();


      		if(!$("#resrfc").val() || !$("#razonSocial").val() || !$("#calle").val() || !$("#noExterior").val() || !$("#colonia").val() || !$("#localidad").val() ||  !$("#estado").val() || !$("#pais").val() || !$("#codigoPostal").val() || !$("#email").val())
			{alert("Existen Campos Vacios Favor de Verificar " + $("#resrfc").val());}
	      	else if(!$("#email").val().match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/))
      		{
			alert("Ingrese un Email Valido");
      		}
      		else if(!$("#resrfc").val().match(/^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})/))
      		{
          		alert("RFC Incorrecto, Favor de Validar");
      		} 
      		else
      		{

			//alert(putInvoice + " vs " + e.target.name);
                 	invoiceResend.fetch({
                       		async:true,
                         	add:true,
                         	url:"invoiceDataClient/" + putInvoice,
                     		success:function(dataJson){
                     		}
                 	});
                 	$("#bg").append(htmlWait);                        
		 	$(document).ready(function(){                                
		  		$("#backgroundPopup").css("opacity", "0.7");                                
			  	$("#backgroundPopup").fadeIn(0001);                                
			  	$("#toPopup").fadeIn(1000);                        
			 });
 		 	setTimeout(function(){ 						
				invoiceReSendPdf.fetch({
	                                       async:true,                                        
					       add:true,                                        
					       url:"invoiceSend/" + e.target.name + "/" + $("#resrfc").val() + "/" + $("#email").val(),
					       success:function(dataJson){																			data=dataJson.models[0].attributes;															     console.log(JSON.stringify(data));																  alert("No Factura:" + JSON.stringify(data["Invoice"]) + " Status:" + JSON.stringify(data["Status"]));
					  	}
				});
		   	},1500);
		   	setTimeout(function(){ 
				//location.reload();
				$("#backgroundPopup").fadeOut("normal");
                        	$("#toPopup").fadeOut("normal");
		   	},5000);
		}//End Else-If
	   },
	   searchingInvoices:function(){


			if((!$("#locator").val() || !$("#nombre").val() || !$("#apellido").val()))
			{
				flagRqstInvoice=false;
				alert("Existen Campos Vacios");
			}
			else
			{
				if($("#rfc").val())
				{
					if($("#rfc").val().match(/^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})/))
					{
						flagRqstInvoice=true;
						getInvoice=$("#rfc").val() + "/" + $("#locator").val() + "/" + $("#apellido").val() + "/" + $("#nombre").val();
					}
					else
					{
						flagRqstInvoice=false;
						alert("RFC Incorrecto, Favor de Validar");
					}
				}
				else
				{
					flagRqstInvoice=true;
                                        getInvoice="-/" + $("#locator").val() + "/" + $("#apellido").val() + "/" + $("#nombre").val();
				}
			        
				if($("#locator").val().match(/[A-Z]{6}/))
				{flagRqstInvoice=true;}
				else
				{
					flagRqstInvoice=false;
					alert("Favor de Validar Locator");
				}
			}
			if(flagRqstInvoice)
			{
                      	 var dataInvoice=new Invoice();                        
                         var fieldClient=["razonSocial","calle","noInterior","noExterior","colonia","localidad","estado","pais","codigoPostal","email"];
                         var fieldRFCJSON=["Nombre","Calle","NoInterior","NoExterior","Colonia","Localidad","Estado","Pais","CodigoPostal","Email"];

			 dataInvoice.fetch({
					async:true,			
					add:true,
					cache:false,
					url:"invoice/" + getInvoice,
					success:function(dataJson){	

				data=dataJson.models[0].attributes;
				/*var compiled=Handlebars.templates["templateSearch"];
				var html=compiled(data["Invoices"]);*/
			
				if(data["Invoices"]["Invoice"]===undefined)
				{
					alert("No Existen Facturas");
					location.reload();
				}
				else
				{
                                	var compiled=Handlebars.templates["templateSearch"];
                                	var html=compiled(data["Invoices"]);


                                        //console.log(JSON.stringify(data["Invoices"]));


					$("#contenedor").empty();

					if($("#resrfc").val()===undefined)
					{$("#contenedor").html(html);}

					//$("#contenedor").html(html);
		

                                        /*if(JSON.stringify(data["RFC"]["RFCId"])=="{}")
                                        {
                                                $("#resrfc").val($("#rfc").val());
                                                $("#resrfc").removeAttr("disabled");
                                        }
                                        else
                                        {

                                                $("#resrfc").val(data["RFC"]["RFCId"]);
                                                $("#resrfc").attr("disabled","disabled");
                                        }*/
                                        if(data["RFC"]["RFCId"])
                                        {
                                                $("#resrfc").val(data["RFC"]["RFCId"]);
                                                $("#resrfc").attr("disabled","disabled");
                                        }
                                        else
                                        {
                                                $("#resrfc").val($("#rfc").val());
                                                $("#resrfc").removeAttr("disabled");
                                        }

                                        $.each(fieldClient,function(i,fields){

                                                if(JSON.stringify(data["RFC"][fieldRFCJSON[i]])=="{}")
                                                        $("#" + fields).val("");
                                                else
                                                        $("#" + fields).val(data["RFC"][fieldRFCJSON[i]])

                                        });
					/*$("#razonSocial").val(data["RFC"]["Nombre"]);
					$("#calle").val(data["RFC"]["Calle"]);
					if(JSON.stringify(data["RFC"]["NoInterior"])=="{}")
					{
						$("#noInterior").val("");
					}
					else
						$("#noInterior").val(data["RFC"]["NoInterior"]);

					if(JSON.stringify(data["RFC"]["NoExterior"])=="{}")                                        
					{                                                
						$("#noExterior").val("");                                        
					}
					else
						$("#noExterior").val(data["RFC"]["NoExterior"]);

					$("#colonia").val(data["RFC"]["Colonia"]);
					$("#localidad").val(data["RFC"]["Localidad"]);
					$("#estado").val(data["RFC"]["Estado"]);
					$("#pais").val(data["RFC"]["Pais"]);
					$("#codigoPostal").val(data["RFC"]["CodigoPostal"]);
					$("#email").val(data["RFC"]["Email"]);*/
					console.log("DATA:" + data["Invoices"]["Invoice"]);
				}
			    }//End Success
			});//End Function
		      }
		     //End if
	    },
	    sendQuestion:function(e){

		var htmlQuestion="<div id='toPopup'>"+
                				"<div cellspacing='0' border='0' align='center' style='width:100%;'>"+
							"<b style='font-size:25px'>Esta seguro que los datos est&aacute;n correctos?</b>"+
                				"</div>"+
        				"<tr>"+
                				"<table cellspacing='0' border='0' align='center' style='width:100%;'>"+
		                                        "<td><p><a href='#' id='btn-close' class='btn btn-search'>REGRESAR</a></p></td>"+
		                                        "<td><p><a href='#' id='btn-sendInvoice' class='btn btn-search'>FACTURAR</a></p></td>"+
                				"</table>"+
        				"</tr>"+
    			       	"</div>"+
			      	"<div id='backgroundPopup'></div>";
		$("#bg").append(htmlQuestion);
		$(document).ready(function(){
                        $("#backgroundPopup").css("opacity", "0.7"); 
			$("#backgroundPopup").fadeIn(0001);
                       	$("#toPopup").fadeIn(2000);
                });
	    },
	    sendClose:function(e){

		$(document).ready(function(){
			$("#backgroundPopup").fadeOut("normal");
                       	$("#toPopup").fadeOut("normal");
		});
		$("#backgroundPopup").remove();
		$("#toPopup").remove();
	    },
 	    sendInvoice:function(e){

		var i;
		var invoiceSendPdf=new Invoice();
		var invoiceDataCustom=new Invoice();
		var invoiceSendEmail=new Invoice();
		
		$(document).ready(function(){
			$("#backgroundPopup").fadeOut("normal");
                       	$("#toPopup").fadeOut("normal");
		});

		$("#toPopup").remove();

		var htmlWait="<div id='toPopup'>"+
        				"<tr>"+
                				"<div cellspacing='0' border='0' align='center' style='width:100%;'>"+
							"<b style='font-size: 25px'>Estimado cliente, su factura se est&aacute; procesando; en breve le ser&aacute; enviada a su correo electr&oacute;nico de contacto</b>"+
                				"</div>"+
        				"</tr>"+
        				"<tr>"+
                				"<table cellspacing='0' border='0' align='center' style='width:100%;'>"+
                        				"<td ALIGN=CENTER><img src='images/spinner.gif'></td>"+
                				"</table>"+
        				"</tr>"+
    			       	"</div>"+
    			       	"<!--div class='loader'></div-->"+
			      	"<div id='backgroundPopup'></div>";

		var selected=$("#contenedor input:checked").map(function(i,el){
			return el.name;}).get();

 		if(!$("#noInterior").val())
                        {$("#noInterior").val("-")}


                var putInvoice=$("#resrfc").val() + "/" + $("#razonSocial").val() + "/" + $("#calle").val() + "/" + $("#noInterior").val() + "/" + $("#noExterior").val() + "/" + $("#colonia").val() + "/" + $("#localidad").val() + "/" + $("#estado").val() + "/" + $("#pais").val() + "/" + $("#codigoPostal").val() + "/" + $("#email").val();
		
		if(!$("#resrfc").val() || !$("#razonSocial").val() || !$("#calle").val() || !$("#noExterior").val() || !$("#colonia").val() || !$("#localidad").val() ||  !$("#estado").val() || !$("#pais").val() || !$("#codigoPostal").val() || !$("#email").val())
		{alert("Existen Campos Vacios Favor de Verificar " + $("#resrfc").val());}
		else if(!$("#email").val().match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/))
		{
			alert("Ingrese un Email Valido");
		}
		else if(!$("#resrfc").val().match(/^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})/))
		{
                	alert("RFC Incorrecto, Favor de Validar");			
		}
		else
		{
		   if(selected.length>0)
		   {
                 	invoiceDataCustom.fetch({
                       		async:true,
                         	add:true,
                         	url:"invoiceDataClient/" + putInvoice,
                     		success:function(dataJson){
                     		}
                 	});
                        $("#bg").append(htmlWait);                        
			$(document).ready(function(){                                
				$("#backgroundPopup").css("opacity", "0.7");                                
				$("#backgroundPopup").fadeIn(0001);                                
				$("#toPopup").fadeIn(1000);                        
			});
 			setTimeout(function(){


			   for(i=0; i<selected.length;i++)
			   {	
			    	invoiceSendPdf.fetch({
                                       async:true,                                        
				       add:true, 
				       url:"invoiceSend/" + selected[i] + "/" + $("#resrfc").val() + "/" + $("#email").val(),
				   success:function(dataJson){
					data=dataJson.models[0].attributes;
					console.log(JSON.stringify(data));
					alert("No Factura:" + JSON.stringify(data["Invoice"]) + " Status:" + JSON.stringify(data["Status"]));
				  }
				});
			   }//End for
			},1500);
	
		        setTimeout(function(){ 
				location.reload();
			},5000);
		     }
		     else
		     {alert("Seleccione una Factura");}
		   }//End Else-If
		}//Close Function sendInvoice
	});
	return searchInvoice;
});
