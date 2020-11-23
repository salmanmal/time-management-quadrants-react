import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import RemoveActivity from './RemoveActivity';
import MarkCompleteActivity from './MarkCompleteActivity';
import {markComplete,removeActivity} from '../CommonActions';

 class Activity extends Component {
  markComplete=()=>{
    const {activityId}=this.props.Activity;
    this.props.markComplete({ActivityId:activityId})
  }
  removeActivity=()=>{
    const {activityId}=this.props.Activity;
    this.props.removeActivity({ActivityId:activityId})
  }
  
  
   drag=(ev)=> {
    const {activityId}=this.props.Activity;
    ev.dataTransfer.setData("activity", activityId);
  }
  
  render() {
    const {Activity}=this.props;
    return (
        <div className={`activity row grabbable ${Activity.isCompleted?'completed':'pending'}`} draggable="true" onDragStart={this.drag}>
        <MarkCompleteActivity onClickHandler={this.markComplete} />
        <RemoveActivity onClickHandler={this.removeActivity}/>
        <div>{Activity.activityName}</div>
        </div>
    )
  }
}
Activity.propTypes ={
  Activity: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => {
  return {
    markComplete: (data) => {
      dispatch(markComplete(data));
    },
    removeActivity: (data) => {
      dispatch(removeActivity(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);