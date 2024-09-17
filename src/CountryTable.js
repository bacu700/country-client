// CountryTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// Configurar el modal
Modal.setAppElement('#root');

const CountryTable = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCountry, setNewCountry] = useState({
    code: '',
    name: '',
    lada: '',
    population: '',
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://bf68-187-190-193-231.ngrok-free.app/api/v1/countries/');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleDelete = async (code) => {
    if (window.confirm('¿Estás seguro de eliminar este país?')) {
      try {
        await axios.delete(`https://bf68-187-190-193-231.ngrok-free.app/api/v1/countries/${code}`);
        fetchCountries(); // Actualiza la lista de países después de eliminar
      } catch (error) {
        console.error('Error deleting country:', error);
      }
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post('https://bf68-187-190-193-231.ngrok-free.app/api/v1/countries/', newCountry);
      setNewCountry({ code: '', name: '', lada: '', population: '' }); // Limpia el formulario
      fetchCountries(); // Actualiza la lista de países después de agregar
      closeModal(); // Cierra el modal después de agregar
    } catch (error) {
      console.error('Error adding country:', error);
    }
  };

  const openModal = (country) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Agregar País</button>

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>LADA</th>
            <th>Población</th>
            <th>Operación</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(countries) && countries.length > 0 ? (
            countries.map((country) => (
              <tr key={country.code}>
                <td>{country.code}</td>
                <td>{country.name}</td>
                <td>{country.lada}</td>
                <td>{country.population}</td>
                <td>
                  <button onClick={() => openModal(country)}>Ver</button>
                  <button onClick={() => handleDelete(country.code)}>Eliminar</button>
                  {/* Implementar la funcionalidad de edición aquí */}
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No se encontraron datos</td></tr>
          )}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        {selectedCountry ? (
          <div>
            <h2>Detalles del País</h2>
            <p><strong>Código:</strong> {selectedCountry.code}</p>
            <p><strong>Nombre:</strong> {selectedCountry.name}</p>
            <p><strong>LADA:</strong> {selectedCountry.lada}</p>
            <p><strong>Población:</strong> {selectedCountry.population}</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        ) : (
          <div>
            <h2>Agregar País</h2>
            <label>
              Código:
              <input
                type="text"
                value={newCountry.code}
                onChange={(e) => setNewCountry({ ...newCountry, code: e.target.value })}
              />
            </label>
            <label>
              Nombre:
              <input
                type="text"
                value={newCountry.name}
                onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
              />
            </label>
            <label>
              LADA:
              <input
                type="text"
                value={newCountry.lada}
                onChange={(e) => setNewCountry({ ...newCountry, lada: e.target.value })}
              />
            </label>
            <label>
              Población:
              <input
                type="number"
                value={newCountry.population}
                onChange={(e) => setNewCountry({ ...newCountry, population: e.target.value })}
              />
            </label>
            <button onClick={handleAdd}>Agregar</button>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CountryTable;
