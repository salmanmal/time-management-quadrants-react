import React, { Component } from "react";
import {connect} from 'react-redux';
import Quadrant from "./Quadrant";
import {getActivities,updateActivity} from '../CommonActions';
import './FourQuadrant.scss';

class FourQudrant extends Component {
  componentDidMount(){
    this.props.getActivities();
  }
  
  render() {
    const {Data}=this.props
     
    return (
      <div className="four-quadrant-container container">
        <div className="row">
          <div className="col-md-6">
            <Quadrant
              QuadrantType={1}
              Data={Data["i_U"]}
              Title={`Important & Urgent`}
              updateActivity={this.props.updateActivity}
            />
          </div>
          <div className="col-md-6">
            <Quadrant
              QuadrantType={2}
              Data={Data["i_NU"]}
              Title={`Important & Not Urgent`}
              updateActivity={this.props.updateActivity}

            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Quadrant
              QuadrantType={3}
              Data={Data["nI_U"]}
              Title={`Not Important & Urgent`}
              updateActivity={this.props.updateActivity}
            />
          </div>
          <div className="col-md-6">
            <Quadrant
              QuadrantType={4}
              Data={Data["nI_NU"]}
              Title={`Not Important & Not Urgent`}
              updateActivity={this.props.updateActivity}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Quadrant
              QuadrantType={5}
              Data={Data["trash"]}
              Title={`Trash`}
              updateActivity={this.props.updateActivity}
              DisableInput={true}
              Collapsible={true}
            />
          </div>
          <div className="col-md-6">
            <Quadrant
              QuadrantType={6}
              Data={Data["archive"]}
              Title={`Archived`}
              updateActivity={this.props.updateActivity}
              DisableInput={true}
              Collapsible={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Data: state.app.data
});

const mapDispatchToProps = dispatch => {
  return {
    getActivities: () => {
      dispatch(getActivities());
    },updateActivity:(data)=>{
      dispatch(updateActivity(data));

    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FourQudrant);
