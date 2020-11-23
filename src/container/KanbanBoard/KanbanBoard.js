import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Column from "./Column";
import {
  getDashboard,
  removeKanbanColumn,
  removeProject,
  removeProjectTask,
  removeComment,
  moveTask
} from "../CommonActions";
import AddNewColumn from "./AddNewColumn";
import "./Kanban.scss";
class KanbanBoard extends Component {
  static propTypes = {
    prop: PropTypes
  };
  componentDidMount() {
    this.props.getDashboard();
  }
  render() {
    const {
      removeKanbanColumn,
      removeProject,
      removeProjectTask,
      removeComment,
      moveTask,
      data
    } = this.props;
     return (
      <div className="kanban-container">
        <AddNewColumn />
        <div className="row column-row">
          {data.map(column => (
            <Column
              data={column}
              key={`${column.columnId}_column`}
              removeKanbanColumn={removeKanbanColumn}
              removeProject={removeProject}
              removeProjectTask={removeProjectTask}
              removeComment={removeComment}
              moveTask={moveTask}
            />
          ))}
          {/* <div className='w3-modal'>Hi</div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.app.kanbanData
});

const mapDispatchToProps = dispatch => {
  return {
    getDashboard: () => {
      dispatch(getDashboard());
    },
    removeKanbanColumn: data => {
      dispatch(removeKanbanColumn(data));
    },
    removeProject: data => {
      dispatch(removeProject(data));
    },
    removeProjectTask: data => {
      dispatch(removeProjectTask(data));
    },
    removeComment: data => {
      dispatch(removeComment(data));
    },
    moveTask: data => {
      dispatch(moveTask(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KanbanBoard);
