import { Container, Typography, Link, Box } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 8, minHeight: '100vh' }}>
      <Box component="main">
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          Prisma Social
        </Typography>
        <Typography variant="h6" gutterBottom>
          Welcome to Prisma Social!
        </Typography>
        <Link href="/post" color="primary" underline="hover">
          View all posts
        </Link>
      </Box>
    </Container>
  );
}
