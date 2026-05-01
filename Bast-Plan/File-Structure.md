# 📂 File Structure & Module Map

We will organize the code using an explicit MVC-like architecture pattern.
This decouples our Prisma database queries, validation logic, and routing.

```bash
.
├── .env                  # Local secret variables
├── .env.example          # Shared configuration template
├── package.json          # Dependency and script manager
├── prisma
│   └── schema.prisma     # Prisma data model definition
├── src
│   ├── app.ts            # Express application setup
│   ├── controllers       # Route handlers (Request/Response orchestration)
│   │   └── postController.ts
│   ├── middleware        # Global rate limiters & error handlers
│   │   ├── errorHandler.ts
│   │   └── validate.ts
│   ├── routes            # API Endpoint definitions
│   │   └── postRoutes.ts
│   ├── server.ts         # Server network listener (Starts the app)
│   ├── services          # Business logic & Prisma interactions
│   │   └── postService.ts
│   ├── types             # Global TypeScript interface definitions
│   │   └── index.ts
│   └── utils             # Shared utility helpers
├── tests                 # Automated API integration tests
└── tsconfig.json         # TypeScript compiler configurations
```
