export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Prisma Social</h1>
        <p className="text-lg mb-4">Welcome to Prisma Social!</p>
        <a
          href="/post"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          View all posts
        </a>
      </main>
    </div>
  );
}
