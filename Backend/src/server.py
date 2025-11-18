from http.server import HTTPServer
from http_handler import FilminisHTTPHandler

HOST = 'localhost'
PORT = 8000

def run_server():
    try:
        server_address = (HOST, PORT)
        httpd = HTTPServer(server_address, FilminisHTTPHandler)
        
        print(f"Servidor backend do Filminis rodando em http://{HOST}:{PORT}")
        print("Pressione Ctrl+C para parar o servidor.")
        
        httpd.serve_forever()
        
    except KeyboardInterrupt:
        print("\nServidor parado.")
        httpd.server_close()
    except Exception as e:
        print(f"Erro ao iniciar o servidor: {e}")

if __name__ == '__main__':
    run_server()