`SmartButton` (component)
=========================

SmartButton is a component that is a wrapper over a button, which tells the parent the key of the button clicked.constructor

Working example:
```
 var React = require('react');
 var SmartButton = require('SmartButton');
 var SmartButtonSample = React.createClass({
	doAction: function (e) {
		alert(e);
	},
	render: function () {
		return (
				<SmartButton onClick={this.doAction} label="Button" emelentId = 'btn' value="Sample Value" mandatory=false regex="" className="containerClass" placeholder="type..."/>
		);
	}
);
React.render(<SmartInputSample/>, document.getElementById('divContainer'));
```

onClick is of the form:

```
function(elementId, event);
```

Props
-----

### `className`

the className, you want to give the container of button.

type: `string`


### `elementId`

the unique elementId of the button

type: `string`


### `label`

the text to be displayed inside the button

type: `string`
defaultValue: `""`


### `onClick`

this function passes the key of the clicked button to the parent along the the entire event. the function id of the form: function()(key, event)

type: `func`


### `theme`

The color we want to give to the button. Example : theme="red" if we want to add a red color to the button.

type: `string`
defaultValue: `""`


### `type`

'SmartButton'

type: `enum('SmartButton')`

