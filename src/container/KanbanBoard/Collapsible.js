import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Collapsible extends Component {
  static propTypes = {
    header: PropTypes.string
  };
  state = {
      cardOpen:false
  };
  toggleCard=(e)=>{
    this.setState({cardOpen:!this.state.cardOpen})

  }
  componentDidMount(){
    if(this.props.isAddProject)
    this.setState({cardOpen:true})
  }
  render() {
    const { header ,removeProject,isAddProject,columnId} = this.props;
    const {cardOpen}=this.state;
    return (
      <div className="project-container card">
        <div className="project-header card-header">
          <span>{header}</span>
          
          <span className="collapse-icon cursor" onClick={this.toggleCard}>
            <i className={`${cardOpen?'fa fa-angle-up':'fa fa-angle-down'}`} />
          </span>
          {!isAddProject&&columnId==1&&<span className="collapse-icon cursor" onClick={removeProject}>
          <i className="fa fa-minus-circle"></i>
          </span>}
        </div>
        {cardOpen&&this.props.children}
      </div>
    );
  }
}
