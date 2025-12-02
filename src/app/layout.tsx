import type { Metadata } from "next";
import { Inter, Noto_Sans_Khmer } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/components/theme-provide";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "@/app/error";

const NotoSansKhmer = Noto_Sans_Khmer({
  variable: "--font-noto-sans-khmer",
  subsets: ["latin"],
});

const InterFont = Inter({
  variable: "--font-inter",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove("dark"); localStorage.setItem("nexpress-theme", "light");`,
          }}
        />
      </head>
      <body
        className={`${NotoSansKhmer.variable} ${InterFont.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="nexpress-theme"
        >
          <ErrorBoundary errorComponent={Error}>
            <Navbar />
            {children}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
