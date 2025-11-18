import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexPress - Modern Blog Reading Platform",
  description:
    "NexPress is a fast, modern blog browsing built with Next.js. Explore articles, authors, categories, and rich content with a clean UI.",
  keywords: [
    "NexPress",
    "Next.js Blog",
    "Blog Platform",
    "Content Platform",
    "Articles",
    "Blog Reader",
  ],
  authors: [{ name: "NexPress Team" }],
  creator: "NexPress Team",
  metadataBase: new URL("https://nexpress.vercel.app/"),
  openGraph: {
    title: "NexPress - Modern Blog Reading Platform",
    description:
      "Explore and read modern blog posts with a clean, fast Next.js-powered interface.",
    url: "https://nexpress.vercel.app/",
    siteName: "NexPress",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "NexPress - Modern Blog Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexPress - Modern Blog Reading Platform",
    description:
      "A clean, modern blog content browsing experience built with Next.js.",
    images: ["/opengraph-image.png"],
    creator: "@nexpress",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
