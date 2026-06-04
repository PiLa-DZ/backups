# GraphQL

- Facebook in 2012
- One single endpoint (usually just `/graphql`),

- The client sends a highly specific string query
- The server returns exactly what was asked for—no more, no less

---

### 1. Is GraphQL a concept or a protocol?

GraphQL is a **Query Language for APIs** and a server-side execution engine.

Think of it as a **unified data layer**.
Instead of hitting different URL paths to gather information,
the client sends a highly specific string query to **one single endpoint**
(usually just `/graphql`),
and the server returns exactly what was asked for—no more, no less.

---

## 2. The Problem GraphQL Solves: Over-fetching and Under-fetching

Let's use your **Workout Tracker** application to see the breakdown.
Imagine your frontend dashboard needs to show a user's name
and just the _titles_ of their workouts.

### The REST Way (Inefficient)

1. You make a request to `GET /api/users/profile`.
   The server returns a massive object containing
   `firstName`, `lastName`, `email`, `avatarUrl`, `createdAt`, etc.
   You throw away the email and avatar because you don't need them right now (**Over-fetching**).

2. You look at that user object,
   extract their ID, and make a _second_ separate network request
   to `GET /api/users/7de83be6/workouts`
   to get their logs (**Under-fetching** on the first request, forcing a second network trip).

This slows down mobile applications because
the device is constantly opening network connections
and wasting cellular bandwidth downloading data it doesn't intend to display.

---

## 3. The GraphQL Way (The Power Shift)

In GraphQL, the front-end developer has total control over the data shape.
The client writes a query that mirrors the exact JSON structure they want back.

### The Client Request

The client sends an HTTP `POST` request to `/graphql`
with a body containing this structural query string:

```graphql
query {
  user(id: "7de83be6") {
    firstName
    workouts {
      title
    }
  }
}
```

### The Server Response

The GraphQL engine reads the request,
queries your database,
shapes the data on the fly,
and returns a clean,
ultra-lightweight payload matching your query fields perfectly:

```json
{
  "data": {
    "user": {
      "firstName": "Nabil",
      "workouts": [
        { "title": "Leg Day Hypertrophy" },
        { "title": "Upper Body Push" }
      ]
    }
  }
}
```

Look at that response!
There is zero wasted data.
The email, avatar link, and timestamps
were never sent across the internet because the client didn't ask for them.

---

## 4. How We Build a GraphQL API on the Backend (The 2 Core Pieces)

To make this work in your Express server,
you have to write two things: a **Schema** and **Resolvers**.

### Piece A: The Schema (The Contract)

You use GraphQL Schema Definition Language (SDL)
to map out your models and fields, creating a strongly-typed graph layout.

```graphql
type Workout {
  id: ID!
  title: String!
  createdAt: String!
}

type User {
  id: ID!
  firstName: String!
  email: String
  workouts: [Workout!]! # A user can have an array of workouts
}

# The entry points for reading data
type Query {
  user(id: ID!): User
}
```

### Piece B: The Resolvers (The Execution Code)

A resolver is a standard JavaScript/TypeScript function
that fetches the physical data for a specific field
from your database (like MariaDB using Prisma).

```typescript
const resolvers = {
  Query: {
    user: async (_parent, args, context) => {
      // Fetch the user from MariaDB using Prisma
      return await db.user.findUnique({ where: { id: args.id } });
    },
  },
  User: {
    workouts: async (user, _args, context) => {
      // GraphQL automatically knows which user it belongs to,
      // so you can fetch their related records instantly
      return await db.workout.findMany({ where: { userId: user.id } });
    },
  },
};
```

---

## 5. What about Modifying Data? (Mutations)

reading data is called a **Query**,
and any action that modifies data on the server is explicitly
called a **Mutation**.

If you want to add a new workout log, the client sends this query string:

```graphql
mutation {
  createWorkout(title: "Deadlift Max Day") {
    id
    title
  }
}
```

---

## Summary for your Roadmap

- **GraphQL**
  is a query language that collapses multiple API endpoints
  down into a **single `/graphql` gateway**.
  It eliminates network latency and data waste by letting front-end clients request
  specific data fields in a single trip.
  It uses a strict,
  typed schema to ensure complete contract safety
  between the front-end and back-end teams.
