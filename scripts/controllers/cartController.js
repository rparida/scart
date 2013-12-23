define([
  'jquery',
  'underscore',
  'backbone',
  'views/cartView',
  'services/cartService', 
  'services/productsService'
  ], function($, _, Backbone, CartView, cartCollection, prdCollection){
	
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
				cartCollection.addItem(selItem);
				var cartView = new CartView({collection: cartCollection});						
			}});
	});	 
	
	//For viewing cart
	app_router.on('route:showCart', function() {
			cartCollection.syncCollection();
			var cartView = new CartView({collection: cartCollection});
	});
	
	//For deleting items from cart
	app_router.on('route:delCart', function(id) {
			cartCollection.removeItem(id);
			var cartView = new CartView({collection: cartCollection });
					
	});	
	
	//For clearing all items from cart
	app_router.on('route:clear', function() {		
			cartCollection.clearCart();
            var cartView = new CartView({collection: cartCollection});
	});	
	
	if (Backbone.History) {
			Backbone.history.start({pushState: true, hashChange: false, root: "scart"});
	}	
});
