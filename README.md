1 - Site em deploy na vercel e banco de dados na planetscale:
- front-end (deploy): https://mern-crud-seven.vercel.app/login
- back-end (deploy): https://mern-crud-api-rho.vercel.app/api/v1/
- repositório: https://github.com/jorgemeyrelles/mern-crud

Neste projeto, tento simular uma situação de trabalho, com dois ambientes de trabalho (dev e prod), com PR e issues.
Toda a melhoria do trabalho está nas issues que em breve serão utilizadas na utilização da ferramenta de projeto (Project). 
Foi utilizado banco de dados com MySQL, React para o front end, a estilização foi feita com Material UI e o deploy na vercel.

2 - Site com "deploy" utilizando Docker compose:
- repositório: https://github.com/jorgemeyrelles/crudDockerized

Este é o mesmo site do item 1, mas com algumas melhorias na relação entre tabelas, com a utilização de ORM (Sequelize) e com banco POSTGRES, além de ter sido feito com Docker e Docker-compose.
Para acessar o site na porta 3000, siga os passos:
- git clone
- cd ./[pasta do projeto]
- docker compose up

o site estará no http://localhost:3000
