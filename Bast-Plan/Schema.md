# Database Schema | Blogging Platform API

This schema uses **Prisma ORM (v6+)** with a **MariaDB** (MySQL) database.

---

## 🛠️ Prisma Schema

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String   @db.Text
  category  String

  // Since MariaDB supports native JSON columns, we store tags directly as JSON.
  // Prisma will transparently handle casting this to a JavaScript array.
  tags      Json

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("posts")
}
```

---

## 🏷️ MariaDB Field & Type Mapping

| Field Name  | Prisma Type | Native MariaDB Type | Purpose                                               |
| :---------- | :---------- | :------------------ | :---------------------------------------------------- |
| `id`        | `String`    | `VARCHAR(191)`      | Primary Key generated as a UUIDv4 string.             |
| `title`     | `String`    | `VARCHAR(191)`      | Title of the post.                                    |
| `content`   | `String`    | `LONGTEXT` / `TEXT` | Post content (stored as @db.Text for unlimited size). |
| `category`  | `String`    | `VARCHAR(191)`      | Classification term used for querying.                |
| `tags`      | `Json`      | `LONGTEXT` (JSON)   | Stored as a native JSON array of strings.             |
| `createdAt` | `DateTime`  | `DATETIME(3)`       | Timestamp of generation.                              |
| `updatedAt` | `DateTime`  | `DATETIME(3)`       | Automatically updated on modification.                |
