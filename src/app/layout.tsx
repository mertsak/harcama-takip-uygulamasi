import "../style/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/redux/provider";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen flex flex-col dark:bg-gray-900 ${inter.className}`}
      >
        <Providers>
          <Header />

          {children}

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
