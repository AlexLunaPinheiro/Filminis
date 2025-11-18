import jwt
import bcrypt
import datetime
from config.settings import JWT_SECRET_KEY

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

#Função para verificar se a senha da response bate com a senha do banco
def check_password(password, hashed_password):
    
    password_bytes = password.encode('utf-8')
    hash_bytes = hashed_password.encode('utf-8')

    result = bcrypt.checkpw(password_bytes, hash_bytes)#Verifica a comparação da senha do banco com a senha que vem da response
    
    return result

#Função para criar um jwt
def create_jwt(user_id, role):
    payload = {
        'user_id': user_id,
        'role': role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)#Adiciona 24 horas na duração do token
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm="HS256")

#Função para decodificar o token jwt
def decode_jwt(token):
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        return payload
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None