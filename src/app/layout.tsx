import type { Metadata } from "next";
import { Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/features/header/header";
import Footer from "@/components/features/footer";
import { PrescriptionModel } from "@/models";
import { Prescription } from "@/models/types";
import SessionProvider from "@/components/providers/SessionProvider";
import InitProps from "@/components/initial-props";

const inter = Inter({ subsets: ["latin"] });
const font = Josefin_Sans({});

export const metadata: Metadata = {
  title: "Alfa 3 - Database System",
  description: "User interface created for project Alfa 3 - Database System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-50">
      <SessionProvider>
        <body className={inter.className}>
          <Header />
          <main className=" flex-1 max-w-screen-xl m-auto w-full rounded-2xl flex">
            <div className="flex-1 mx-4 my-2 rounded-2xl overflow-hidden">
              {children}
            </div>
          </main>
          <Footer />
        </body>
      </SessionProvider>
    </html>
  );
}
