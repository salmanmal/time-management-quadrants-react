import React from 'react'
import PropTypes from "prop-types";
import Activity from './Activity';

const ActivityList= (props) => {
  const {Completed,Pending}=props;
  return (
    <div className={'activity-list container'}>
      {Pending.map(i=>(<Activity Activity={i}/>))}
      {Completed.map(i=>(<Activity Activity={i}/>))}
    </div>
  )
}
ActivityList.propTypes={
  Completed:PropTypes.array.isRequired,
  Pending:PropTypes.array.isRequired
}
export default ActivityList;