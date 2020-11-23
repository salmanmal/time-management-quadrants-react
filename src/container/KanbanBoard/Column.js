import React, { Component } from "react";
import Project from "./Project";
import Collapsible from './Collapsible';
import AddNewProject from './AddNewProject';
export default class Column extends Component {
  drop = ev => {
    ev.preventDefault();
    ev.target.classList.remove("over");
    const { data,moveTask } = this.props;
    const taskId = ev.dataTransfer.getData("taskId");
    const columnId = ev.dataTransfer.getData("columnId");
    if (columnId != data.columnId) {
      moveTask({TaskId:taskId,ColumnId:data.columnId})
    } else {
      alert("cannot drop in same column");
    }
  };

  allowDrop = ev => {
    ev.preventDefault();
  };

  handleDragEnter = e => {
    // this / e.target is the current hover target.
    e.target.classList.add("over");
  };

  handleDragLeave = e => {
    e.target.classList.remove("over"); // this / e.target is previous target element.
  };
  removeKanbanColumn=()=>{
    const { data ,removeKanbanColumn} = this.props;
    let totalTaskInColumn=0;
    data.lstProject.forEach(project => {
      totalTaskInColumn+=project.lstProjectTask.length;
    });
    if(totalTaskInColumn==0){
      removeKanbanColumn({ColumnId:data.columnId})
    }else{
      alert('Move all the task from this column to remove.')
    }
  }
  render() {
    const { data } = this.props;
    const {
      removeProject,
      removeProjectTask,
      removeComment,
    } = this.props;
    return (
      <div
        className="col-md-2 card project-container"
        onDrop={this.drop}
        onDragOver={this.allowDrop}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
      >
        <div className="card-header">
          <span>{data.columnName}</span>
          {data.isRemoveable&&<span className="collapse-icon cursor" onClick={this.removeKanbanColumn}>
          <i className="fa fa-minus-circle"></i>
          </span>}
        </div>
        {data.columnId===1&&<Collapsible  isAddProject={true} header={'Add New Project'}>
        <AddNewProject/>
        </Collapsible>}
        {data.lstProject.map(project => (
          <Project
            key={`${data.columnId}_${project.projectId}_project`}
            data={project}
            columnId={data.columnId}
            removeProject={removeProject}
            removeProjectTask={removeProjectTask}
            removeComment={removeComment}
          />
        ))}
        
      </div>
    );
  }
}
