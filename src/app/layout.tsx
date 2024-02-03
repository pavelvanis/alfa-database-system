import type { Metadata } from "next";
import { Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/features/header";
import Footer from "@/components/features/footer";

const inter = Inter({ subsets: ["latin"] });
const font = Josefin_Sans({});

export const metadata: Metadata = {
  title: "Alfa 3 - Database System",
  description: "User interface created for project Alfa 3 - Database System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
