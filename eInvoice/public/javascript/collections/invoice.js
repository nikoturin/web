define(["backbone","model/invoice"],function(Backbone,Invoice){

	return Backbone.Collection.extend({
		
		model:Invoice
		//url:"invoice/:rfc/:locator/:nombre/:apellido"
	});
});
