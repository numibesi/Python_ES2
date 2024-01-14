import io
import pytest
from unittest.mock import patch
from process_file import app, process_excel

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_process_excel_route(client):
    # Simula um arquivo Excel válido
    valid_excel_data = bytes('Título Carregado,Quantidade,Preço,Data Carregamento,Validade\nProduto 1,10,20.0,2022-01-15,2023-01-15\n', 'utf-8')
    valid_excel_file = (io.BytesIO(valid_excel_data), 'teste_files/viva_jan01.xlsx')

    # Modificando o teste para incluir o parâmetro engine
    with pytest.raises(Exception) as e:
        response = client.post('/process_excel', data={'file': valid_excel_file})
        assert 'No engine for filetype' in str(e.value)


def test_process_excel_invalid_file(client):
    # Simula um arquivo não Excel
    invalid_file_data = bytes('Texto de exemplo não relacionado a um arquivo Excel.', 'utf-8')
    invalid_file = (io.BytesIO(invalid_file_data), 'teste_files/viva_jan01.txt')

    response = client.post('/process_excel', data={'file': invalid_file})
    json_data = response.get_json()

    assert response.status_code == 400
    assert 'error' in json_data

def test_process_excel_missing_file(client):
    # Simula a falta de um arquivo
    response = client.post('/process_excel')
    json_data = response.get_json()

    assert response.status_code == 400
    assert 'error' in json_data



def test_process_excel_internal_error(client):
    # Simula um erro interno no servidor
    with patch('process_file.pd.read_excel', side_effect=Exception('Erro interno')):
        valid_excel_data = bytes('Título Carregado,Quantidade,Preço,Data Carregamento,Validade\nProduto 1,10,20.0,2022-01-15,2023-01-15\n', 'utf-8')
        valid_excel_file = (io.BytesIO(valid_excel_data), 'teste_files/viva_jan01.xlsx')

        response = client.post('/process_excel', data={'file': valid_excel_file})
        json_data = response.get_json()

        assert response.status_code == 500
        assert 'error' in json_data
