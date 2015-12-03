import React from 'react';
import _ from 'underscore';


/**
 * SmartFileInput is the form component for input file box.
 *
 * A working example is:
 * ```
 *  var React = require('react');
 *  var SmartFileInput = require('SmartFileInput');
 *  var SmartInputSample = React.createClass({
 *  doAction: function (e) {
 *      alert(e);
 *  },
 *  render: function () {
 *      return (
 *              <SmartFileInput onChange={this.doAction} label="Sample label" elementId = 'fileInput' mandatory=false multiSelect = true className="containerClass" theme="grey"/>
 *      );
 *  }
 * );
 * React.render(<SmartFileInputSample/>, document.getElementById('divContainer'));
 *```
 *
 * SmartFileInput passes the file chosen to the parent via the onChange function. This function is called whenever there is some change in the value of the inputbox.
 *
 * It also tells if there is an error in filling up the input box. This would happen when no file is selected if manadatory tag is set true.
 * The error is displayed only when clickedSubmit is set to true. Otherwise, the error would not be displayed.
 *
 * handleOnChange is of the form:
 * function(result)
 *
 * result is of the form:
 * ```
 * {
 *  elementId: elementId    // {String} the unique key of the component
 *  value: value  // {String} the current value of the input box.
 *  statusType: "SUCCESS" //{String} SUCCESS or FAILURW
 *  type: 'SmartFileInput' //tyoe is always smartInput for SmartInput. It is basically the name of the component.
 * }
 * ```
 *
 */


var SmartFileInput = React.createClass({
    propTypes: {
        /**
         * The type which is 'SmartFileInput'
         */
        type: React.PropTypes.oneOf(['SmartFileInput']),
        /**
         * the label of the input box
         */
        label: React.PropTypes.string,
        /**
         * the unique key of the input file box. It is assumed that each form component will have a unique elementId.
         */
        elementId: React.PropTypes.string,
        /**
         * true if file is required to be selected, false otherwise
         */
        mandatory: React.PropTypes.bool,
        /**
         * the options css classnames that can be added to the input file box container to change its style,
         */
        className: React.PropTypes.string,
        /**
         * send the updated value to the parent on every change. function(result)
         */
        onChange: React.PropTypes.func,
        /**
         * true if the form button has been clicked, which tells the input file box to render the error if true. If this is false, error would not be rendered. This is to ensure that the form tells that the components have not been filled up properly only when the submit button(or any other button) is clicked. By default, it is false.
         */
        clickedSubmit: React.PropTypes.bool,
        /**
         * true if it is allowed to select multiple files.
         */
        multiSelect: React.PropTypes.bool,
        /**
         * The color we want to give to the button. Example : theme="red" if we want to add a red color to the button.
         */
        theme: React.PropTypes.string
    },
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
            defaultClass:"btn btn-sm btn-raised",
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

module.exports = SmartFileInput;