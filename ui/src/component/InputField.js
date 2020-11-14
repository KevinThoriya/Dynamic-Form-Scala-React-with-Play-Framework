import React from 'react';

//handling Methods
function HandleMultipleChange(e,props){
  let value = [];
  for(var item of e.target.selectedOptions){value.push(item.value)}
  props.props.SetFormValue(prev=> { return Object.assign({}, prev, {[props.props.data.Name]: value})});
}
function HandleChange(e,props){
  let value = e.target.value;
  props.SetFormValue(prev=> { return Object.assign({}, prev, {[props.data.Name]: value})});
}

//all components of form.
function RadioButton(props){

  const option = JSON.parse(props.props.data.prop.option);
  const other = {...props.props.data.prop};
  delete other['option'];
  return(
    <div className="col-md-6 align-items-center di-in ">
      {props.props.data.label}
      {Object.keys(option).map((key, inx) => (
            <span key={inx}>
              <input
                type="radio"
                name={props.props.data.Name}
                value={key}
                onChange={(e)=> HandleChange(e,props.props)}
              />  {option[key]}
            </span>
            ))}
    </div>
  );
}
function CheckBox(props){  
  function HandleCheckboxChange(e){
    let value = [];
    document.getElementsByName(props.props.data.Name).forEach((checkbox)=> { if(checkbox.checked) value.push(checkbox.value)} );
    // for(var item of e.target.selectedOptions){value.push(item.value)}
    props.props.SetFormValue(prev=> { return Object.assign({}, prev, {[props.props.data.Name]: value})});
  }

  const option = JSON.parse(props.props.data.prop.option);
  const other = {...props.props.data.prop};
  delete other['option'];

  return(
    <div className="col-md-6 align-items-center di-in ">
      {props.props.data.label}
      {Object.keys(option).map((key, inx) => (
        <span key={inx}>
              <input
                type="checkbox"
                name={props.props.data.Name}
                value={key}
                onChange={(e)=> HandleCheckboxChange(e)}
              />  {option[key]}
            </span>
      ))}
    </div>
  );
}
function SelectMultiple(props){

  const option = JSON.parse(props.props.data.prop.option);
  const other = {...props.props.data.prop};
  delete other['option'];

  return(
    <div className="col-md-6 align-items-center di-in ">
      {props.props.data.label}
      <select
        className="custom-select"
        multiple name={props.props.data.Name}
        onChange={(e)=> HandleMultipleChange(e,props)}
        {...other}>
          {  Object.keys(option).map((key, inx) => (
            <option value={key} key={inx}>{option[key]}</option>
          ))}
      </select>
    </div>
  );
}
function SelectSingle(props) {
  const option = JSON.parse(props.props.data.prop.option);
  const other = {...props.props.data.prop};
  delete other['option'];

  return(
    <div className="col-md-6 align-items-center di-in ">
      {props.props.data.label}
      <select
        name={props.props.data.Name}
        className="custom-select"
        onChange={(e)=> HandleChange(e,props.props)}
        {...other}>
        {  Object.keys(option).map((key, inx) => (
          <option value={key} key={inx}>{option[key]}</option>
        ))}
      </select>
    </div>
  );
}
function TextInput(props) {
  return (
    <div key={props.props.inx} className="col-md-6 align-items-center di-in">
      {props.props.data.label}
      <input
        className="form-control"
        type={props.props.data.inputType}
        name={props.props.data.Name}
        onChange={(e)=> HandleChange(e,props.props)}
        {...props.props.data.prop}
      />
    </div> )
}

function TextAreaInput(props) {
  return (
    <div key={props.props.inx} className="col-md-6 align-items-center di-in">
      {props.props.data.label}
      <textarea
        className="form-control"
        name={props.props.data.Name}
        onChange={(e)=> HandleChange(e,props.props)}
        {...props.props.data.prop}
      />
    </div> )
}

// main Component for genrating various Input Fields
export default function InputField(props) {
  if (props.data.inputType === "select") return ( <SelectSingle props={props} />)
    else if(props.data.inputType === "select-multiple")  return (<SelectMultiple props={props} />)
    else if(props.data.inputType === "radio") return (<RadioButton props={props} /> )
    else if(props.data.inputType === "checkbox") return (<CheckBox  props={props} /> )
    else if(props.data.inputType === "textarea") return (<TextAreaInput  props={props} /> )
    else return (<TextInput props={props} />)
 }

