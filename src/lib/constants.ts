export const SITE = {
  name: 'Održavanje Dugo Selo',
  serviceHeadline: 'Održavanje kuće i okućnice',
  url: 'https://www.ciscenje-dugo-selo.com',
  locale: 'hr_HR',
  phone: '+385976083278',
  phoneDisplay: '+385 97 608 3278',
  whatsapp: '+385976083278',
  area: 'Dugo Selo i Sesvete',
  tagline: 'Dugo Selo i Sesvete',
} as const;

export const CALCULATOR_DURATION_HINT = 'Procjena u ~1 min';

export const COMPANY = {
  legalName: 'Obrt za usluge čišćenja Čišćenje Dugo Selo',
  name: 'Održavanje Dugo Selo',
  type: 'Čišćenje i održavanje okućnice',
  legalForm: 'obrt',
  address: 'Ul. Dragutina Domjanića 12B',
  city: '10370 Dugo Selo',
  oib: '58472931608',
  mbo: '081234567',
} as const;

export const INTRO_TEXT =
  'Održavanje Dugo Selo je obrt specijaliziran za pouzdano i redovito održavanje kuća i okućnica, s naglaskom na dugoročnu suradnju i brigu o vašem prostoru.';

export const LOCAL_SEO_TEXT =
  'Dolazimo u Dugo Selo i Sesvete. Svakom klijentu pristupamo individualno, s ciljem dugoročne suradnje i transparentne komunikacije.';

export const GOOGLE_BUSINESS = {
  mapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=Ul.+Dragutina+Domjani%C4%87a+12B,+10370+Dugo+Selo,+Croatia',
  reviewUrl:
    'https://www.google.com/maps/place/%C4%8Ci%C5%A1%C4%87enje+Dugo+Selo/@45.806597,16.2379696,758m/data=!3m1!1e3!4m15!1m8!3m7!1s0x47667aafe62e4b0b:0x80f8de3d5c447729!2sUl.+Dragutina+Domjani%C4%87a+12B,+10370,+Dugo+Selo!3b1!8m2!3d45.806597!4d16.2379696!16s%2Fg%2F11tjgkd5xl!3m5!1s0x3cc292a1d2de643:0x36c5626086411339!8m2!3d45.806597!4d16.2379696!16s%2Fg%2F11z9fs6vvy?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D',
  mapsEmbedQuery: 'Ul. Dragutina Domjanića 12B, 10370 Dugo Selo, Croatia',
  mapsLabel: 'Pronađite nas na Google Maps',
} as const;

export const AREA_PAGES = [
  {
    slug: 'sesvete',
    name: 'Sesvete',
    nameLocative: 'Sesvetama',
    tagline: 'Redovito čišćenje stanova i kuća u Sesvetama',
    intro:
      'U Sesvetama nudimo redovito čišćenje stanova i kuća. Na rubu naselja dogovaramo i redovito održavanje okućnice, uvijek na isti dan.',
  },
] as const;

export const BOOKING_AREAS = [
  'Dugo Selo',
  'Sesvete',
  'Okolica / drugo',
] as const;

export const BOOKING_TIME_SLOTS = [
  { value: 'jutro', label: 'Jutro (8–12 h)' },
  { value: 'popodne', label: 'Popodne (12–17 h)' },
  { value: 'vecer', label: 'Večer (17–21 h)' },
  { value: 'fleksibilno', label: 'Fleksibilno — dogovorimo' },
] as const;

export const HERO_STATS = [
  'Dugoročna suradnja',
  'Dugo Selo i Sesvete',
] as const;

export const SERVICE_PILLARS = [
  {
    title: 'Redovito čišćenje',
    tagline: 'Stanovi i kuće',
    description:
      'Dolazimo isti dan svaki tjedan. Brišemo prašinu, peremo podove te čistimo kuhinju i kupaonicu.',
    href: '/ciscenje-stanova-dugo-selo',
    calculatorType: 'ciscenje',
  },
  {
    title: 'Redovito održavanje okućnice',
    tagline: 'Kosimo travu i održavamo živicu',
    description:
      'Košnja i održavanje travnjaka, trimanje rubova, živica, cvjetnjaci, gredice, lišće, terase i sezonski poslovi u Dugom Selu i Sesvetama. Dogovaramo ritam i držimo ga kroz sezonu.',
    href: '/odrzavanje-dvorista-dugo-selo',
    calculatorType: 'dvoriste',
  },
] as const;

export const SERVICE_TYPES = [
  {
    title: 'Redovito čišćenje',
    tagline: 'Jednom tjedno ili svaka 2 tjedna',
    description:
      'Naša osnovna usluga. Dogovaramo termin i pouzdano ga držimo. Brišemo prašinu, peremo podove te čistimo kuhinju i kupaonicu.',
    price: '13 €/h',
    href: '/ciscenje-stanova-dugo-selo',
    calculatorType: 'tjedno',
  },
] as const;

export const SERVICE_COMPARISON = [
  {
    label: 'Brisanje prašine i usisavanje',
    redovno: true,
    jednokratno: true,
    generalno: true,
  },
  { label: 'Pranje podova', redovno: true, jednokratno: true, generalno: true },
  {
    label: 'Kuhinja i kupaonica',
    redovno: true,
    jednokratno: true,
    generalno: true,
  },
  { label: 'Čišćenje WC-a', redovno: true, jednokratno: true, generalno: true },
  {
    label: 'Redovni termin (tjedno / 2 tjedna)',
    redovno: true,
    jednokratno: false,
    generalno: false,
  },
  {
    label: 'Jedan dolazak kad zatreba',
    redovno: false,
    jednokratno: true,
    generalno: false,
  },
  {
    label: 'Uklanjanje kamenca',
    redovno: false,
    jednokratno: false,
    generalno: true,
  },
  {
    label: 'Brisanje lajsni i vrata',
    redovno: false,
    jednokratno: false,
    generalno: true,
  },
  {
    label: 'Uklanjanje paučine',
    redovno: false,
    jednokratno: false,
    generalno: true,
  },
  {
    label: 'Pećnica / hladnjak / prozori',
    redovno: false,
    jednokratno: false,
    generalno: 'optional',
  },
] as const;

export const SERVICE_PAGES = [
  { href: '/ciscenje-stanova-dugo-selo', label: 'Redovito čišćenje stanova' },
  { href: '/ciscenje-kuca-dugo-selo', label: 'Redovito čišćenje kuća' },
  {
    href: '/odrzavanje-dvorista-dugo-selo',
    label: 'Održavanje dvorišta / okućnice',
  },
  { href: '/kosnja-trave-dugo-selo', label: 'Košnja trave Dugo Selo' },
  {
    href: '/odrzavanje-kuce-dugo-selo',
    label: 'Održavanje kuće (uz redovito)',
  },
  { href: '/pranje-prozora-dugo-selo', label: 'Pranje prozora (po dogovoru)' },
  { href: '/pranje-terase-dugo-selo', label: 'Pranje terase (po dogovoru)' },
] as const;

export const AREA_LINKS = [
  { href: '/ciscenje-sesvete', label: 'Sesvete' },
] as const;

export const NAV_LINKS = [
  { href: '/#o-nama', label: 'O nama' },
  { href: '/#usluge', label: 'Usluge' },
  { href: '/#kalkulator', label: 'Kalkulator' },
  { href: '/#kontakt', label: 'Kontakt' },
] as const;

export const FOOTER_LINKS = [
  { href: '/', label: 'Početna' },
  { href: '/#o-nama', label: 'O nama' },
  { href: '/#usluge', label: 'Usluge' },
  { href: '/#kalkulator', label: 'Kalkulator cijene' },
  { href: '/#faq', label: 'Česta pitanja' },
  { href: '/#kontakt', label: 'Kontakt' },
] as const;

export const ABOUT_US = {
  intro:
    'Održavanje Dugo Selo je obrt usmjeren na redovito čišćenje i redovito održavanje okućnica na području Dugog Sela i okolice. Dolazimo isti dan svaki tjedan ili svaka dva tjedna.',
  story:
    'Ne nudimo jednokratne poslove jednom godišnje. Fokusiramo se na dugoročnu suradnju. Naš prioritet je jednostavan kvaliteta prije svega.',
  teamNote: '',
  highlights: [
    'Isti dan svaki tjedan',
    'Dugoročna suradnja',
    'Dugo Selo i Sesvete',
    'Cijena poznata prije početka suradnje',
    'Koristimo vašu opremu i sredstva',
  ],
} as const;

export const SERVICES = [
  {
    title: 'Redovito čišćenje kuća',
    description:
      'Više soba i kupaonica. Redoviti termin cijelu godinu, cijenu dogovaramo prema kući.',
    href: '/ciscenje-kuca-dugo-selo',
  },
  {
    title: 'Redovito održavanje okućnice',
    description:
      'Travnjak, živica, gredice, terase i sezonski poslovi. Isti tjedan kao čišćenje, ako želite.',
    href: '/odrzavanje-dvorista-dugo-selo',
  },
  {
    title: 'Redovita košnja trave',
    description:
      'Od ožujka do studenoga, otprilike svaka dva tjedna. Dogovaramo ritam i držimo ga.',
    href: '/kosnja-trave-dugo-selo',
  },
] as const;

export const PRICING = [
  {
    service: 'Redovito čišćenje',
    price: '13 €/h',
    note: 'Tjedno ili svaka dva tjedna, od 3 sata',
  },
  {
    service: 'Redovita košnja trave',
    price: '0,15–0,30 €/m²',
    note: 'Od 35 € po dolasku, kroz sezonu',
  },
  {
    service: 'Komplet (čišćenje + okućnica)',
    price: 'po dogovoru',
    note: 'Isti tjedan, jedan dogovor',
  },
] as const;

export const BASIC_CLEANING = [
  'Brisanje prašine',
  'Usisavanje',
  'Pranje podova',
  'Čišćenje kupaonice',
  'Čišćenje WC-a',
  'Brisanje kuhinjskih površina',
  'Čišćenje sudopera i slavina',
  'Iznošenje smeća',
  'Brisanje vidljivih površina',
] as const;

export const DEEP_CLEANING = [
  'Detaljno čišćenje kuhinje',
  'Detaljno čišćenje kupaonice',
  'Uklanjanje kamenca',
  'Brisanje vrata, kvaka i prekidača',
  'Brisanje lajsni',
  'Uklanjanje paučine',
  'Čišćenje pločica',
  'Temeljito brisanje vidljivih površina',
  'Prozori po dogovoru',
  'Pećnica i hladnjak po dogovoru',
] as const;

/** Osnovno + generalno — samo čišćenje unutra. */
export const FULL_CLEANING_CHECKLIST = [
  ...BASIC_CLEANING,
  ...DEEP_CLEANING,
] as const;

export const CALCULATOR_HINT = {
  title: 'Izračunajte okvirnu cijenu usluge',
  body: 'Odgovorite na nekoliko pitanja i dobit ćete okvirnu cijenu održavanja kuće i okućnice.',
  cta: 'Otvori kalkulator',
} as const;

export const STEPS = [
  {
    step: 1,
    title: 'Javite se',
    description:
      'Pošaljite nam upit putem kalkulatora, WhatsAppa ili telefona. Odgovaramo u kratkom roku.',
  },
  {
    step: 2,
    title: 'Dogovorimo ritam i cijenu',
    description:
      'Odredimo dan u tjednu i okvirnu cijenu redovitog održavanja. Cijena ovisi o veličini i stanju prostora.',
  },
  {
    step: 3,
    title: 'Dolazimo isti dan svaki tjedan',
    description:
      'Posao obavljamo u dogovorenom terminu. Koristimo vašu opremu i sredstva. Ne dogovarate se svaki put ispočetka.',
  },
] as const;

export const WHY_US = [
  'Isti dan svaki tjedan',
  'Dugoročna suradnja, ne jednokratni posao',
  'Osobni pristup i jasna komunikacija',
  'Pouzdano izvršavanje dogovorenih termina',
  'Cijena poznata prije početka suradnje',
  'Koristimo vašu opremu i sredstva',
  'Čišćenje i okućnica u istom tjednu',
  'Radimo lokalno, iz Dugog Sela',
] as const;

export const FAQ_ITEMS = [
  {
    question: 'Što točno nudite?',
    answer:
      'Redovito čišćenje (stan ili kuća), redovito održavanje okućnice (košnja, živica, terasa) i, uz redoviti dolazak, sitne popravke ili bojanje po dogovoru. Sve je dugoročna suradnja — isti dan, tjedno ili svaka dva tjedna.',
  },
  {
    question: 'Radite li jednokratne poslove?',
    answer:
      'Ne. Ne radimo „jednom godišnje“ akcije. Fokus je na klijentima koji žele redoviti ritam cijelu godinu (ili kroz sezonu za košnju).',
  },
  {
    question: 'Koliko košta redovito čišćenje?',
    answer:
      '13 €/h. Za stan od oko 65 m² obično 45–60 € po dolasku. Točan iznos potvrdimo kad znamo prostor i ritam (tjedno ili svaka 2 tjedna).',
  },
  {
    question: 'Koliko košta košnja i okućnica?',
    answer:
      'Košnja je otprilike 0,15–0,30 €/m², od 35 € po dolasku. Tipično dvorište često izađe 50–80 €. Živica, lišće ili pranje terase dodaju se na to — najbrže kroz kalkulator.',
  },
  {
    question: 'Mogu li čišćenje i okućnica biti u istom tjednu?',
    answer:
      'Može. Većina klijenata s kućom tako radi. U kalkulatoru označite oboje ili nam na WhatsAppu napišite što trebate — dogovorimo jedan dan ili isti tjedan.',
  },
  {
    question: 'Kad se kosi trava?',
    answer:
      'Od ožujka do studenoga, otprilike svaka dva tjedna, ovisno o rastu. Dogovorimo ritam na početku sezone i držimo ga.',
  },
  {
    question: 'Što je uključeno u održavanje okućnice?',
    answer:
      'Osnovno je košnja i rubovi. Po dogovoru: živica, lišće, gredice, pranje terase i slični sezonski poslovi. Recite što želite redovito, a što povremeno.',
  },
  {
    question: 'Radite li sitne popravke ili bojanje?',
    answer:
      'Da, uz redoviti dolazak — npr. montaža polica, zamjena slavine, sastavljanje namještaja ili bojanje sobe. Nismo građevinska firma; veće zahvate ne radimo.',
  },
  {
    question: 'Gdje dolazite?',
    answer:
      'Redovito radimo u Dugom Selu i Sesvetama. Pošaljite ulicu — potvrdimo možemo li i koji dan.',
  },
  {
    question: 'Kako naručiti i dogovoriti cijenu?',
    answer:
      'Najbrže: kalkulator na stranici, pa WhatsApp. Ili nazovite +385 97 608 3278 / forma na dnu. Kažete kvadraturu, ritam i što trebate — potvrdimo cijenu prije prvog dolaska.',
  },
  {
    question: 'Koliko često dolazite?',
    answer:
      'Čišćenje: tjedno ili svaka 2 tjedna, isti dan cijelu godinu. Okućnica: kroz sezonu, obično svaka 2 tjedna. Ritam dogovorimo unaprijed.',
  },
  {
    question: 'Moram li imati opremu i sredstva?',
    answer:
      'Za čišćenje da — usisivač, mop, krpe i sredstva. Za okućnicu opremom se dogovorimo (vaša ili naša, ovisno o poslu). Recite unaprijed što imate.',
  },
  {
    question: 'Treba li netko biti doma?',
    answer:
      'Prvi put je zgodno da netko pokaže što je važno. Kasnije možete otići ako ostavite ključ ili drugačije dogovorimo pristup.',
  },
  {
    question: 'Čistite li samo stanove ili i kuće?',
    answer:
      'I stanove i kuće, uvijek kao redovito održavanje. Kod kuće cijenu i vrijeme dogovaramo prema broju soba, kupaonica i okućnici ako je ima.',
  },
] as const;

export const CLEANING_TYPES = [
  'Redovito čišćenje (tjedno)',
  'Redovito čišćenje (svaka 2 tjedna)',
  'Redovito čišćenje kuće',
  'Redovita košnja / okućnica',
  'Komplet (čišćenje + okućnica)',
  'Nisam siguran/na, trebam savjet',
] as const;

export const YARD_CHECKLIST = [
  'Košnja trave i održavanje travnjaka (rubovi, gnojidba, dosijavanje)',
  'Orezivanje i oblikovanje živice i grmlja',
  'Cvjetnjaci, gredice, povrtnjak i sadnja',
  'Skupljanje lišća, korov i biljni otpad',
  'Sezonska priprema vrta (proljeće / zima) i malčiranje',
  'Čišćenje dvorišta, staza i terasa',
  'Pranje terasa i opločnika visokotlačnim peračem',
  'Čišćenje oluka dostupnih sa zemlje',
  'Zalijevanje i osnovno održavanje navodnjavanja',
] as const;

/** Kraća lista za stranicu košnje. */
export const LAWN_CHECKLIST = [
  'Košnja trave i održavanje travnjaka',
  'Trimanje rubova oko ograda, stabala i objekata',
  'Grabljanje i skupljanje pokošene trave',
  'Prozračivanje i dosijavanje travnjaka',
  'Gnojidba travnjaka',
  'Uklanjanje korova',
] as const;

export const HOUSE_WORK_CHECKLIST = [
  'Montaža polica i sitnog namještaja',
  'Zamjena slavine ili sitni vodoinstalaterski zahvat',
  'Bojanje jedne sobe ili zida',
  'Sitni popravci oko kuće po dogovoru',
] as const;

export const TERRACE_CHECKLIST = [
  'Pranje terase visokotlačnim peračem',
  'Pranje betonskih staza',
  'Uklanjanje mahovine i naslaga s ploča',
  'Pranje vanjskih stepenica po dogovoru',
] as const;

/** Sažetak usluga za landing stranice — bez preduge liste. */
export const ALL_SERVICES_CHECKLIST = [
  'Redovito čišćenje (prašina, podovi, kuhinja, kupaonica)',
  'Detaljnije čišćenje po dogovoru (kamenac, lajsne, prozori…)',
  'Košnja trave i održavanje travnjaka',
  'Orezivanje živice i grmlja',
  'Cvjetnjaci, gredice i sadnja',
  'Skupljanje lišća i sezonsko čišćenje okućnice',
  'Čišćenje i pranje staza, terasa i opločnika',
  'Zalijevanje i osnovno navodnjavanje',
] as const;

export type BeforeAfterItem = {
  title: string;
  src: string;
  caption?: string;
};

export const BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    title: 'Kuhinja',
    src: '/gallery/kuhinja-prije-poslije.png',
    caption:
      'Sudoper i radna površina — u jednoj slici lijevo prije, desno poslije čišćenja.',
  },
  {
    title: 'Hladnjak',
    src: '/gallery/hladnjak-prije-poslije.png',
    caption:
      'Čišćenje hladnjaka iznutra — uklonjene mrlje, naslage i nečistoće.',
  },
  {
    title: 'Odvod i sifon',
    src: '/gallery/odvod-prije-poslije.png',
    caption: 'Dubinsko čišćenje odvoda, sifona i pripadajućih dijelova.',
  },
  {
    title: 'Prostor nakon radova',
    src: '/gallery/dnevni-boravak-prije-poslije.png',
    caption: 'Uređenje i čišćenje prostora nakon radova ili prije useljenja.',
  },
];
