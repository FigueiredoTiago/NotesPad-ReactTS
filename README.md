# NotesPad 📝

![NotesPad]('../../src/assets/img/background.svg');

## 📌 Sobre o projeto

O **NotesPad** é um aplicativo web de bloco de notas completo, desenvolvido com **React, Node.js, TypeScript, PostgreSQL, Docker e Prisma**. Ele permite que os usuários criem, editem, organizem e excluam notas de forma simples e intuitiva.

## 🚀 Funcionalidades

- Criar, editar e excluir notas
- Pesquisa e filtro de notas *-Em Desenvolvimento....
- Interface intuitiva e responsiva
- Sincronização de dados com o banco de dados PostgreSQL

## 🛠 Tecnologias Utilizadas

- **Frontend:** React, TypeScript
- **Backend:** Node.js, Express, Prisma
- **Banco de Dados:** PostgreSQL
- **Containerização:** Docker

## 📥 Como Usar

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/FigueiredoTiago/NotesPad-ReactTS.git
```

### 2️⃣ Configuração do Backend

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure o banco de dados PostgreSQL e o Prisma:
   ```bash
   npx prisma migrate dev
   Certifique-se De colocar sua url do seu  banco de dados PostgreSql corretamente no arquivo .Env criado pelo Prisma.
   ```
3. Inicie o servidor:
   ```bash
   npm run dev
   ```

### 3️⃣ Configuração do Frontend

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o frontend:
   ```bash
   npm run dev
   ```

### 4️⃣ Acesse a aplicação

Abra o navegador e acesse:

```
http://localhost:3000
```

## 📷 Screenshot

Adicione aqui uma captura de tela do aplicativo quando estiver pronto.

## 🏗️ Contribuição

Sinta-se à vontade para contribuir com melhorias! Basta abrir uma _issue_ ou um _pull request_.

## 📜 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usá-lo e modificá-lo conforme necessário.

---

Made with ❤️ by Tiago Figueiredo
