console.log('router');

var posts = new PostCollection();

var AppRouter = Parse.Router.extend({
 
  routes: {

    // Instantiate DetailView and include the image id
    ""                          : "renderAppView",
    "detail/:id"                : "renderDetailView"
  },
 
  initialize: function () {
    console.log('AppRouter was just created!');
	
	this.fetchPromise = posts.fetch();

	this.fetchPromise.done(function(){
	  posts.each(function(card){

	    new AppView({model: card});

	  });

	});

  },

  // Instantiate a new AppView
  renderAppView: function (id) {
  	this.fetchPromise.done(function(){
	    appViewInstance = new DetailView({ model: posts.get(id) });
	});
  	
  },

  // Instantiate a new DetailView
  renderDetailView: function (id) {
  	this.fetchPromise.done(function(){
	    detailViewInstance = new DetailView({ model: photos.get(id) });
	});
  	
  }
 
});

var app = new AppRouter;

Parse.history.start({pushstate: true});