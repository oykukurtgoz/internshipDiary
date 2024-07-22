import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme, ThemePanel } from '@radix-ui/themes'
import "./globals.css";
import NavBar from "./components/NavBar";
import '@radix-ui/themes/styles.css';
import './theme-config.css';


const inter = Inter({
   subsets: ["latin"],
   variable: '--font-inter'
   });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
      <Theme accentColor="violet" grayColor="sand" radius="large">          
        <NavBar/>
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
