import React, { Component } from 'react'
import PropTypes from "prop-types";
import ActivityList from './ActivityList';
import AddActivity from './AddActivity';
import SuccessBar from './SuccessBar';



class Quadrant extends Component {
  state={
    cardOpen:false
  }
  drop=(ev)=> {
    ev.preventDefault();
    const {updateActivity,QuadrantType,Data}=this.props
    var data = ev.dataTransfer.getData("activity");
    if(!(Data.length>0&&Data.filter(i=>i.activityId==data).length>0)){
    updateActivity({ActivityId:data,ActivityType:QuadrantType})
    }else{
      alert('cannot drop in same quadrant.')
    }
  }
   allowDrop=(ev) =>{
    ev.preventDefault();
  }
  toggleCard=(e)=>{
    this.setState({cardOpen:!this.state.cardOpen})

  }
  render() {
    const {Data,QuadrantType,Title,DisableInput,Collapsible}=this.props;
    const {cardOpen}=this.state;
    const Completed=Data.filter(i=>i.isCompleted)
    const Pending=Data.filter(i=>!i.isCompleted)
    return (
      <div className='quadrant-container' onDrop={this.drop} onDragOver={this.allowDrop}>
        <div className='quadrant-title'>{Title}
        {Collapsible&&<span className="collapse-icon cursor" onClick={this.toggleCard}>
            <i className={`${cardOpen?'fa fa-angle-up':'fa fa-angle-down'}`} />
          </span>}
        </div>
        <SuccessBar Completed={Completed.length} Pending={Pending.length}/>
        {(!Collapsible||(Collapsible&&cardOpen))&&  <ActivityList Completed={Completed} Pending={Pending}/>}
      {!DisableInput&&(!Collapsible||(Collapsible&&cardOpen))&& <AddActivity ActivityType={QuadrantType}/>} 
      </div>
    )
  }
}

Quadrant.propTypes={
Data:PropTypes.array.isRequired,
QuadrantType:PropTypes.number.isRequired,
Title:PropTypes.string.isRequired,
updateActivity:PropTypes.func.isRequired,
DisableInput:PropTypes.bool,
Collapsible:PropTypes.bool
};
export default Quadrant;




 
 