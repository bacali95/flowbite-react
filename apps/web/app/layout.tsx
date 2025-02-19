import { ThemeModeScript } from "flowbite-react";
import { Inter as InterFont } from "next/font/google";
import type { Metadata, Viewport } from "next/types";
import type { PropsWithChildren } from "react";
import { FathomScript } from "~/components/fathom-script";

import "~/styles/globals.css";

const interFont = InterFont({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  description:
    "Flowbite React is an open-source UI component library built with React components, Tailwind CSS utility classes and based on the Flowbite design system and components.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  other: {
    charSet: "utf-8",
    lang: "en",
  },
  title: "Flowbite React - UI Component Library",
  openGraph: {
    description:
      "Flowbite React is an open-source UI component library built with React components, Tailwind CSS utility classes and based on the Flowbite design system and components.",
    images: "https://flowbite.s3.amazonaws.com/github/flowbite-react.png",
    title: "Flowbite React - UI Component Library",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowbite React - UI component library",
    description:
      "Flowbite React is an open-source UI component library built with React components, Tailwind CSS utility classes and based on the Flowbite design system and components.",
    creator: "@zoltanszogyenyi",
    images: ["https://flowbite.s3.amazonaws.com/github/flowbite-react.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`${interFont.variable} font-sans`} suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body className="bg-white text-gray-600 antialiased dark:bg-gray-900 dark:text-gray-400">
        {children}
        <FathomScript />
      </body>
    </html>
  );
}
