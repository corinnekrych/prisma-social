import type { Metadata } from "next";
import ThemeProvider from "./ThemeProvider";

export const metadata: Metadata = {
  title: "Prisma Social",
  description: "A social media app built with Prisma and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
