import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CountryList({ countries, openModal, handleDelete }) {
  return (
    <table className="table table-striped">
      <thead className="thead-dark">
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Lada</th>
          <th>Population</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {countries.map(country => (
          <tr key={country.code}>
            <td>{country.code}</td>
            <td>{country.name}</td>
            <td>{country.lada}</td>
            <td>{country.population}</td>
            <td>
              <button className="btn btn-warning me-2" onClick={() => openModal(country)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(country.code)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CountryList;
