import jwt
import bcrypt
import datetime
from config.settings import JWT_SECRET_KEY

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def check_password(password, hashed_password):
    print("\n--- DEBUG BCRYPT (MODO REPR) ---")
    
    # 1. Usando repr() para ver a string "real"
    print(f"Senha (repr): {repr(password)}")
    print(f"Hash (repr):  {repr(hashed_password)}")

    # 2. Codificar para bytes
    password_bytes = password.encode('utf-8')
    hash_bytes = hashed_password.encode('utf-8')

    # 3. A comparação (sem try/except)
    result = bcrypt.checkpw(password_bytes, hash_bytes)
    
    print(f"Resultado da Comparação: {result}")
    print("----------------------------------\n")
    
    return result

def create_jwt(user_id, role):
    payload = {
        'user_id': user_id,
        'role': role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm="HS256")

def decode_jwt(token):
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        return payload
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None