import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SportsMajors - Elite Athletes Careers",
    description: "B2B platform for international student-athletes looking for OPT-friendly jobs.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
