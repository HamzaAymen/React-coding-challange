import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import QueryWrapper from "./wrapper/query-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Techguilds Challange",
  description: "React Coding Challange",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryWrapper>{children}</QueryWrapper>
      </body>
    </html>
  );
}
