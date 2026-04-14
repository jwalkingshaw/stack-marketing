import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { Plus_Jakarta_Sans, DM_Sans, DM_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { generateWebSiteSchema, generateOrganizationSchema, generateSoftwareApplicationSchema } from "@/lib/schema";
import MarketingLayoutWrapper from "@/components/MarketingLayoutWrapper";
import Footer from "@/components/Footer";
import { FloatingHaveYourSayButton } from "@/components/FloatingHaveYourSayButton";

const geistSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = DM_Sans({
  variable: "--font-inter",
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

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://stackcess.com"),
  icons: {
    icon: [{ url: '/stackcess-favicon.svg', type: 'image/svg+xml' }, { url: '/stackcess-icon-wb-logo.png', type: 'image/png' }],
    shortcut: '/stackcess-icon-wb-logo.png',
    apple: '/stackcess-icon-wb-logo.png',
  },
  title: "Stackcess - Product Content System For Supplement Brands",
  description: "Structured PIM, DAM, localization, and retailer portal workflows for supplement brands, distributors, and retail partners.",
  keywords: ["supplement brands", "product information management", "PIM", "DAM", "partner portal", "retailer portal", "compliance tracking", "localization", "product content operations"],
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
    title: 'Stackcess - Product Content System For Supplement Brands',
    description: 'Structured PIM, DAM, localization, and retailer portal workflows for supplement brands, distributors, and retail partners.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stackcess - Product Content System For Supplement Brands',
    description: 'Structured PIM, DAM, localization, and retailer portal workflows for supplement brands, distributors, and retail partners.',
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
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${inter.variable} ${ibmPlexMono.variable} ${instrumentSerif.variable} antialiased bg-[var(--color-background)] text-[var(--color-foreground)]`}
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
