## Getting Started

First, run the development server:

```bash
npm run dev
```

Then up database via Docker:

```bash
docker compose up
```

## Utils

For Prisma migrations:

```bash
npx prisma migrate dev --name {migration name}
```

For run Prisma seed and reset DB:

```bash
npm run db:reset
```
