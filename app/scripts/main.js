console.log('main');

// Upload a file to the database
// store the first item in the file upload array
var fileUploadControl = $("#profilePhotoFileUpload")[0];
// if a file exists store it in a variable and give it a generic title 
// (important to keep generic title)
if (fileUploadControl.files.length > 0) {
  var file = fileUploadControl.files[0];
  var name = "photo.jpg";
  // instantiate a Parse.File and pass in the file and name
  var parseFile = new Parse.File(name, file);
};
// Save to Parse
parseFile.save().then(function() {
  // The file has been saved to Parse.
}, function(error) {
  // The file either could not be read, or could not be saved to Parse.
});

// Finally, after the save completes, 
// you can associate a Parse.File with a Parse.Object just like any other piece of data:
//////////// Example Code /////////////////
var jobApplication = new Parse.Object("JobApplication");
jobApplication.set("applicantName", "Joe Smith");
jobApplication.set("applicantResumeFile", parseFile);
jobApplication.save();