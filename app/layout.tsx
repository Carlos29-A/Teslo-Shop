import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import "./globals.css";
import { Provider } from "@/components";



export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: "Teslo | Shop",
  },
  description: "Un e-commerce creado con Next.js, Tailwind CSS y TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
