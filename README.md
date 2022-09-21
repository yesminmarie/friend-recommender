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
- Retorna código HTTP CREATED (201) em caso de sucesso
- Retorna código HTTP NOT FOUND (404) caso um dos usuários não exista.
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

<h1 id="technologies">Tecnologias</h1>

<p>Foram utilizadas as seguintes tecnologias no projeto:</p>

- [Node.js](https://nodejs.org/en/ "Node.js")
- [Typescript](https://www.typescriptlang.org/ "Typescript")
- [Express](http://expressjs.com/ "Express")
- [Tsyringe](https://github.com/microsoft/tsyringe/ "Tsyringe")
- [Jest](https://jestjs.io/ "Jest")
- [Eslint](https://eslint.org/ "Eslint")

<h1 id="how-to-run">Como executar a aplicação</h1>

```bash
# Faça o clone deste repositório
$ git clone https://github.com/yesminmarie/friend-recommender

# Entre na pasta do projeto
$ cd friend-recommender

# Instale as dependências (npm)
$ npm install

# Instale as dependências (yarn)
$ yarn

# Executar o projeto (npm)
$ npm run dev

# Executar o projeto (yarn)
$ yarn dev

# Executar os testes (npm)
npm test

# Executar os testes (yarn)
yarn test
```
<hr>

Autora: [Yesmin Lahoud](https://github.com/yesminmarie)