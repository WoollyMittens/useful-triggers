/*
	Source:
	van Creij, Maurice (2018). "triggers.js: Elements that change their appearance when scrolled into view.", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var Triggers = function (config) {
	// default config
	this.config = {
		// the container of the scrolling content
		"element" : window,
		// continue monitoring elements after they go off screen
		"offscreen" : true,
		// lookup table for the element
		"elements" : {}
	};
	// store the config
	for (var key in config) { this.config[key] = config[key]; }
	// bind the components
	this.monitor = new this.Monitor(this);
	this.navigation = new this.Navigation(this);
	// expose the public functions
	this.jump = this.navigation.onNavigated.bind(this.navigation);
};

// return as a require.js module
if (typeof define != 'undefined') define([], function () { return Triggers });
if (typeof module != 'undefined') module.exports = Triggers;
