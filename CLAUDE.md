# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Prisma-Social is a mini social media application demonstrating Prisma ORM with TypeScript, Node.js, and PostgreSQL. Users can create posts and comment on them.

## Database Schema
Three core models with relationships:
- **User**: id, name, email (unique), createdAt - has many posts and comments
- **Post**: id, title, content, published (boolean), authorId - belongs to User, has many comments
- **Comment**: id, content, postId, authorId - belongs to both Post and User

## Essential Commands

### Database Operations
```bash
# Run migrations (creates tables and generates Prisma Client)
npx prisma migrate dev --name <migration_name>

# Generate Prisma Client after schema changes
npx prisma generate

# Seed the database with sample data
npx ts-node prisma/seed.ts

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (delete all data and re-run migrations)
npx prisma migrate reset
```

### Running Code
```bash
# Execute queries
npx ts-node prisma/queries.ts

# Run any TypeScript file
npx ts-node <file_path>
```

### Docker PostgreSQL Setup
```bash
# Start local PostgreSQL container
docker run --name prisma-postgres -e POSTGRES_PASSWORD=mysecret -e POSTGRES_USER=dev -e POSTGRES_DB=dev_db -p 5432:5432 -d postgres:15

# Stop container
docker stop prisma-postgres

# Start existing container
docker start prisma-postgres

# Remove container
docker rm prisma-postgres
```

DATABASE_URL format: `postgresql://dev:mysecret@localhost:5432/dev_db?schema=public`

## Code Architecture

### File Structure
- `prisma/schema.prisma` - Prisma data models and database schema definition
- `prisma/seed.ts` - Database seeding script (creates 2 users, 1 post, 1 comment)
- `prisma/queries.ts` - Example queries demonstrating Prisma Client usage
- `prisma/migrations/` - Version-controlled database migrations

### Working with Prisma Client
All database operations use the Prisma Client:
```typescript
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
```

Always disconnect when done:
```typescript
await prisma.$disconnect();
```

### Query Patterns
Use `include` to fetch related data:
```typescript
const posts = await prisma.post.findMany({
    include: { author: true, comments: true }
});
```

## Environment Management
The project uses separate databases for dev/staging/prod via DATABASE_URL environment variable. Ensure prod DB is protected when seeding.

## Schema Changes Workflow
1. Modify `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name <description>`
3. Prisma Client is auto-generated during migration
4. Update seed data if needed and re-seed
