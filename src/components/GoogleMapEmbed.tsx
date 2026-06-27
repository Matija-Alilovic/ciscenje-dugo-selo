import { COMPANY, GOOGLE_BUSINESS } from "@/lib/constants";

export default function GoogleMapEmbed() {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(
    GOOGLE_BUSINESS.mapsEmbedQuery,
  )}&z=15&output=embed`;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <iframe
        title={`Lokacija — ${COMPANY.name}, ${COMPANY.address}, ${COMPANY.city}`}
        src={src}
        className="h-56 w-full sm:h-64"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
