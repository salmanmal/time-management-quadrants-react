import React, { Component } from "react";
import Comment from "./Comment";
import Modal from "../../component/Modal/Modal";
import AddNewComment from './AddNewComment';
export default class Task extends Component {
  state = { showComment: false };
  drag = ev => {
    const { data } = this.props;
    ev.dataTransfer.setData("taskId", data.taskId);
    ev.dataTransfer.setData("columnId", data.columnId);
  };
  removeTask = () => {
    const { data } = this.props;
    this.props.removeTask({ TaskId: data.taskId });
  };
  toggleComments = () => {
    this.setState({ showComment: !this.state.showComment });
  };
  render() {
    const { data, removeComment } = this.props;
    return (
      <React.Fragment>
        <p
          className="task-container grabbable"
          draggable={true}
          onDragStart={this.drag}
        >
          <span>{data.taskName}</span>
          <span className="collapse-icon cursor" onClick={this.toggleComments}>
            <i className="fa fa-comments" />
            &nbsp;{data.lstComment.length}
          </span>
          <span className="collapse-icon cursor" onClick={this.removeTask}>
            <i className="fa fa-minus-circle" />
          </span>
        </p>
        <Modal open={this.state.showComment} closeHandler={this.toggleComments}>
        <h3>Comments on Task : {data.taskName}</h3>
          {data.lstComment.map(item=>(<Comment
            data={item}
            key={`${data.taskId}_comments`}
            taskId={data.taskId}
            removeComment={removeComment}
          />))}
          <AddNewComment TaskId={data.taskId}/>
        </Modal>
      </React.Fragment>
    );
  }
}
