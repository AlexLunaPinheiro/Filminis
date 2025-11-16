import json
from http.server import BaseHTTPRequestHandler
from decimal import Decimal
import datetime
from .auth_utils import decode_jwt

# Serializador JSON customizado para lidar com Decimals, Timedelta, etc.
class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        if isinstance(obj, datetime.timedelta):
            return str(obj)
        if isinstance(obj, datetime.date):
            return obj.isoformat()
        return super().default(obj)

def send_json_response(handler, status_code, data):
    """Envia uma resposta JSON padronizada."""
    handler.send_response(status_code)
    handler.send_header('Content-type', 'application/json')
    handler.send_header('Access-Control-Allow-Origin', '*') # CORS
    handler.end_headers()
    handler.wfile.write(json.dumps(data, cls=CustomJSONEncoder).encode('utf-8'))

def parse_json_body(handler):
    """Lê e faz o parse do corpo da requisição (body) como JSON."""
    try:
        content_length = int(handler.headers.get('Content-Length', 0))
        if content_length == 0:
            return None
        body = handler.rfile.read(content_length)
        return json.loads(body.decode('utf-8'))
    except json.JSONDecodeError:
        return None
    except Exception as e:
        print(f"Erro ao fazer parse do body: {e}")
        return None

def get_auth_user(handler):
    """Verifica o token JWT no header e retorna os dados do usuário."""
    auth_header = handler.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return None
        
    token = auth_header.split(" ")[1]
    user_data = decode_jwt(token)
    return user_data

def handle_cors_options(handler):
    """Responde a requisições OPTIONS (pre-flight) para CORS."""
    handler.send_response(204) # 204 No Content
    handler.send_header('Access-Control-Allow-Origin', '*')
    handler.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    handler.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    handler.end_headers()