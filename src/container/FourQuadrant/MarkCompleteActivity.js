import React from 'react'
import PropTypes from "prop-types";

const MarkComplete= (props) => {
  const {onClickHandler}=props
  return (
    <div className='mark-complete'>
      <i className="fa fa-check-circle cursor" aria-hidden="true" onClick={onClickHandler} title='Done/Un-done task'></i>
    </div>
  )
}
MarkComplete.propTypes={
  onClickHandler:PropTypes.func,
}

export default MarkComplete;