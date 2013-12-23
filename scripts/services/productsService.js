define([
  'jquery',
  'underscore',
  'backbone',
  'models/productsModel'
], function($, _, Backbone, Product){
	
	var productCollection = Backbone.Collection.extend({
		model: Product,
		url: "./scripts/data/prdLists.json"	
	});
	

	var prdCollection= new productCollection();
	
	return prdCollection;
    
});