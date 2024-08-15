import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Grailed Similarity Search",
  description: "Find similar items on Grailed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-black text-white py-4">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl font-bold">Grailed Similarity Search</h1>
          </div>
        </header>
        <main className="flex-grow bg-white">{children}</main>
      </body>
    </html>
  );
}
