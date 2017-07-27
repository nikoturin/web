
$(document).ready(function(){

                var specialStr=["209","193","201","205","211","218","192","200","204","210","217","38","39","47"];
                var noSpecialStr=["N","A","E","I","O","U","A","E","I","O","U"," ","",""];

                $('input').focusout(function(){
                        if(this.id=="codigoPostal")                                
			{if(!$.isNumeric($('#codigoPostal').val())){alert('Solo valor numerico');}}
                        else
                        {
                                $("#" + this.id).val($("#" + this.id).val().toUpperCase());
                                //var value="";   
                                var varId=this.id;
                                var value=$("#" + varId).val();
                                var concat="";

                                for(i=0; i<value.length; i++)
                                {
                                        cont=0;
                                        comp=value.charAt(i);
                                        valChar=comp.charCodeAt(0);
                                        $.each(specialStr,function(j,special){
                                                if(String.fromCharCode(special)==String.fromCharCode(valChar))
                                                {                                                        
							concat=concat + comp.replace(String.fromCharCode(valChar),noSpecialStr[j]);
                                                        return false;
                                                }
                                                else
                                                        cont++;
                               
                                        });
                                        if(cont>13)
                                                concat=concat + comp;
                                
                                }//End For
                        }//End Else                        
			$("#" + varId).val(concat);
                });//End FocusOUt
 });
