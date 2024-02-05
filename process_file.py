# main_app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from database import listaBenefeciarios, listaTiposBenefeciario, classSRH #, calcular_resultado

app = Flask(__name__)
CORS(app)

@app.route('/process_excel', methods=['POST'])
def process_excel():
    try:
        if 'file' not in request.files:
            return jsonify({'error': {'message' : 'Nenhum arquivo anexado'}}), 400

        file = request.files['file']

        if file and file.filename.endswith('.xlsx'):
            df = pd.read_excel(file)

            df = df.fillna("")
            
            file_columns = df.columns.tolist()

            df['Data Carregamento'] = df['Data Carregamento'].astype(str)
            df['Validade'] = df['Validade'].astype(str)
            dados_formatados = df.to_dict(orient='records')

            expected_columns = [
                'Título Carregado', 'Quantidade', 'Preço', 'Data Carregamento',
                'Validade', 'Local', 'Titular', 'NIF', 'Numero do Cartão',
                'Autorização', 'Sub Entidade', 'Observações', 'Username',
                'Nome Completo do Utilizador'
            ]

            #Ficheiro é válido
            if set(file_columns) == set(expected_columns):
                return jsonify({'data': {
                    'message' : 'Sucesso o Ficheiro é Válido',
                    'dbBeneficiariosValues' : listaBenefeciarios(),
                    'dbTiposBeneficiariosValues' : listaTiposBenefeciario(),
                    'dbClassSRH' : classSRH(),
                    'excelValues' : dados_formatados,
                    #'resultados' : calcular_resultado(dados_formatados)
                }}), 200
                #return jsonify({'data': {'excelValues' : dados_formatados, 'dbValues' : realizar_query(), 'message' : 'Sucesso o Ficheiro é Válido'}}), 200
            else:
                return jsonify({'error': {'message' : 'Colunas do arquivo não correspondem às esperadas'}}), 400
        else:
            return jsonify({'error': {'message' : 'O arquivo deve ser um arquivo Excel (.xlsx)'}}), 400
    except Exception as e:
        print(e)
        return jsonify({'error': {'message' : 'Ficheiro Inválido'}}), 500

if __name__ == '__main__':
    app.run(debug=False)
