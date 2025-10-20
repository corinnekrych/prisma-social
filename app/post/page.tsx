async function getPosts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${apiUrl}/api/posts`, {
    cache: "no-store", // Disable caching for dynamic data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">All Posts</h1>

        {posts.length === 0 ? (
          <p className="text-gray-600">No posts yet. Run the seed script to add some data!</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.id} className="border rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">
                  By {post.author.name} ({post.author.email})
                </p>
                <p className="text-gray-800 mb-4">{post.content}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className={`px-3 py-1 rounded ${post.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <span className="text-gray-500">
                    {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}
                  </span>
                </div>

                {post.comments.length > 0 && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-200">
                    <h3 className="font-semibold mb-2">Comments:</h3>
                    <div className="space-y-2">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="text-sm">
                          <span className="font-medium">{comment.author.name}:</span>{" "}
                          <span className="text-gray-700">{comment.content}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        <div className="mt-8">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to home
          </a>
        </div>
      </main>
    </div>
  );
}
