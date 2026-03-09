"use client";
import "./globals.css";
import HydrationProvider from "@/src/components/HydrationProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HydrationProvider>{children}</HydrationProvider>
      </body>
    </html>
  );
}
