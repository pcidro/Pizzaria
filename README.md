# Sistema de Pizzaria

API REST para gerenciamento de uma pizzaria, desenvolvida com Node.js, TypeScript, Express, Prisma e PostgreSQL. A aplicação permite cadastrar usuários, autenticar funcionários, gerenciar categorias e produtos, controlar pedidos por mesa e armazenar imagens de produtos no Cloudinary.

## Índice

- [Sobre o projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Banco de dados](#banco-de-dados)
- [Regras de negócio](#regras-de-negócio)
- [Como executar](#como-executar)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Scripts disponíveis](#scripts-disponíveis)
- [Rotas da API](#rotas-da-api)
- [Repositório do frontend](#repositório-do-frontend)
- [Segurança](#segurança)
- [Aprendizados](#aprendizados)
- [Pontos de melhoria](#pontos-de-melhoria)

## Sobre o projeto

O sistema foi criado para organizar o fluxo básico de atendimento de uma pizzaria. A API centraliza autenticação, autorização, cadastro de produtos, gerenciamento de categorias e controle de pedidos.

O backend segue uma arquitetura em camadas, separando rotas, middlewares, controllers, services e acesso ao banco. Essa organização facilita manutenção, testes e evolução do sistema.

## Acesso para Testes

Caso deseje testar a aplicação consumindo esta API através do frontend, você pode utilizar a seguinte conta de testes. **Importante:** Este usuário tem permissão apenas para visualização. As rotas de criação, alteração e exclusão (como postar produtos, excluir categorias, finalizar pedidos, etc.) são protegidas pelo middleware de administrador, bloqueando qualquer tentativa de alteração.

- **E-mail:** `usuario@gmail.com`
- **Senha:** `Usuario123`

## Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Zod
- JWT
- bcryptjs
- Multer
- Cloudinary
- CORS
- dotenv

## Arquitetura

O backend utiliza o padrão MVC com uma camada de services:

```txt
Requisição HTTP
  -> Rotas
  -> Middlewares
  -> Controller
  -> Service
  -> Prisma
  -> PostgreSQL
```

Responsabilidades principais:

- **Rotas**: definem os endpoints e a ordem dos middlewares.
- **Middlewares**: cuidam de autenticação, autorização e validação de dados.
- **Controllers**: recebem os dados da requisição e chamam os services.
- **Services**: concentram as regras de negócio.
- **Prisma**: faz a comunicação com o banco PostgreSQL.

## Estrutura de pastas

```txt
backend/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── @types/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── prisma/
│   ├── schemas/
│   ├── services/
│   ├── routes.ts
│   └── server.ts
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

## Banco de dados

O banco é modelado com Prisma e PostgreSQL. As principais entidades são:

### User

Representa os usuários do sistema.

Campos principais:

- `id`: identificador UUID.
- `name`: nome do usuário.
- `email`: e-mail único.
- `password`: senha criptografada.
- `role`: perfil do usuário, podendo ser `STAFF` ou `ADMIN`.
- `createdAt` e `updatedAt`: datas de criação e atualização.

### Category

Representa uma categoria de produtos.

Campos principais:

- `id`: identificador UUID.
- `name`: nome da categoria.
- `products`: lista de produtos relacionados.

### Product

Representa um produto ou pizza do cardápio.

Campos principais:

- `id`: identificador UUID.
- `name`: nome do produto.
- `description`: descrição.
- `price`: preço em centavos.
- `banner`: URL da imagem no Cloudinary.
- `disabled`: indica se o produto está ativo ou inativo.
- `category_id`: categoria relacionada.

### Order

Representa um pedido aberto por mesa.

Campos principais:

- `id`: identificador UUID.
- `table`: número da mesa.
- `status`: indica se o pedido foi finalizado.
- `draft`: indica se o pedido ainda está em rascunho.
- `name`: nome opcional do cliente.
- `items`: itens do pedido.

### Item

Representa um item dentro de um pedido.

Campos principais:

- `id`: identificador UUID.
- `amount`: quantidade.
- `order_id`: pedido relacionado.
- `product_id`: produto relacionado.

## Regras de negócio

- Senhas são criptografadas antes de serem salvas.
- Usuários comuns recebem o perfil `STAFF` por padrão.
- Rotas administrativas exigem autenticação e perfil `ADMIN`.
- Produtos pertencem a uma categoria.
- Preços são armazenados em centavos para evitar problemas com casas decimais.
- Imagens de produtos são enviadas para o Cloudinary.
- Uploads aceitam apenas imagens JPG, JPEG e PNG.
- O tamanho máximo de upload é de 4 MB.
- Pedidos começam como rascunho e podem ser enviados/finalizados.
- Ao apagar pedidos ou produtos, os itens relacionados são removidos em cascata.

## Como executar

### Pré-requisitos

- Node.js instalado
- PostgreSQL disponível
- Conta no Cloudinary
- npm instalado

### 1. Instalar dependências

```bash
cd backend
npm install
```

### 2. Configurar o `.env`

Crie um arquivo `.env` dentro da pasta `backend` com as variáveis necessárias. Veja a seção [Variáveis de ambiente](#variáveis-de-ambiente).

### 3. Executar as migrations

```bash
npx prisma migrate dev
```

### 4. Gerar o Prisma Client

```bash
npx prisma generate
```

### 5. Iniciar o backend

```bash
npm run dev
```

Por padrão, a API roda em:

```txt
http://localhost:3333
```

## Variáveis de ambiente

Arquivo: `backend/.env`

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/pizzaria"
JWT_SECRET="sua_chave_secreta"
PORT=3333
CLOUDINARY_CLOUD_NAME="seu_cloud_name"
CLOUDINARY_API_KEY="sua_api_key"
CLOUDINARY_API_SECRET="seu_api_secret"
```

## Scripts disponíveis

```bash
npm run dev
```

Inicia a API com recarregamento automático usando `tsx watch`.

Comandos úteis do Prisma:

```bash
npx prisma migrate dev
npx prisma migrate deploy
npx prisma generate
npx prisma studio
```

## Rotas da API

Todas as rotas abaixo usam o backend como base:

```txt
http://localhost:3333
```

### Usuários

| Método | Rota       | Proteção    | Descrição                               |
| ------ | ---------- | ----------- | --------------------------------------- |
| `POST` | `/users`   | Pública     | Cria um novo usuário                    |
| `POST` | `/session` | Pública     | Autentica o usuário e retorna token JWT |
| `GET`  | `/me`      | Autenticada | Retorna os dados do usuário logado      |

### Categorias

| Método | Rota        | Proteção    | Descrição          |
| ------ | ----------- | ----------- | ------------------ |
| `POST` | `/category` | Admin       | Cria uma categoria |
| `GET`  | `/category` | Autenticada | Lista categorias   |

### Produtos

| Método   | Rota                | Proteção    | Descrição                                   |
| -------- | ------------------- | ----------- | ------------------------------------------- |
| `POST`   | `/product`          | Admin       | Cria um produto com imagem                  |
| `GET`    | `/products`         | Autenticada | Lista produtos, com filtro por status       |
| `DELETE` | `/product`          | Admin       | Remove ou desativa produto conforme service |
| `GET`    | `/category/product` | Autenticada | Lista produtos ativos de uma categoria      |

### Pedidos

| Método   | Rota            | Proteção    | Descrição               |
| -------- | --------------- | ----------- | ----------------------- |
| `POST`   | `/order`        | Autenticada | Cria um novo pedido     |
| `GET`    | `/orders`       | Autenticada | Lista pedidos           |
| `POST`   | `/order/add`    | Autenticada | Adiciona item ao pedido |
| `DELETE` | `/order/remove` | Autenticada | Remove item do pedido   |
| `GET`    | `/order/detail` | Autenticada | Detalha um pedido       |
| `PUT`    | `/order/send`   | Autenticada | Envia/confirma pedido   |
| `PUT`    | `/order/finish` | Autenticada | Finaliza pedido         |
| `DELETE` | `/order`        | Autenticada | Exclui pedido           |

## Exemplos de requisição

### Criar usuário

```http
POST /users
Content-Type: application/json
```

```json
{
  "name": "Administrador",
  "email": "admin@email.com",
  "password": "123456"
}
```

### Login

```http
POST /session
Content-Type: application/json
```

```json
{
  "email": "admin@email.com",
  "password": "123456"
}
```

Resposta esperada:

```json
{
  "id": "uuid-do-usuario",
  "name": "Administrador",
  "email": "admin@email.com",
  "role": "STAFF",
  "token": "jwt-token"
}
```

### Criar categoria

```http
POST /category
Authorization: Bearer seu-token
Content-Type: application/json
```

```json
{
  "name": "Pizzas Salgadas"
}
```

### Criar produto

```http
POST /product
Authorization: Bearer seu-token
Content-Type: multipart/form-data
```

Campos do formulário:

- `name`: nome do produto.
- `price`: preço em centavos.
- `description`: descrição do produto.
- `category_id`: UUID da categoria.
- `file`: imagem do produto.

### Criar pedido

```http
POST /order
Authorization: Bearer seu-token
Content-Type: application/json
```

```json
{
  "table": 5,
  "name": "Cliente Mesa 5"
}
```

### Adicionar item ao pedido

```http
POST /order/add
Authorization: Bearer seu-token
Content-Type: application/json
```

```json
{
  "order_id": "uuid-do-pedido",
  "product_id": "uuid-do-produto",
  "amount": 2
}
```

## Repositório do frontend

O painel web que consome esta API está em um repositório separado:

[pcidro/PizzariaFront](https://github.com/pcidro/PizzariaFront)

## Segurança

- Autenticação via JWT.
- Senhas protegidas com bcryptjs.
- Validação de entrada com Zod.
- Rotas administrativas protegidas por `isAuthenticated` e `isAdmin`.
- Upload de arquivos limitado por tipo e tamanho.
- Variáveis sensíveis ficam fora do código, em arquivos `.env`.

## Aprendizados

Durante o desenvolvimento deste projeto, aprendi a organizar a arquitetura de um backend em camadas, separando responsabilidades entre rotas, middlewares, controllers, services e banco de dados. Isso deixou o código mais organizado, fácil de entender e mais simples de manter.

Também aprendi a criar middlewares de autenticação e autorização, incluindo um middleware para validar usuários autenticados e outro para proteger rotas que exigem perfil de administrador.

Outro aprendizado importante foi como deixar o projeto mais seguro, criptografando senhas antes de salvar no banco e utilizando token JWT para autenticação. No frontend, o token é salvo em cookies usando recursos nativos do Next.js, evitando expor dados sensíveis no `localStorage`.

No geral, este projeto me ajudou a entender melhor como desenvolver um CRUD completo, seguro e com código organizado, seguindo boas práticas de estruturação e validação de dados.

## Pontos de melhoria

- Organizar melhor o arquivo de rotas, separando as rotas por domínio, como usuários, categorias, produtos e pedidos.
- Adicionar testes automatizados para services, middlewares e principais fluxos da API.
- Adicionar paginação e filtros mais avançados nas listagens.
