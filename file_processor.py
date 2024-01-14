# file_processor.py

class FileProcessor:
    expected_columns = [
        'Título Carregado', 'Quantidade', 'Preço', 'Data Carregamento',
        'Validade', 'Local', 'Titular', 'NIF', 'Numero do Cartão',
        'Autorização', 'Sub Entidade', 'Observações', 'Username',
        'Nome Completo do Utilizador'
    ]

    @staticmethod
    def check_columns(file_columns):
        return set(file_columns) == set(FileProcessor.expected_columns)