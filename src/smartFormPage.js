var React = require('react');
var formData = require('./../data/form.json');

var SmartForm = require('./SmartForm/SmartForm')
var SmartFormPage = React.createClass({
	handleOnClick: function(data){
		console.log(data);
	},
	render: function(){
		return <SmartForm data = {formData.data} onClick = {this.handleOnClick}/>
	}
});

module.exports = SmartFormPage;