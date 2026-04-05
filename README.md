# 🚀 Taskflow

Aplicação full stack para gerenciamento de tarefas, permitindo criação, edição, exclusão e acompanhamento de prazos de forma simples e eficiente.

---

## 📌 Sobre o projeto

O **Taskflow** é um sistema de gestão de tarefas desenvolvido com:

* **Frontend:** React + Vite
* **Backend:** Node.js + Express
* **Banco de dados:** MongoDB
* **Autenticação:** JWT

O sistema permite:

* Cadastro e login de usuários
* Criação, edição e exclusão de tarefas
* Definição de prazo com data e hora
* Identificação de tarefas atrasadas
* Controle de acesso (usuário/admin)
* Painel administrativo para gerenciamento de usuários

## ⚙️ Variáveis de ambiente

Crie um arquivo `.env` dentro da pasta **Backend** com o seguinte conteúdo:

```env
PORT=3000
MONGO_URI=sua_string_do_mongodb
JWT_SECRET=sua_chave_secreta
GOOGLE_CLIENT_ID=seu_client_id_google (opcional)
```

---

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/iShoockx/taskflow.git
cd taskflow
```

---

## ▶️ Como executar o projeto

### 🔹 Instalar dependências

Na raiz do projeto:

```bash
npm install
```

Instale também separadamente:

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

---

### 🔹 Rodar o projeto (backend + frontend juntos)

Na raiz:

```bash
npm run dev
```

Isso irá iniciar:

* Backend → http://localhost:3000
* Frontend → http://localhost:5173

---

## 🧪 Testes básicos

Você pode testar utilizando:

* Postman (para rotas da API)
* Navegador (interface)

### Rotas principais:

```bash
POST   /api/auth/registrar
POST   /api/auth/login
GET    /api/tarefas
POST   /api/tarefas
PUT    /api/tarefas/:id
DELETE /api/tarefas/:id
```

---

## 🧪 Dados para teste

Para facilitar a avaliação do projeto, foi disponibilizado um script de seed que cria usuários de teste automaticamente.

---

### ▶️ Como gerar os dados

Dentro da pasta **Backend**, execute:

```bash
npm run seed
```

---

### ⚠️ Atenção

Este comando irá **apagar todos os usuários existentes no banco de dados** e criar novos usuários padrão para teste.

---

### 👤 Usuário padrão

* **Email:** [usuario@email.com](mailto:usuario@email.com)
* **Senha:** 123
* **Tipo:** usuario

---

### 👑 Usuário administrador

* **Email:** [admin@email.com](mailto:admin@email.com)
* **Senha:** 123
* **Tipo:** admin

---

### 📌 Observação

O usuário administrador possui acesso a funcionalidades extras, como o painel de gerenciamento de usuários.

---

## 🔐 Autenticação

A aplicação utiliza **JWT (JSON Web Token)** para proteger rotas.

Após login, o token é armazenado no `localStorage` e enviado automaticamente nas requisições autenticadas.

---

## 👤 Controle de acesso

Existem dois tipos de usuários:

* `usuario`
* `admin`

Usuários do tipo **admin** possuem acesso ao painel de gerenciamento de usuários.

---

## 📁 Estrutura do projeto

```bash
Taskflow/
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   └── assets/
│   └── index.html
│
└── package.json
```

---

## 💡 Funcionalidades futuras

* Integração com Google Calendar
* Notificações de tarefas
* Filtros avançados
* Tema escuro

---

## 👨‍💻 Autor

Desenvolvido por João Moreira
Projeto acadêmico com foco em aprendizado de desenvolvimento full stack.

---

## 📄 Licença

Este projeto é apenas para fins educacionais.
