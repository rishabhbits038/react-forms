import React from 'react';

/**
 * SmartButton is a component that is a wrapper over a button, which tells the parent the key of the button clicked.constructor
 *
 * Working example:
 *
 * <SmartButton label= "Save Changes" Key="Update" className="blue smartDropZone" onClick={this.updatePSC} />
 *
 */

var SmartButton = React.createClass({
    propTypes: {
        /**
         * the text to be displayed inside the button
         */
        label: React.PropTypes.string,
        /**
         * the unique elementId of the button
         */
        elementId: React.PropTypes.string,
        /**
         * 'SmartButton'
         */
        type: React.PropTypes.string,
        /**
         * the className, you want to give the container of button.
         */
        className: React.PropTypes.string,
        /**
         * this function passes the key of the clicked button to the parent along the the entire event. the function id of the form: function()(key, event)
         */
        onClick: React.PropTypes.func,
        /**
         * The color we want to give to the button. Example : theme="red" if we want to add a red color to the button.
         */
        theme: React.PropTypes.string

    },
    getDefaultProps: function(){
        return{
            theme:"",
            label:""
        }
    },
    getInitialState: function(){
        return({
            defaultClass:"btn btn-sm",
            containerClass: "smartButtonContainer"
        });
    },
    handleButtonClick: function(event){
        this.props.onClick && this.props.onClick(this.props.elementId, event);
    },

    render: function(){
        var containerClass = this.props.className? this.props.className: this.state.containerClass ;
        return (
            <div className={containerClass}>
                <button className={this.state.defaultClass+ " "+this.props.theme} onClick = {this.handleButtonClick}>{this.props.label}</button>
            </div>
        );
    }
});

module.exports = SmartButton;