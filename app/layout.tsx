import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Full-stack developer specializing in React, Node.js, and modern web technologies.",
  authors: [{ name: "Your Name" }],
  keywords: ["portfolio", "web developer", "react", "next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${sourceSerif.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
