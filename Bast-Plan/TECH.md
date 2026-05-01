# Tech Stack & Dependencies | Blogging Platform API

## ⚙️ Core Runtime & Framework

- **Runtime Environment**: `Node.js` (v20+ LTS)
- **Programming Language**: `TypeScript` (v5+)
- **Web Framework**: `Express` (v5.x) - High performance, lightweight routing.

## 🗄️ Database & ORM

- **Database Driver**: `MariaDB` (Accessible via Prisma's `mysql` provider)
- **ORM**: `Prisma v6.x` & `@prisma/client v6.x` - Type-safe database queries.

## 🔌 Core Middleware & Tools

- **Data Validation**: `zod` - Runtime verification of incoming POST/PUT JSON bodies.
- **Environment Management**: `dotenv` - Configures connection strings and ports.
- **Development Runner**: `tsx` - Instant TypeScript compilation during local development.

## 🧪 Testing Suite

- **Runner**: `vitest`
- **HTTP Client**: `supertest`
