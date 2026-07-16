# Doces Lucelian — Gestão Financeira (Lucelian Sweet Flow)

Sistema completo de gestão financeira e operacional para a **Doces Lucelian**. O projeto é composto por um **Frontend** moderno desenvolvido com React/TanStack Start e um **Backend** robusto em Express com integração ao Supabase.

---

## 🚀 Tecnologias Utilizadas

### Frontend (Diretório Raiz)
- **React 19** & **TypeScript**
- **TanStack Start & Router**: Roteamento robusto e seguro baseado em tipos.
- **Tailwind CSS**: Estilização moderna e responsiva.
- **Radix UI & Lucide React**: Componentes de interface acessíveis e ícones modernos.
- **Zod & React Hook Form**: Validações de formulários eficientes.

### Backend (Diretório `/backend`)
- **Node.js** & **Express** com **TypeScript**
- **Supabase**: Banco de dados e armazenamento.
- **JSON Web Token (JWT) & BcryptJS**: Autenticação segura de usuários.
- **Zod**: Validação de dados de entrada da API.
- **TSX**: Executor de TypeScript em ambiente de desenvolvimento.

---

## 📋 Funcionalidades Principais

- **Dashboard**: Visão geral de métricas financeiras, vendas recentes, gráficos explicativos e saúde do negócio.
- **Autenticação**: Login seguro e gerenciamento de permissões de usuários.
- **Controle de Clientes**: Cadastro, listagem e acompanhamento de clientes ativos.
- **Gestão de Produtos**: Gerenciamento do catálogo de doces e produtos disponíveis.
- **Controle de Vendas**: Registro e monitoramento de transações comerciais.
- **Contas a Pagar**: Acompanhamento de despesas, datas de vencimento e status de pagamento.
- **Gestão de Usuários**: Administração de operadores e administradores do sistema.

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos
Certifique-se de possuir o [Node.js](https://nodejs.org/) instalado na sua máquina, além do gerenciador de pacotes **Bun** ou **NPM**.

---

### 1. Configurando o Backend

1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie e configure o arquivo `.env` na raiz da pasta `backend` com as variáveis necessárias (exemplo abaixo):
   ```env
   PORT=3001
   JWT_SECRET=sua_chave_secreta_jwt
   SUPABASE_URL=sua_url_supabase
   SUPABASE_KEY=sua_chave_anonima_ou_service_role
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   *O backend rodará por padrão na porta `3001` (ou na definida na variável `PORT`).*

---

### 2. Configurando o Frontend

1. Na raiz do projeto, instale as dependências:
   ```bash
   npm install
   ```

2. Crie e configure o arquivo `.env` na raiz do projeto contendo a URL base da API do backend e chaves adicionais, se necessário:
   ```env
   VITE_API_URL=http://localhost:3001
   ```

3. Inicie o servidor de desenvolvimento do frontend:
   ```bash
   npm run dev
   ```

4. Acesse a aplicação no seu navegador (geralmente em `http://localhost:3000` ou conforme indicado no terminal).

---

## 📂 Estrutura de Pastas Simplificada

```text
├── backend/                  # Código-fonte da API Express
│   ├── src/
│   │   ├── config/           # Configurações de banco (Supabase)
│   │   ├── middleware/       # Middlewares de Auth e Validação
│   │   ├── routes/           # Rotas da API (Clientes, Contas, etc.)
│   │   ├── app.ts            # Configuração do Express
│   │   └── server.ts         # Inicialização do servidor
│   └── package.json
│
├── src/                      # Código-fonte do Frontend (React + TanStack)
│   ├── components/           # Componentes reutilizáveis de UI
│   ├── routes/               # Rotas/Páginas da aplicação (Dashboard, Vendas, etc.)
│   └── main.tsx              # Ponto de entrada do Frontend
│
├── package.json              # Configurações do projeto frontend
└── README.md                 # Instruções e documentação do projeto
```

---

## 💾 Scripts Disponíveis

### No Frontend (Raiz):
- `npm run dev`: Executa a aplicação frontend em modo de desenvolvimento.
- `npm run build`: Gera a build de produção otimizada.
- `npm run lint`: Executa a análise estática do código (linter).
- `npm run format`: Formata todos os arquivos do projeto com o Prettier.

### No Backend (`/backend`):
- `npm run dev`: Inicia o servidor backend com recarregamento automático (watch mode).
- `npm run build`: Compila o TypeScript para JavaScript na pasta `dist`.
- `npm run start`: Inicia o servidor compilado para produção.
