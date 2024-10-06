import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'datatables.net-dt';
//import 'datatables.net-dt/css/jquery.dataTables.min.css';
//import 'datatables.net-dt/css/jquery.dataTables.css';

function CountryList({ openModal, handleDelete }) {
  const tableRef = useRef(null);

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      destroy: true,
      serverSide: true, // Habilitar procesamiento del lado del servidor
      ajax: {
        url: 'http://localhost:8000/api/v1/countries/search', // Cambia por el endpoint de tu API
        type: 'GET',
        data: function (d) {
          return {
            term: d.search.value, // Parámetro de búsqueda
            page: d.start / d.length + 1, // Número de página
            page_size: d.length, // Tamaño de página
          };
        },
        dataSrc: function (json) {
          return json.data;
        },
      },
      columns: [
        { data: 'code' },
        { data: 'name' },
        { data: 'lada' },
        { data: 'population' },
        {
          data: null,
          render: function (data) {
            return `
              <button class="btn btn-warning me-2 edit-button" data-code="${data.code}">Edit</button>
              <button class="btn btn-danger delete-button" data-code="${data.code}">Delete</button>
            `;
          },
        },
      ],
    });

    // Eventos para botones de editar y eliminar
    $(tableRef.current).on('click', '.edit-button', function () {
      const code = $(this).data('code');
      const country = table.data().toArray().find(c => c.code === code);
      openModal(country);
    });

    $(tableRef.current).on('click', '.delete-button', function () {
      const code = $(this).data('code');
      handleDelete(code);
    });

    return () => {
      table.destroy(true); // Limpiar la instancia de DataTables al desmontar
    };
  }, [openModal, handleDelete]);

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
        {/* Los datos serán manejados automáticamente por DataTables */}
      </tbody>
    </table>
  );
}

export default CountryList;
