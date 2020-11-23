import React, { Component } from 'react'
import './layout.scss'
export default class Footer extends Component {
  render() {
    return (
      <div className={`footer-content`}>
      
        <div className="container-fluid">
        <div className="row"> 
          <div className="col-md-6 text-left">
            <p>&copy; 2019 All Rights Reserved.</p>
          </div>
          
        </div>
       </div> 
      </div>
    )
  }
}
