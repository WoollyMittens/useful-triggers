// extend the prototype with the navigation bar
Triggers.prototype.Navigation = function (context) {

	// PROPERTIES

	this.context = null;
	this.config = {};
	this.previous = -1;

	// METHODS

	this.init = function (context) {
		// store the context
		this.context = context;
		this.config = context.config;
		// fetch the elements that go with the navigation bar
		this.fetchElements();
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
		// if the hash is invalid give up
		if (!/^#/.test(hash)) { return true; }
		// stop the actual click
		if (evt) { evt.preventDefault(); }
		// cancel any previous scrolling
		clearInterval(this.scrollInterval);
		// get the involved elements
		var _this = this,
			target = document.querySelector(hash),
			navigation = document.querySelector(this.config.nav),
			scroller = this.config.element;
		// scroll to the required position
		this.scrollInterval = setInterval(function () {
			// find the target position
			var destination = target.offsetTop - navigation.offsetHeight;
			var position = positions.document(scroller);
			//console.log('navigate to:', destination, 'from', position.y);
			// check if the scrolling has been stuck
			if (position.y === _this.previous) { _this.stuck += 1; }
			// if the position is close enough to the destination or stuck
			if (Math.abs(destination - position.y) < 10 || _this.stuck > 2) {
				// clear the current position
				_this.stuck = -1;
				_this.previous = -1;
				// cancel the interval
				clearInterval(_this.scrollInterval);
				// set the hash
				window.location.hash = hash;
			} else {
				// store the current position
				_this.previous = position.y;
				// jump closer to the destination
				scroller.scrollTo(position.x, (destination - position.y) / 10 + position.y);
			}
		}, 1);
		// return false for use in event handlers
		return false;
	};

	this.init(context);
};
