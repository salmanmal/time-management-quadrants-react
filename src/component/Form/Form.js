import React, { Component } from "react";
import { fetchFromObject, setDeep } from "./FormUtility";
import Input from "./Input";
import "./Form.scss";

export default class Form extends Component {
  state = {
    isSubmitting: false,
    formConfig: {
      CustomerMaster: {
        FirstName: {
          type: "text",
          value: "",
          validation: false,
          isRequired: true,
          requiredFieldMessage: "First Name is required.",
          acceptPattern: /^[A-Za-z]+$/,
          acceptPatternMessage: "Only A-Z and a-z are acceptable.",
          validatePattern: /^[A-Za-z]{5,10}$/,
          validatePatternMessage:
            "Please enter 5 to 10 characters. Only A-Z and a-z are acceptable.",
          maxLength: 11,
          label: "First Name *",
          name: "CustomerMaster.FirstName"
        },
        LastName: {
          type: "text",
          value: "",
          validation: false,
          isRequired: true,
          requiredFieldMessage: "Last Name is required.",
          acceptPattern: /^[A-Za-z]+$/,
          acceptPatternMessage: "Only A-Z and a-z are acceptable.",
          validatePattern: /^[A-Za-z]{5,10}$/,
          validatePatternMessage:
            "Please enter 5 to 10 characters. Only A-Z and a-z are acceptable.",
          maxLength: 11,
          label: "Last Name *",
          name: "CustomerMaster.LastName"
        },
        Company: {
          type: "text",
          value: "",
          validation: false,
          isRequired: false,
          acceptPattern: /^[A-Za-z]+$/,
          acceptPatternMessage: "Only A-Z and a-z are acceptable.",
          validatePattern: /^[A-Za-z]{3,10}$/,
          validatePatternMessage:
            "Please enter 3 to 10 characters. Only A-Z and a-z are acceptable.",
          maxLength: 11,
          label: "Company Name *",
          name: "CustomerMaster.Company"
        },
        LstAddressMaster: [
          {
            AddressLine1: {
              type: "text",
              value: "",
              validation: false,
              isRequired: true,
              requiredFieldMessage: "Address Line 1 is required.",
              acceptPattern: /^[A-Za-z]+$/,
              acceptPatternMessage: "Only A-Z and a-z are acceptable.",
              validatePattern: /^[A-Za-z]{3,10}$/,
              validatePatternMessage:"Please enter 3 to 10 characters. Only A-Z and a-z are acceptable.",
              maxLength: 11,
              label: "AddressLine1 *",
              name: "CustomerMaster.LstAddressMaster.0.AddressLine1"
            }
          }
        ]
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
    let obj={};
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
            obj[item]=isobjValid.obj;
            if (isValid && !isobjValid.isValid) {
              isValid = isobjValid.isValid;
            }
          });
        } else {
          if (fetchedObject.value != undefined) {
            obj[item]=fetchedObject.value;
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
            obj[item]=isobjValid.obj;
            if (isValid && !isobjValid.isValid) {
              isValid = isobjValid.isValid;
            }
          }
        }
      }
    });

    return {isValid,obj};
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    const isFormValid = this.validateForm();
    if (isFormValid.isValid) {
      alert(JSON.stringify(isFormValid.obj));
      this.setState({ isSubmitting: false });
    } else {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { CustomerMaster } = this.state.formConfig;
    return (
      <div className={`form-container`}>
        Form
        <form onSubmit={this.onFormSubmit}>
          <Input {...CustomerMaster.FirstName} onChange={this.onInputChange} />
          <Input {...CustomerMaster.LastName} onChange={this.onInputChange} />
          <Input {...CustomerMaster.LstAddressMaster[0].AddressLine1} onChange={this.onInputChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
