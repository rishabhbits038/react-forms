var React = require('react');
import Select from 'react-select';


/**
 * SmartDropDownSelect is the form component for DropDown.
 *
 * A working example is:
 * ```
 *  var React = require('react');
 *  var SmartDropDownSelect = require('SmartDropDownSelect');
 *  var SmartDropDownSelectSample = React.createClass({
 *  doAction: function (e) {
 *      alert(e);
 *  },
 *  render: function () {
 *      return (
 *              <SmartDropDownSelect onChange={this.doAction} label="Sample label" elementId = 'drpdn' value=["a","b"] mandatory=false multiSelect =true className="containerClass"/>
 *      );
 *  }
 * );
 * React.render(<SmartDropDownSelectSample/>, document.getElementById('divContainer'));
 * ```
 * SmartDropDownSelect passes the values selected to the parent via the onChange function. This function is called whenever there is some change in the values selected.
 *
 * It also tells if there is an error in filling up the DropDown. This would happen when no data is entered if manadatory tag is set true.
 * The error is displayed only when clickedSubmit is set to true. Otherwise, the error would not be displayed.
 *
 * handleOnChange is of the form:
 * ```
 * function(result)
 * ```
 *
 * result is of the form:
 *
 * ```
 * {
 *  elementId: elementId    // {String} the unique key of the component
 *  value: value  // {String} the current values selected in the dropdown.
 *  statusType: "SUCCESS" //{String} SUCCESS or FAILURE
 *  type: 'SmartDropDownSelect' //type is always SmartDropDownSelect for SmartDropDownSelect. It is basically the name of the component.
 * }
 * ```
 *
 */

var SmartDropDownSelect = React.createClass({
    displayName: 'SmartDropDownSelect',
    propTypes: {
        /**
         * The type which is 'SmartDropDownSelect'
         */
        type: React.PropTypes.oneOf(['SmartDropDownSelect']),
        /**
         * the label of the Dropdown.
         */
        label: React.PropTypes.string,
        /**
         * the unique key of the Dropdown. It is assumed that each form component will have a unique elementId.
         */
        elementId: React.PropTypes.string,
        /**
         * the set of possible values in the dropdown .
         */
        value: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.string),
            React.PropTypes.arrayOf(React.PropTypes.object)
        ]),
        /**
         * true if value is required in the Dropdown, false otherwise
         */
        mandatory: React.PropTypes.bool,
        /**
         * the options css classnames that can be added to the Dropdown container to change its style,
         */
        className: React.PropTypes.string,
        /**
         * send the updated value, along eith the key to the parent on every change.  function(result)
         */
        onChange: React.PropTypes.func,
        /**
         * true is multiple elements are to be selected. false otherwise.
         */
        multiSelect: React.PropTypes.bool,
        /**
         * true if the form button has been clicked, which tells the inputbox to render the error if true. If this is false, error would not be rendered. This is to ensure that the form tells that the components have not been filled up properly only when the submit button(or any other button) is clicked. By default, it is false.
         */
        clickedSubmit: React.PropTypes.func
    },
    getDefaultProps: function(){
        return({
            multiselect:false,
            value:[]
        });
    },
    getInitialState: function() {
        var result = {};
        var elementId = this.props.elementId;
        var statusType= null;
        var valueComp=null;

        var error=null;
        var errorMessage = "Please select a value for "+this.props.label;
        if(this.props.mandatory){
            error=true;
            statusType = "ERROR";
        }
        else{
            error=false;
            statusType = "SUCCESS";
        }

        result['elementId']= elementId;
        result['value'] = valueComp;
        result['statusType'] = statusType;
        this.props.onChange && this.props.onChange(result);

        return {
            value: [],
            error:error,
            errorMessage: errorMessage
        };
    },
    handleOnChange: function(value, values){
        var result = {};
        var elementId = this.props.elementId;
        var statusType= null;
        var valueComp=null;

        var error;
        if(values.length===0 && this.props.mandatory){
            error=true;
            statusType="ERROR";
        }
        else {
            error=false;
            statusType="SUCCESS";
        }

        valueComp = value.split(',');

        result['elementId']= elementId;
        result['value'] = valueComp;
        result['statusType'] = statusType;
        this.props.onChange && this.props.onChange(result);

        this.setState({
            selected:valueComp,
            value: value,
            error:error
        });

    },
    render: function() {
        var optionsArray = this.props.value.map((item)=>{
            var temp={};
            if(typeof item =='object'){
                for(var key in item){
                    temp['value']=key;
                    temp['label']=item[key];
                    break;
                }
            }
            else{
                temp['label']=item;
                temp['value']=item;
            }
            return temp;
        });
        var error;
        if(this.props.clickedSubmit && this.state.error){
            error = <div className = "errorContainer"> {this.state.errorMessage} </div>
        }
        return (
            <div className="commonFormComponents">
                {this.props.label?<p>{this.props.label}</p>:null}
                <div className="section">
                    <Select multi={this.props.multiSelect}  value={this.state.value}  options={optionsArray} onChange={this.handleOnChange} />
                </div>
                {error}
            </div>
        );
    }
});

module.exports = SmartDropDownSelect;