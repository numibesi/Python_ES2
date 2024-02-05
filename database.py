import mysql.connector
from flask import jsonify

def conectar_banco_dados():
    # Configurar as informações de conexão
    config = {
      'user': 'root',
      'password': '',
      'host': 'localhost',
      'database': 'tribunal',
      'raise_on_warnings': True
    }

    # Conectar ao banco de dados
    conexao = mysql.connector.connect(**config)

    return conexao

def fechar_conexao(conexao, cursor):
    # Fechar o cursor e a conexão com o banco de dados
    cursor.close()
    conexao.close()

def listaBenefeciarios():
    try:
        # Criar um cursor para executar consultas
        conexao = conectar_banco_dados()
        cursor = conexao.cursor()

        # Exemplo de query SELECT com JOIN entre duas tabelas
        query = """
        select b.iNumSHR, b.sNif, b.sNome, b.iTipoBeneficiario, tb.sDescricao 
        FROM benefeciario as b 
            INNER JOIN tipobeneficiario as tb 
                ON b.iTipoBeneficiario = tb.iTipoBeneficiario;
        """

        # Executar a query
        cursor.execute(query)

        # Obter os resultados
        resultados = cursor.fetchall()

        # Obter os nomes das colunas
        colunas = [i[0] for i in cursor.description]

        # Criar uma lista de dicionários para cada linha
        linhas = [dict(zip(colunas, linha)) for linha in resultados]

        # Obter os nomes das colunas
        colunas = [i[0] for i in cursor.description]

        # Criar uma lista de dicionários para cada linha
        linhas = [dict(zip(colunas, linha)) for linha in resultados]

        return linhas           

    finally:
        # Chamar a função fechar_conexao para fechar o cursor e a conexão
        fechar_conexao(conexao, cursor)

def listaTiposBenefeciario():
    try:
        # Criar um cursor para executar consultas
        conexao = conectar_banco_dados()
        cursor = conexao.cursor()

        # Exemplo de query SELECT com JOIN entre duas tabelas
        query = """
        SELECT * 
        FROM tipobeneficiario;
        """

        # Executar a query
        cursor.execute(query)

        # Obter os resultados
        resultados = cursor.fetchall()

        # Obter os nomes das colunas
        colunas = [i[0] for i in cursor.description]

        # Criar uma lista de dicionários para cada linha
        linhas = [dict(zip(colunas, linha)) for linha in resultados]

        # Obter os nomes das colunas
        colunas = [i[0] for i in cursor.description]

        # Criar uma lista de dicionários para cada linha
        linhas = [dict(zip(colunas, linha)) for linha in resultados]

        return linhas           

    finally:
        # Chamar a função fechar_conexao para fechar o cursor e a conexão
        fechar_conexao(conexao, cursor)

def classSRH():
    try:
        # Criar um cursor para executar consultas
        conexao = conectar_banco_dados()
        cursor = conexao.cursor()

        # Exemplo de query SELECT com JOIN entre duas tabelas
        query = """
        SELECT * 
        FROM classsrh;
        """

        # Executar a query
        cursor.execute(query)

        # Obter os resultados
        resultados = cursor.fetchall()

        # Obter os nomes das colunas
        colunas = [i[0] for i in cursor.description]

        # Criar uma lista de dicionários para cada linha
        linhas = [dict(zip(colunas, linha)) for linha in resultados]

        # Obter os nomes das colunas
        colunas = [i[0] for i in cursor.description]

        # Criar uma lista de dicionários para cada linha
        linhas = [dict(zip(colunas, linha)) for linha in resultados]

        return linhas           

    finally:
        # Chamar a função fechar_conexao para fechar o cursor e a conexão
        fechar_conexao(conexao, cursor)

##def calcular_resultado(excel_values):
    novo_resultado = {}

    # Iterando sobre os valores do excel_values
    for excel_valor in excel_values:
        nif_excel = excel_valor['NIF']

        # Encontrando o INumSHR correspondente ao NIF em db_beneficiarios_values
        for beneficiario_valor in listaBenefeciarios:
            if beneficiario_valor['sNif'] == nif_excel:
                inum_shr = beneficiario_valor['iNumSHR']

                # Encontrando o itipo_beneficiario em db_class_srh
                for class_srh_valor in classSRH:
                    if class_srh_valor['iminshr'] <= inum_shr <= class_srh_valor['imaxsrh']:
                        itipo_beneficiario = class_srh_valor['itipobeneficiario']

                        # Acumulando o valor na tabela resultado
                        if itipo_beneficiario not in novo_resultado:
                            novo_resultado[itipo_beneficiario] = {
                                'itipobeneficiario': itipo_beneficiario,
                                'classificador': [],
                                'descricao': [],
                                'valorTotal': 0,
                            }

                        novo_resultado[itipo_beneficiario]['classificador'].append(class_srh_valor['classificador'])
                        novo_resultado[itipo_beneficiario]['descricao'].append(class_srh_valor['descricao'])
                        novo_resultado[itipo_beneficiario]['valorTotal'] += excel_valor['Preço']

    return novo_resultado
