import bcrypt

# A senha que queremos
password = "123456"

# Codificar para bytes
password_bytes = password.encode('utf-8')

# Gerar o "sal" e o hash
hashed_bytes = bcrypt.hashpw(password_bytes, bcrypt.gensalt())

# Decodificar de volta para string, para podermos copiar
hashed_string = hashed_bytes.decode('utf-8')

print("\n--- SEU NOVO HASH 100% CONFIÁVEL ---")
print(f"Senha: {password}")
print(f"Seu novo hash: {hashed_string}")
print("\nCOPIE E COLE O HASH ACIMA NO SEU COMANDO UPDATE DO BANCO DE DADOS!")