var React = require('react');

/**
 * SmartRadio is the form component for radio box.
 *
 * A working example is:
 * ```
 *  var React = require('react');
 *  var SmartRadio = require('SmartRadio');
 *  var SmartRadioSample = React.createClass({
 *  doAction: function (e) {
 *      alert(e);
 *  },
 *  render: function () {
 *      return (
 *              <SmartRadio onChange={this.doAction} selectedIndex=2 label="Sample label" elementId = 'radio' value=["one", "two", "three"] className="containerClass" placeholder="type..."/>
 *      );
 *  }
 * );
 * React.render(<SmartRadioSample/>, document.getElementById('divContainer'));
 *```
 *
 * SmartRadio passes the value selectesto the parent via the onChange function. This function is called whenever there is change in the radio button selected.
 *
 * handleOnChange is of the form:
 * function(result)
 *
 * result is of the form:
 * ```
 * {
 *  elementId: elementId    // {String} the unique key of the component
 *  value: value  // {String} the current value of the input box.
 *  statusType: "SUCCESS" //{String} SUCCESS or FAILURE
 *  type: 'SmarRadio' //tyoe is always SmarRadio for SmarRadio. It is basically the name of the component.
 * }
 * ```
 *
 */

var RadioButton = React.createClass({
    propTypes: {
        /**
         * The type which is 'SmartRadio'
         */
        type: React.PropTypes.oneOf(['SmartRadio']),
        /**
         * the label of the radio button box.
         */
        label: React.PropTypes.string,
        /**
         * the unique key of the radio button box. It is assumed that each form component will have a unique elementId.
         */
        elementId: React.PropTypes.string,
        /**
         * the options css classnames that can be added to the radio button box container to change its style,
         */
        className: React.PropTypes.string,
        /**
         * send the updated value to the parent on every change. function(result)
         */
        onChange: React.PropTypes.func,
        /**
         * the index that should be selected by default
         */
        selectedIndex: React.PropTypes.number,
        /**
         * the set of possible values in the radio button box .
         */
        value: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.string),
            React.PropTypes.arrayOf(React.PropTypes.object)
        ]),
    },
    getDefaultProps: function(){
        return{
            label: "",
            selectedIndex: 0
        }
    },
    getInitialState: function(){
        var result={};
        result['elementId'] = this.props.elementId;
        result['value'] = Object.keys(this.props.value[this.props.selectedIndex])[0];
        result['statusType'] = "SUCCESS";
        result['type']='SmartRadio';
        this.props.onChange && this.props.onChange(result);
        return{
            value:false,
            selectedIndex: 0
        }
    },
    componentDidMount: function(){
        this.setState({
            value:this.props.value,
            selectedIndex: this.props.selectedIndex
        });
    },
    handleOnClick: function(event) {
        var selectedIndex = parseInt(event.currentTarget.getAttribute('value'));
        this.setState({
            selectedIndex: selectedIndex
        })
        var result={};
        result['elementId'] = this.props.elementId;
        result['value'] = Object.keys(this.props.value[selectedIndex])[0];
        result['statusType'] = "SUCCESS";
        result['type']='SmartRadio';
        this.props.onChange && this.props.onChange(result);
    },
    render: function() {
        var radioArray = this.props.value.map((item, index)=>{
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
            var checked = index===this.state.selectedIndex;
            return (
                <div className="md-radio" value={index} onClick={this.handleOnClick}>
                    <input type="radio" name={this.props.elementId} value={temp['value']} checked={checked} className="md-radiobtn"/>
                    <label>
                        <span className="inc"></span>
                        <span className="check"></span>
                        <span className="box"></span>
                        <div>{temp['label']}</div>
                    </label>
                </div>
            );
        });

        return (
            <div className="radioContainer">
                <div>{this.props.label}</div>
                <div className="md-radio-inline">
                    {radioArray}
                </div>
            </div>
        )
    }
});

module.exports = RadioButton;