
var o=new Array("diez", "once", "doce", "trece", "catorce", "quince", "diecis�is", "diecisiete", "dieciocho", "diecinueve", "veinte", "veintiuno", "veintid�s", "veintitr�s", "veinticuatro", "veinticinco", "veintis�is", "veintisiete", "veintiocho", "veintinueve");
var u=new Array("cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve");
var d=new Array("", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa");
var c=new Array("", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos");
 
var moneyToLetter=function nn(n,typeRate){

  var n=parseFloat(n).toFixed(2); /*se limita a dos decimales, no sab�a que exist�a toFixed() :)*/
  var p=n.toString().substring(n.toString().indexOf(".")+1); /*decimales*/
  var m=n.toString().substring(0,n.toString().indexOf(".")); /*n�mero sin decimales*/
  var m=parseFloat(m).toString().split("").reverse(); /*tampoco que reverse() exist�a :D*/
  var t="";
 
  /*Se analiza cada 3 d�gitos*/
  for (var i=0; i<m.length; i+=3)
  {
    var x=t;
    /*formamos un n�mero de 2 d�gitos*/
    var b=m[i+1]!=undefined?parseFloat(m[i+1].toString()+m[i].toString()):parseFloat(m[i].toString());
    /*analizamos el 3 d�gito*/
    t=m[i+2]!=undefined?(c[m[i+2]]+" "):"";
    t+=b<10?u[b]:(b<30?o[b-10]:(d[m[i+1]]+(m[i]=='0'?"":(" y "+u[m[i]]))));
    t=t=="ciento cero"?"cien":t;
    if (2<i&&i<6)
      t=t=="uno"?"mil ":(t.replace("uno","un")+" mil ");
    if (5<i&&i<9)
      t=t=="uno"?"un mill�n ":(t.replace("uno","un")+" millones ");
    t+=x;
    //t=i<3?t:(i<6?((t=="uno"?"mil ":(t+" mil "))+x):((t=="uno"?"un mill�n ":(t+" millones "))+x));
  }
  if(typeRate=="MXN")
  	t+=" pesos con "+p+"/100";
  else if(typeRate=="USD")
        t+=" dolares con "+p+"/100";
  /*correcciones*/
  t=t.replace("  "," ");
  t=t.replace(" cero","");
  //t=t.replace("ciento y","cien y");
  //alert("Numero: "+n+"\nN� D�gitos: "+m.length+"\nD�gitos: "+m+"\nDecimales: "+p+"\nt: "+t);
  //document.getElementById("esc").value=t;
  return t;
}

module.exports.moneyToLetter=moneyToLetter;
