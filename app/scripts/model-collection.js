console.log('model-collection');

Parse.initialize("4FnGMdPeycL11B4OpfMcbfdKiYf9CWklxQk2w0sx", "uEv4m6Z0XNPckrRlIbtyreqqFqQHVQrChROvIC3Y");

var PostModel = Parse.Object.extend({
	className: "drewbot",
	idAttribute: '_id',

	defaults: {
		"image"		: "http://placehold.it/300x300",
		"caption"	: "no caption"
	}

});

var PostCollection = Parse.Collection.extend({

	model: PostModel

});