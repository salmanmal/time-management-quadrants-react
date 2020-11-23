import React from "react";
import "./Modal.scss";

export default class Modal extends React.Component {
  render() {
  const { open ,closeHandler} = this.props;

    return (
        <div>
        {open && (
          <div className="modal-custom" onClick={closeHandler}>
            <div className="modal-custom-content" onClick={(e)=>{e.stopPropagation()}}>
              <span className="close" onClick={closeHandler}>&times;</span>
              {this.props.children}
            </div>
          </div>
        )}
      </div>
    )
  }
}
