`SmartForm` (component)
=======================

SmartForm is a wrapper over form components like input box, dropdown, file uploader, checkbox that enables creation of a form just from a json.
The smartForm takes as input the details of the form components and returns the complete filled up form details(on button click) to the parent.
SmartForm stores the filled up values of all its components in its state. These values are updated on change of any component. If any of the button is pressed, the onClick function is called which returns the filled up form details to the parent.

#Working example:
```
var React = require('react');
var SmartForm = require('SmartForm');
 var FormSample = React.createClass({
	doAction: function (e) {
		alert("Button Clicked " + e);
	},
	render: function () {
		var formData = [
			{
				"label": "Brands",
				"elementId": "Brands",
				"type": "SmartDropDownSelect",
				"value": ["Nike","Puma","Arrow"],
				"mandatory": false,
				"multiSelect": false,
				"regex": ""
			},
			{
				"label": "PSC Label",
				"elementId": "PSCLabel",
				"type": "SmartInput",
				"value": "",
				"mandatory": true,
				"multiSelect": false,
				"regex": "",
				"containerClass": "pscLabel"
			},
			{
				"label": "Submit",
				"elementId": "Submit",
				"type": "SmartButton",
				"theme": "smartDropZone"
			}
		];
		return (
				<SmartForm data={formData} onClick={this.doAction} title="Upload a PSC"/>
		);
	}
);
React.render(<FormSample/>, document.getElementById('divContainer'));
```

Props
-----

### `data`

the data of the components that the form will contain.

type: `object`
defaultValue: `[]`


### `dataUrl`

the url containing the data of the components that the form will contain.

type: `string`


### `onClick`

the function that will be called when a button in the form will be click. the function is of the form function(data).

type: `func`


### `title`

the title of the form

type: `string`

