import React from 'react';
import _ from 'underscore';
var SmartInput = React.createClass({
    handleOnClick: function(event){
        var fileInput = React.findDOMNode(this.refs.fileInput);
        fileInput.click();
    },
    handleOnChange: function (event) {
        var result = {};
        var elementId = this.props.elementId;
        var value = event.target.files;
        console.log('value is');
        console.log(value);
        var statusType = null;
        var error = null;
        if (!value ) {
            statusType = "ERROR";
            error = true;
        }
        else {
            statusType = "SUCCESS";
            error = false;
        }

        result['elementId'] = elementId;
        result['value'] = value;
        result['statusType'] = statusType;
        result['type'] = 'SmartFileInput';

        this.props.onChange && this.props.onChange(result);
        this.setState({
            value: value,
            error: error
        });

    },
    getDefaultProps: function () {
        return {
            multiSelect: false,
            regex: "",
            clickedSubmit: false,
            mandatory: false
        }
    },
    getInitialState: function () {
        var result = {};
        var elementId = this.props.elementId;
        var value = null
        var statusType = null;
        var error = null;

        if(this.props.mandatory){
            error = true;
            statusType = "ERROR";
        }
        else{
            error = false;
            statusType = "SUCCESS";
        }

        var errorMessage = "Invalid " + this.props.label;

        result['elementId'] = this.props.elementId;
        result['value'] = null;
        result['statusType'] = statusType;
        result['type']='SmartFileInput'

        this.props.onChange && this.props.onChange(result);

        return ({
            error: error,
            errorMessage: errorMessage,
            value: null,
            defaultClass:"btn btn-sm",
            containerClass: "smartButtonContainer"
        });
    },

    render: function () {
        var error;
        if (this.state.error && this.props.clickedSubmit) {
            error = <div className="errorContainerFileInput"> Invalid {this.props.label}</div>
        }

        var containerClass = this.props.className? this.props.className: this.state.containerClass ;
        return (
            <div className={containerClass}>
                <span className = "fileUploadName">
                    {this.state.value ? _.pluck(this.state.value,'name').toString():"Select a file..."}
                </span>
                <div className={this.state.defaultClass+ " "+this.props.theme} onClick={this.handleOnClick}>
                    {this.props.label}
                    <input type="file" ref='fileInput' multiple={this.props.multiSelect}
                           onChange={this.handleOnChange} style={{display:'none'}}/>
                </div>
                {error}
            </div>
        );
    }
});

module.exports = SmartInput;