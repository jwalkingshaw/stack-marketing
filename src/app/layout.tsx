import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { Barlow_Condensed, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { generateWebSiteSchema, generateOrganizationSchema, generateSoftwareApplicationSchema } from "@/lib/schema";
import MarketingLayoutWrapper from "@/components/MarketingLayoutWrapper";
import Footer from "@/components/Footer";
import { FloatingHaveYourSayButton } from "@/components/FloatingHaveYourSayButton";

const displayFont = Barlow_Condensed({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const ibmPlexMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://stackcess.com"),
  icons: {
    icon: [{ url: '/stackcess-favicon.svg', type: 'image/svg+xml' }, { url: '/stackcess-icon-wb-logo.png', type: 'image/png' }],
    shortcut: '/stackcess-icon-wb-logo.png',
    apple: '/stackcess-icon-wb-logo.png',
  },
  title: "Product Content Operations Software for Supplement Brands | Stackcess",
  description: "Manage supplement product data, approved assets, localization, and partner delivery from one product content operations platform.",
  keywords: ["supplement brands", "product content operations", "PIM", "DAM", "partner portal", "product content syndication", "AI localization", "compliance documents", "multilingual product content"],
  authors: [{ name: "Stackcess Team" }],
  creator: "Stackcess",
  publisher: "Stackcess",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Stackcess',
    title: 'Product Content Operations Software for Supplement Brands | Stackcess',
    description: 'Manage supplement product data, approved assets, localization, and partner delivery from one product content operations platform.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Content Operations Software for Supplement Brands | Stackcess',
    description: 'Manage supplement product data, approved assets, localization, and partner delivery from one product content operations platform.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebSiteSchema()
  const organizationSchema = generateOrganizationSchema()
  const softwareSchema = generateSoftwareApplicationSchema()

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${ibmPlexMono.variable} antialiased bg-[var(--color-background)] text-[var(--color-foreground)]`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <MarketingLayoutWrapper>
          <div className="flex-1">{children}</div>
          <div className="w-full">
            <Footer />
          </div>
          <FloatingHaveYourSayButton />
        </MarketingLayoutWrapper>
        <Analytics />
      </body>
    </html>
  );
}
