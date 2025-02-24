# 🏨 **Sistema de Reservas de Hotel**

Este é um sistema de reservas de hotel, desenvolvido com **Node.js** no backend e **React + Tailwind CSS** no frontend.

O projeto permite **gestão de utilizadores, reservas, quartos e avaliações** tanto para clientes quanto para administradores.

---

## 📌 **Tecnologias Utilizadas**
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT (autenticação)
- **Frontend:** React.js, React Router, Tailwind CSS
- **Outros:** Axios, Vite, bcrypt para encriptação de passwords

---

## 🚀 **Como Iniciar o Projeto**
### **1️⃣ Clonar o Repositório**
```
git clone https://github.com/RodrigoCarrico01/JoelHotel.git
cd JoelHotel
```

---

## 🖥️ **Iniciar o Backend**
1. Aceder à pasta do backend:
   ```sh
   cd backend
   ```
2. Instalar as dependências:
   ```sh
   npm install
   ```
3. Criar o ficheiro `.env` com as variáveis de ambiente:
   ```sh
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/JoelHotel
   JWT_SECRET=supersecretkey
   ```
4. Iniciar o servidor:
   ```sh
   npm run dev
   ```
   O servidor será iniciado em **http://localhost:5000**.

📜 Mais informações no ficheiro [`READMEBACKEND.md`](./backend/READMEBACKEND.md).

---

## 🎨 **Iniciar o Frontend**
1. Aceder à pasta do frontend:
   ```sh
   cd frontend
   ```
2. Instalar as dependências:
   ```sh
   npm install
   ```
3. Iniciar o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```
   A aplicação será iniciada em **http://localhost:5173**.

📜 Mais informações no ficheiro [`READMEFRONTEND.md`](./frontend/READMEFRONTEND.md).

---

## 📂 **Estrutura do Projeto**
```
JoelHotel/
│── backend/            # API RESTful em Node.js
│   ├── controllers/    # Controladores de lógica de negócio
│   ├── routes/         # Definição das rotas do backend
│   ├── models/         # Modelos Mongoose (MongoDB)
│   ├── middleware/     # Middlewares de autenticação e permissões
│   ├── config/         # Configuração do banco de dados
│   ├── server.js       # Arquivo principal do backend
│   ├── README.md # Documentação do backend
│── frontend/           # Aplicação em React.js
│   ├── src/            # Código fonte do frontend
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/          # Páginas do frontend
│   ├── styles/         # Estilização com Tailwind CSS
│   ├── App.jsx         # Arquivo principal da aplicação
│   ├── README.md # Documentação do frontend
│── README.md           # Este ficheiro
```

---

## 👥 **Funcionalidades**
### **👤 Utilizadores**
- Registo e login com JWT
- Atualização e eliminação de perfil
- Listagem e gestão de utilizadores (admin)

### **🏨 Quartos**
- Listagem de quartos disponíveis
- Gestão de quartos (admin): criar, editar, eliminar

### **📅 Reservas**
- Criar e cancelar reservas
- Listar reservas por utilizador
- Gestão de reservas (admin): aprovar, cancelar

### **⭐ Avaliações**
- Criar, editar e eliminar avaliações
- Gestão de avaliações (admin): listar e remover avaliações inadequadas
