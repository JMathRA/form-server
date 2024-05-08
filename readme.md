Para rodar a aplicação crie uma conexão com o mysql
e crie as seguintes tabelas

CREATE TABLE STUDENTS (
	id int PRIMARY KEY AUTO_INCREMENT,
  	fname varchar(50),
  	lname varchar(50),
 	bairro varchar(100),
  	rua varchar(200),
  	idade int(100),
  	estado varchar(20),
  	biografia varchar(500)
)

# Instalação e Execução
1. Abra o terminal e navegue até a pasta Form-Server.
2. Execute o comando npm install para instalar as dependências do servidor.
3. Inicie o servidor executando o comando node index.js.
## Agora o backend estará rodando e conectado ao seu banco de dados MySQL.

# Abra outro terminal e navegue até a pasta formprocessing.
1. Execute o comando npm install para instalar as dependências do frontend.
2. Inicie o frontend executando o comando npm run serve.
## Agora você pode acessar a aplicação através do navegador em http://localhost:8080.
