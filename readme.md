# 🎮 COMPLETUM - Em Desenvolvimento
### Sistema de Guias e Plataforma Comunitária para Jogadores

[![Node.js](https://img.shields.io/badge/Node.js-22.x-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.x-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.1.x-blueviolet)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue)](https://www.docker.com/)

## 📖 Sobre o Projeto

**Completum** é uma plataforma comunitária inovadora focada em jogos, projetada para construir uma comunidade onde jogadores podem compartilhar conhecimento sobre seus títulos favoritos. 

O sistema foi desenvolvido com arquitetura escalável para suportar múltiplos jogos como:
- 🐲 **Monster Hunter** 
- ⚔️ **League of Legends**
- ✨ **Genshin Impact**
- 🎯 **E muitos outros**

## ✨ Características Principais

- 🏗️ **Arquitetura Escalável** - Suporte para múltiplos jogos
- 👥 **Sistema Comunitário** - Troca de experiências entre jogadores  
- 📚 **Guias Colaborativos** - Criação e compartilhamento de estratégias
- 🔐 **Sistema de Autenticação** - JWT com segurança robusta
- 📊 **API RESTful** - Interface moderna e documentada
- 🐳 **Docker Ready** - Deploy simplificado com containers

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** 22.x com TypeScript
- **Express.js** - Framework web
- **Prisma ORM** - Gerenciamento de banco de dados
- **MySQL** - Banco de dados principal
- **RabbitMQ** - Sistema de mensageria
- **JWT** - Autenticação e autorização
- **Zod** - Validação de dados
- **Nodemailer** - Envio de emails

### DevOps & Infraestrutura
- **Docker & Docker Compose** - Containerização
- **ESLint** - Qualidade de código
- **Nodemon** - Desenvolvimento com hot reload

## 🚀 Como Executar

### Pré-requisitos
- Docker e Docker Compose instalados
- Node.js 22.x (para desenvolvimento local)

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd completum/backend
```

### 2. Configure as variáveis de ambiente
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### 3. Execute com Docker
```bash
# Iniciar todos os serviços
docker-compose up --build

# Ou em modo detached
docker-compose up -d --build
```

### 4. Acesse a aplicação
- **API**: http://localhost:3000
- **Banco de dados**: localhost:3306
- **RabbitMQ Management**: http://localhost:15672

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── http/
│   │   ├── controllers/     # Controladores HTTP
│   │   ├── services/        # Lógica de negócio
│   │   ├── repositories/    # Camada de dados
│   │   ├── dto/            # Data Transfer Objects
│   │   └── schemas/        # Schemas de validação
│   ├── Kernel/             # Comandos e configurações
│   └── Upload/             # Arquivos enviados
├── prisma/                 # Esquemas e migrações
└── Docker/                 # Configurações Docker
```

## 🏗️ Arquitetura

O projeto segue os princípios **SOLID** e implementa:

- **Repository Pattern** - Abstração da camada de dados
- **Service Layer** - Lógica de negócio isolada
- **Dependency Injection** - Gerenciamento de dependências
- **DTO Pattern** - Transferência segura de dados
- **Schema Validation** - Validação robusta com Zod

## 🐳 Docker Services

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| API | 3000 | Aplicação Node.js |
| MySQL | 3306 | Banco de dados |
| RabbitMQ | 5672, 15672 | Mensageria |

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev

# Build para produção
npm run build

# Executar seeds
npm run seed:characters

# Prisma commands
npx prisma generate
npx prisma db push
```
