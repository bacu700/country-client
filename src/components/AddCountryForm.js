import React, { useState } from 'react';
import axios from 'axios';

const AddCountryForm = () => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [lada, setLada] = useState('');
  const [population, setPopulation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://bf68-187-190-193-231.ngrok-free.app/api/v1/countries/', {
      code,
      name,
      lada,
      population,
    })
      .then(response => {
        // TO DO: Handle successful response
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Código:
        <input type="text" value={code} onChange={(event) => setCode(event.target.value)} />
      </label>
      <br />
      <label>
        Nombre:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <br />
      <label>
        Lada:
        <input type="text" value={lada} onChange={(event) => setLada(event.target.value)} />
      </label>
      <br />
      <label>
        Población:
        <input type="number" value={population} onChange={(event) => setPopulation(event.target.value)} />
      </label>
      <br />
      <button type="submit">Agregar País</button>
    </form>
  );
};

export default AddCountryForm;