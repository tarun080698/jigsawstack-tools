import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Prevents blocking rendering
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Prevents blocking rendering
});

export const metadata: Metadata = {
  title: "JigsawStack Learning",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Apply Fonts as Global Styles to Prevent Hydration Mismatch */}
        <style>{`
          :root {
            --font-geist-sans: ${geistSans.variable};
            --font-geist-mono: ${geistMono.variable};
          }
        `}</style>
      </head>
      <body className={` antialiased `}>{children}</body>
    </html>
  );
}
