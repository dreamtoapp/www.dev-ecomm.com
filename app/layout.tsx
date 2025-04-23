import './globals.css';

import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';

import { Toaster } from '@/components/ui/sonner';

import { Directions } from '../constant/enums';
import { ThemeProvider } from '../provider/theme-provider';

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

// export function head() {
//   return (
//     <>
//       {/* Removed preload links for fallback AVIF and WebP images for Lighthouse retest */}
//       {/* <link rel="preload" as="image" href="/fallback/fallback.avif" type="image/avif" crossOrigin="anonymous" /> */}
//       {/* <link rel="preload" as="image" href="/fallback/fallback.webp" type="image/webp" crossOrigin="anonymous" /> */}
//     </>
//   );
// }

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
        {/* <head>{head()}</head> */}
        <body className={`min-h-screen bg-background antialiased ${fontClass}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader />
            <main className="min-h-screen">{children}</main>
            <Toaster position="top-center" />
          </ThemeProvider>
          {/* </NotificationsProvider> */}
        </body>
      </html>
    </SessionProvider>
  );
}
