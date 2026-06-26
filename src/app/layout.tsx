import type { Metadata } from "next";
import Script from "next/script";
import { Lora, Source_Sans_3 } from "next/font/google";
import { SITE } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site";
import { SEO_KEYWORDS } from "@/lib/seo";
import HashScrollHandler from "@/components/HashScrollHandler";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import Toast from "@/components/Toast";
import BackToTop from "@/components/BackToTop";
import PageBackground from "@/components/PageBackground";
import "./globals.css";

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
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#121614" },
  ],
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Čišćenje stanova i kuća Dugo Selo",
    template: "%s | Čišćenje stanova i kuća Dugo Selo",
  },
  description:
    "Čišćenje stanova i kuća u Dugom Selu i okolici. Redovno, jednokratno i generalno čišćenje te pranje prozora.",
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: SITE.name, url: getSiteUrl() }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Usluge čišćenja",
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
    title: "Čišćenje stanova i kuća Dugo Selo",
    description:
      "Čišćenje stanova i kuća u Dugom Selu i okolici. Redovno, jednokratno i generalno čišćenje te pranje prozora.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Čišćenje stanova i kuća Dugo Selo",
    description:
      "Čišćenje stanova i kuća u Dugom Selu i okolici. Dogovor cijene prije dolaska.",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
