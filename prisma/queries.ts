import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const posts = await prisma.post.findMany({
        include: { author: true, comments: true }
    });
    console.log(JSON.stringify(posts, null, 2));

    // Example: create a new user
    const user = await prisma.user.create({
        data: { name: "Bob", email: `bob${Date.now()}@example.com` }
    });
    console.log(user);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());