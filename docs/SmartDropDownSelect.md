`SmartDropDownSelect` (component)
=================================

SmartDropDownSelect is the form component for DropDown.

A working example is:
```
 var React = require('react');
 var SmartDropDownSelect = require('SmartDropDownSelect');
 var SmartDropDownSelectSample = React.createClass({
	doAction: function (e) {
		alert(e);
	},
	render: function () {
		return (
				<SmartDropDownSelect onChange={this.doAction} label="Sample label" elementId = 'drpdn' value=["a","b"] mandatory=false multiSelect =true className="containerClass"/>
		);
	}
);
React.render(<SmartDropDownSelectSample/>, document.getElementById('divContainer'));
```
SmartDropDownSelect passes the values selected to the parent via the onChange function. This function is called whenever there is some change in the values selected.

It also tells if there is an error in filling up the DropDown. This would happen when no data is entered if manadatory tag is set true.
The error is displayed only when clickedSubmit is set to true. Otherwise, the error would not be displayed.

handleOnChange is of the form:
```
function(result)
```

result is of the form:

```
{
	elementId: elementId    // {String} the unique key of the component
	value: value  // {String} the current values selected in the dropdown.
	statusType: "SUCCESS" //{String} SUCCESS or FAILURE
	type: 'SmartDropDownSelect' //type is always SmartDropDownSelect for SmartDropDownSelect. It is basically the name of the component.
}
```

Props
-----

### `className`

the options css classnames that can be added to the Dropdown container to change its style,

type: `string`


### `clickedSubmit`

true if the form button has been clicked, which tells the inputbox to render the error if true. If this is false, error would not be rendered. This is to ensure that the form tells that the components have not been filled up properly only when the submit button(or any other button) is clicked. By default, it is false.

type: `func`


### `elementId`

the unique key of the Dropdown. It is assumed that each form component will have a unique elementId.

type: `string`


### `label`

the label of the Dropdown.

type: `string`


### `mandatory`

true if value is required in the Dropdown, false otherwise

type: `bool`


### `multiSelect`

true is multiple elements are to be selected. false otherwise.

type: `bool`


### `multiselect`

defaultValue: `false`


### `onChange`

send the updated value, along eith the key to the parent on every change.  function(result)

type: `func`


### `type`

The type which is 'SmartDropDownSelect'

type: `enum('SmartDropDownSelect')`


### `value`

the set of possible values in the dropdown .

type: `union(arrayOf|arrayOf)`
defaultValue: `[]`

