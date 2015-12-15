/*
	Source:
	van Creij, Maurice (2014). "useful.triggers.js: Elements that change their appearance when scrolled into view.", version 20151214, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// create the global object if needed
var useful = useful || {};
useful.Triggers = useful.Triggers || function () {};

// extend the prototype with the init function
useful.Triggers.prototype.init = function (config) {
	// turn on strict mode
	"use strict";
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
	for (var name in config) { this.config[name] = config[name]; }
	// bind the components
	this.monitor = new this.Monitor().init(this);
	this.navigation = new this.Navigation().init(this);
	// expose the public functions
	this.jump = this.navigation.onNavigated.bind(this.navigation);
	// return the object
	return this;
};

// extend the prototype with the scroll monitoring component
useful.Triggers.prototype.Monitor = function () {

	// PROPERTIES

	"use strict";
	this.context = null;
	this.config = {};

	// METHODS

	this.init = function (context) {
		// store the context
		this.context = context;
		this.config = context.config;
		// set the event handlers
		this.config.element.addEventListener('scroll', this.onUpdate.bind(this), false);
		this.config.element.addEventListener('resize', this.onUpdate.bind(this), false);
		// fetch the elements of all the configured triggers
		this.fetchElements();
		// redraw
		this.onUpdate({'target': this.element});
		// return the object
		return this;
	};

	this.fetchElements = function () {
		var reactions, a, b;
		// for all triggers
		for (var name in this.config) {
			reactions = this.config[name];
			if (Array.isArray(reactions)) {
				// remember the dom element that goes with it
				this.config.elements[name] = document.querySelector(name);
				// for all reactions
				for (a = 0, b = reactions.length; a < b; a += 1) {
					// store the accompanying dom element
					reactions[a].element = document.querySelector(reactions[a].element);
				}
			}
		}
	};

	this.addClassName = function (element, className) {
		// apply the classname if not already there
		if (element.className.indexOf(className) < 0) {
			element.className += ' ' + className;
		}
	};

	this.removeClassName = function (element, className) {
		// remove the classname if there
		if (element.className.indexOf(className) > -1) {
			element.className = element.className.replace(' ' + className, '');
		}
	};

	// EVENTS

	this.onUpdate = function (evt) {
		// get the current scroll position
		var a, b, reaction, reactions, onscreen, offscreen, progress, allowOffscreen = this.config.offscreen;
		var element, elementTop, elementBottom, elementHeight, elementProgress, elements = this.config.elements;
		var viewTop = useful.positions.document(evt.target).y,
			viewBottom = viewTop + useful.positions.window(evt.target).y,
			viewHeight = viewBottom - viewTop;
		// for all configured triggers
		for (var name in elements) {
			element = elements[name];
			elementTop = element.offsetTop;
			elementHeight = element.offsetHeight;
			elementBottom = elementTop + elementHeight;
			onscreen = (viewBottom - elementTop) / (elementHeight) * 100;
			offscreen = (viewBottom - elementTop) / (elementHeight + viewHeight) * 100;
			// if the triger is in view
			if (allowOffscreen || viewBottom > elementTop && viewTop < elementBottom) {
				// for all reactions
				reactions = this.config[name];
				for (a = 0, b = reactions.length; a < b; a += 1) {
					// if the trigger meets the conditions of the reaction
					reaction = reactions[a];
					progress = (reaction.overscan) ? offscreen : onscreen;
					if (
						(reaction.from === null || progress > reaction.from) &&
						(reaction.to === null || progress < reaction.to)
					) {
						// apply the classname if not already there
						setTimeout(this.addClassName.bind(this, reaction.element, reaction.class), reaction.delay);
					// otherwise
					} else {
						// remove the classname
						setTimeout(this.removeClassName.bind(this, reaction.element, reaction.class), reaction.delay);
					}
				}
			}
		}
	};

};

// extend the prototype with the navigation bar
useful.Triggers.prototype.Navigation = function () {

	// PROPERTIES

	"use strict";
	this.context = null;
	this.config = {};

	// METHODS

	this.init = function (context) {
		// store the context
		this.context = context;
		this.config = context.config;
		// fetch the elements that go with the navigation bar
		this.fetchElements();
		// return the object
		return this;
	};

	this.fetchElements = function () {
		var a, b, hash;
		// if a header navigation was defined
		if (this.config.header && this.config.nav) {
			// fetch the elements
			var header = this.config.header;
			var nav = this.config.nav;
			// add default navbar behaviour
			this.config.elements[header] = document.querySelector(header);
			this.config[header] = [{
				"element" : document.querySelector(nav),
				"class" : "nav-fixed",
				"delay" : 0,
				"from" : 100,
				"to" : null,
				"overscan" : true
			}];
			// for each link
			var links = document.querySelectorAll(this.config.nav + ' a');
			for (a = 0, b = links.length; a < b; a += 1) {
				// add a trigger
				hash = links[a].getAttribute('href');
				this.config.elements[hash] = document.querySelector(hash);
				this.config[hash] = [{
					"element" : links[a],
          "class" : "nav-active",
          "delay" : 0,
					"from" : 0,
					"to" : 100,
					"overscan" : false
				}];
				// add an event handler
				links[a].addEventListener('click', this.onNavigated.bind(this, hash));
			}
		}
	};

	// EVENTS

	this.onNavigated = function (hash, evt) {
		// stop the actual click
		if (evt) { evt.preventDefault(); }
		// cancel any previous scrolling
		clearInterval(this.scrollInterval);
		// scroll to the required position
		var _this = this,
			target = document.querySelector(hash),
			navigation = document.querySelector(this.config.nav),
			scroller = this.config.element;
		this.scrollInterval = setInterval(function () {
			// find the target position
			var destination = target.offsetTop - navigation.offsetHeight;
			var position = useful.positions.document(scroller);
			// if the position is close enough to the destination
			if (Math.abs(destination - position.y) < 10) {
				// cancel the interval
				clearInterval(_this.scrollInterval);
			} else {
				// jump closer to the destination
				scroller.scrollTo(position.x, (destination - position.y) / 10 + position.y);
			}
		}, 1);
		// return false for use in event handlers
		return false;
	};

};

// return as a require.js module
if (typeof module !== 'undefined') {
	exports = module.exports = useful.Triggers;
}
