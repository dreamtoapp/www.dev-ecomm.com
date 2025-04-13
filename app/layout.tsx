import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Directions } from "../constant/enums";
import { ThemeProvider } from "../provider/theme-provider";
import { NotificationsProvider } from "../provider/pusherContext";
import { SessionProvider } from "next-auth/react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "amwag",
  manifest: "/manifest.webmanifest", // Automatically mapped
  // themeColor: "#2196f3",
  appleWebApp: {
    capable: true,
    title: "amwag",
    statusBarStyle: "black-translucent",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = "ar"; // Hardcoded for now
  const dir = Directions.RTL; // Set direction dynamically later

  const fontClass = dir === Directions.RTL ? "font-cairo" : "font-roboto"; // Use Tailwind directly

  return (
    <SessionProvider>
      <html lang={locale} dir={dir} suppressHydrationWarning>
        <body className={`min-h-screen bg-background antialiased ${fontClass}`}>
          <NotificationsProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextTopLoader />
              <div className="container mx-auto px-4 py-3 flex justify-end"></div>
              <main className="min-h-screen">{children}</main>
              <Toaster position="top-center" />
            </ThemeProvider>
          </NotificationsProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
