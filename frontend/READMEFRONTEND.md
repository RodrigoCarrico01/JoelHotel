# 🏨 Sistema de Reservas de Hotel - Frontend

Este é o frontend do **sistema de reservas de hotel**, desenvolvido com **React.js** e **Tailwind CSS**.
O sistema permite que os utilizadores explorem quartos, realizem reservas e deixem reviews. Os administradores podem gerir reservas, quartos, utilizadores e reviews.

---

## 🚀 Tecnologias Utilizadas

- **React.js** → Framework para construir UI
- **React Router** → Navegação entre páginas
- **Axios** → Consumo da API RESTful
- **Tailwind CSS** → Estilização moderna e responsiva
- **Vite** → Ambiente de desenvolvimento rápido

---

## 📌 Como Instalar e Executar

### **1️⃣ Clonar o Repositório**
```bash
git clone https://github.com/RodrigoCarrico01/JoelHotel.git
cd JoelHotel/frontend
```

### **2️⃣ Instalar as Dependências**
```bash
npm install
```

### **3️⃣ Configurar o Ambiente**
Cria um ficheiro **`.env`** na raiz do frontend e adiciona a URL da API:
```env
VITE_API_URL=http://localhost:5000/api
```

### **4️⃣ Iniciar o Frontend**
```bash
npm run dev
```
O frontend será iniciado em **http://localhost:5173** 🚀

---

## 📂 Estrutura do Projeto

```
frontend/
│── src/
│   ├── components/          # Componentes reutilizáveis
│   ├── pages/               # Páginas principais
│   │   ├── Home.jsx         # Página inicial
│   │   ├── Login.jsx        # Página de login
│   │   ├── Register.jsx     # Página de registo
│   │   ├── Profile.jsx      # Página do perfil do utilizador
│   │   ├── Rooms.jsx        # Listagem de quartos
│   │   ├── RoomDetails.jsx  # Detalhes de um quarto
│   │   ├── MyReservations.jsx  # Reservas do utilizador
│   │   ├── Dashboard.jsx    # Dashboard do admin
│   │   ├── Admin/           # Secção de admin
│   │   │   ├── AdminRooms.jsx       # Gestão de quartos
│   │   │   ├── AdminUsers.jsx       # Gestão de utilizadores
│   │   │   ├── AdminReservations.jsx # Gestão de reservas
│   │   │   ├── AdminReviews.jsx     # Gestão de reviews
│   ├── middleware/          # Proteção de rotas
│   │   ├── RequireAuth.jsx  # Garante que o utilizador está autenticado
│   ├── styles/              # Ficheiros de estilo (Tailwind)
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Entrada principal da aplicação
│── .env                     # Configurações de ambiente
│── package.json             # Dependências e scripts
│── tailwind.config.js       # Configuração do Tailwind CSS
```

---

## 🔒 Autenticação e Proteção de Rotas

- Algumas páginas requerem que o utilizador esteja **autenticado**. Se o utilizador não estiver autenticado, será redirecionado para a página de login.
- O admin tem acesso exclusivo às páginas do painel administrativo.

---

## 🎨 Estilização com Tailwind CSS

Para manter um design consistente, a aplicação segue uma paleta de cores definida no **Tailwind CSS**:
```css
.color1 { #eff3cd }
.color2 { #b2d5ba }
.color3 { #61ada0 }
.color4 { #248f8d }
.color5 { #605063 }
```

Para modificar o tema, edita o ficheiro `tailwind.config.js`.

---

## 🚀 Melhorias Futuras

- Melhor responsividade para dispositivos móveis
- Dark Mode
- Melhor gestão de permissões e autenticação
- Implementação de testes automatizados
