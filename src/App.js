import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './components/CountryList';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

Modal.setAppElement('#root');

function App() {
  const [countries, setCountries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState({ code: '', name: '', lada: '', population: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({ lada: '' });

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/countries/')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching countries', error));
  }, []);

  const validateLada = (lada) => {
    if (!/^\d+$/.test(lada)) {
      setErrors({ lada: 'Lada must be a number' });
      return false;
    }
    setErrors({ lada: '' });
    return true;
  };

  const openModal = (country = { code: '', name: '', lada: '', population: '' }) => {
    setCurrentCountry(country);
    setIsEditing(!!country.code);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCountry({ code: '', name: '', lada: '', population: '' });
    setErrors({ lada: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateLada(currentCountry.lada)) return;

    if (isEditing) {
      axios.put(`http://localhost:8000/api/v1/countries/`, currentCountry)
        .then(() => {
          setCountries(countries.map(c => c.code === currentCountry.code ? currentCountry : c));
          closeModal();
        });
    } else {
      axios.post('http://localhost:8000/api/v1/countries/', currentCountry)
        .then(response => {
          setCountries([...countries, response.data]);
          closeModal();
        });
    }
  };

  const handleDelete = (code) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/api/v1/countries/`, { params: { code } })
          .then(() => {
            setCountries(countries.filter(country => country.code !== code));
            Swal.fire(
              'Deleted!',
              'The country has been deleted.',
              'success'
            );
          })
          .catch(error => {
            console.error('Error deleting country', error);
            Swal.fire(
              'Error!',
              'There was an issue deleting the country.',
              'error'
            );
          });
      }
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Country List</h1>
      <button className="btn btn-primary mb-3" onClick={() => openModal()}>Add Country</button>
      <CountryList countries={countries} openModal={openModal} handleDelete={handleDelete} />

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEditing ? 'Edit Country' : 'Add Country'}</h5>
            <button type="button" className="close" onClick={closeModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Code:</label>
                <input type="text" className="form-control" value={currentCountry.code} onChange={e => setCurrentCountry({ ...currentCountry, code: e.target.value })} disabled={isEditing} required />
              </div>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" className="form-control" value={currentCountry.name} onChange={e => setCurrentCountry({ ...currentCountry, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Lada:</label>
                <input type="text" className="form-control" value={currentCountry.lada} onChange={e => {
                  setCurrentCountry({ ...currentCountry, lada: e.target.value });
                  validateLada(e.target.value);
                }} required />
                {errors.lada && <small className="text-danger">{errors.lada}</small>}
              </div>
              <div className="form-group">
                <label>Population:</label>
                <input type="number" className="form-control" value={currentCountry.population} onChange={e => setCurrentCountry({ ...currentCountry, population: e.target.value })} required />
              </div>
              <button type="submit" className="btn btn-success">{isEditing ? 'Update' : 'Create'}</button>
              <button type="button" className="btn btn-secondary ml-2" onClick={closeModal}>Cancel</button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
