"use client";
import "./globals.css";
import HydrationProvider from "@/src/components/HydrationProvider";
import ReduxProvider from "@/src/redux/Provider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          <HydrationProvider>{children}</HydrationProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
