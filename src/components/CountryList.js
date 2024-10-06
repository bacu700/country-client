import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
// import 'datatables.net-bs4';
import 'datatables.net-dt';
// import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

function CountryList({ countries, openModal, handleDelete }) {
  const tableRef = useRef(null);

 useEffect(() => {
    const table = $(tableRef.current).DataTable({
      serverSide: true, // Activa el procesamiento del lado del servidor
      ajax: {
        url: 'http://localhost:8000/api/v1/countries/search/', // Cambia esta URL según tu endpoint
        type: 'GET',
        data: function(d) {
          // Envía los parámetros necesarios al backend
          return {
            term: d.search.value,   // El término de búsqueda desde DataTables
            page: (d.start / d.length) + 1, // La página actual
            page_size: d.length     // Número de registros por página
          };
        },
        dataSrc: 'data' // Indica a DataTables dónde encontrar los datos en la respuesta
      },
      columns: [
        { data: 'code' },
        { data: 'name' },
        { data: 'lada' },
        { data: 'population' },
        {
          data: null,
          render: function(data) {
            return `
              <button class="btn btn-warning me-2 edit-button" data-code="${data.code}">Edit</button>
              <button class="btn btn-danger delete-button" data-code="${data.code}">Delete</button>
            `;
          }
        }
      ]
    });

    $(tableRef.current).on('click', '.edit-button', function() {
      const code = $(this).data('code');
      const country = countries.find(c => c.code === code);
      openModal(country);
    });

    $(tableRef.current).on('click', '.delete-button', function() {
      const code = $(this).data('code');
      handleDelete(code);
    });

    return () => {
      // table.destroy(true);
    };
  }, [countries, openModal, handleDelete]);

  return (
    <table className="table table-striped" ref={tableRef}>
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
        {/* Los datos se llenan automáticamente desde DataTable */}
      </tbody>
    </table>
  );
}

export default CountryList;
