import React from 'react';
import {useEffect, useState} from 'react';

function timeout(ms) { //pass a time in milliseconds to this function
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Renderdata(props){
    const [data,SetData] = useState([]);
    const [isLoadded,SetIsLoadded ] = useState(false);

    useEffect(() => {
      // new Promise(resolve => setTimeout(resolve, 3000));
      timeout(100);
      fetch('/api/getdata', {accept: "application/json"})
        .then(res => res.json())
        .then(data => {
          SetData(data);
          SetIsLoadded(true);
        });
    },[isLoadded, props.tableLoad]);


    function renderTableData() {
      return data.map((person, index) => {
        const { name, age, pass, email, city, height, hobbies, weight, gender, lang, info } = person //destructuring
        return (
          <tr key={index}>
            <td>{pass}</td>
            <td>{name}</td>
            <td>{age}</td>
            <td>{email}</td>
            <td>{city}</td>
            <td>{height}</td>
            <td>{hobbies}</td>
            <td>{weight}</td>
            <td>{gender}</td>
            <td>{lang}</td>
            <td>{info}</td>
          </tr>
        ) 
      })
    }
    renderTableData()
    return (
      <div className="table-container">
        <h1 id='title' >{isLoadded ? "Table" : "Loadding...Table"}</h1>
        <div id="table-person">
          <table id='persons'>
            <tbody>
                 {renderTableData()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
