import React from 'react'
import PropTypes from "prop-types";

const RemoveActivity= (props) => {
  const {onClickHandler}=props
  return (
    <div className='remove-activity'>
      <i className="fa fa-minus-circle cursor" aria-hidden="true" onClick={onClickHandler} ></i>
    </div>
  )
}
RemoveActivity.propTypes={
  onClickHandler:PropTypes.func,
}

export default RemoveActivity;