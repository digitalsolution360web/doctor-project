import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Midflora Herbal | Cosmetic Manufacturer & Herbal Products",
  description: "Midflora Herbal is a leading herbal cosmetic manufacturer offering private label, contract manufacturing, skincare, haircare, and Ayurvedic products.",
  keywords: "Herbal Cosmetic Manufacturer, Ayurvedic Cosmetic Manufacturer, Private Label Cosmetics, Herbal Skincare Products, Herbal Haircare Products, Cosmetic Contract Manufacturing, Third Party Cosmetic Manufacturing, Herbal Products Manufacturer, Natural Beauty Products, Cosmetic Manufacturer India",
  verification: {
    google: "CxPdCMVR8Pnm7jEdcLsB4BjepPy5xicN-wHi5hIz1xA",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-white pb-14 lg:pb-0" suppressHydrationWarning>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2XGZT9NS7B"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-2XGZT9NS7B');
          `}
        </Script>
       
       
          {children}
        
        
      </body>
    </html>
  );
}
