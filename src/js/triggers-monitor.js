// extend the prototype with the scroll monitoring component
Triggers.prototype.Monitor = function (context) {

	// PROPERTIES

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

	this.init(context);
};
