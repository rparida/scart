define([
  'jquery',
  'underscore',
  'backbone',
  'views/cartView',
  'collections/cartProductCollection', 
  'collections/productsCatalog'
  ], function($, _, Backbone, CartView, cartProductCollection, prdCollection){
	
	var Router = Backbone.Router.extend({
	routes: {
	   	 	"cart": "showCart",
	   	 	"cart/add/:id" : "addCart",
	   	 	"cart/del/:id" : "delCart",
	   	 	"cart/empty" : "clear"
	  }
	 });
	
	var app_router = new Router();
	
	//For adding items to cart
	app_router.on('route:addCart', function(id) {
			prdCollection.fetch({ success : function(model){
				var selItem = model.get(id);
				cartProductCollection.addItem(selItem);
				var cartView = new CartView({collection: cartProductCollection});						
			}});
	});	 
	
	//For viewing cart
	app_router.on('route:showCart', function() {
			cartProductCollection.syncCollection();
			var cartView = new CartView({collection: cartProductCollection});
	});
	
	//For deleting items from cart
	app_router.on('route:delCart', function(id) {
			cartProductCollection.removeItem(id);
			var cartView = new CartView({collection: cartProductCollection });
					
	});	
	
	//For clearing all items from cart
	app_router.on('route:clear', function() {		
			cartProductCollection.clearCart();
            var cartView = new CartView({collection: cartProductCollection});
	});	
	
	if (Backbone.History) {
			Backbone.history.start({pushState: true, hashChange: false, root: "scart"});
	}	
});
