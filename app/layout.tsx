import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
