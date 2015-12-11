# useful.triggers.js: Animations Triggered by Scrolling.

Elements that change their appearance when scrolled into view.

Try the <a href="http://www.woollymittens.nl/useful/default.php?url=useful-triggers">demo</a>.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="./css/useful-triggers.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="./js/useful-triggers.js"></script>
```

To enable the use of HTML5 tags in Internet Explorer 8 and lower, include *html5.js*.

```html
<!--[if lte IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
```

## How to start the script

```javascript
var triggers = new useful.Triggers().init({
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

## How to build the script

This project uses node.js from http://nodejs.org/

This project uses gulp.js from http://gulpjs.com/

The following commands are available for development:
+ `npm install` - Installs the prerequisites.
+ `gulp import` - Re-imports libraries from supporting projects to `./src/libs/` if available under the same folder tree.
+ `gulp dev` - Builds the project for development purposes.
+ `gulp prod` - Builds the project for deployment purposes.
+ `gulp watch` - Continuously recompiles updated files during development sessions.
+ `gulp serve` - Serves the project on a temporary web server at http://localhost:8000/ .

## License

This work is licensed under a Creative Commons Attribution 3.0 Unported License. The latest version of this and other scripts by the same author can be found at http://www.woollymittens.nl/