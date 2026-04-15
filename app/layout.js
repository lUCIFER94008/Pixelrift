import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const LOGO_URL = "https://res.cloudinary.com/dpmpefw2p/image/upload/v1/U2NyZWVuc2hvdF8yMDI2LTA0LTE1XzEyMTAyM195YXhtdDU.png";

export const metadata = {
  title: "Pixelrift — Build Your Business Website Instantly",
  description: "Premium ready-made web solutions with custom design and full support. Build your business website instantly with Pixelrift.",
  icons: {
    icon: LOGO_URL,
    shortcut: LOGO_URL,
    apple: LOGO_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased bg-dark`}>
        <Toaster position="top-right" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
