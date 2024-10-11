import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { Config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

const Code = EB_Garamond({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Code.className} antialiased`}>{children}</body>
    </html>
  );
}
