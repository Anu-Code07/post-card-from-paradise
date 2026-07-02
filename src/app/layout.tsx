import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { BRAND_FULL, BRAND_NAME } from "@/lib/brand";
import { postcardFontVariables } from "./postcard-fonts";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: `${BRAND_NAME} | Create & Share Digital Postcards`,
  description:
    `${BRAND_FULL} — upload travel photos, add a personal message, customize the design, and share with a unique link.`,
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: "/icon.png",
  },
  openGraph: {
    title: BRAND_FULL,
    description: "Create beautiful postcards from your travels and share them with anyone.",
    type: "website",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: BRAND_NAME }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fbf9f7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${postcardFontVariables}`}>
      <body className="min-h-dvh flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
