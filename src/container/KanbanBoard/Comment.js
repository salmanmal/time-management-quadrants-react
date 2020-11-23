import React, { Component } from 'react'

export default class Comments extends Component {
  removeComment=()=>{
    const {data,removeComment}=this.props;
    removeComment({commentId:data.commentId});
  }
  render() {
    const {data}=this.props;
    return (
      <div className="task-container">
     {data.comment}
     <span className="collapse-icon cursor" onClick={this.removeComment}>
            <i className="fa fa-minus-circle" />
          </span>
      </div>
    )
  }
}
