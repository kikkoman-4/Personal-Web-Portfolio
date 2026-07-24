import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "../components/ui/navbar";
import { SmoothScroll } from "../lib/smooth-scroll";
import { CustomScrollbar } from "../components/ui/custom-scrollbar";
import { cn } from "@/lib/utils";
import { COMPANY, CONTACT, SITE, BRANCHES, SOCIAL } from "@/lib/site-config";
import { generateProductSchema } from "@/lib/product-schema";
import type { Inventory } from "@/types/database";
import { createClient } from "@/lib/supabase/client";
import { RecaptchaProvider } from "@/components/ui/recaptcha-provider";
import { UnderConstruction } from "@/components/ui/under-construction";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

// Fetch inventory for dynamic Product Schema
async function getInventoryForSchema(): Promise<Inventory[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase credentials not configured for schema generation");
      return [];
    }

    const supabase = createClient();
    const { data, error } = await supabase.from("Inventory").select("*");

    if (error) {
      console.warn("Failed to fetch inventory for schema:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.warn("Error fetching inventory for schema:", err);
    return [];
  }
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || SITE.url),
  title: {
    default: `${COMPANY.name} | Premium Wine & Spirits Distributor Philippines`,
    template: `%s | ${COMPANY.name}`
  },
  description: COMPANY.description,
  keywords: [...SITE.keywords],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    title: `${COMPANY.name} | Fine Wine & Spirits Distributor`,
    description: `${COMPANY.tagline}. Premium international wine distribution since ${COMPANY.foundedYear}.`,
    siteName: COMPANY.name,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: `${COMPANY.name} Premium Collection`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} | Premium Wine Distributor`,
    description: `Premier international distributor of fine wines and luxury spirits since ${COMPANY.foundedYear}.`,
    images: [SITE.ogImage],
    creator: "@winecenturybros",
    site: "@winecenturybros",
  },
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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/wcb_logo2.jpg', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/wcb_logo2.jpg' }
    ],
  },
};

const jsonLd = (inventory: Inventory[]) => [
  // ── Organization ─────────────────────────────────────────────
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    "name": COMPANY.name,
    "url": SITE.url,
    "logo": {
      "@type": "ImageObject",
      "url": SITE.logo,
      "width": 200,
      "height": 100,
    },
    "sameAs": [
      SOCIAL.facebook.url,
      SOCIAL.instagram.url,
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": CONTACT.phone.aseana.display,
      "contactType": "customer service",
      "areaServed": "PH",
      "availableLanguage": "English",
    },
  },
  // ── WebSite (enables Sitelinks Searchbox in Google) ──────────
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    "url": SITE.url,
    "name": COMPANY.name,
    "description": COMPANY.description,
    "publisher": { "@id": `${SITE.url}/#organization` },
    "inLanguage": "en-PH",
  },
  // ── WebPage Schema ────────────────────────────────────────────
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": SITE.url,
    "url": SITE.url,
    "name": `${COMPANY.name} | Premium Wine & Spirits Distributor Philippines`,
    "description": COMPANY.description,
    "publisher": { "@id": `${SITE.url}/#organization` },
    "primaryImageOfPage": SITE.ogImage,
    "datePublished": `${COMPANY.foundedYear}-01-01`,
    "dateModified": new Date().toISOString().split("T")[0],
  },
  // ── Local Business entries per branch ────────────────────────
  ...Object.values(BRANCHES).map((branch) => ({
    "@context": "https://schema.org",
    "@type": "WineStore",
    "name": `${COMPANY.name} — ${branch.name}`,
    "image": SITE.logo,
    "url": SITE.url,
    "telephone": branch.name === "BINONDO"
      ? CONTACT.phone.binondo.display
      : CONTACT.phone.aseana.display,
    "priceRange": "₱₱₱",
    "servesCuisine": "Wine & Spirits",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": branch.address,
      "addressLocality": branch.name,
      "addressRegion": branch.region,
      "addressCountry": "PH",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": branch.geo.latitude,
      "longitude": branch.geo.longitude,
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "20:00",
      },
    ],
    "parentOrganization": { "@id": `${SITE.url}/#organization` },
  })),
  // ── Dynamic Product Schema from Inventory ────────────────────
  // These enable rich results in Google Search and Google Shopping
  ...generateProductSchema(inventory),
  // ── Breadcrumb Schema ────────────────────────────────────────
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE.url,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": `${SITE.url}#products`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "About Us",
        "item": `${SITE.url}#about`,
      },
    ],
  },
  // ── FAQ Schema ────────────────────────────────────────────────
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What wines do you carry?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We carry an extensive range of imported wines including red wines, white wines, rosé, sparkling wines, champagne, and dessert wines from the world's finest wine regions."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer wholesale pricing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer competitive wholesale pricing for restaurants, hotels, and corporate clients. Contact us through our inquiry form for a custom quote."
        }
      },
      {
        "@type": "Question",
        "name": "What areas do you deliver to?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We serve Metro Manila including Binondo, Makati, Parañaque, and surrounding areas. Contact us for delivery options and rates."
        }
      },
      {
        "@type": "Question",
        "name": "How can I place an order?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can place an order through our inquiry modal on the website or visit either of our branches in Binondo or Parañaque. Our concierge team will assist you with your selection."
        }
      },
    ],
  },
  // ── Aggregate Rating Schema ───────────────────────────────────
  {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150+",
    "bestRating": "5",
    "worstRating": "1",
    "itemReviewed": {
      "@type": "Organization",
      "name": COMPANY.name
    }
  },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch inventory for dynamic Product Schema
  const inventory = await getInventoryForSchema();

  return (
    <html lang="en" className={cn("font-sans overflow-x-hidden", geist.variable)}>
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE_HERE" />

        {/* Canonical URL */}
        <link rel="canonical" href={SITE.url} />

        {/* hreflang for international SEO */}
        <link rel="alternate" href={SITE.url} hrefLang="en-PH" />
        <link rel="alternate" href={SITE.url} hrefLang="en" />
        <link rel="alternate" href={SITE.url} hrefLang="x-default" />

        <meta name="facebook-domain-verification" content="op9j3cvkpam0n8hi5zbuwu5g82lraj" />
        {/* Facebook Pixel */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '2429085344232700');
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2429085344232700&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <style dangerouslySetInnerHTML={{
          __html: `
          html, body { background-color: #050505 !important; margin: 0; padding: 0; }
          body { transition: opacity 0.8s ease-in-out; }
        `}} />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(inventory)) }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <RecaptchaProvider>
          <CustomScrollbar />
          <SmoothScroll>
            <Navigation />
            {children}
          </SmoothScroll>
        </RecaptchaProvider>
      </body>
    </html>
  );
}
