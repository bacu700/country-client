import React, { useState } from 'react';
import axios from 'axios';

const EditCountryForm = ({ country, onClose }) => {
  const [code, setCode] = useState(country.code);
  const [name, setName] = useState(country.name);
  const [lada, setLada] = useState(country.lada);
  const [population, setPopulation] = useState(country.population);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.patch(`https://bf68-187-190-193-231.ngrok-free.app/api/v1/countries/${country.id}/`, {
      code,
      name,
      lada,
      population,
    })
      .then(response => {
        onClose();
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
      <button type="submit">Actualizar País</button>
      <button onClick={onClose}>Cancelar</button>
    </form>
  );
};

export default EditCountryForm;