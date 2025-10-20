# Prisma-Social
is a social media app built with Prisma. It's a great way to get started with Prisma.

## Scenario
You are building a mini social app where users can post articles and comment on them. 
You’ll use Node.js + TypeScript + Prisma + PostgreSQL (or Prisma Cloud).

## Requirements

### Database Schema (Prisma)
User: id, name, email (unique), createdAt
Post: id, title, content, published (boolean), authorId
Comment: id, content, postId, authorId
Define proper relationships and constraints using Prisma models.

### API Implementation
CRUD for User and Post.
Ability to fetch a Post with its Comments and author info.
Ability to publish/unpublish a post.
Seed Data
Create 2–3 users, each with a few posts and comments.

### Environment Handling
Use separate databases for dev/staging/prod.
Seed dev/staging, but ensure prod DB is protected.

### Optional (Advanced)
Add a query to get the 5 most active users based on the number of posts.
Add transaction support for creating a post and initial comment atomically.

## Getting Started
> NOTE :octocat: All code available in `main` branch

### Step 1: Create the project
```
mkdir prisma-social && cd prisma-social
npm init -y
npm install prisma @prisma/client ts-node typescript
npx prisma init
```

### Step 2: Start a local Postgres with Docker
```
docker run --name prisma-postgres -e POSTGRES_PASSWORD=mysecret -e POSTGRES_USER=dev -e POSTGRES_DB=dev_db -p 5432:5432 -d postgres:15
```
update .env file with:
`DATABASE_URL="postgresql://dev:mysecret@localhost:5432/dev_db?schema=public"`

### Step 3: Define your Prisma schema
Update prisma/schema.prisma with the model. See [Schema.prisma](./prisma/schema.prisma) for reference.

### Step 4: Run migrations
creates tables in your Docker Postgres instance and generate prisma client
```
npx prisma migrate dev --name init
npx prisma generate
```
### Step 5: Seed data
Create 2 users, one post and one comment. See [seed.ts](./prisma/seed.ts) for reference.
```
npx ts-node prisma/seed.ts
```

### Step 6: Querying data
Create queries
```
npx ts-node src/queries.ts
```

## Advanced features
### Step 7: nextjs API routes
> NOTE :octocat: All code available in `nextjs-all-posts-route` branch

To run:
```
docker run --name prisma-postgres -e POSTGRES_PASSWORD=mysecret -e POSTGRES_USER=dev -e POSTGRES_DB=dev_db -p 5432:5432 -d postgres:15
npm install
npx prisma generate
npx prisma migrate reset
npm run seed
npm run dev
```
Add CRUD API routes for User and Post in Next.js API routes. See [Next.js API Routes](./pages/api) for reference
```
  curl -X POST http://localhost:3000/api/posts \
    -H "Content-Type: application/json" \
    -d '{
      "title": "Draft Post",
      "content": "This post is not published yet",
      "published": false,
      "authorId": 2
    }'
```
