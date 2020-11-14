import React from 'react';
import { useState} from 'react';

import './App.css';
import FormComponent from "./component/FormComponent";
import Renderdata from "./component/Renderdata";


function App(){

  const [tableLoad, SetTableLoad] = useState(true);
  
  return (
    <div>
      <FormComponent title="Register" SetTableLoad={SetTableLoad} />
      <Renderdata tableLoad={tableLoad}  />
      <br/>
    </div>
  );
}

export default App;