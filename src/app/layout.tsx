import type { Metadata } from "next";
import Script from "next/script";
import dynamic from "next/dynamic";
import { Lora, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site";
import { SEO_KEYWORDS } from "@/lib/seo";
import HashScrollHandler from "@/components/HashScrollHandler";
import { ThemeProvider } from "@/components/ThemeProvider";
import Toast from "@/components/Toast";
import "./globals.css";

const PageBackground = dynamic(() => import("@/components/PageBackground"), {
  loading: () => null,
});

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  loading: () => null,
});

const BackToTop = dynamic(() => import("@/components/BackToTop"), {
  loading: () => null,
});

const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-lora",
  display: "swap",
  weight: ["500", "600", "700"],
});

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("ciscenje-dugo-selo-theme");
    var dark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (dark) document.documentElement.classList.add("dark");
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      document.documentElement.classList.add("custom-cursor");
    }
  } catch (e) {}
})();
`;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#12151a" },
  ],
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Održavanje kuće i okućnice Dugo Selo",
    template: "%s | Održavanje Dugo Selo",
  },
  description:
    "Redovito čišćenje i redovita košnja u Dugom Selu i okolici. Dolazimo isti dan svaki tjedan ili svaka dva tjedna.",
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: SITE.name, url: getSiteUrl() }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Održavanje kuće i okućnice",
  formatDetection: {
    telephone: true,
    address: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "hr-HR": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    url: getSiteUrl(),
    title: "Održavanje kuće i okućnice Dugo Selo",
    description:
      "Redovito čišćenje i redovita košnja u Dugom Selu i okolici. Dolazimo isti dan svaki tjedan ili svaka dva tjedna.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Održavanje kuće i okućnice Dugo Selo",
    description:
      "Redovito čišćenje i redovita košnja u Dugom Selu. Isti dan svaki tjedan — dugoročna suradnja.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" suppressHydrationWarning>
      <body
        className={`${sourceSans.variable} ${lora.variable} mobile-safe-bottom font-sans antialiased`}
        suppressHydrationWarning
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <PageBackground />
        <ThemeProvider>
          <HashScrollHandler />
          <CustomCursor />
          <Toast />
          <BackToTop />
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
