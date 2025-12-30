import type { Metadata } from "next";
import AppContextProvider from "../contexts/app_context";
import "./globals.css";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "Devlinks",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={` antialiased`}>
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
