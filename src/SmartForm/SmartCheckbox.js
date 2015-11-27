var React = require('react');

var CheckBox = React.createClass({
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
			firstFlag: true
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
		return (
			<div className="smartCheckBoxContainer">
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