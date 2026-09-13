# Projeto integrador

Aplicação web desenvolvida para as disciplinas de Técnicas de Programação WEB FrontEnd e Técnicas de Programação WEB BackEnd do 3º semestre da SPTech.

## Como executar

### Pré-requisitos
- Java 21
- Maven
- Node.js
- Git

### Baixando o repositório
Clone o repositório com:
``` bash
git clone https://github.com/lucas-eiki/projeto-integrador.git
```

Entre no repositório:
``` bash
cd ./projeto-integrador
```

### Executando o Backend
Entre na pasta do Backend:
``` bash
cd ./api
```

Rode o comando:
``` bash
./mvnw spring-boot:run
```

Se estiver no windows, o comando é:
``` bash
mvnw.cmd spring-boot:run
```

### Executando o Frontend
Em outro terminal, entre na pasta do Frontend:
``` bash
cd ./cliente
```

Instale as dependências:
``` bash
npm install
```

Faça o build e inicie a aplicação:
``` bash
npm run build
npm run preview
```

Acesse o link que aparecer no terminal. Por exemplo: http://localhost:4173/

## Contrato de API
O contrato da API se encontra em [./docs/contrato-api.md](./docs/contrato-api.md).