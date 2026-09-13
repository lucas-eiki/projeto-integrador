# Contrato da API de Turismo

## 1. Visão geral

Esta API permite cadastrar, consultar, editar e excluir **pontos turísticos** e consultar os **estados** disponíveis.

### Base URL

``` text
http://localhost:8080
```

------------------------------------------------------------------------

## Resumo dos endpoints

  Método            | Endpoint                    | Função                              | Sucesso
  ------------------|-----------------------------|-------------------------------------|------------------
  GET               | `/pontos-turisticos`        | Lista e pesquisa pontos turísticos  | 200 / 204
  GET               | `/pontos-turisticos/{id}`   | Busca um ponto turístico pelo ID    | 200
  POST              | `/pontos-turisticos`        | Cadastra um ponto turístico         | 201
  PUT               | `/pontos-turisticos/{id}`   | Atualiza um ponto turístico         | 200
  DELETE            | `/pontos-turisticos/{id}`   | Exclui um ponto turístico           | 200
  GET               | `/estados`                  | Lista os estados                    | 200

--------------------------------------------------------------------------

## 2. Pontos turísticos

Recurso principal:

``` text
/pontos-turisticos
```

Um ponto turístico possui:

  | Campo         | Tipo      | Obrigatório   |Descrição                          |
  | ------------- | --------- | ------------- |---------------------------------- |
  | `id`          | Long      | Não           |Identificador do ponto turístico   |
  | `nome`        | String    | Sim           |Nome do ponto turístico            |
  | `descricao`   | String    | Não\*         |Descrição do ponto                 |
  | `endereco`    | String    | Sim           |Endereço do ponto                  |
  | `estadoId`    | Integer   | Sim           |ID do estado                       |
  | `categoria`   | String    | Sim           |Categoria do ponto                 |


------------------------------------------------------------------------

# 3. Endpoints

## GET `/pontos-turisticos`

Retorna todos os pontos turísticos.

Também permite pesquisar e filtrar os resultados.

### Parâmetros opcionais
  | Parâmetro     | Tipo             | Descrição                                 |
  | ------------- | -----------------| ------------------------------------------|
  | `q`           | String           | Pesquisa por nome, descrição ou categoria |
  | `endereco`    | String           | Filtra pelo endereço                      |
  | `estadosId`   | Vetor de Integer | Filtra pelos IDs dos estados              |

### Exemplo

``` http
GET http://localhost:8080/pontos-turisticos
```

### Pesquisar por texto

O parâmetro `q` pesquisa no **nome**, na **descrição** e na
**categoria**.

``` http
GET http://localhost:8080/pontos-turisticos?q=museu
```

### Filtrar por endereço

``` http
GET http://localhost:8080/pontos-turisticos?endereco=Salvador
```

### Filtrar por estado

``` http
GET http://localhost:8080/pontos-turisticos?estadosId=25
```

### Filtrar por mais de um estado

O parâmetro pode ser repetido:

``` http
GET http://localhost:8080/pontos-turisticos?estadosId=25&estadosId=19
```

Nesse exemplo:

-   `25` = São Paulo
-   `19` = Rio de Janeiro

### Combinar filtros

``` http
GET http://localhost:8080/pontos-turisticos?q=museu&endereco=Salvador&estadosId=5
```

### Respostas

**200 OK**

Retorna uma lista com os pontos encontrados.

``` json
[
  {
    "id": 1,
    "nome": "Museu do Ipiranga",
    "descricao": "Museu histórico localizado em São Paulo.",
    "endereco": "Parque da Independência, São Paulo",
    "estado": "São Paulo",
    "categoria": "Museu"
  },
  {
    "id": 2,
    "nome": "Avenida Paulista",
    "descricao": "Principal centro financeiro e cultural de São Paulo, com 2.700 metros de extensão ligando a região do Paraíso à Consolação.",
    "endereco": "Avenida Paulista, São Paulo",
    "estado": "São Paulo",
    "categoria": "Centro cultural e turístico"
  }
]
```

**204 No Content**

Quando nenhum ponto turístico é encontrado.

**400 Bad Request**

Quando algum dos parâmetros é passado incorretamente.

------------------------------------------------------------------------

## GET `/pontos-turisticos/{id}`

Retorna um ponto turístico específico pelo ID.

### Exemplo

``` http
GET http://localhost:8080/pontos-turisticos/1
```

### Respostas

**200 OK**

Retorna um ponto turístico.

``` json
{
  "id": 1,
  "nome": "Museu do Ipiranga",
  "descricao": "Museu histórico localizado em São Paulo.",
  "endereco": "Parque da Independência, São Paulo",
  "estado": "São Paulo",
  "categoria": "Museu"
}
```

**400 Bad Request**

Quando o id é passado incorretamente.

**404 Not Found**

Quando não for encontrado um registro com o ID passado.

``` json
{
  "errorCode": "PONTO_TURISTICO_NAO_ENCONTRADO",
  "mensagem": "Ponto turístico de ID 99 não encontrado"
}
```

------------------------------------------------------------------------

## POST `/pontos-turisticos`

Cadastra um novo ponto turístico.

### Corpo da requisição

``` json
{
  "nome": "Museu do Ipiranga",
  "descricao": "Museu histórico localizado em São Paulo.",
  "endereco": "Parque da Independência, São Paulo",
  "estadoId": 25,
  "categoria": "Museu"
}
```

### Validações

Os seguintes campos são obrigatórios:

-   `nome`
-   `descricao`
-   `endereco`
-   `estadoId`
-   `categoria`

### Exemplo

``` http
POST http://localhost:8080/pontos-turisticos
Content-Type: application/json
```

``` json
{
  "nome": "Museu do Ipiranga",
  "descricao": "Museu histórico localizado em São Paulo.",
  "endereco": "Parque da Independência, São Paulo",
  "estadoId": 25,
  "categoria": "Museu"
}
```

### Respostas

**201 Created**

Retorna o ponto turístico criado.

``` json
{
  "id": 1,
  "nome": "Museu do Ipiranga",
  "descricao": "Museu histórico localizado em São Paulo.",
  "endereco": "Parque da Independência, São Paulo",
  "estado": "São Paulo",
  "categoria": "Museu"
}
```


**400 Bad Request**

Quando algum dos campos obrigatórios estiver vazio ou não for informado:


``` json
{
  "errorCode": "PONTO_TURISTICO_REQUEST_INVALIDO",
  "erros": {
    "estado": "Preencha o estado corretamente",
    "endereco": "Preencha o endereço corretamente",
    "categoria": "Preencha a categoria corretamente",
    "nome": "Preencha o nome corretamente",
    "descricao": "Preencha a descricao corretamente"
  }
}
```

**409 Conflict**

Quando tentar cadastrar um ponto turístico que já exista.

``` json
{
  "errorCode": "PONTO_TURISTICO_JA_EXISTE",
  "mensagem": "Esse ponto turístico já existe"
}
```

------------------------------------------------------------------------

## PUT `/pontos-turisticos/{id}`

Atualiza um ponto turístico existente.

### Exemplo

``` http
PUT http://localhost:8080/pontos-turisticos/1
Content-Type: application/json
```

``` json
{
  "nome": "Museu do Ipiranga",
  "descricao": "Museu histórico e cultural de São Paulo.",
  "endereco": "Parque da Independência, São Paulo",
  "estadoId": 25,
  "categoria": "Cultura"
}
```

### Validações

Os seguintes campos são obrigatórios:

-   `nome`
-   `descricao`
-   `endereco`
-   `estadoId`
-   `categoria`

### Respostas

**200 OK**

Retorna o ponto turístico atualizado.

``` json
{
  "id": 1,
  "nome": "Museu do Ipiranga",
  "descricao": "Museu histórico e cultural de São Paulo.",
  "endereco": "Parque da Independência, São Paulo",
  "estado": "São Paulo",
  "categoria": "Cultura"
}
```

**400 Bad Request**

Quando algum dos campos obrigatórios estiver vazio ou não for informado:

``` json
{
  "errorCode": "PONTO_TURISTICO_REQUEST_INVALIDO",
  "erros": {
    "estado": "Preencha o estado corretamente",
    "endereco": "Preencha o endereço corretamente",
    "categoria": "Preencha a categoria corretamente",
    "nome": "Preencha o nome corretamente",
    "descricao": "Preencha a descricao corretamente"
  }
}
```

**404 Not Found**

Quando não for encontrado um registro com o ID passado.

``` json
{
  "errorCode": "PONTO_TURISTICO_NAO_ENCONTRADO",
  "mensagem": "Ponto turístico de ID 99 não encontrado"
}
```

**409 Conflict**

Quando tentar cadastrar um ponto turístico que já exista.

``` json
{
  "errorCode": "PONTO_TURISTICO_JA_EXISTE",
  "mensagem": "Esse ponto turístico já existe"
}
```

------------------------------------------------------------------------

## DELETE `/pontos-turisticos/{id}`

Exclui um ponto turístico pelo ID.

### Exemplo

``` http
DELETE http://localhost:8080/pontos-turisticos/1
```

### Respostas

**200 OK**

A API não retorna conteúdo no corpo da resposta.

**404 Not Found**

Quando não for encontrado um registro com o ID passado.

``` json
{
  "errorCode": "PONTO_TURISTICO_NAO_ENCONTRADO",
  "mensagem": "Ponto turístico de ID 99 não encontrado"
}
```

------------------------------------------------------------------------

# 4. Estados

Recurso:

``` text
/estados
```

------------------------------------------------------------------------

## GET `/estados`

Retorna todos os estados cadastrados.

### Exemplo

``` http
GET http://localhost:8080/estados
```

### Respostas

**200 OK**

Retorna uma lista com os estados cadastrados.

``` json
[
  {
    "id": 1,
    "nome": "Acre"
  },
  {
    "id": 2,
    "nome": "Alagoas"
  },
  {
    "id": 3,
    "nome": "Amapá"
  },
  {
    "id": 4,
    "nome": "Amazonas"
  },
  {
    "id": 5,
    "nome": "Bahia"
  },
  {
    "id": 6,
    "nome": "Ceará"
  },
  {
    "id": 7,
    "nome": "Distrito Federal"
  },
  {
    "id": 8,
    "nome": "Espírito Santo"
  },
  {
    "id": 9,
    "nome": "Goiás"
  },
  {
    "id": 10,
    "nome": "Maranhão"
  },
  {
    "id": 11,
    "nome": "Mato Grosso"
  },
  {
    "id": 12,
    "nome": "Mato Grosso do Sul"
  },
  {
    "id": 13,
    "nome": "Minas Gerais"
  },
  {
    "id": 14,
    "nome": "Pará"
  },
  {
    "id": 15,
    "nome": "Paraíba"
  },
  {
    "id": 16,
    "nome": "Paraná"
  },
  {
    "id": 17,
    "nome": "Pernambuco"
  },
  {
    "id": 18,
    "nome": "Piauí"
  },
  {
    "id": 19,
    "nome": "Rio de Janeiro"
  },
  {
    "id": 20,
    "nome": "Rio Grande do Norte"
  },
  {
    "id": 21,
    "nome": "Rio Grande do Sul"
  },
  {
    "id": 22,
    "nome": "Rondônia"
  },
  {
    "id": 23,
    "nome": "Roraima"
  },
  {
    "id": 24,
    "nome": "Santa Catarina"
  },
  {
    "id": 25,
    "nome": "São Paulo"
  },
  {
    "id": 26,
    "nome": "Sergipe"
  },
  {
    "id": 27,
    "nome": "Tocantins"
  },
  {
    "id": 28,
    "nome": "Exterior"
  }
]
```

A API possui os 26 estados brasileiros, o Distrito Federal e a opção
`Exterior`.

------------------------------------------------------------------------

# 6. Códigos HTTP utilizados

  Código             | Significado
  -------------------|----------------------------------------------------
  `200 OK`           | Requisição realizada com sucesso
  `201 Created`      | Recurso criado com sucesso
  `204 No Content`   | Nenhum ponto turístico foi encontrado na listagem
  `400 Bad Request`  | Dados enviados são inválidos
  `404 Not Found`    | Ponto turístico não encontrado
  `409 Conflict`     | Ponto turístico já cadastrado