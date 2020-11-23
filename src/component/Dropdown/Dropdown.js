import React, { Component } from "react";
import "./Dropdown.scss";
export default class Dropdown extends Component {
  componentDidMount() {
    const { name, value, onChange, options, isRequired } = this.props;
    if (!value && isRequired && options && options.length > 0) {
      onChange&&  onChange(name, options[0].value);
    }
  }
  onInputChange = e => {
    const { name, onChange } = this.props;
    let value = e.target.value;
    if (value === "-1") {
      value = "";
    }
    onChange(name, value);
  };
  render() {
    const {
      label,
      key,
      value,
      name,
      validationMessage,
      className,
      ReadOnly,
      options,
      isRequired
    } = this.props;
    return (
      <div className={`${className} common-dropdown`}>
        <label className="labeltitle">{label}</label>
        <select
          name={name}
          onChange={this.onInputChange}
          readOnly={ReadOnly}
          disabled={ReadOnly}
          value={value}
        >
          {!isRequired && <option value="-1">--Select--</option>}
          {options &&
            options.map(item => (
              <option 
              value={item.value} 
              key={item.value}
              // selected={item.value == value}
              >
                {item.text}
              </option>
            ))}
        </select>
      </div>
    );
  }
}
