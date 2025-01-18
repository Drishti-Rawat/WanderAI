import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner"
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider    afterSignOutUrl="/">
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        <Suspense fallback={<div>Loading toaster...</div>}>
        <Toaster position="bottom-right" />
        </Suspense>
        <Provider>
        {children}
      </Provider>
      <Footer/>
      </body>
    </html>
    </ClerkProvider>
  );
}
