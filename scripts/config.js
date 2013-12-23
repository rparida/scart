requirejs.config({
		"baseUrl": "scripts", 
		"shim":{
				"underscore":{
						deps:[],
						exports: "_"
				
				},
				"backbone":{
						deps:["jquery", "underscore"],
						exports: "Backbone"
				},
				"text":{
						deps:["jquery"],
						exports: "text"
				},
				"handlebars":{
						deps:["jquery"],
						exports: "handlebars"
				}
				
		},
		"paths": {
				"jquery": "./libs/jquery-2.0.3",
				"underscore": "./libs/underscore",
				"backbone": "./libs/backbone",
				"localstorage": "./libs/backbone.localStorage",
				"text": "./libs/text",
				"handlebars": "./libs/handlebars-v1.1.2"
			  }    
});