import React, { Component, Fragment } from "react";
import Task from "./Task";
export default class TaskList extends Component {
  render() {
    const { data, removeTask,removeComment } = this.props;
    return (
      <Fragment>
        {data.map(projectTask => (
          <Task
            data={projectTask}
            key={`${projectTask.taskId}_${projectTask.projectId}_${
              projectTask.columnId
            }_task`}
            removeTask={removeTask}
            removeComment={removeComment}
          />
        ))}
      </Fragment>
    );
  }
}
