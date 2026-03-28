// app/layout.tsx
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "CarCost",
  description: "Car ownership cost calculator",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans bg-neutral-950 text-white`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}