
# WorkflowFatec

Sistema acadêmico de abertura e gerenciamento de chamados voltado à secretaria da FATEC. Desenvolvido como um projeto full-stack com frontend em React e backend em Node.js, Express e Sequelize, o sistema permite que alunos enviem solicitações e acompanhem o atendimento realizado pela secretaria.

## Funcionalidades

- Autenticação de alunos e secretários
- Abertura e finalização de chamados
- Interface de chat e histórico de solicitações
- Controle de usuários e permissões
- Atualização e acompanhamento de status do chamado
- Comunicação entre aluno e secretaria por meio da plataforma

---

## Diagrama de Interação (Aluno - Sistema - Secretaria)

```mermaid
sequenceDiagram
    participant Aluno
    participant Sistema as Sistema Workflow
    participant Secretaria

    Aluno->>Sistema: Cria chamado
    Aluno->>Sistema: Altera Usuário
    Aluno->>Sistema: Abre Chamado
    Aluno->>Sistema: Finaliza Chamado

    Secretaria-->>Sistema: Verifica o Chamado
    Secretaria-->>Sistema: Responde Chamado
    Secretaria-->>Sistema: Encerra o Chamado
    Secretaria-->>Sistema: Devolve o Chamado
```

---

## Frontend

### Tecnologias Utilizadas

- React 19
- React Router DOM 7
- React Icons
- CSS Modules
- React Scripts (CRA)
- Testing Library

### Estrutura de Pastas

```
src/
├── components/
├── pages/
├── styles/
├── App.js
├── index.js
```

### Instalação

Pré-requisitos:

- Node.js 18+
- npm ou yarn

Passos:

```bash
git clone https://github.com/thamires33/WorkflowFatec.git
cd WorkflowFatec
npm install
npm start
```

Crie um arquivo `.env` na raiz do frontend com:

```
REACT_APP_API_URL=http://localhost:3001
```

---

## Backend

### Tecnologias Utilizadas

- Node.js
- Express
- Sequelize
- MySQL2
- CORS
- Body-Parser

### Estrutura

```
Backend/
├── controllers/
├── models/
│   ├── Aluno.js
│   ├── Chamado.js
│   ├── Secretaria.js
│   ├── Usuario.js
│   └── db.js
├── index.js
```

### Instalação

Pré-requisitos:

- Node.js
- Banco de dados MySQL

Passos:

```bash
cd Backend
npm install
```

Crie um arquivo `.env` com:

```
DB_NAME=workflow_fatec_db
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_DIALECT=mysql
PORT=3001
```

Inicie o servidor:

```bash
node index.js
```

### Rotas da API

#### Alunos

| Método | Rota      | Descrição            |
|--------|-----------|----------------------|
| GET    | /alunos   | Lista alunos         |
| POST   | /alunos   | Cadastra aluno       |

#### Chamados

| Método | Rota         | Descrição                |
|--------|--------------|--------------------------|
| GET    | /chamados    | Lista chamados           |
| POST   | /chamados    | Cria novo chamado        |
| PUT    | /chamados/:id| Atualiza status chamado  |

#### Usuários

| Método | Rota       | Descrição         |
|--------|------------|-------------------|
| POST   | /login     | Login de usuário  |
| POST   | /usuarios  | Cria novo usuário |

---

## Banco de Dados

O banco de dados MySQL é gerenciado pelo ORM Sequelize e os modelos estão localizados na pasta `models/`. Certifique-se de criar o banco de dados conforme definido nas variáveis de ambiente antes de iniciar o servidor.

---

## Testes

Para rodar os testes no frontend:

```bash
npm test
```

---

## Desenvolvido por
Rafael da Silva Oliveira & Thamires da Costa Nascimento  

Projeto acadêmico desenvolvido na FATEC
