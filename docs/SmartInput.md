`SmartInput` (component)
========================

SmartInput is the form component for input box.

A working example is:
```
 var React = require('react');
 var SmartInput = require('SmartInput');
 var SmartInputSample = React.createClass({
	doAction: function (e) {
		alert(e);
	},
	render: function () {
		return (
				<SmartInput onChange={this.doAction} label="Sample label" emelemtId = 'input' value="Sample Value" mandatory=false regex="" className="containerClass" placeholder="type..."/>
		);
	}
);
React.render(<SmartInputSample/>, document.getElementById('divContainer'));
```

SmartInput passes the data entered in the input box to the parent via the onChange function. This function is called whenever there is some change in the value of the inputbox.

It also tells if there is an error in filling up the input box. This would happen when no data is entered if manadatory tag is set true or if the value set does not meet the regular expression satisfied.
The error is displayed only when clickedSubmit is set to true. Otherwise, the error would not be displayed.

handleOnChange is of the form:
function(result)

result is of the form:
```
{
	elementId: elementId    // {String} the unique key of the component
	value: value  // {String} the current value of the input box.
	statusType: "SUCCESS" //{String} SUCCESS or FAILURW
	type: 'SmartInput' //tyoe is always smartInput for SmartInput. It is basically the name of the component.
}
```

Props
-----

### `className`

the options css classnames that can be added to the input box container to change its style,

type: `string`


### `clickedSubmit`

true if the form button has been clicked, which tells the inputbox to render the error if true. If this is false, error would not be rendered. This is to ensure that the form tells that the components have not been filled up properly only when the submit button(or any other button) is clicked. By default, it is false.

type: `func`
defaultValue: `false`


### `elementId`

the unique key of the input box. It is assumed that each form component will have a unique elementId.

type: `string`


### `label`

the label of the input box

type: `string`


### `mandatory`

true if value is required in the input box, false otherwise

type: `bool`


### `multiselect`

defaultValue: `false`


### `onChange`

send the updated value to the parent on every change. function(result)

type: `func`


### `placeholder`

the placeholder that input box might have.

type: `string`
defaultValue: `""`


### `regex`

the regular expression passes as a string that the entered value in the input box must satisty.

type: `string`
defaultValue: `""`


### `type`

The type which is 'SmartInput'

type: `enum('SmartInput')`


### `value`

the default value that the input will have

type: `string`
defaultValue: `""`

