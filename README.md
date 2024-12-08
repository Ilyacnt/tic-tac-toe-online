## Getting Started

Node version: 20.11.1

First, run the development server:

```bash
npm run dev
```

Then up database via Docker:

```bash
docker compose up
```

## Utils

For Prisma dev migrations:

```bash
npm run db:migrate:dev
```

For run Prisma seed and reset DB:

```bash
npm run db:reset
```
