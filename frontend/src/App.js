import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [name, setName] = useState('');
    const [edad, setEdad] = useState(0);
    const [event, setEvent] = useState(false);
    var Submit = event => {
        event.preventDefault();
        //var req = "http://localhost:8000/bra/{event.target.val}/89"
        var nombre = event.target[0].value
        var edad = event.target[1].value
        var uri = `http://localhost:8000/bra/${nombre}/${edad}`
        axios.get(uri)
            .then(function (response) {
                setName(response.data.nombre)
                setEdad(response.data.edad)
                setEvent(true)
            })
            .catch( ()=> alert("No hay edades negativas"));
    };
  return (
      <div>
          <header>
              <h1 style={{color:"yellow" }}>WEBMAC</h1>
          </header>
          <form onSubmit={Submit}>
          <label>
              Nombre del alumno:
              <br/>
            <input type="text" name="name" 
                onChange= {e =>{ setEvent(false);
                            setName(e.target.value)} }/>
              <br/>
              <br/>
              Edad del susodicho:
              <br/>
            <input type="number" name="age" 
                onChange= {e => setEdad(e.target.value) }/>
          </label>
              <br/>
          <button type="submit">Log In</button>
        </form>
          <h1>{event?name:''}</h1>
          <h1>{event?"Tu edad -> "+ edad:""}</h1>
      </div>
  );
}

export default App;
