<h1 align="center"> FRIEND-RECOMMENDER </h1>

<p align="center">Este projeto consiste em um recomendador de amigos no qual uma pessoa pode obter sugestões de novos amigos se baseando nas amizades já existentes.</p>

<h1>Rotas implementadas:</h1>

<h2> Create Person </h2>

<p>Esta rota cadastra um usuário, recebendo um CPF e um nome.</p>

- Endpoint: http://localhost:3000/person
- HTTP Method: POST
- Retorna código HTTP CREATED (201) em caso de sucesso
- Retorna código HTTP BAD REQUEST (400) caso o usuário já exista ou caso o CPF informado não possua 11 dígitos numéricos.
- Entrada:
```bash
{
    "cpf": "12345678901",
    "name": "Maria"
}
```

<h2> Get Person </h2>

<p>Esta rota recebe um CPF e, se o usuário existir, retorna seus dados (nome e CPF). Caso contrário, retorna erro com status code 404.
</p>

- Endpoint: http://localhost:3000/person/CPF
- HTTP Method: GET
- Retorna código HTTP OK (200) em caso de sucesso
- Retorna código HTTP NOT FOUND (404) caso o usuário não exista.
- Saída:
```bash
{
    "cpf": "12345678901",
    "name": "Maria"
}
```

<h2> Create Relationship </h2>

<p>Esta rota recebe dois CPFs e, caso os dois usuários existam, cria um relacionamento entre eles. Caso contrário, retorna erro com status code 404. </p>

- Endpoint: http://localhost:3000/relationship
- HTTP Method: POST
- Retorna código HTTP CREATED (201) em caso de sucesso.
- Retorna código HTTP NOT FOUND (404) caso um dos usuários não exista.
- Retorna código HTTP BAD REQUEST (400) caso o relacionamento já exista ou se os dois CPFs inseridos forem iguais.
- Entrada:
```bash
{
    "cpf1": "12345678901",
    "cpf2": "12345678902"
}
```

<h2> Delete </h2>

<p>Esta rota limpa todos os dados (pessoas e relacionamentos)</p>

- Endpoint: http://localhost:3000/clean
- HTTP Method: DELETE
- Retorna código HTTP OK (200) em caso de sucesso

<h2> Get Recommendations </h2>

<p>Esta rota recebe um CPF e, se o usuário existir, retorna um Array contendo a lista de CPFs de todos os amigos dos amigos do usuário informado que não são seus amigos, ordenada de maneira decrescente pela relevância. Caso o usuário informado não exista, será retornado erro com status code 404. Caso o cpf informado não consista em 11 dígitos numéricos será retornado erro com status code 400.</p>

- Endpoint: http://localhost:3000/recommendations/CPF
- HTTP Method: GET
- Retorna código HTTP OK (200) em caso de sucesso
- Retorna código HTTP NOT FOUND (404) caso o usuário não exista.
- Retorna código BAD REQUEST (400) caso o cpf informado não consista em 11 dígitos numéricos.
- Saída:
```bash
[
    "12345678904", "12345678905"
]

```

<h1>Tecnologias</h1>

<p>Foram utilizadas as seguintes tecnologias no projeto:</p>

- [Node.js](https://nodejs.org/en/ "Node.js")
- [Typescript](https://www.typescriptlang.org/ "Typescript")
- [Express](http://expressjs.com/ "Express")
- [Tsyringe](https://github.com/microsoft/tsyringe/ "Tsyringe")
- [Jest](https://jestjs.io/ "Jest")
- [Eslint](https://eslint.org/ "Eslint")
- [Swagger](https://swagger.io/ "Swagger")

<h1>Documentação da API com Swagger</h1>
<p>Após executar a aplicação, a documentação da API com Swagger pode ser acessada pelo seguinte endereço: <a href="http://localhost:3000/api-docs">http://localhost:3000/api-docs </a></p>

<h1 id="how-to-run">Como executar a aplicação</h1>
<p>Primeiro faça o clone deste repositório: </p>

```bash
$ git clone https://github.com/yesminmarie/friend-recommender
```
<p> Se preferir, você pode executar esta aplicação utilizando o Docker Compose. Para isso, siga os próximos passos: </p>

```bash
# Execute o comando a seguir para subir a aplicação:
$ docker-compose up 

# Execute o comando a seguir para rodar os testes:
# Este comando criará um container temporário que será removido após a conclusão da execução dos testes.
$ docker-compose run --rm app yarn test
```
<p> Caso escolha executar a aplicação sem o Docker Compose, siga os próximos passos: </p>

```bash
# Entre na pasta do projeto
$ cd friend-recommender

# Você pode usar npm ou yarn para instalar as dependências, executar a aplicação e rodar os testes.

# Instale as dependências (npm)
$ npm install

# Instale as dependências (yarn)
$ yarn

# Execute o projeto (npm)
$ npm run dev

# Execute o projeto (yarn)
$ yarn dev

# Execute os testes (npm)
npm test

# Execute os testes (yarn)
yarn test
```
<hr>

Autora: [Yesmin Lahoud](https://github.com/yesminmarie)