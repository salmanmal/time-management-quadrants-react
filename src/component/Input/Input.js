import React, { Component } from "react";
import "./Input.scss";

export default class Input extends Component {
  state={
    notAcceptableKey:null
  }
  onInputChange = e => {
    const {
      name,
      onChange,
      type,
      value,
      min,
      max,
      decimal,
      decimalMax,
      acceptPattern
    } = this.props;
    if (onChange) {
      if (type == `number` && !e.target.value) {
        onChange(name, "0");
      } else if (type == `number`) {
        console.log(`a`,e.target.value.indexOf("."))
        if (e.target.value < min || e.target.value > max) {
          onChange(name, value);
        } else {
          if (e.target.value.length > 1 && e.target.value.indexOf("0") == 0&&e.target.value.indexOf('.')!=1) {
            onChange(name, e.target.value.substr(1));
          } else if (!decimal && e.target.value.indexOf(".") > -1) {
            if(e.target.value.indexOf(".")==e.target.value.length-2){
              onChange(
                name,
                e.target.value.slice(0, e.target.value.indexOf("."))
              );              
            }else if(e.target.value.indexOf(".")==0){
              onChange(
                name,
                  e.target.value.slice(e.target.value.indexOf(".") + 1)
              );
            }else{
            onChange(
              name,
              e.target.value.slice(0, e.target.value.indexOf(".")) +
                e.target.value.slice(e.target.value.indexOf(".") + 1)
            );
            }
          } else if (
            decimal &&
            decimalMax &&
            e.target.value.indexOf(".") > 0 &&
            e.target.value.split(".")[1].length > decimalMax
          ) {
            onChange(name, value);
          } else {
            onChange(name, e.target.value);
          }
        }
      }
      else if(e.target.value&&acceptPattern&&!acceptPattern.test(e.target.value)){
        this.setState({notAcceptableKey:e.nativeEvent.data},()=>{
          setTimeout(()=>{if(this.state.notAcceptableKey)this.setState({notAcceptableKey:null})},3000)
        })
          onChange(name,value);
      }
      else {
        onChange(name, e.target.value);
      }
    }
  };
  onFocus = e => {};
  render() {
    const {
      type,
      label,
      name,
      key,
      value,
      validation,
      className,
      ReadOnly,
      maxLength,
      acceptPatternMessage,
      placeHolder

    } = this.props;
    const {notAcceptableKey}=this.state;
    return (
      <div className={`${className} commoninput`}>
        {label && <label className="labeltitle">{label}</label>}
        <input
        //   {...this.props}
          onKeyDown={e => {
            if (e.keyCode === 8 || e.keyCode === 46) {
              return true;
            } else {
              return !isNaN(Number(e.key));
            }
          }}
          type={type}
          name={name}
          value={value ? value : ""}
          onChange={this.onInputChange}
          disabled={ReadOnly}
          readOnly={ReadOnly}
          className={`${validation && "validation-message"}`}
          onFocus={e => {
            e.target.select();
          }}
          autoComplete="off"
          maxLength={maxLength}
          placeholder={placeHolder}
        />
        {validation && (
          <span className="validationmsg">{validation=="This is required field"?`Please Enter ${label?label:'value'}`:validation} </span>
        )}
        {notAcceptableKey && (
          <span className="validationmsg">{`Key "${notAcceptableKey}" is not acceptable. ${acceptPatternMessage&&acceptPatternMessage}`} </span>
        )}
      </div>
    );
  }
}
