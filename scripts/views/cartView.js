define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!tpls/cartItems.tpl',
  'text!tpls/cartTot.tpl'], function($, _, Backbone, handlebars, cartItems, cartTot){
	
	var CartView = Backbone.View.extend({
			el: "#cart_view",
			cart_items_template: Handlebars.compile(cartItems),
			cart_tot_template : Handlebars.compile(cartTot),
			initialize : function() {
				this.render(); 
			},
			events: {
					'blur input[type=\"text\"][id^=\"Qty_\"]': 'updCart'						
			},
			render: function(){
				var totalPrice = 0;
				
				if(this.collection.length > 0){
						$(this.el).find("tbody").contents().remove();
							this.collection.each(function(model){
								
								totalPrice = totalPrice + this.collection.getTotalprice(model); 
								
								var cartemplate = this.cart_items_template(model.toJSON());
								$(this.el).find("tbody").append(cartemplate);
								
						}, this);
						
						var tottemplate = this.cart_tot_template({"total" : totalPrice.toFixed(2)});
						$(this.el).find("tbody").append(tottemplate);
									
				}
									
			},
			updCart : function(e){
       				var selEl = $(e.currentTarget);
  					var qty = $(selEl).val();
  					
  				
	  				if(isNaN(qty)){
	  					
	  					alert("Please enter valid quantity ");
	  					return;
	  				}
       				this.collection.updateItem(selEl, qty, this );
       				
       			},
				complete : function(){
					this.collection.syncCollection();
					this.render();
					alert("Updated Succesfully.");
				}
	});
	
	return CartView;
	
});