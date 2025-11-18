import mysql.connector
from config.settings import DB_CONFIG

def get_db_connection():
    """Cria uma conexão com o banco de dados"""
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except mysql.connector.Error as err:
        print(f"Erro ao conectar ao MySQL: {err}")
        return None

def execute_query(query, params=None, fetchone=False, fetchall=False, commit=False, get_last_id=False):
    """Função para executar queries """
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        if conn is None:
            raise Exception("Não foi possível conectar ao banco de dados.")
            
        cursor = conn.cursor(dictionary=True) # Retorna resultados como dicionários
        
        cursor.execute(query, params or ())

        if commit:
            conn.commit()
            if get_last_id:
                return cursor.lastrowid
            return True

        if fetchone:
            return cursor.fetchone()

        if fetchall:
            return cursor.fetchall()
            
        return None

    except mysql.connector.Error as err:
        print(f"Erro de SQL: {err}")
        if conn and commit:
            conn.rollback() # Desfaz em caso de erro
        return None
    
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()