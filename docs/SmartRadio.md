`SmartRadio` (component)
========================

SmartRadio is the form component for radio box.

A working example is:
```
 var React = require('react');
 var SmartRadio = require('SmartRadio');
 var SmartRadioSample = React.createClass({
	doAction: function (e) {
		alert(e);
	},
	render: function () {
		return (
				<SmartRadio onChange={this.doAction} selectedIndex=2 label="Sample label" elementId = 'radio' value=["one", "two", "three"] className="containerClass" placeholder="type..."/>
		);
	}
);
React.render(<SmartRadioSample/>, document.getElementById('divContainer'));
```

SmartRadio passes the value selectesto the parent via the onChange function. This function is called whenever there is change in the radio button selected.

handleOnChange is of the form:
function(result)

result is of the form:
```
{
	elementId: elementId    // {String} the unique key of the component
	value: value  // {String} the current value of the input box.
	statusType: "SUCCESS" //{String} SUCCESS or FAILURE
	type: 'SmarRadio' //tyoe is always SmarRadio for SmarRadio. It is basically the name of the component.
}
```

Props
-----

### `className`

the options css classnames that can be added to the radio button box container to change its style,

type: `string`


### `elementId`

the unique key of the radio button box. It is assumed that each form component will have a unique elementId.

type: `string`


### `label`

the label of the radio button box.

type: `string`
defaultValue: `""`


### `onChange`

send the updated value to the parent on every change. function(result)

type: `func`


### `selectedIndex`

the index that should be selected by default

type: `number`
defaultValue: `0`


### `type`

The type which is 'SmartRadio'

type: `enum('SmartRadio')`


### `value`

the set of possible values in the radio button box .

type: `union(arrayOf|arrayOf)`

