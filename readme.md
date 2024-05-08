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

apos a criação da tabela rode npm install na pasta Form-Server

depois rode o comando npm install dentro da pasta formprocessing

apos isso poderar executar o front e backend em seu servidor

user o comando node index.js para iniciar o back-end

use o comando npm run serve para iniciar o front-end