import React, { useState, useEffect } from 'react';

const CountryForm = ({ addCountry, currentCountry, updateCountry, editing, setEditing }) => {
  const [country, setCountry] = useState({ codigo: '', nombre: '', lada: '', poblacion: '' });

  useEffect(() => {
    if (editing) {
      setCountry(currentCountry);
    } else {
      setCountry({ codigo: '', nombre: '', lada: '', poblacion: '' });
    }
  }, [currentCountry, editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCountry({ ...country, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      updateCountry(country);
    } else {
      addCountry(country);
    }
    setCountry({ codigo: '', nombre: '', lada: '', poblacion: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="codigo"
        value={country.codigo}
        onChange={handleChange}
        placeholder="Código"
        required
      />
      <input
        type="text"
        name="nombre"
        value={country.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        type="text"
        name="lada"
        value={country.lada}
        onChange={handleChange}
        placeholder="Lada"
        required
      />
      <input
        type="number"
        name="poblacion"
        value={country.poblacion}
        onChange={handleChange}
        placeholder="Población"
        required
      />
      <button type="submit">{editing ? 'Actualizar' : 'Agregar'}</button>
      {editing && <button onClick={() => setEditing(false)}>Cancelar</button>}
    </form>
  );
};

export default CountryForm;