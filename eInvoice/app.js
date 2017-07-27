
/*module dependencies.
 */
 
var express = require('express')
  , routes = require('./routes')
  , xml2js=require('xml2js')
  , execSync=require('exec-sync')
  , ejs=require('ejs')
  , url=require('url')
  , fs = require('fs')
  , http = require('http');
 
var app = express();
 
app.configure(function(){
  app.set('port', process.env.PORT || 8084);
  app.set('views', __dirname + '/views');
  app.engine('html',require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
 
app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/',routes.invoice);
app.get('/invoice',routes.invoice);
app.get('/invoice/:rfc/:locator/:apellido/:nombre',routes.invoice);
app.get('/invoiceDataClient/:rfc/:rSocial/:calle/:noInt/:noExt/:colonia/:localidad/:estado/:pais/:codPostal/:email',routes.invoiceDataClient);
app.get('/invoiceSend/:idInvoice/:rfc/:email',routes.invoiceSend);
app.get('/invoiceSendEmail/:noInvoice/:email',routes.invoiceSendEmail);
app.get('/invoiceGuide',routes.invoiceGuide);
app.get('/invoiceEditData',routes.invoiceEditData);
app.get('/invoiceReSendGuide',routes.invoiceReSendGuide);
 
//Asignamos a server la creación del servidor http.
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
