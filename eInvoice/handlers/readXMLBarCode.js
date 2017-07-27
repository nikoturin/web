var fs=require('fs');
var parser=require('xml2json');

function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64');
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

fs.readFile('./responsePegaso.xml', 'utf8', function(err, data) {
 if(err) 
 {
   return console.log(err);
 }
 dataJSON=JSON.parse(parser.toJson(data));
 console.log("data:" + dataJSON["soap:Envelope"]["soap:Body"]["emitirCFDResponse"]["emitirCFDResult"]["ResponseAdmon"]["CFD"]["codigoDeBarras"]);
 base64_decode(dataJSON["soap:Envelope"]["soap:Body"]["emitirCFDResponse"]["emitirCFDResult"]["ResponseAdmon"]["CFD"]["codigoDeBarras"],"QR.jpg");

});
