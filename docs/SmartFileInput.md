`SmartFileInput` (component)
============================

SmartFileInput is the form component for input file box.

A working example is:
```
 var React = require('react');
 var SmartFileInput = require('SmartFileInput');
 var SmartInputSample = React.createClass({
	doAction: function (e) {
		alert(e);
	},
	render: function () {
		return (
				<SmartFileInput onChange={this.doAction} label="Sample label" elementId = 'fileInput' mandatory=false multiSelect = true className="containerClass" theme="grey"/>
		);
	}
);
React.render(<SmartFileInputSample/>, document.getElementById('divContainer'));
```

SmartFileInput passes the file chosen to the parent via the onChange function. This function is called whenever there is some change in the value of the inputbox.

It also tells if there is an error in filling up the input box. This would happen when no file is selected if manadatory tag is set true.
The error is displayed only when clickedSubmit is set to true. Otherwise, the error would not be displayed.

handleOnChange is of the form:
function(result)

result is of the form:
```
{
	elementId: elementId    // {String} the unique key of the component
	value: value  // {String} the current value of the input box.
	statusType: "SUCCESS" //{String} SUCCESS or FAILURW
	type: 'SmartFileInput' //tyoe is always smartInput for SmartInput. It is basically the name of the component.
}
```

Props
-----

### `className`

the options css classnames that can be added to the input file box container to change its style,

type: `string`


### `clickedSubmit`

true if the form button has been clicked, which tells the input file box to render the error if true. If this is false, error would not be rendered. This is to ensure that the form tells that the components have not been filled up properly only when the submit button(or any other button) is clicked. By default, it is false.

type: `bool`
defaultValue: `false`


### `elementId`

the unique key of the input file box. It is assumed that each form component will have a unique elementId.

type: `string`


### `label`

the label of the input box

type: `string`


### `mandatory`

true if file is required to be selected, false otherwise

type: `bool`
defaultValue: `false`


### `multiSelect`

true if it is allowed to select multiple files.

type: `bool`
defaultValue: `false`


### `onChange`

send the updated value to the parent on every change. function(result)

type: `func`


### `regex`

defaultValue: `""`


### `theme`

The color we want to give to the button. Example : theme="red" if we want to add a red color to the button.

type: `string`


### `type`

The type which is 'SmartFileInput'

type: `enum('SmartFileInput')`

