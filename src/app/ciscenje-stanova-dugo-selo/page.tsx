import { LandingPage } from '@/components/LandingPage';
import { PAGE_SEO } from '@/lib/seo';

export const metadata = PAGE_SEO.stanovi;

export default function CiscenjeStanovaPage() {
  return (
    <LandingPage
      title="Redovito čišćenje stanova Dugo Selo"
      subtitle="Isti dan svaki tjedan ili svaka dva tjedna. Dugoročna suradnja, ne jednokratni posao."
      pagePath="/ciscenje-stanova-dugo-selo"
      intro={[
        'Održavanje Dugo Selo je obrt specijaliziran za redovito čišćenje stanova u Dugom Selu i okolici. Dolazimo isti dan svaki tjedan ili svaka dva tjedna.',
        'Brišemo prašinu, peremo podove te čistimo kuhinju i kupaonicu. Koristimo vašu opremu i sredstva. Cijenu i ritam dogovaramo prije početka suradnje.',
      ]}
      sections={[]}
    />
  );
}
