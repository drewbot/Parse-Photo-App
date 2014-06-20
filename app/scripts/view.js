console.log('view');

// Card view is instantiated as a single post
var CardView = Parse.View.extend({
	// Cache the template function for a single item.
    template: _.template($('.card-view-instance').html()),

    // The DOM events specific to an item.
    events: {
      "click .something"              : "someFunction",
      
    },

    
    initialize: function() {
		// when a thumbnail view instance is called it is told to listen to changes to the model
		this.listenTo(this.model, 'change', this.render);
		// Append changes to the this.el to the thumbnail container
		$('.card-view-container').append(this.el);
		// Render the changes by calling the render funtion below
		this.render();
    },

    render: function() {

    },

});

// DetailView is instantiated with a corresponding CardView instance upon a route click
var DetailView = Parse.View.extend({
	// Cache the template function for a single item.
    template: _.template($('.detail-view-instance').html()),

    // The DOM events specific to an item.
    // save will call the updateModel function and new will add a new photo to the model
	events: {
	"click .save-button": "updateModel",
	"click .new-button": "createPhoto"
	},
	// When a view instance is created listen to the PostCollection instance...
	// .. and add a function passing the 'photo' argument...

    
	initialize: function(){
		this.listenTo(posts, 'add', function(card){
		  // ... create a new instance of ThumbnailView....
		  //...while passing in an argument of model and applying the photo argument from above 
		  new CardView({model: card});
		});
		// view instance will listen to it's model and run the render below on any changes to this.el (I think)

		this.listenTo(this.model, 'change', this.render);
		// append this.el to the spcified div
		$('.detail-view-container').append(this.el);
		// render the changes
		this.render();
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

	createPhoto: function(){

		var photoInstance = new Photo();

		this.model = photoInstance;

		this.$el.find('input').val('');
		this.$el.find('img').attr('src',' http://placehold.it/350x400');

	}

});


// AppView is instantiated upon document load
// Instantiates the CardView
var AppView = Parse.View.extend({
	// Cache the template function for a single item.
    template: _.template($('.app-view-instance').html()),

    // The DOM events specific to an item.
    events: {
      "click .something"              : "someFunction",
      
    },

    initialize: function() {
		console.log('AppRouter was just created!');
	
		this.fetchPromise = posts.fetch();

		this.fetchPromise.done(function(){
		  photos.each(function(card){

		    new CardView({model: card});

		  });

		});
    },

    render: function() {

    },

});