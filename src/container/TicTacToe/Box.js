import React, { Component } from "react";

export default class Box extends Component {
  handleOnClick = () => {
    const { value, setOn, position } = this.props;
    if (!value) setOn(position);
  };
  render() {
    const { value } = this.props;
    return (
      <div className={`col-md-4 box ${value?value=='O'?'green':'red':''}`} onClick={this.handleOnClick}>
        {value}
      </div>
    );
  }
}
