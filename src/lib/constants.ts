export const SITE = {
  name: 'Čišćenje Dugo Selo',
  serviceHeadline: 'Čišćenje stanova i kuća',
  url: 'https://www.ciscenje-dugo-selo.com',
  locale: 'hr_HR',
  phone: '+385976083278',
  phoneDisplay: '+385 97 608 3278',
  whatsapp: '+385976083278',
  area: 'Dugo Selo, Božjakovina, Rugvica, Brckovljani, Sesvete, Vrbovec i okolica',
  tagline: 'Dugo Selo i okolica',
} as const;

export const CALCULATOR_DURATION_HINT = 'Procjena u ~1 min';

export const COMPANY = {
  legalName: 'Obrt za usluge čišćenja Čišćenje Dugo Selo',
  name: 'Čišćenje Dugo Selo',
  type: 'Usluge profesionalnog čišćenja stanova i kuća',
  legalForm: 'obrt',
  address: 'Ulica Ante Starčevića 8',
  city: '10370 Dugo Selo',
  oib: '58472931608',
  mbo: '081234567',
  yearFounded: 2019,
} as const;

export const INTRO_TEXT =
  'Za okvirnu cijenu najbrže krenite od online kalkulatora — u par minuta dobit ćete procjenu koju možete odmah poslati na WhatsApp ili u kontakt formu. Prije dolaska dogovorimo što treba očistiti, termin i točnu cijenu. Javite nam se i izravno ako vam je lakše.';

export const HERO_STATS = [
  'Dogovor cijene prije dolaska',
  `Od ${COMPANY.yearFounded}.`,
  'Dugo Selo i okolica',
] as const;

export const SERVICE_TYPES = [
  {
    title: 'Redovno čišćenje',
    tagline: 'Kad želite uredan stan bez stalnog planiranja',
    description:
      'Dolazimo jednom tjedno ili na dva tjedna, čistimo prašinu, podove, kuhinju, kupaonicu i WC, i dogovorimo fiksni termin koji vam paše.',
    price: 'od 16 €/h · najmanje 3 sata',
    href: '/ciscenje-stanova-dugo-selo',
    calculatorType: 'redovno',
  },
  {
    title: 'Jednokratno čišćenje',
    tagline: 'Kad treba srediti stan jednom',
    description:
      'Dolazimo jednom i čistimo isto što i kod redovnog čišćenja, npr. prije gostiju, nakon sitnih radova ili kad jednostavno nemate vremena. Dogovorimo termin i što je prvo na redu.',
    price: 'od 18 €/h · najmanje 3 sata',
    href: '/ciscenje-stanova-dugo-selo',
    calculatorType: 'jednokratno',
  },
  {
    title: 'Generalno čišćenje',
    tagline: 'Kad treba ozbiljnije ući u posao',
    description:
      'Detaljno čistimo cijeli stan ili kuću, kuhinju i kupaonicu, skidamo kamenac, brišemo lajsne, vrata i paučinu, i sve što se kod redovnog čišćenja radi brže. Npr. prije useljenja, nakon renovacije ili kad je dugo bilo zanemareno.',
    price: 'od 22 €/h ili od 2,80 €/m²',
    href: '/generalno-ciscenje-stana-dugo-selo',
    calculatorType: 'generalno',
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

export const TESTIMONIALS = [
  {
    name: 'Ana M.',
    location: 'Dugo Selo',
    service: 'Redovno čišćenje',
    quote:
      'Dolaze u isti termin, stan uvijek mirno miriše na čistoću. Konačnu cijenu znala sam prije nego su došli.',
  },
  {
    name: 'Ivan K.',
    location: 'Sesvete',
    service: 'Generalno čišćenje',
    quote:
      'Nakon renovacije trebao nam je temeljit posao. Kuhinja i kupaonica izgledaju kao nove, dogovorili smo sve unaprijed.',
  },
  {
    name: 'Petra L.',
    location: 'Vrbovec',
    service: 'Jednokratno čišćenje',
    quote:
      'Javila sam se preko WhatsAppa, brzo su odgovorili i došli prije gostiju. Sve po dogovoru, bez iznenađenja.',
  },
] as const;

export const PRICING_TRUST_NOTE =
  'Cijenu dogovorimo prije dolaska — bez iznenađenja na licu mjesta.';

export const SERVICE_PAGES = [
  { href: '/ciscenje-stanova-dugo-selo', label: 'Čišćenje stanova Dugo Selo' },
  {
    href: '/generalno-ciscenje-stana-dugo-selo',
    label: 'Generalno čišćenje stana',
  },
  { href: '/ciscenje-kuca-dugo-selo', label: 'Čišćenje kuća Dugo Selo' },
  { href: '/pranje-prozora-dugo-selo', label: 'Pranje prozora Dugo Selo' },
] as const;

export const NAV_LINKS = [
  { href: '/#o-nama', label: 'O nama' },
  { href: '/#usluge', label: 'Usluge' },
  { href: '/#kalkulator', label: 'Kalkulator' },
  { href: '/#cjenik', label: 'Cjenik' },
  { href: '/#kontakt', label: 'Kontakt' },
] as const;

export const FOOTER_LINKS = [
  { href: '/', label: 'Početna' },
  { href: '/#o-nama', label: 'O nama' },
  { href: '/#usluge', label: 'Usluge' },
  { href: '/#kalkulator', label: 'Kalkulator cijene' },
  { href: '/#cjenik', label: 'Cjenik' },
  { href: '/#faq', label: 'Česta pitanja' },
  { href: '/#kontakt', label: 'Kontakt' },
] as const;

export const ABOUT_US = {
  intro:
    'Obrt iz Dugog Sela. Radimo od 8 do 22 h po dogovoru. Prije svakog dolaska dogovorimo što treba očistiti i koliko će to otprilike koštati.',
  story:
    'Obrt Čišćenje Dugo Selo pokrenuli smo 2019. godine jer smo vidjeli da ljudima fali pouzdan tim koji dolazi na vrijeme i obavlja posao kvalitetno.',
  teamNote:
    'Na svaki posao dolaze naši radnici sa svojim sredstvima i profesionalnom opremom.',
  highlights: [
    'Tim od 1 do 2 osobe po dolasku',
    'Radimo u Dugom Selu, Sesvetama, Vrbovcu i okolici',
    'Dogovorimo cijenu prije dolaska',
    'Dolazimo u dogovoreno vrijeme',
    'Pazimo na namještaj i stvari u stanu',
  ],
} as const;

export const PARTNERS = {
  intro:
    'Za opremu i sredstva za čišćenje surađujemo s provjerenim profesionalnim brendovima',
  store: {
    title: 'Posjetite i dućan partnera',
    badge: 'Partner · Kärcher Center Zagreb',
    description:
      'Za profesionalnu opremu surađujemo s ovlaštenim Kärcher centrom. U dućanu partnera možete pogledati usisivače, paročistače i perače.',
    image: '/partners/karcher-store-zagreb.jpg',
    imageAlt: 'Kärcher Center Zagreb — profesionalna oprema za čišćenje',
    address: 'Samoborska cesta 169A',
    city: '10090 Zagreb',
    hours: 'Pon–pet 8–18 h',
    href: 'https://www.kaercher.com/hr/servisi/podrska/kaercher-centri/kaercher-center-zagreb.html',
    cta: 'Kärcher Center Zagreb',
    mapsLabel: 'Otvori na karti',
    mapsHref:
      'https://www.google.com/maps/search/?api=1&query=K%C3%A4rcher+Center+Zagreb+Samoborska+cesta+169A',
  },
  items: [
    {
      name: 'Kärcher',
      logo: '/partners/karcher.svg',
      role: 'Profesionalna oprema',
      description:
        'Usisivači, paročistači i visokotlačni perači za temeljito čišćenje.',
    },
    {
      name: 'Nilfisk',
      logo: '/partners/nilfisk.svg',
      role: 'Industrijska oprema',
      description:
        'Profesionalni usisivači i oprema za veće i zahtjevnije poslove.',
    },
    {
      name: 'Vileda Professional',
      logo: '/partners/vileda.svg',
      role: 'Alati za čišćenje',
      description:
        'Mopovi, krpe, kante i sustavi za redovno i generalno čišćenje.',
    },
    {
      name: 'Ecolab',
      logo: '/partners/ecolab.svg',
      role: 'Profesionalna sredstva',
      description: 'Sredstva za higijenu kuhinje, kupaonice i radne površine.',
    },
    {
      name: 'Diversey',
      logo: '/partners/diversey.svg',
      role: 'Sredstva i dezinfekcija',
      description:
        'Profesionalna sredstva za čišćenje, dezinfekciju i održavanje.',
    },
    {
      name: '3M',
      logo: '/partners/3m.svg',
      role: 'Profesionalni pribor',
      description:
        'Krpe, spužve i pribor za detaljno i sigurno čišćenje površina.',
    },
  ],
} as const;

export const SERVICES = [
  {
    title: 'Redovno čišćenje stanova',
    description:
      'Dolazimo jednom tjedno ili na dva tjedna, uvijek u isti termin, i ne morate svaki put ispočetka objašnjavati što treba.',
    href: '/ciscenje-stanova-dugo-selo',
  },
  {
    title: 'Jednokratno čišćenje',
    description:
      'Dolazimo jednom kad zatreba, npr. prije gostiju, nakon radova ili kad nemate vremena, i čistimo cijeli stan po dogovoru.',
    href: '/ciscenje-stanova-dugo-selo',
  },
  {
    title: 'Generalno čišćenje',
    description:
      'Temeljitije čistimo kuhinju, kupaonicu, podove i sve detalje koji trebaju više pažnje nego kod redovnog održavanja.',
    href: '/generalno-ciscenje-stana-dugo-selo',
  },
  {
    title: 'Čišćenje kuća',
    description:
      'Čistimo kuće i veće prostore u Dugom Selu i okolici, a cijenu i vrijeme dogovorimo prema broju soba i stanju.',
    href: '/ciscenje-kuca-dugo-selo',
  },
  {
    title: 'Pranje prozora',
    description:
      'Peremo prozore unutra, vani ili oboje, po dogovoru. Može uz generalno čišćenje ili zasebno.',
    href: '/pranje-prozora-dugo-selo',
  },
  {
    title: 'Čišćenje nakon selidbe',
    description:
      'Selidba je gotova, a prostor još nije spreman? Dolazimo nakon iseljenja ili useljenja, kako dogovorimo.',
    href: '/#kontakt',
  },
] as const;

export const PRICING = [
  {
    service: 'Redovno čišćenje',
    price: 'od 16 €/h',
    note: 'Najmanje 3 sata po dolasku',
  },
  {
    service: 'Jednokratno čišćenje',
    price: 'od 18 €/h',
    note: 'Najmanje 3 sata po dolasku',
  },
  {
    service: 'Generalno čišćenje',
    price: 'od 22 €/h ili od 2,80 €/m²',
    note: null,
  },
  {
    service: 'Pranje prozora',
    price: 'po dogovoru',
    note: null,
  },
  {
    service: 'Čišćenje nakon selidbe',
    price: 'po dogovoru',
    note: null,
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

export const CALCULATOR_HINT = {
  title: 'Najbrži put do okvirne cijene',
  body: 'Prođite kalkulator u par minuta — procjenu možete odmah poslati na WhatsApp ili nastaviti u kontakt formi.',
  cta: 'Otvori kalkulator',
} as const;

export const STEPS = [
  {
    step: 1,
    title: 'Krenite od kalkulatora',
    description:
      'Za brzu procjenu prođite kalkulator cijene. Ako vam je lakše, javite se na WhatsApp, telefon ili kontakt formu.',
  },
  {
    step: 2,
    title: 'Dogovorimo sve',
    description:
      'Pregledamo veličinu prostora, stanje, prioritete i okvirnu cijenu.',
  },
  {
    step: 3,
    title: 'Dolazimo na čišćenje',
    description: 'Dolazimo u termin koji vam odgovara i radimo po dogovoru.',
  },
] as const;

export const WHY_US = [
  'Na posao dolazi 1 do 3 čistača po potrebi',
  'Radimo u Dugom Selu i okolici',
  'Cijenu dogovorimo prije dolaska',
  'Dolazimo u dogovoreno vrijeme',
  'Pazimo na stvari u stanu',
  'Dogovorimo stalne termine za redovna čišćenja',
  'Profesionalna oprema i sredstva uključeni u uslugu',
] as const;

export const FAQ_ITEMS = [
  {
    question:
      'Koja je razlika između redovnog, jednokratnog i generalnog čišćenja?',
    answer:
      'Redovno čišćenje je održavanje — dolazimo redovno i držimo stan u redu. Jednokratno je isti opseg posla, ali samo jednom, kad vam zatreba. Generalno čišćenje je temeljitije, s više posla u kuhinji, kupaonici, na lajsnama, kamencu i ostalim detaljima. Niste sigurni što vam treba? Javite se, reći ćemo vam.',
  },
  {
    question: 'Koliko traje čišćenje stana?',
    answer:
      'Ovisi o veličini i vrsti čišćenja. Manji stan za redovno čišćenje obično traje oko 3 do 4 sata; generalno čišćenje može trajati i duže. Prije dolaska reći ćemo vam okvirno vrijeme.',
  },
  {
    question: 'Moram li kupiti sredstva za čišćenje?',
    answer:
      'Ne, dolazimo sa svojim sredstvima. Ako imate proizvode koje želite da koristimo, samo javite unaprijed.',
  },
  {
    question: 'Radite li redovna čišćenja?',
    answer:
      'Da, dolazimo jednom tjedno ili na dva tjedna, kako dogovorimo. Za stalne klijente držimo isti termin.',
  },
  {
    question: 'Radite li generalno čišćenje?',
    answer:
      'Da, detaljnije čistimo kuhinju, kupaonicu, podove, vrata i ostale površine. Cijena je od 22 €/h ili od 2,80 €/m².',
  },
  {
    question: 'Čistite li kuće ili samo stanove?',
    answer:
      'Čistimo i stanove i kuće u Dugom Selu i okolici. Za kuće cijenu dogovorimo prema veličini i stanju.',
  },
  {
    question: 'Radite li u Sesvetama i okolici Dugog Sela?',
    answer:
      'Da, radimo u Dugom Selu, Božjakovini, Rugvici, Brckovljani, Sesvetama, Vrbovcu i okolici. Pošaljite lokaciju i potvrdit ćemo možemo li doći.',
  },
  {
    question: 'Može li prvi dolazak biti dok sam doma?',
    answer:
      'Može, i mnogi to tako žele jer je lakše dogovoriti prioritete kad ste tu.',
  },
  {
    question: 'Kako se dogovara cijena?',
    answer:
      'Pošaljete podatke o veličini prostora, lokaciju i što treba očistiti. Cijena ovisi o stanju prostora, broju kupaonica i sličnom. Javit ćemo okvirnu cijenu prije dolaska.',
  },
] as const;

export const CLEANING_TYPES = [
  'Redovno čišćenje',
  'Jednokratno čišćenje',
  'Generalno čišćenje',
  'Čišćenje kuće',
  'Pranje prozora',
  'Čišćenje nakon selidbe',
  'Nisam siguran, trebam savjet',
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
    caption: 'Sudoper i radna površina — u jednoj slici lijevo prije, desno poslije čišćenja.',
  },
  {
    title: 'Hladnjak',
    src: '/gallery/hladnjak-prije-poslije.png',
    caption: 'Čišćenje hladnjaka iznutra — uklonjene mrlje, naslage i nečistoće.',
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
