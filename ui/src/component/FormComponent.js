import React from 'react';
import {useEffect, useState} from 'react';
import InputField from "./InputField";

export default function FormComponent(props) {
    const [formdata,SetFormData] = useState([]);
    const [formValue,SetFormValue] = useState({});
    const [isLoadded,SetIsLoadded] = useState(false);
    useEffect(() => {
      fetch('/api/getMetadata', {accept: "application/json"})
        .then(res => res.json())
        .then(data => {
          SetFormData(data);
          // console.log(data);
          SetIsLoadded(true);
        });
    },[isLoadded]);

    function submitForm(e){
      //console.log(formValue);
      e.preventDefault();
      fetch('/api/submitForm', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValue)
      });
      props.SetTableLoad(prev => {
        return !prev
      });
    }

    return (
      <div className="form-container">
        <h1>
          {isLoadded ? props.title : "Loadding... Form" }
        </h1>
        <div className="form-group">

          <form onSubmit={submitForm} >
            {formdata.map((data, inx) =>
            <InputField key={inx} data={data} formValue={formValue} SetFormValue={SetFormValue} />
            )
          }
          </form>
        </div>
      </div>
    );

  }
