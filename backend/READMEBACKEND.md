# 🏨 Sistema de Reservas de Hotel - Backend

Este é o backend de um **sistema de reservas de hotel**, desenvolvido com **Node.js** e **MongoDB**.  
O sistema permite **autenticação de utilizadores e administradores**, **gestão de quartos, reservas e reviews**.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** + **Express.js** → API RESTful
- **MongoDB** + **Mongoose** → Base de dados NoSQL
- **JWT (Json Web Token)** + **bcrypt** → Autenticação e segurança
- **dotenv** → Gerenciamento de variáveis de ambiente

---

## 📌 Como Instalar e Executar

### **1️⃣ Clonar o Repositório**
```
git clone https://github.com/RodrigoCarrico01/JoelHotel.git
cd JoelHotel/backend
```

### **2️⃣ Instalar as Dependências**
```
npm install
```

### **3️⃣ Configurar Variáveis de Ambiente**
Cria um ficheiro **`.env`** na raiz do projeto e adiciona:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/JoelHotel
JWT_SECRET=supersecretkey
```

### **4️⃣ Iniciar o Servidor**
```
npm start
```

O servidor será iniciado em **http://localhost:5000** 🚀

---

## 📂 Estrutura do Projeto

```
backend/
│── controllers/
│   ├── authController.js        # Autenticação de utilizadores
│   ├── reservationController.js  # Gestão de reservas (utilizadores)
│   ├── userController.js  # Gestão de utilizadores (utilizadores)
│   ├── reviewController.js       # Gestão de reviews (utilizadores)
│   ├── roomController.js         # Gestão de quartos (público)
│   ├── Admin/                    # Controladores administrativos
│   │   ├── userController.js      # Gestão de utilizadores (admin)
│   │   ├── roomController.js      # Gestão de quartos (admin)
│   │   ├── reservationController.js  # Gestão de reservas (admin)
│   │   ├── reviewController.js    # Gestão de reviews (admin)
│── middleware/
│   ├── authMiddleware.js        # Middleware de autenticação
│   ├── adminMiddleware.js       # Middleware para verificar admins
│── models/
│   ├── User.js                  # Modelo de utilizador
│   ├── Room.js                  # Modelo de quarto
│   ├── Reservation.js           # Modelo de reserva
│   ├── Review.js                # Modelo de review
│── routes/
│   ├── authRoutes.js            # Rotas de autenticação
│   ├── reservationRoutes.js      # Rotas de reservas (utilizadores)
│   ├── userRoutes.js      # Rotas de utilizadores (utilizadores)
│   ├── reviewRoutes.js           # Rotas de reviews (utilizadores)
│   ├── roomRoutes.js             # Rotas de quartos (público)
│   ├── Admin/                    # Rotas administrativas
│   │   ├── userRoutes.js         # Rotas de utilizadores (admin)
│   │   ├── roomRoutes.js         # Rotas de quartos (admin)
│   │   ├── reservationRoutes.js  # Rotas de reservas (admin)
│   │   ├── reviewRoutes.js       # Rotas de reviews (admin)
│── config/
│   ├── db.js                    # Configuração do MongoDB
│── .env                         # Variáveis de ambiente
│── .gitignore                   # Arquivos ignorados pelo Git
│── server.js                     # Arquivo principal do servidor
│── package.json                  # Dependências e scripts
```

---

## 📌 Rotas Disponíveis

### **🔹 Autenticação**
| Método | Rota                 | Descrição              |
|--------|----------------------|------------------------|
| POST   | `/api/auth/register` | Registar um utilizador |
| POST   | `/api/auth/login`    | Fazer login            |

### **🔹 Utilizadores**
| Método | Rota                 | Descrição                               |
|--------|----------------------|-----------------------------------------|
| POST   | `/api/users/profile` | Obter perfil do utilizador autenticado  |
| PUT    | `/api/users/profile` | Atualizar perfil do utilizador          |
| DELETE | `/api/users/profile` | Eliminar conta do utilizador            |

### **🔹 Utilizadores (ADMIN)**
| Método | Rota                   | Descrição                               |
|--------|------------------------|-----------------------------------------|
| POST   | `/api/admin/users`     | Listar todos os utilizadores (admin)    |
| POST   | `/api/admin/users/:id` | Obter um utilizador por ID (admin)      |
| DELETE | `/api/admin/users/:id` | Eliminar um utilizador (admin)          |

### **🔹 Quartos**
| Método | Rota                      | Descrição                             |
|--------|---------------------------|---------------------------------------|
| GET    | `/api/rooms`              | Listar todos os quartos (público)     |
| GET    | `/api/rooms/:id`          | Obter detalhes de um quarto (público) |

### **🔹 Quartos (ADMIN)**
| Método | Rota                      | Descrição                     |
|--------|---------------------------|-------------------------------|
| POST   | `/api/admin/rooms`        | Criar um quarto (admin)       |
| GET    | `/api/admin/rooms`        | Listar quartos (admin)        |
| GET    | `/api/admin/rooms/:id`    | Obter um quarto (admin)       |
| PUT    | `/api/admin/rooms/:id`    | Atualizar um quarto (admin)   |
| DELETE | `/api/admin/rooms/:id`    | Eliminar um quarto (admin)    |


### **🔹 Reservas**
| Método | Rota                       | Descrição                                                 |
|--------|----------------------------|-----------------------------------------------------------|
| POST   | `/api/reservations`        | Criar uma reserva  (utilizador)                           |
| GET    | `/api/reservations`        | Listar reservas do utilizador autenticado (utilizador)    |
| GET    | `/api/reservations/:id`    | Obter detalhes de uma reserva do utilizador (utilizador)  |
| DELETE | `/api/reservations/:id`    | Cancelar uma reserva do utilizador (utilizador)           |

### **🔹 Reservas (ADMIN)**
| Método | Rota                               | Descrição                                                     |
|--------|------------------------------------|---------------------------------------------------------------|
| GET    | `/api/admin/reservations`          | Listar todas as reservas (admin)                              |
| GET    | `/api/admin/reservations/:id`      | Obter uma reserva por ID (admin)                              |
| GET    | `/api/admin/reservations/user/:id` | Obter reservas por utilizador (admin)                         |
| GET    | `/api/admin/reservations/room/:id` | Obter reservas por quarto (admin)                             |
| PUT    | `/api/admin/reservations/:id`      | Atualizar status e pagamento de uma reserva (admin)           |
| DELETE | `/api/admin/reservations/:id`      | Eliminar uma reserva (admin)                                  |

### **🔹 Reviews**
| Método | Rota                       | Descrição                                   |
|--------|----------------------------|---------------------------------------------|
| POST   | `/api/reviews`             | Criar uma review (utilizador)               |
| GET    | `/api/reviews/:quartoId`   | Listar reviews de um quarto (público)       |
| PUT    | `/api/reviews/:id`         | Atualizar uma review (utilizador)           |
| DELETE | `/api/reviews/:id`         | Eliminar review própria (utilizador)        |

### **🔹 Reviews (ADMIN)**
| Método | Rota                          | Descrição                                  |
|--------|-------------------------------|--------------------------------------------|
| GET    | `/api/admin/reviews`          | Listar todas as reviews (admin)            |
| GET    | `/api/admin/reviews/:id`      | Obter uma review por ID (admin)            |
| GET    | `/api/admin/reviews/room/:id` | Obter reviews de um quarto (admin)         |
| GET    | `/api/admin/reviews/user/:id` | Obter reviews de um utilizador (admin)     |
| DELETE | `/api/admin/reviews/:id`      | Eliminar uma review (admin)                |
---

