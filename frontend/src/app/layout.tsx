import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TrpcWrapper } from "@/provider/trpc-wrapper";
import { ChakraWrapper } from "@/provider/chakra-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TrpcWrapper>
          <ChakraWrapper>{children}</ChakraWrapper>
        </TrpcWrapper>
      </body>
    </html>
  );
}