import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    // Create two users
    const alice = await prisma.user.create({
        data: { name: "Alice", email: "alice@example.com" }
    });

    const bob = await prisma.user.create({
        data: { name: "Bob", email: "bob@example.com" }
    });

    // Alice writes a post
    const alicePost = await prisma.post.create({
        data: {
            title: "Hello World",
            content: "I am Alice and this is my first post",
            published: true,
            authorId: alice.id
        }
    });

    // Bob comments on Alice's post
    await prisma.comment.create({
        data: {
            content: "Great post, Alice!",
            postId: alicePost.id,
            authorId: bob.id
        }
    });

    const bobPost = await prisma.post.create({
        data: {
            title: "Hello",
            content: "I am Bob. I love programming.",
            published: true,
            authorId: bob.id
        }
    });

    console.log("Seeded Alice, Bob, post and comment");
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
