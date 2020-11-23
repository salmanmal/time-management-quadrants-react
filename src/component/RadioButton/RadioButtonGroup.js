import React, { Component } from "react";
import "./RadioButtonGroup.scss";

export default class RadioButtonGroup extends Component {
  onRadioButtonClick = e => {
    const { name, onChange } = this.props;
    let value = e.target.value;
    onChange(name, value);
  };
  render() {
    const {
      className,
      options,
      value,
      onChange,
      isRequired,
      label,
      name,
      ReadOnly
    } = this.props;
    return (
      <div className={`radio-group ${className}`}>
        <label className="labeltitle">{label}</label>
        <div className='radio-input-group'> 
        {options.map(item => {
          return (
            <div className='radio-input'>
            <input
              type="radio"
              name={name}
              value={item.value}
              text={item.text}
              onClick={this.onRadioButtonClick}
              checked={value==item.value}
              disabled={ReadOnly}
            /><label className='radio-display-text'>{item.text}</label></div>
          );
        })}
        </div>
      </div>
    );
  }
}
