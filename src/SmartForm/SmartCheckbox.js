var React = require('react');


/**
 * SmarCheckbox is a component that is a wrapper over a checkbox.
 *
 * Working example:
 *```
 *  var React = require('react');
 *  var SmartCheckBox = require('SmartCheckBox');
 *  var SmartCheckBoxSample = React.createClass({
 * 	doAction: function (e) {
 * 		alert(e);
 * 	},
 * 	render: function () {
 * 		return (
 * 				<SmartCheckBox onChange={this.doAction} value=true label="Button" elementId = 'box' className="containerClass" onChange = this.doAction/>
 * 		);
 * 	}
 * );
 * React.render(<SmartCheckBoxSample/>, document.getElementById('divContainer'));
 * ```
 *
 * onChange is of the form:
 * ```
 * function(data)
 * ```
 * data is of the form:
 * ```
 * {
 * 	elementId: elementId    // {String} the unique key of the component
 * 	value: value  // {String} the current value of the CheckBox.
 * 	statusType: "SUCCESS" //{String} SUCCESS or FAILURE
 * 	type: 'SmartCheckbox' //type is always 'SmartCheckbox' for SmartCheckbox. It is basically the name of the component.
 * }
 * ```
 */


var CheckBox = React.createClass({
	propTypes: {
		/**
		 * The type which is 'SmartCheckbox'
		 */
		type: React.PropTypes.oneOf(['SmartCheckbox']),
		/**
		 * the label of the input box
		 */
		label: React.PropTypes.string,
		/**
		 * the unique key of the check box. It is assumed that each form component will have a unique elementId.
		 */
		elementId: React.PropTypes.string,
		/**
		 * the default value that the checkbox will have
		 */
		value: React.PropTypes.bool,
		/**
		 * the options css classnames that can be added to the check box container to change its style,
		 */
		className: React.PropTypes.string,
		/**
		 * send the updated value to the parent on every change. function(result)
		 */
		onChange: React.PropTypes.func,
	},
	getDefaultProps: function(){
		return{
			label:"",
		}
	},
	getInitialState: function(){
		var result={};
		result['elementId'] = this.props.elementId;
		result['value'] = this.props.value;
		result['statusType'] = "SUCCESS";
		result['type']='SmartCheckbox';
		this.props.onChange && this.props.onChange(result);
		return{
			value:false,
			firstFlag: true,
			containerClass: "smartCheckBoxContainer"
		}
	},
	componentDidMount: function(){
		this.setState({
			value:this.props.value
		});
	},
	handleOnClick: function(event) {
		var value = !this.state.value;
		this.setState({value: value});
		var result={};
		result['elementId'] = this.props.elementId;
		result['value'] = value;
		result['statusType'] = "SUCCESS";
		result['type']='SmartCheckbox'
		this.props.onChange && this.props.onChange(result);
	},
	render: function () {
		var containerClass = this.props.className? this.props.className: this.state.containerClass

		return (
			<div className={containerClass}>
				<div className="md-checkbox" onClick={this.handleOnClick} >
					<input type="checkbox" id={this.props.elementId} className="md-check" checked={this.state.value} />
					<label for={this.props.elementId}>
						<span className="inc"></span>
						<span className="check"></span>
						<span className="box"></span>
						<div className ="textClass">{this.props.label}</div>
					</label>
				</div>
			</div>
		)
	}
});

module.exports = CheckBox;