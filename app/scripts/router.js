console.log('router');

var posts = new PostCollection();

var appView;

var detailView;

var AppRouter = Parse.Router.extend({
 
  routes: {

    // Instantiate DetailView and include the image id
    ""                          : "renderAppView",
    "detail/:id"                : "renderDetailView"
  },
 
  initialize: function () {
    console.log('AppRouter was just created!');

  },

  // Instantiate a new AppView
  renderAppView: function () {
  	if (!appView) {
  		appView = new AppView();
  	};

  	if (detailView) {
  		detailView.remove();
  	}
  	
  },

  // Instantiate a new DetailView
  renderDetailView: function (id) {
  	if (!detailView) {
	  	detailView = new DetailView({model: this.model});
		$('.detail-view-container').show();
	};
  }
 
});

var appRouter = new AppRouter;

Parse.history.start({pushstate: true});