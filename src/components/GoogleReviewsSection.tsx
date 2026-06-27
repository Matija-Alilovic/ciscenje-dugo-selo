import Link from "next/link";
import { GOOGLE_BUSINESS } from "@/lib/constants";
import { getGoogleReviewUrl } from "@/lib/site";
import Reveal from "./Reveal";

export default function GoogleReviewsSection() {
  const reviewUrl = getGoogleReviewUrl() ?? GOOGLE_BUSINESS.mapsSearchUrl;

  return (
    <Reveal>
      <div className="card-modern mx-auto max-w-2xl p-6 text-center sm:p-8">
        <p className="text-lg leading-relaxed text-gray-700">
          Recenzije naših klijenata objavljene su na Googleu. Ako ste bili zadovoljni
          uslugom, ostavite ocjenu — pomaže drugim ljudima u Dugom Selu da nas pronađu.
        </p>
        <a
          href={reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold"
        >
          Ocijenite nas na Googleu
        </a>
        <p className="mt-4 text-sm text-gray-500">
          Nemate Google račun?{" "}
          <Link href="/#kontakt" className="font-medium text-brand-700 hover:text-brand-800">
            Javite nam se izravno
          </Link>
          .
        </p>
      </div>
    </Reveal>
  );
}
