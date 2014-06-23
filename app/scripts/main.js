console.log('main');

$('.new').click(function(){
	$('.add-new-container').toggleClass('show-new');
});

/////////// Upload a file to the database/////////////////////////


// Save to Parse
$('.save-file').click(function(){
	var caption = $('.caption-input').val();
	// store the first item in the file upload array
	var fileUploadControl = $(".image-upload")[0];

	// if a file exists store it in a variable and give it a generic title 
	// (important to keep generic title)
	if (fileUploadControl.files.length > 0) {
	  var file = fileUploadControl.files[0];
	  var name = "photo.jpg";

	  // instantiate a Parse.File and pass in the file and name
	  var parseFile = new Parse.File(name, file);

	  // Save
	  parseFile.save().done(function() {
		// The file has been saved to Parse.
		console.log('Save successful!');
		// Finally, after the save completes, 
	 	// you can associate a Parse.File with a Parse.Object just like any other piece of data:
		//Instantiate Post
		var postmodel = new PostModel();
		postmodel.set({
			"image"		: parseFile.url(),
			"imageFile"	: parseFile,
			"caption"	: caption
		});

		//Save model instance - wait for it to get done saving then add the model to the collection
		postmodel.save().done(function(){
			appView.collection.add(postmodel);
		});

	  }, function(error) {
		// The file either could not be read, or could not be saved to Parse.
		console.log('Fail');
	  });

	};

})

// var canvas = new fabric.Canvas('c');
// var imgElement = $('detail-image').attr( "src" );
// var imgInstance = fabric.Image.fromURL(imgElement, function(oImg) {
//   canvas.add(oImg);
// });

/////
var canvas = new fabric.Canvas('c');
////////
var text = new fabric.Text('hello world', { left: 100, top: 100 });
canvas.add(text);
///////
// var imgElement = document.getElementById('detail-image');
// var imgInstance = new fabric.Image(imgElement, {
//   left: 100,
//   top: 100,
//   angle: 30,
//   opacity: 0.85
// });
// canvas.add(imgInstance);
/////////

// fabric.Image.fromURL('http://static.tumblr.com/23b2d323b41fe20cfd3ee8470e6e8c23/fmfoldl/p4zmreej3/tumblr_static_1363794435702.png', function(img) {
//   img.scale(.4)
//   img.top = 150,
//   img.left = 70,
//   canvas.add(img);
// });

	////

// fabric.Image.fromURL('pug.jpg', function(img) {

//   // add filter
//   img.filters.push(new fabric.Image.filters.Grayscale());

//   // apply filters and re-render canvas when done
//   img.applyFilters(canvas.renderAll.bind(canvas));

//   // add image onto canvas
//   canvas.add(img);
// });


