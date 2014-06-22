console.log('view');

// Card view is instantiated as a single post
var CardView = Parse.View.extend({
	// Cache the template function for a single item.
    template: _.template($('.card-view-instance').text()),

    // The DOM events specific to an item.
    events: {
      "click .details"	: "showDetails",
      
    },

    
    initialize: function() {
		$('.card-view-container').append(this.el);
		console.log('cardview model is', this.model )
		this.render();
    },

    render: function() {
    	// pass current model attributes, pulled from the template, through the html method attached to this.$el
		var renderedTemplate = this.template(this.model);
		this.$el.html(renderedTemplate);
		return this;
    },

    showDetails: function () {
		details = new DetailView({model: this.model});
		$('.detail-view-container').show();
	}

});

// DetailView is instantiated with a corresponding CardView instance upon a route click
var DetailView = Parse.View.extend({
	// Cache the template function for a single item.
    template: _.template($('.detail-view-instance').html()),

    // The DOM events specific to an item.
    // save will call the updateModel function and new will add a new photo to the model
	events: {
	"click .save-button": "updateModel"
	},
	// When a view instance is created listen to the PostCollection instance...
	// .. and add a function passing the 'photo' argument...

    
	initialize: function(){
	
	},

	render: function(){
		// pass current model attributes, pulled from the template, through the html method attached to this.$el
		var renderedTemplate = this.template(this.model.attributes);
		this.$el.html(renderedTemplate);
		return this;
	},

	updateModel: function(){

		var that = this;

		this.model.set({
		  url:      this.$el.find('.url-input').val(),
		  caption:  this.$el.find('.caption-input').val()
		});

		photos.add(this.model);

		this.model.save().done(function(){
		  that.$el.find('.status').html('Saved!');
		});
	},

});


// AppView is instantiated upon document load
var AppView = Parse.View.extend({

	initialize: function () {
		this.collection = new PostCollection();
		this.collection.on('add', this.addPost);
		this.collection.fetch({add:true});
	},

	addPost: function (model) {
		console.log('hey')
		new CardView({model: model});
	}

});

