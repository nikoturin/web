define(["backbone","events","views/invoice","collections/invoice"],function(Backbone,Events,searchInvoice,collectInvoice){

	var Router=Backbone.Router.extend({

		initialize:function(){
			
			var self=this;
			this._renderGral();
			Events.on("router:navigate",function(url){
				self.naviage(url,{trigger:true});
			});
		},
		routes:{

			"invoice":"renderGral",
			"invoice/:rfc/:locator/:nombre/:apellido":"searchInvoice"
		},
		_renderGral:function(){

			this.view=new searchInvoice();
		},
		_renderView:function(view){
			$("#temp-invoices").html(view.render().el);
		},
		searchInvoice:function(){

                        var view=new searchInvoice();
                        this._renderView(view);
		},
	});
	return Router;
});
