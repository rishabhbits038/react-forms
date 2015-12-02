import React from 'react';

/**
 * SmartInput is the form component for input box.
 *
 * A working example is:
 * ```
 *  var React = require('react');
 *  var SmartInput = require('SmartInput');
 *  var SmartInputSample = React.createClass({
 * 	doAction: function (e) {
 * 		alert(e);
 * 	},
 * 	render: function () {
 * 		return (
 * 				<SmartInput onChange={this.doAction} label="Sample label" emelemtId = 'input' value="Sample Value" mandatory=false regex="" className="containerClass" placeholder="type..."/>
 * 		);
 * 	}
 * );
 * React.render(<SmartInputSample/>, document.getElementById('divContainer'));
 *```
 *
 * SmartInput passes the data entered in the input box to the parent via the onChange function. This function is called whenever there is some change in the value of the inputbox.
 *
 * It also tells if there is an error in filling up the input box. This would happen when no data is entered if manadatory tag is set true or if the value set does not meet the regular expression satisfied.
 * The error is displayed only when clickedSubmit is set to true. Otherwise, the error would not be displayed.
 *
 * handleOnChange is of the form:
 * function(result)
 *
 * result is of the form:
 * ```
 * {
 * 	elementId: elementId    // {String} the unique key of the component
 * 	value: value  // {String} the current value of the input box.
 * 	statusType: "SUCCESS" //{String} SUCCESS or FAILURW
 * 	type: 'SmartInput' //tyoe is always smartInput for SmartInput. It is basically the name of the component.
 * }
 * ```
 *
 */

var SmartInput = React.createClass({
	propTypes: {
		/**
		 * The type which is 'SmartInput'
		 */
		type: React.PropTypes.oneOf(['SmartInput']),
		/**
		 * the label of the input box
		 */
		label: React.PropTypes.string,
		/**
		 * the unique key of the input box. It is assumed that each form component will have a unique elementId.
		 */
		elementId: React.PropTypes.string,
		/**
		 * the default value that the input will have
		 */
		value: React.PropTypes.string,
		/**
		 * true if value is required in the input box, false otherwise
		 */
		mandatory: React.PropTypes.bool,
		/**
		 * the regular expression passes as a string that the entered value in the input box must satisty.
		 */
		regex: React.PropTypes.string,
		/**
		 * the options css classnames that can be added to the input box container to change its style,
		 */
		className: React.PropTypes.string,
		/**
		 * the placeholder that input box might have.
		 */
		placeholder: React.PropTypes.string,
		/**
		 * send the updated value to the parent on every change. function(result)
		 */
		onChange: React.PropTypes.func,
		/**
		 * true if the form button has been clicked, which tells the inputbox to render the error if true. If this is false, error would not be rendered. This is to ensure that the form tells that the components have not been filled up properly only when the submit button(or any other button) is clicked. By default, it is false.
		 */
		clickedSubmit: React.PropTypes.func
	},
	handleOnChange: function (event) {
		console.log('value is');
		console.log(event.target.value);
		var result = {};
		var elementId = this.props.elementId;
		var value = value = event.target.value;
		var statusType = null;

		var regex = new RegExp(this.props.regex);

		var error = this.isValidValue(this.props.mandatory, value, regex);

		result['elementId'] = elementId;
		result['value'] = value;
		result['statusType'] = statusType;
		result['type'] = 'SmartInput';

		this.props.onChange && this.props.onChange(result);
		this.setState({
			value: event.target.value,
			error: error
		});
	},
	componentWillReceiveProps: function(nextProps){
		this.setState({
			value: nextProps.value
		});
	},
	getDefaultProps: function () {
		return {
			value: "",
			multiselect: false,
			placeholder:"",
			regex: "",
			clickedSubmit: false
		}
	},
	isValidValue: function(mandatory, value, regex){
		var error = null;
		if(mandatory===true){
			if(value){
				if(value==="")
					error = true;
				else{
					error = !regex.test(value);
				}
			}
			else{
				error = true;
			}
		}
		else{
			error = false;
		}
		return error;
	},
	getInitialState: function () {
		var result = {};
		var elementId = this.props.elementId;
		var value = this.props.value;
		var statusType = null;
		var regex = new RegExp(this.props.regex);
		var mandatory = this.props.mandatory;
		var error = this.isValidValue(this.props.mandatory, value, regex);
		if (error===true) {
			statusType = "ERROR";
		}
		else {
			statusType = "SUCCESS";
		}
		var errorMessage = "Invalid " + this.props.label;

		result['elementId'] = elementId;
		result['value'] = value;
		result['statusType'] = statusType;
		result['type']='SmartInput'

		this.props.onChange && this.props.onChange(result);

		return ({
			error: error,
			errorMessage: errorMessage,
			value: this.props.value,
			defaultClass: "form-control",
			containerClass: "commonFormComponents form-group form-md-line-input"
		});
	},

	componentWillMount: function(){
		if(this.props.containerClass){
			this.setState({
				containerClass: this.state.containerClass + " " + this.props.containerClass
			})
		}
	},

	render: function () {
		var error;
		if (this.state.error && this.props.clickedSubmit) {
			error = <div className = "errorContainer"> Invalid {this.props.label}</div>
		}
		return (
			<div className={this.state.containerClass} >
				{this.props.label?<p>{this.props.label}</p>:null}
				<input type="text" className= {"inputBox "+this.state.defaultClass+" "+this.props.className} placeholder={this.props.placeholder} value={this.state.value}
					   onChange={this.handleOnChange}/>
				{error}
			</div>
		);
	}
});

module.exports = SmartInput;