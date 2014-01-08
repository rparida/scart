define([
  'jquery',
  'underscore',
  'backbone', 
  'views/productsView',
   'collections/productsCatalog'
], function($, _, Backbone, ProductView, prdCollection){
	
	var Router = Backbone.Router.extend({
	routes: {
	   	 	"": "index"   	 	
	  	}
	 });
	
	var app_router = new Router;	  
	  
	app_router.on('route:index', function() {	
		var productView = new ProductView({collection: prdCollection});
	});
	
	if (Backbone.History) {
			Backbone.history.start({pushState: true, hashChange: false, root: "scart"});
    }	
});