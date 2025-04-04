import type { Metadata } from "next";
import "./globals.css";
import Header from "@/componenets/layout/header";
import Footer from "@/componenets/layout/footer";
import QueryProvider from "@/componenets/layout/QueryProvider";
import { SessionProvider } from "next-auth/react";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen overflow-x-hidden flex flex-col">
        <SessionProvider>
        <QueryProvider>
        <Header/>
          {children}
        <Footer/>
        </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
