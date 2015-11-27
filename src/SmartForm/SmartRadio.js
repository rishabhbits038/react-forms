var React = require('react');

var RadioButton = React.createClass({
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