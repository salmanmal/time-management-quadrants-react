import React from "react";
import PropTypes from "prop-types";

const SuccessBar = props => {
  let denominator=(props.Pending+props.Completed).toFixed(2);
  if(denominator==0)
  denominator=1;
  const progress = ((props.Completed * 100) / (denominator)).toFixed(2);
  return (
    <div className="progress">
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        {`${progress}%`}
      </div>
    </div>
  );
};

SuccessBar.propTypes = {
  Completed:PropTypes.number.isRequired,
  Pending:PropTypes.number.isRequired
};

export default SuccessBar;
