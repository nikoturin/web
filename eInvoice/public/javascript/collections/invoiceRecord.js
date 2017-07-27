define(["backbone","model/invoice"],function(Backbone,Invoice){

	return Backbone.Collection.extend({
		
		model:Invoice,
   		save:function(){
                            		Backbone.sync('create',this,{ 
						success:function(){                                                
							console.log('Saved');
                                        }
                                });
                        }
	});
});
