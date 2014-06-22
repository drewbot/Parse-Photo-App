console.log('router');

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
  		$('.detail-view-append').hide();
  		detailView.remove();
    }
  	
  },

  // Instantiate a new DetailView
  renderDetailView: function () {
  	$('.detail-view-append').show();
  }
 
});

var appRouter = new AppRouter;

Parse.history.start({pushstate: true});

// I removed the detail-view instantiation here because it didn't know the model yet
// The model is defined in CardView.showDetails
// The downfall is that when you just go to #details:id 
// without clicking an image to get to it that image id doesn't populate