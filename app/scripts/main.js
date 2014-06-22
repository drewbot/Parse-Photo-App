console.log('main');

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


