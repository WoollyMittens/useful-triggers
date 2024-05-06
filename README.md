# triggers.js: Animations Triggered by Scrolling.

*DEPRICATION WARNING: the functionality in this script has been superceeded / trivialised by updated web standards.*

Elements that change their appearance when scrolled into view.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="css/triggers.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="lib/positions.js"></script>
<script src="js/triggers.js"></script>
```

Or use [Require.js](https://requirejs.org/).

```js
requirejs([
	'lib/positions.js',
	'js/triggers.js'
], function(positions, Triggers) {
	...
});
```

Or use imported as a component in existing projects.

```js
@import {positions = require('lib/positions.js";
@import {Triggers} from "js/triggers.js";
```

## How to start the script

```javascript
var triggers = new Triggers({
	// the container of the scrolling content
	"element" : window,
	// continue monitoring elements after they go off screen
	"offscreen" : true,
	// optional navigation bar
	"header" : "body > section > header",
	"nav" : "body > section > nav",
	// define the animations to be triggered
	"article#ipsum" : [{
		"element" : ".notification",
		"class" : "revealed",
		"delay" : 0, // ms
		"from" : 0, // %
		"to" : 100, // %
		"overscan" : false // until 100% off screen
	}]
});
```

**element : {DOM Element}** - The DOM element with the scroll bar.

**offscreen : {Boolean}** - Continue monitoring elements after they go off screen (slower).

**header : {CSS Rule}** - The optional header bar of the page.

**nav : {CSS Rule}** - The optional floating navigation bar underneath the header bar.

**article#ipsum : {String}** - The element which' position is used as a trigger.

+ *element : {CSS Rule}* - The element affected by the trigger.
+ *class: {ClassName}* - The class name to add to the affected element.
+ *delay: {Integer}* - A delay after which the effect takes place.
+ *from: {Percentage}* - The percentage from the top of the screen at which the effect is triggered.
+ *to: {Percentage}* - The percentage from the top of the screen at which the effect is cancelled.
+ *overscan: {Boolean}* - Whether the element has to leave the top of the screen completely for 100%.

## How to control the script

### Jump

```javascript
triggers.jump(hash);
```

Scrolls the page to the given anchor.

**hash : {string}** - The id of the destination element on the page. e.g. Use #dolor to jump to <div id="dolor">

## License

This work is licensed under a [MIT License](https://opensource.org/licenses/MIT). The latest version of this and other scripts by the same author can be found on [Github](https://github.com/WoollyMittens).
