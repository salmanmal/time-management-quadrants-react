import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {addTaskComment} from '../CommonActions'
import {fetchFromObject,setDeep} from '../../utils/UtilityFunctions';
import Input from '../../component/Input/Input';
export class AddNewComment extends Component {
    state = {
        isSubmitting: false,
        formConfig: {
          Comment: {
            type: "text",
            value: "",
            validation: false,
            isRequired: true,
            requiredFieldMessage: "Comment is required.",
            acceptPattern: /^[A-Za-z0-9,@~!#%^$&* ]+$/,
            acceptPatternMessage: "Only A-Z and a-z are acceptable.",
            validatePattern: /^[A-Za-z0-9,@~!#%^$&* ]{3,50}$/,
            validatePatternMessage:
              "Please enter 3 to 50 characters. Only A-Z and a-z are acceptable.",
            maxLength: 50,
            // label: "First Name *",
            name: "Comment",
            className:'activity-name-input',
            placeHolder:'Add New Comment'

          }
        }
      };
    
      onInputChange = (key, value) => {
        let formConfig = { ...this.state.formConfig };
        let FieldData = fetchFromObject(formConfig, key);
        FieldData.value = value;
        FieldData.validation = false;
        formConfig = setDeep(formConfig, key, FieldData, true);
        this.setState({ formConfig });
      };
    
      validateForm = (rootPath = "") => {
        let isValid = true;
        let obj = {};
        const keys = rootPath
          ? Object.keys(fetchFromObject(this.state.formConfig, rootPath))
          : Object.keys(this.state.formConfig);
        let { formConfig } = this.state;
        keys.forEach(item => {
          let path = rootPath ? rootPath + "." + item : item;
          let fetchedObject = fetchFromObject(formConfig, path);
          if (fetchedObject instanceof Object) {
            if (fetchedObject instanceof Array) {
              fetchedObject.forEach((arrayitem, index) => {
                let arraypath = path + "." + index;
                const isobjValid = this.validateForm(arraypath);
                obj[item] = isobjValid.obj;
                if (isValid && !isobjValid.isValid) {
                  isValid = isobjValid.isValid;
                }
              });
            } else {
              if (fetchedObject.value != undefined) {
                obj[item] = fetchedObject.value;
                if (!fetchedObject.value && fetchedObject.isRequired) {
                  fetchedObject.validation = fetchedObject.requiredFieldMessage;
                } else if (
                  fetchedObject.value &&
                  fetchedObject.validatePattern &&
                  !fetchedObject.validatePattern.test(fetchedObject.value)
                ) {
                  fetchedObject.validation = fetchedObject.validatePatternMessage;
                }
                if (fetchedObject.validation) {
                  isValid = false;
                  console.log(path);
                  formConfig = setDeep(formConfig, path, fetchedObject, true);
                  this.setState({ formConfig });
                }
              } else {
                const isobjValid = this.validateForm(path);
                obj[item] = isobjValid.obj;
                if (isValid && !isobjValid.isValid) {
                  isValid = isobjValid.isValid;
                }
              }
            }
          }
        });
    
        return { isValid, obj };
      };
    
      onFormSubmit = e => {
        
        e.preventDefault();
        this.setState({ isSubmitting: true });
        const isFormValid = this.validateForm();
        if (isFormValid.isValid) {
      isFormValid.obj["TaskId"]=this.props.TaskId
        
          this.props.addTaskComment(isFormValid.obj,()=>{
            this.setState({isSubmitting:false,});
            this.onInputChange('Comment','');
          })
        } else {
          this.setState({ isSubmitting: false });
        }
      };
    
      render() {
        const { Comment } = {...this.state.formConfig};
        return (
          <div className="add-kanban-form container">
            <form onSubmit={this.onFormSubmit}>
            <div className='row'>
              <Input {...Comment} onChange={this.onInputChange} />
              <i className='fa fa-plus-circle submit-icon cursor' onClick={this.onFormSubmit}></i>
              </div>
            </form>
          </div>
        );
      }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = dispatch => {
    return {
        addTaskComment: (data,callback) => {
        dispatch(addTaskComment(data,callback));
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(AddNewComment)
