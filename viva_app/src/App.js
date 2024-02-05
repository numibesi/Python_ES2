import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(null);
  const [excelValues, setExcelValues] = useState([]);
  const [dbBeneficiariosValues, setdbBeneficiariosValues] = useState([]);
  //const [dbTiposBeneficiariosValues, setdbTiposBeneficiariosValues] = useState([]);
  //const [dbClassSRHValues, setdbClassSRHValues] = useState([]);

  const [resultado, setResultado] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/process_excel', {
      method: 'POST',
      body: formData,
    })
    .then((response) => {
      if (response.ok)
        response.json().then((result) => {
          setColumns(`Resultado API: ${result.data.message}`);
          setExcelValues(result.data.excelValues);
          setdbBeneficiariosValues(result.data.dbBeneficiariosValues);
          //setdbTiposBeneficiariosValues(result.data.dbTiposBeneficiariosValues);
          //setdbClassSRHValues(result.data.dbClassSRH);
          setError(null);
          calcularResultado(result.data.excelValues, result.data.dbTiposBeneficiariosValues, result.data.dbBeneficiariosValues, result.data.dbClassSRH);            
          setFile(null);
        });
      else
        return response.json().then((result) => {
          setError(`Erro API: ${result.error.message}`);
          setExcelValues([]);
          setdbBeneficiariosValues([]);
          //setdbTiposBeneficiariosValues([]);
          //setdbClassSRHValues([]);
          setColumns([]);
          setFile(file);
        });
    }).catch((error) => {
      setError(`Erro API: Estado a API offline, ou problemas na sua ligação à internet!`);
      // Lide com o erro de maneira adequada (por exemplo, exibindo uma mensagem ao usuário)
    });;
  };

  const isSubmitDisabled = !file;

  // function calcularResultado(a,b,c) {
  //   const novoResultado = {};
  //   // Iterando sobre os valores do excelValues
  //   a.forEach((excelValor) => {
  //     const nifExcel = excelValor.NIF;

  //     // Encontrando o INumSHR correspondente ao NIF em dbBeneficiariosValues
  //     b.forEach((beneficiarioValor) => {
  //       if (beneficiarioValor.sNif === nifExcel) {
  //         const inumShr = beneficiarioValor.iNumSHR;

  //         // Encontrando o itipobeneficiario em dbClassSRH
  //         c.forEach((classSrhValor) => {
  //           if (classSrhValor.iminshr <= inumShr && inumShr <= classSrhValor.imaxsrh) {
  //             const itipoBeneficiario = classSrhValor.itipobeneficiario;

  //             // Acumulando o valor na tabela resultado
  //             if (!novoResultado[itipoBeneficiario]) {
  //               novoResultado[itipoBeneficiario] = {
  //                 itipobeneficiario: itipoBeneficiario,
  //                 classificador: [],
  //                 descricao: [],
  //                 valorTotal: 0,
  //               };
  //             }

  //             novoResultado[itipoBeneficiario].classificador.push(classSrhValor.classificador);
  //             novoResultado[itipoBeneficiario].descricao.push(classSrhValor.descricao);
  //             novoResultado[itipoBeneficiario].valorTotal += excelValor.Preço;
  //           }
  //         });
  //       }
  //     });
  //   });
  //   console.log(novoResultado);
  //   setResultado(novoResultado);
  // }

  const calcularResultado = (tabelaExcel, tiposBeneficiario, beneficiarios, codigosClassSRH) => {
    // Lógica de cálculo semelhante ao exemplo anterior
    // Certifique-se de substituir pelos dados reais
    const resultado = {};
    
    tabelaExcel.forEach((linhaExcel) => {
      const tipoBeneficiario = beneficiarios.find((tb) => tb.sNif === linhaExcel.NIF);
      if (tipoBeneficiario) {
        const tipoBeneficiarioId = tipoBeneficiario.iTipoBeneficiario;
        const descricaoTipoBeneficiario = tipoBeneficiario.sDescricao;
        const valorPasse = linhaExcel.Preço;

        const classSRH = codigosClassSRH.find((cs) => cs.itipobeneficiario === tipoBeneficiarioId);
        if (classSRH) {
          const classSRHId = classSRH.id;

          if (!resultado[classSRHId]) {
            resultado[classSRHId] = {
              idTipoBeneficiario: tipoBeneficiarioId,
              descricao: descricaoTipoBeneficiario,
              valorPasse: valorPasse
            };
          } else {
            resultado[classSRHId].valorPasse += valorPasse;
          }
        }
      }
    });
    console.log(Object.values(resultado))
    setResultado(Object.values(resultado));
    //return Object.values(resultado);
  };

  const total = resultado.reduce((acc, item) => acc + item.valorPasse, 0);

  return (
    <>
      {error && (
        <div class="row">
          <div class="col-xl-12 col-lg-11">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </div>
      )}      

      <div className="row">
        <div className="col-xl-4 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-primary">Tratamento do ficheiro VIVA</h6>              
            </div>
            <div className="card-body">
              <div>
                <form id="uploadForm" encType="multipart/form-data">
                  <label htmlFor="file">Escolha um arquivo Excel (.xlsx):</label>
                  <input type="file" className="form-control" name="file" accept=".xlsx" onChange={handleFileChange} required />
                </form>
              </div>
              <button style={{marginTop: "20px", width: "100%"}} className="btn btn-primary" onClick={uploadFile} disabled={isSubmitDisabled}>
                Enviar
              </button>              
            </div>
          </div>
        </div>
        
        {((dbBeneficiariosValues && dbBeneficiariosValues.length > 0) && (excelValues && excelValues.length > 0)) &&
        <div className="col-xl-8 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-primary">Resultado do tratamento de dados</h6>
            </div>
            <div class="card-body">
              {columns && columns.length > 0 && (
                <div className="alert alert-success alert-dismissible" role="alert">
                  {columns}
                </div>
              )}
              {(dbBeneficiariosValues && dbBeneficiariosValues.length > 0) &&
                <>
                Tamanho da BD: <strong>{dbBeneficiariosValues.length}</strong> registos<br />
                </>
              }
              {(excelValues && excelValues.length > 0) &&
                <>
                Dados Importados: <strong>  {excelValues.length}</strong> registos
                </>
              }
            </div>
          </div>
        </div>
        }
      </div>
    
      {(resultado && resultado.length > 0) &&
      <div className="row">
        <div className="col-xl-12 col-lg-11">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Total gasto por tipo de beneficiário:</h6>              
            </div>
            <div class="card-body">
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" style={{textAlign: 'center', width: '15%'}}>Tipo</th>
                      <th scope="col">Descrição</th>
                      <th scope="col" style={{textAlign: 'right'}}>Valor do Passe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultado.map((item, index) => (
                      <tr key={index}>
                        <td style={{textAlign: 'center'}}>{item.idTipoBeneficiario}</td>
                        <td>{item.descricao}</td>
                        <td style={{textAlign: 'right'}}>{item.valorPasse} €</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="text-end fw-bold">Total: {total} € </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default App;
