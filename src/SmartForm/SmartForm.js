var React = require('react');
var SmartInput = require('./SmartInput.js');
var SmartDropDownSelect = require('./SmartDropDownSelect.js');
var SmartButton = require('./SmartButton.js');
var SmartCheckbox = require('./SmartCheckbox.js');
var SmartRadio = require('./SmartRadio.js');
var SmartFileInput = require('./SmartFileInput.js');

var Components = {
	'SmartInput': SmartInput,
	'SmartDropDownSelect': SmartDropDownSelect,
	'SmartButton': SmartButton,
	'SmartCheckbox': SmartCheckbox,
	'SmartFileInput': SmartFileInput,
	'SmartRadio': SmartRadio
};

/**
 * SmartForm is a wrapper over form components like input box, dropdown, file uploader, checkbox that enables creation of a form just from a json.
 * The smartForm takes as input the details of the form components and returns the complete filled up form details(on button click) to the parent.
 * SmartForm stores the filled up values of all its components in its state. These values are updated on change of any component. If any of the button is pressed, the onClick function is called which returns the filled up form details to the parent.
 *
 * #Working example:
 * ```
 * var React = require('react');
 *  var FormSample = React.createClass({
 * 	doAction: function (e) {
 * 		alert("Button Clicked " + e);
 * 	},
 * 	doChange: function (e) {
 * 		alert("Something Changed " + e);
 * 	},
 * 	render: function () {
 * 		var formData = [
 * 			{
 * 				"label": "Brands",
 * 				"elementId": "Brands",
 * 				"type": "SmartDropDownSelect",
 * 				"value": ["Nike","Puma","Arrow"],
 * 				"mandatory": false,
 * 				"multiSelect": false,
 * 				"regex": ""
 * 			},
 * 			{
 * 				"label": "PSC Label",
 * 				"elementId": "PSCLabel",
 * 				"type": "SmartInput",
 * 				"value": "",
 * 				"mandatory": true,
 * 				"multiSelect": false,
 * 				"regex": "",
 * 				"containerClass": "pscLabel"
 * 			},
 * 			{
 * 				"label": "Submit",
 * 				"elementId": "Submit",
 * 				"type": "SmartButton",
 * 				"className": "btn btn-sm blue smartDropZone"
 * 			}
 * 		];
 * 		return (
 * 				<SmartForm data={formData} handleChange={this.doChange} onClick={this.doAction} title="Upload a PSC" actionLabel="Upload"/>
 * 		);
 * 	}
 * );
 * React.render(<HelloMessage name="Sebastian" />, document.getElementById('divContainer'));
 * ```
 */



var SmartForm = React.createClass({
	propTypes: {
		/**
		 * the data of the components that the form will contain.
		 */
		data: React.PropTypes.string,
		/**
		 * the url containing the data of the components that the form will contain.
		 */
		dataUrl: React.PropTypes.string,
		/**
		 * the function that will be called when a button in the form will be click. the function is of the form function(data).
		 */
		onClick: React.PropTypes.string,
		/**
		 * the title of the form
		 */
		title: React.PropTypes.string
	},
	getFormJSON: function(){
		var dataJson = this.props.data;
		if(this.props.data.length === 0 && this.props.dataUrl){
			SmartService.get(this.props.dataUrl).end((err, res)=> {
				var json = res.text;
				dataJson = JSON.parse(json).data;
				return dataJson;
			});
		}
		return dataJson;
	},
	getMapIndexToKey: function(formJSON){
		var map = {};
		formJSON.map((item, index)=>{
			map[item['elementId']]=index;
		});
		return map;
	},
	isEmptyJSON: function (obj) {
		return Object.keys(obj).length === 0;
	},
	handleChange: function (result) {
		var currComponentDetails = this.state.componentDetails;
		var statusType = result['statusType'];
		var value = result['value'];
		var temp = {
			'statusType': statusType,
			'value': value,
		}
		currComponentDetails[result['elementId']] = temp;

		if(result.type==='SmartInput'){
			var formJSON = this.state.formJSON;
			formJSON[this.state.mapIndexToKey[result.elementId]].value=value;
			this.setState({
				'componentDetails': currComponentDetails,
				formJSON:formJSON
			})
		}
		else{
			this.setState({
				'componentDetails': currComponentDetails
			})
		}
	},
	handleButtonClick: function (elementId, event) {
		this.setState({
			clickedSubmit: true
		});
		var flag = true;

		for (var key in this.state.componentDetails) {
			if (this.state.componentDetails[key]['statusType'] === "ERROR") {
				flag = false;
				break;
			}
		}
		if (flag === true) {
			var arr = [];
			for (var key1 in this.state.componentDetails) {
				var temp = {};
				temp[key1] = this.state.componentDetails[key1]['value'];
				arr.push(temp);
			}
			this.props.onClick && this.props.onClick({elementId:elementId, event: event, data: arr});
		}

	},
	getDefaultProps: function () {
		return {
			data: []
		};
	},
	componentWillMount: function(){
		var formJSON = this.getFormJSON();
		var mapIndexToKey = this.getMapIndexToKey(formJSON);
		this.setState({
			formJSON: formJSON,
			mapIndexToKey: mapIndexToKey
		});
	},
	getInitialState: function () {
		return {
			componentDetails: {},
			clickedSubmit: false,
			formJSON: [],
			mapIndexToKey: null
		}
	},
	render: function () {
		var arr = this.state.formJSON.map((item)=> {
			var Comp = Components[item["type"]];
			if (Comp === undefined) {
				console.log('Smart Form Component ' + item["type"] + " is not found");
				return null;
			}
			if(item["type"] ==='SmartButton')
				return (<Comp {...item}
										 onClick={this.handleButtonClick}/> );
			else
				return (<Comp {...item} onChange={this.handleChange} clickedSubmit={this.state.clickedSubmit}
										/> );
		});
		return (
				<div className = "borderClass">
					{this.props.title?<h4>{this.props.title}</h4>:null}
						{arr}
				</div>
		);
	}
});

module.exports = SmartForm;