define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!tpls/productList.tpl'
], function($, _, Backbone, handlebars, template){
	
	
	var ProductView = Backbone.View.extend({
			el: "#prdlist_view",
			template : Handlebars.compile(template),		
			initialize : function() {
			  var self = this; 
			  this.collection.fetch({ success: function(){ self.render() ; } });              
			},
			render: function(){
				$(this.el).empty();
				this.collection.each(function(model){
					var prdTemplate = this.template(model.toJSON());
					$(this.el).append(prdTemplate);
				}, this);					
			}		
	});
	
	return ProductView;
	
});