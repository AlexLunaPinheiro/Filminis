# MaguFlix – ALEX LUNA PINHEIRO - DS 17

A MaguFlix é uma plataforma web desenvolvida para o contexto de aprendizado em tecnologias como react, python e mysql. O projeto foi idealizado pela professora Mariany Moraes Silva Lima, na Escola e Faculdade de Tecnologia Senai Roberto Mange com o intuito de cultivar o aprendizado de tecnologias web para o desenvolvimento de websites funcionais, utilizando de React (JS ou TS) para o front-end e Python para o back-end.
---

## 🎨📖 Links relacionados:

A prototipação da aplicação no figma pode ser vista nesse link:

[**Clique aqui para acessar o figma**](https://www.figma.com/design/7wVvAVjQcB9MecpgzqaEkI/Filminis?node-id=2-2&t=AKhnzsiHXh8UfixS-1)

A documentação do projeto pode ser acessada nesse link:

[**Clique aqui para acessar a documentação**](https://sesisenaispedu-my.sharepoint.com/:w:/g/personal/alex_pinheiro3_senaisp_edu_br/IQDU8XgaKJJKQ4OoVhgn6oyZAbn06CWzfQL7eE5fXmO0jU0?e=eVJPQ9)

## Funcionalidades:

### 🛡️ Autenticação
* Login com niveis de acesso: Administrador do sistema e Usuário padrão

### 🗺️ Catálogo e Pesquisa
* Visualizar catálogo de filmes, categorias, atores, diretores
* Busca de filmes por titulo
* Filtros por categoria e por ano de lançamento
* Ver informações específicas de um filme, como gênero, sinopse, banner, categorias, entre outras.

### 👨‍⚖️ Controle do catálogo e de solicitações
* Criação de solicitação de adição ou edição de filme (usuário comum)
* Visualização de solicitações (usuário comum)
* Visualização de dashboard contendo as solicitações (admin)
* Aceite ou desaprovação de solicitação (admin)
* Exclusão de filmes (admin)


---

## 🧑‍💻 Tecnologias

### Front-End
* React + Vite
* JavaScript
* Axios

### Back-End
* Python
* HTTPServer (módulo para lidar criação de web servers)
* PyJWT
* bcrypt

### Banco de Dados
* MySQL

---

## 👨‍🏫 Tutorial para rodar o projeto

Antes de rodar o projeto, é necessário configurar o ambiente e dependências do front e do back-end.

### 📁 1. Clonar o repositório
1. Certifique-se de ter o git bash instalado
2. copie o link do repositorio
3. Utilize o comando **git clone <link do repositorio>**

### 🗄️ 2. Banco de Dados MySQL (WorkBench ou outro editor de sql)
1.  Abra o editor de sql.
2.  Confira as configurações do seu banco de dados (porta, host, user e password)
3.  Abra o arquivo "MaguFlix.sql" no seu editor
4.  Teste a conexão e queries, rodando o script 

---

### 🔢 3. Back-End

1.  Acesse o diretório do back-end:
    ```bash
    cd Backend
    ```

3.  Acesse o diretório do src (pasta com os arquivos do backend organizados):
    ```bash
    cd src
    ```
4.  Crie uma virtual enviroment (venv):   
    ```bash
    python -m venv venv
    ```

5.  Instale as dependências do projeto:
    ```bash
    pip install -r requirements.txt
    ```


6.  Configure as credenciais do banco de dados no .env:
    * Abra o arquivo `/src/.env`.
    * Modifique as configurações do arquivo com suas configurações caso necessário:
        ```python
            # Configuração do Banco
            DB_HOST=localhost
            DB_USER="SEU USER"
            DB_PASSWORD="SUA SENHA"
            DB_NAME=filminis
            
            # Chave secreta para o JWT
            JWT_SECRET_KEY=palmeiras_campeao_libertadores_2025 <- Permanece o mesmo
        ```

7.  Inicie o servidor back-end:
    * Volte para a raiz da pasta `/src`.
    * Execute o arquivo `main.py`:
        ```bash
        python main.py
        ```
    * AGora seu backend está pronto para o consumo!

---

### 💻 3. Front-End

1.  Acesse o diretório do front-end em um novo terminal:
    ```bash
    cd Frontend
    ```

2.  Instale as dependências do seu projeto configuradas no package.json:
    ```bash
    npm install
    ```

3.  Inicie o projeto:
    ```bash
    npm run dev
    ```

4.  Acesse a aplicação no navegador:
    * [http://localhost:5173/](http://localhost:5173/)

---

## 🔐 Credenciais de acesso ao sistema:

### 👨‍⚖️ Administrador
* **Email:** `mariany@filminis.com`
* **Senha:** `123456`

### 👤 Usuário Padrão
* **Email:** `alexlp2k6@gmail.com`
* **Senha:** `123456`

---

