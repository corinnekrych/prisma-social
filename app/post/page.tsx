import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Link,
  Stack,
  Divider,
} from '@mui/material';

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
    <Container maxWidth="md" sx={{ py: 8, minHeight: '100vh' }}>
      <Box component="main">
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          All Posts
        </Typography>

        {posts.length === 0 ? (
          <Typography color="text.secondary">
            No posts yet. Run the seed script to add some data!
          </Typography>
        ) : (
          <Stack spacing={3}>
            {posts.map((post: any) => (
              <Card key={post.id} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    By {post.author.name} ({post.author.email})
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {post.content}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Chip
                      label={post.published ? "Published" : "Draft"}
                      color={post.published ? "success" : "default"}
                      size="small"
                    />
                    <Typography variant="body2" color="text.secondary">
                      {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}
                    </Typography>
                  </Stack>

                  {post.comments.length > 0 && (
                    <Box sx={{ pl: 2, borderLeft: 2, borderColor: 'divider' }}>
                      <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                        Comments:
                      </Typography>
                      <Stack spacing={1}>
                        {post.comments.map((comment: any) => (
                          <Typography key={comment.id} variant="body2">
                            <strong>{comment.author.name}:</strong> {comment.content}
                          </Typography>
                        ))}
                      </Stack>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}

        <Box sx={{ mt: 4 }}>
          <Link href="/" color="primary" underline="hover">
            ← Back to home
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
