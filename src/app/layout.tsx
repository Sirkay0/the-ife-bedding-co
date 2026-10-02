import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Ife Bedding Co. | Luxury Bedding, Mattresses & Home Comfort",
  description:
    "Experience organic tranquility and luxurious comfort with handcrafted bedding, mattresses, and pillows by The Ife Bedding Co.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        dmSans.variable,
        playfairDisplay.variable
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <Footer />
      </body>
    </html>
  );
}

