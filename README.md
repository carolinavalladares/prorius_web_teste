## :wrench: Instalação

1. Clone o repositorio;
2. Crie um arquivo .env na pasta server com a variável _DATABASE_URL="file:./dev.db"_;
3. Na raiz do projeto, rode o comando:

```sh
    npm install
```

4. Rode o comando:

```sh
   npm run setup
```

5. Rode o comando:

```sh
   npm run start
```

A aplicação estará rodando em **http://localhost:5173/** e o servidor estará rodando em **http://localhost:8080/**

## Rotas da API

### {BaseURL}/users/register

Cadastra um novo usuário

- Método: POST
- Espera receber um objeto JSON com as seguintes informações do usuário:

```sh
    {
        "name": string,
        "email": string,
        "password": string,
        "confirmPassword": string,
        "role": "ADMIN"|"USER"
    }
```

### {BaseURL}/users/list

Retorna um array com todos os usuários cadastrados

- Método: GET

### {BaseURL}/users/list-deleted

Retorna um array com todos os usuários que foram deletados

- Método: GET

### {BaseURL}/users/{userId}

Retorna um usuário específico

- Método: GET

### {BaseURL}/users/edit/{userId}

Edita as informações de um usuário

- Método: PATCH
- Espera receber um objeto JSON com as informações do usuário:

```sh
       {
        "name": string,
        "email": string,
        "role": "ADMIN"|"USER"
       }
```

### {BaseURL}/users/delete/{userId}

Deleta um usuário

- Método: DELETE

### {BaseURL}/users/restore/{userId}

Restaura um usuário deletado

- Método: PATCH

## :hammer_and_wrench: Contruído com

- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
- ![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
- ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
