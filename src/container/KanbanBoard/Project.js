import React, { Component } from "react";
import Collapsible from "./Collapsible";
import TaskList from "./TaskList";
import AddNewTask from './AddNewTask';
export default class Project extends Component {
  removeProject=()=>{
    const { data,removeProject } = this.props;
removeProject({ProjectId:data.projectId});
  }
  render() {
    const { data,columnId,removeProjectTask,removeComment } = this.props;
    return (
      <React.Fragment>
        {(data.lstProjectTask.length>0||columnId===1)&&
      <Collapsible header={data.projectName} removeProject={this.removeProject} columnId={columnId}>
        {columnId===1&&<AddNewTask ProjectId={data.projectId}/>}
        <TaskList data={data.lstProjectTask} removeTask={removeProjectTask} removeComment={removeComment}/>
      </Collapsible>}
      </React.Fragment>

    );
  }
}
