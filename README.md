# Seazone Guest Guide

Guia Digital do Hóspede personalizado por imóvel, criado para o teste técnico AI Builder da Seazone.

O hóspede informa o código do imóvel, acessa o guia da estadia e usa um assistente virtual contextualizado para dúvidas sobre acesso, WiFi, regras, contato e recomendações locais.

## Produção

https://seazone.vercel.app

Códigos de avaliação:

- `FLN001`
- `CMP001`
- `LAG001`
- `JUR001`
- `STO001`
- `BNU001`
- `BCA001`
- `GRM001`

Links diretos:

- https://seazone.vercel.app/FLN001
- https://seazone.vercel.app/CMP001
- https://seazone.vercel.app/LAG001
- https://seazone.vercel.app/JUR001
- https://seazone.vercel.app/STO001
- https://seazone.vercel.app/BNU001
- https://seazone.vercel.app/BCA001
- https://seazone.vercel.app/GRM001

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- OpenAI via Vercel AI SDK
- Zod
- Vitest

## Funcionalidades

- Entrada por código do imóvel na home
- Guia personalizado em `/[code]`
- Dados do imóvel, fotos, endereço, capacidade e comodidades
- Instruções de acesso, WiFi, estacionamento e contato do anfitrião
- Regras da estadia
- Guia de experiências gerado por IA, contextualizado por endereço e persistido no banco
- Assistente virtual com streaming de resposta
- Recomendações locais dentro do assistente
- Página amigável para código inexistente

## Setup Local

Instale as dependências:

```bash
npm install
```

Crie `.env` com base em `.env.example`:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/seazone_guest_guide"
OPENAI_API_KEY=""
```

Prepare o banco:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run db:seed
```

Rode o projeto:

```bash
npm run dev
```

Acesse `http://localhost:3000` e use um dos códigos de avaliação.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
npm run prisma:generate
npm run prisma:migrate
npm run prisma:deploy
npm run db:seed
```

## Estrutura

```txt
src/app
  Rotas, páginas e APIs

src/components
  Componentes de UI, guia e chat

src/lib
  Prisma, validações, formatação e prompts de IA

src/server
  Leitura server-side de imóveis e guias

prisma
  Schema, migrations e seed do PostgreSQL
```

## Banco E Deploy

Produção usa PostgreSQL hospedado no Neon e deploy na Vercel.

Variáveis usadas em produção:

```bash
NEON_POSTGRES_PRISMA_URL="..."
NEON_DATABASE_URL="..."
OPENAI_API_KEY="..."
```

Para aplicar schema e dados em um novo banco:

```bash
npm run prisma:deploy
npm run db:seed
```

## Testes

```bash
npm run lint
npx tsc --noEmit
npm run test
npm run build
```
