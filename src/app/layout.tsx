import type { Metadata } from "next";
import "./globals.css";
import Header from "@/componenets/layout/header";
import Footer from "@/componenets/layout/footer";
import Providers from "@/componenets/layout/Providers";

export const metadata: Metadata = {
  title: "My store",
  description:
    "a simple web app including the basic features of e-commerce applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen overflow-x-hidden flex flex-col">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
