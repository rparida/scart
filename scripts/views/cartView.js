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
				if(this.collection.length > 0){
						$(this.el).find("tr:gt(0)").remove();
						var totalPrice = 0;
							this.collection.each(function(model){
								
								totalPrice = totalPrice + this.collection.getTotalprice(model); 
								
								var cartemplate = this.cart_items_template(model.toJSON());
								$(this.el).find("tbody:last").append(cartemplate);
								
						}, this);
						
						var tottemplate = this.cart_tot_template({"total" : totalPrice.toFixed(2)});
						$(this.el).find("tbody:last").append(tottemplate);
									
				}
									
			},
			updCart : function(e){
       				var selEl = $(e.currentTarget);
  					var id = selEl.attr("id").substr(4);
  					var qty = $("#"+selEl.attr("id")).val();
  				
	  				if(isNaN(qty)){
	  					
	  					alert("Please enter valid quantity ");
	  					return;
	  				}
       				this.collection.updateItem(id, qty, this );
       				
       			},
				complete : function(){
					this.collection.syncCollection();
					this.render();
					alert("Updated Succesfully.");
				}
	});
	
	return CartView;
	
});