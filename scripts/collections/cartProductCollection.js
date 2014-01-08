define([
  'jquery',
  'underscore',
  'backbone',
  'localstorage',
  'models/productsModel'
], function($, _, Backbone, localstorage, Product){
	
	var CartProductCollection = Backbone.Collection.extend({
		model: Product,
		localStorage: new Backbone.LocalStorage("cartSession"),
		getById: function(id){
       		return this.filter(function(val) {
          			return val.get("id") === id;
        	});         
	    }, 
	    getTotalprice: function(model){
       		return (model.get("price") * model.get("quantity"));   
	    },       
	    syncCollection: function(){
	    	this.fetch();
	    },    
	    addItem : function(selItem){
			var id = selItem.get("id");
			this.syncCollection();
			
				
			var itemModel = this.findWhere({ "id": parseInt(id) });
			
			//if item already added, then on next time increase the qty. 
			if(typeof itemModel !== 'undefined'){
				
				var index = this.indexOf(cartProductCollection.get(parseInt(id)));
				
				var qty = this.models[index].get("quantity");
				this.models[index].set({"quantity" : parseInt(qty)+1});  // update the quatity 
				
				var price = this.models[index].get("price"); 
				this.models[index].set({ "total" : (parseInt(this.models[index].get("quantity")) * parseFloat(price))}); // update the total
				
				this.models[index].save();
				
			}else{
			//if item added for the first time	
				
			//add the total price to the model
				selItem.set({ "total" : (parseInt(selItem.get("quantity")) * parseFloat(selItem.get("price")))});
									
				var citem = JSON.parse(JSON.stringify(selItem));
				this.create(citem);
			}  
			 	
			this.syncCollection();
						
	    },
	    // Remove Item from cart
	    removeItem : function(id){
				this.syncCollection();
				var index = this.indexOf(this.get(parseInt(id)));
				
				if(index != -1){
					this.at(index).destroy();							
				}
	    },
	    //Update item quantity in the cart
	    updateItem : function(selEl, qty, obj){
				
	    		var id = $(selEl).attr("id").substr(4);
				var itemModel = cartProductCollection.findWhere({ "id": parseInt(id) });
  				itemModel.save(
  							{ "quantity": qty,
  								"total" : (qty * itemModel.get("price"))
  							},
  							{
		        		 			success : function(model){
		        		 				obj.complete();			    	
		        		 			},
		        		 			error: function(model, response) {
		            					console.log(model);
		        					},
		      						wait: true,
									synchronized: true 
	         				});
       	},
	     // Remove all Items from cart
	    clearCart : function(){
		    	
		    	if(this.localStorage){
		               this.localStorage._clear();
		        }
		        this.syncCollection();
	    } 
    
    //end	
});
	
	var cartProductCollection = new CartProductCollection();	
	return cartProductCollection;
    
});