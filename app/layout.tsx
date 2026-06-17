import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "./components/ConditionalLayout";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hotel One Plus | Naran Valley",
  description: "Luxury mountain retreat in Naran Valley, Pakistan. Book your stay at Hotel One Plus.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}