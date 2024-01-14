import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/process_excel', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok)
          return response.json().then((result) => {
            setColumns(`Resultado API: ${result.data.message}`);
            setError(null);
          });
        else
          return response.json().then((result) => {
            setError(`Erro API: ${result.error.message}`);
            setColumns([]);
          });
      });
  };

  const isSubmitDisabled = !file;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Upload Excel File</h1>
      <div className="mb-3">
        <form id="uploadForm" encType="multipart/form-data">
          <label htmlFor="file">Escolha um arquivo Excel (.xlsx):</label>
          <input type="file" className="form-control" name="file" accept=".xlsx" onChange={handleFileChange} required />
        </form>
      </div>
      <button className="btn btn-primary" onClick={uploadFile} disabled={isSubmitDisabled}>
        Enviar
      </button>


      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      {columns && columns.length > 0 && (
        <div className="mt-3">
          <div className="alert alert-success alert-dismissible mt-3" role="alert">
            {columns}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
