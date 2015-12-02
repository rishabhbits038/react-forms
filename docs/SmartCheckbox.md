`SmartCheckbox` (component)
===========================

SmarCheckbox is a component that is a wrapper over a checkbox.

Working example:
```
 var React = require('react');
 var SmartCheckBox = require('SmartCheckBox');
 var SmartCheckBoxSample = React.createClass({
	doAction: function (e) {
		alert(e);
	},
	render: function () {
		return (
				<SmartCheckBox onChange={this.doAction} value=true label="Button" elementId = 'box' className="containerClass" onChange = this.doAction/>
		);
	}
);
React.render(<SmartCheckBoxSample/>, document.getElementById('divContainer'));
```

onChange is of the form:
```
function(data)
```
data is of the form:
```
{
	elementId: elementId    // {String} the unique key of the component
	value: value  // {String} the current value of the CheckBox.
	statusType: "SUCCESS" //{String} SUCCESS or FAILURE
	type: 'SmartCheckbox' //type is always 'SmartCheckbox' for SmartCheckbox. It is basically the name of the component.
}
```

Props
-----

### `className`

the options css classnames that can be added to the check box container to change its style,

type: `string`


### `elementId`

the unique key of the check box. It is assumed that each form component will have a unique elementId.

type: `string`


### `label`

the label of the input box

type: `string`
defaultValue: `""`


### `onChange`

send the updated value to the parent on every change. function(result)

type: `func`


### `type`

The type which is 'SmartCheckbox'

type: `enum('SmartCheckbox')`


### `value`

the default value that the checkbox will have

type: `bool`

