import m11 from "@/assets/m11.jpg.asset.json";
import m22 from "@/assets/m22.jpg.asset.json";
import m33 from "@/assets/m33.jpg.asset.json";
import m44 from "@/assets/m44.jpg.asset.json";
import g2 from "@/assets/9.jpg.asset.json";
import opp from "@/assets/8.jpg.asset.json";
import fur from "@/assets/7.jpg.asset.json";
import ajy from "@/assets/6.jpg.asset.json";
import s1 from "@/assets/series1.jpg.asset.json";
import s2 from "@/assets/series2.jpg.asset.json";
import s3 from "@/assets/series3.jpg.asset.json";
import s4 from "@/assets/series4.jpg.asset.json";
import qashqa from "@/assets/qashqa.jpg.asset.json";
import odisey from "@/assets/odisey.jpg.asset.json";
import shoushenk from "@/assets/shoushenk.jpg.asset.json";
import kuryer from "@/assets/kuryer.jpg.asset.json";
import orzular from "@/assets/orzular.jpg.asset.json";
import dyuna2 from "@/assets/dyuna2.jpg.asset.json";
import buyukjang from "@/assets/buyukjang.jpg.asset.json";
import spiderman from "@/assets/spiderman.jpg.asset.json";
import blackphone2 from "@/assets/blackphone2.jpg.asset.json";
import breakingbad from "@/assets/breakingbad.jpg.asset.json";
import deadpoets from "@/assets/deadpoets.jpg.asset.json";
import gerakl from "@/assets/gerakl.jpg.asset.json";
import captainmarvel from "@/assets/captainmarvel.jpg.asset.json";
import silentzone from "@/assets/silentzone.jpg.asset.json";
import xavflihayvonlar from "@/assets/xavflihayvonlar.jpg.asset.json";
import freeguy from "@/assets/freeguy.jpg.asset.json";
import pusanga from "@/assets/pusanga.jpg.asset.json";
import dubay from "@/assets/dubay.jpg.asset.json";
import gunsakimbo from "@/assets/gunsakimbo.jpg.asset.json";
import fromseries from "@/assets/fromseries2.jpg.asset.json";
import ucharxanjarlar from "@/assets/ucharxanjarlar.jpg.asset.json";
import nosferatu from "@/assets/nosferatu.jpg.asset.json";
import omshantiom from "@/assets/omshantiom.jpg.asset.json";
import fifthwave from "@/assets/fifthwave.jpg.asset.json";

export type Title = {
  id: string;
  title: string;
  originalTitle?: string;
  poster: string;
  wide?: boolean;
  release?: string;
  year?: number;
  language?: string;
  rating?: string;
  genres: string[];
  country: string;
  director?: string;
  actor?: string;
  studio?: string;
  episodes?: string;
  ageRating: string;
  description?: string;
  telegram?: string;
  telegramPost?: string;
  isSeries?: boolean;
};


export const films: Title[] = [
  {
    id: "men-afsonaman",
    title: "Men afsonaman",
    originalTitle: "I Am Legend",
    poster: m44.url,
    release: "14-dekabr, 2007",
    genres: ["Fantastika", "Ilmiy fantastika", "Drama", "Jangari", "Triller"],
    country: "AQSH",
    director: "Francis Lawrence",
    actor: "Will Smith (Robert Neville)",
    ageRating: "16+",
    telegram: "https://t.me/sav_server/20",
  },
  {
    id: "shamoldan-tez",
    title: "Shamoldan tez",
    originalTitle: "Быстрее ветра",
    poster: m33.url,
    release: "29-may, 2024",
    genres: ["Drama", "Sport", "Melodrama"],
    country: "Fransiya, Belgiya",
    director: "Morgan S. Dalibert",
    ageRating: "16+",
    telegram: "https://t.me/sav_server/19",
  },
  {
    id: "fotihning-yuksalishi",
    title: "Fotihning yuksalishi",
    originalTitle: "Rise of the Conqueror",
    poster: m22.url,
    wide: true,
    genres: ["Tarixiy", "Jangari", "Drama", "Sarguzasht"],
    country: "Xalqaro",
    ageRating: "16+",
    telegram: "https://t.me/sav_server/12",
  },
  {
    id: "top-gun-maverick",
    title: "Top Gun: Maverick",
    originalTitle: "Top Gun: Maverick",
    poster: m11.url,
    wide: true,
    release: "27-may, 2022",
    genres: ["Jangari", "Drama"],
    country: "AQSH",
    director: "Joseph Kosinski",
    actor: 'Tom Cruise (Pete "Maverick" Mitchell)',
    ageRating: "12+",
    telegram: "https://t.me/sav_server/15",
  },
  {
    id: "gladiator-2",
    title: "Gladiator 2-qism",
    originalTitle: "Gladiator II",
    poster: g2.url,
    release: "2024",
    year: 2024,
    language: "O'zbek tilida (Dublyaj)",
    rating: "IMDb 7.5",
    genres: ["Ekshn", "Drama", "Tarixiy", "Jangari"],
    country: "AQSH",
    director: "Ridley Scott",
    ageRating: "16+",
    telegram: "https://t.me/sav_server/30",
  },
  {
    id: "oppenhaymer",
    title: "Oppenhaymer",
    originalTitle: "Oppenheimer",
    poster: opp.url,
    release: "2023",
    year: 2023,
    language: "O'zbek tilida (Professional)",
    rating: "IMDb 8.9",
    genres: ["Biografik", "Drama", "Tarixiy"],
    country: "AQSH",
    director: "Christopher Nolan",
    ageRating: "16+",
    telegram: "https://t.me/sav_server/31",
  },
  {
    id: "furiosa",
    title: "Furiosa: Telba Maks Xronikasi",
    originalTitle: "Furiosa: A Mad Max Saga",
    poster: fur.url,
    release: "2024",
    year: 2024,
    language: "O'zbek tilida",
    rating: "IMDb 7.6",
    genres: ["Jangari", "Ilmiy fantastika", "Sarguzasht"],
    country: "Avstraliya, AQSH",
    ageRating: "16+",
    telegram: "https://t.me/sav_server/32",
  },
  {
    id: "ajyrasham",
    title: "Ajyrasham",
    originalTitle: "Ажырашам",
    poster: ajy.url,
    release: "2024",
    year: 2024,
    language: "O'zbek tilida",
    rating: "IMDb 7.0",
    genres: ["Komediya", "Oilaviy"],
    country: "Qirg'iziston",
    ageRating: "12+",
    telegram: "https://t.me/sav_server/33",
  },
  {
    id: "odisseya",
    title: "Odisseya",
    originalTitle: "The Odyssey",
    poster: odisey.url,
    release: "17-iyul, 2026",
    year: 2026,
    language: "O'zbek tilida (Tarjima)",
    genres: ["Tarixiy", "Epik", "Sarguzasht", "Drama"],
    country: "AQSH",
    director: "Christopher Nolan",
    actor:
      "Matt Damon, Tom Holland, Anne Hathaway, Robert Pattinson, Lupita Nyong'o, Zendaya, Charlize Theron",
    ageRating: "16+",
    telegram: "https://t.me/sav_server/35",
  },
  {
    id: "shoushenkdan-qochish",
    title: "Shoushenkdan qochish",
    originalTitle: "The Shawshank Redemption",
    poster: shoushenk.url,
    release: "1994",
    year: 1994,
    language: "O'zbek tilida (Professional tarjima / Dublyaj)",
    rating: "IMDb 9.3",
    genres: ["Drama", "Jinoyat"],
    country: "AQSH",
    actor: "Tim Robbins, Morgan Freeman",
    ageRating: "16+",
    telegram: "https://t.me/sav_server/39",
  },
  {
    id: "kuryer",
    title: "Kuryer",
    originalTitle: "Курьер",
    poster: kuryer.url,
    wide: true,
    release: "1986",
    year: 1986,
    language: "O'zbek tilida (Tarjima)",
    genres: ["Drama", "Komediya", "Melodrama", "Yoshlar filmi"],
    country: "SSSR",
    director: "Karen Shaxnazarov",
    ageRating: "12+",
    telegram: "https://t.me/sav_server/18",
  },
  {
    id: "orzular-qayerga-yetaklaydi",
    title: "Orzular qayerga yetaklaydi",
    originalTitle: "What Dreams May Come",
    poster: orzular.url,
    release: "1998",
    year: 1998,
    language: "O'zbek tilida (Tarjima)",
    rating: "IMDb 7.1",
    genres: ["Drama", "Fentezi", "Melodrama", "Detektiv"],
    country: "AQSH",
    actor: "Robin Williams, Cuba Gooding Jr., Annabella Sciorra",
    ageRating: "12+",
    telegram: "https://t.me/sav_server/37",
  },
  {
    id: "dyuna-2",
    title: "Dyuna 2",
    originalTitle: "Dune: Part Two",
    poster: dyuna2.url,
    release: "2024",
    year: 2024,
    language: "O'zbek tilida (1080p)",
    rating: "IMDb 8.5 · KinoPoisk 8.2",
    genres: ["Fantastika", "Boevik", "Drama"],
    country: "AQSh",
    ageRating: "16+",
    telegram: "https://t.me/sav_server/38",
  },
  {
    id: "buyuk-jang",
    title: "Buyuk jang",
    originalTitle: "The Great Battle",
    poster: buyukjang.url,
    release: "2018",
    year: 2018,
    language: "O'zbek tilida (Tarjima)",
    rating: "IMDb 7.0",
    genres: ["Ekshn", "Tarixiy", "Jangari", "Harbiy"],
    country: "Janubiy Koreya",
    actor: "Cho In-sung, Nam Joo-hyuk, Park Sung-woong",
    ageRating: "16+",
    telegram: "https://t.me/sav_server/40",
  },
  {
    id: "orgimchak-odam-yangi-kun",
    title: "O'rgimchak-odam: Yangi kun",
    originalTitle: "Spider-Man: Brand New Day",
    poster: spiderman.url,
    release: "31-iyul, 2026",
    year: 2026,
    language: "O'zbek tilida (Tarjima)",
    genres: ["Fantastika", "Ekshn", "Sarguzasht", "Superqahramon"],
    country: "AQSH",
    studio: "Marvel Studios",
    ageRating: "12+",
    telegram: "https://t.me/sav_server/42",
  },
  {
    id: "qora-telefon-2",
    title: "Qora telefon 2",
    originalTitle: "Black Phone 2",
    poster: blackphone2.url,
    language: "O'zbek tilida (Tarjima)",
    genres: ["Qo'rqinchli", "Triller"],
    country: "AQSH",
    studio: "Blumhouse Productions",
    actor: "Ethan Hawke va boshqalar",
    ageRating: "18+",
    telegram: "https://t.me/sav_server/43",
  },
  {
    id: "olik-shoirlar-jamiyati",
    title: "O'lik shoirlar jamiyati",
    originalTitle: "Dead Poets Society",
    poster: deadpoets.url,
    release: "1989",
    year: 1989,
    language: "O'zbek tilida (Tarjima)",
    rating: "IMDb 8.1",
    genres: ["Drama"],
    country: "AQSH",
    actor: "Robin Williams, Robert Sean Leonard, Ethan Hawke",
    ageRating: "12+",
    telegram: "https://t.me/sav_server/44",
  },
  {
    id: "gerakl",
    title: "Gerakl",
    originalTitle: "Hercules",
    poster: gerakl.url,
    release: "2014",
    year: 2014,
    language: "O'zbek tilida (Tarjima)",
    rating: "IMDb 6.0",
    genres: ["Ekshn", "Sarguzasht", "Fantastika", "Tarixiy"],
    country: "AQSH",
    actor: "Dwayne Johnson",
    ageRating: "12+",
    telegram: "https://t.me/sav_server/45",
  },
  {
    id: "kapitan-marvel",
    title: "Kapitan Marvel",
    originalTitle: "Captain Marvel",
    poster: captainmarvel.url,
    rating: "IMDb 6.8",
    language: "O'zbek tilida (Tarjima)",
    genres: ["Fantastika", "Ekshn", "Sarguzasht", "Superqahramon"],
    country: "AQSH",
    studio: "Marvel Studios",
    actor: "Brie Larson, Samuel L. Jackson",
    ageRating: "12+",
    telegram: "https://t.me/sav_server/48",
  },
  {
    id: "sokin-zona",
    title: "Sokin zona",
    originalTitle: "Silent Zone",
    poster: silentzone.url,
    language: "O'zbek tilida (Tarjima)",
    genres: ["Ilmiy fantastika", "Triller", "Ekshn", "Jangari"],
    country: "Vengriya",
    director: "Peter Deak",
    actor: "Matt Devere, Luca Papp, Nikolett Barabas",
    ageRating: "16+",
    telegram: "https://t.me/sav_server/47",
  },
  {
    id: "xavfli-hayvonlar",
    title: "Xavfli hayvonlar",
    originalTitle: "Dangerous Animals",
    poster: xavflihayvonlar.url,
    language: "O'zbek tilida (Tarjima)",
    genres: ["Qo'rqinchli", "Triller", "Sarguzasht"],
    country: "AQSH",
    ageRating: "18+",
    telegram: "https://t.me/sav_server/46",
  },
  {
    id: "bosh-qahramon",
    title: "Bosh qahramon",
    originalTitle: "Free Guy",
    poster: freeguy.url,
    rating: "IMDb 7.1",
    language: "O'zbek tilida (Tarjima)",
    genres: ["Fantastika", "Komediya", "Ekshn", "Sarguzasht"],
    country: "AQSH",
    actor: "Ryan Reynolds",
    ageRating: "12+",
    telegram: "https://t.me/sav_server/53",
  },
  {
    id: "pusanga-ketayotgan-kema",
    title: "Pusanga ketayotgan kema",
    originalTitle: "Train to Busan",
    poster: pusanga.url,
    rating: "IMDb 7.6",
    language: "O'zbek tilida (Tarjima)",
    genres: ["Qo'rqinchli", "Triller", "Ekshn", "Drama"],
    country: "Janubiy Koreya",
    actor: "Gong Yoo, Ma Dong-seok",
    ageRating: "16+",
    telegram: "https://t.me/sav_server/52",
  },
  {
    id: "dubay-har-qanday-narxda",
    title: "Dubay har qanday narxda",
    originalTitle: "Дубай любой ценой",
    poster: dubay.url,
    language: "O'zbek tilida (Tarjima) / Ruscha",
    genres: ["Komediya", "Oilaviy", "Sarguzasht"],
    country: "Qozog'iston",
    description:
      "Sevimli qahramonlar ishtirokidagi sarguzashtlarga boy, kulgili va qiziqarli voqealarga to'la komediya filmi.",
    ageRating: "12+",
    telegram: "https://t.me/sav_server/51",
  },
  {
    id: "guns-akimbo",
    title: "Qo'llarimda pistoletlar",
    originalTitle: "Guns Akimbo",
    poster: gunsakimbo.url,
    rating: "IMDb 6.3",
    language: "O'zbek tilida (Tarjima)",
    genres: ["Jangari", "Komediya", "Triller", "Qora hazil"],
    country: "Yangi Zelandiya, Buyuk Britaniya",
    actor: "Daniel Radcliffe, Samara Weaving",
    ageRating: "18+",
    telegram: "https://t.me/sav_server/50",
  },
  {
    id: "uchar-xanjarlar-makoni",
    title: "Uchar xanjarlar makoni",
    originalTitle: "House of Flying Daggers",
    poster: ucharxanjarlar.url,
    release: "2004",
    year: 2004,
    rating: "IMDb 7.5",
    language: "O'zbek tilida (Tarjima)",
    genres: ["Jangari", "Drama", "Melodrama", "Tarixiy", "Sarguzasht"],
    country: "Xitoy",
    director: "Zhang Yimou",
    actor: "Zhang Ziyi, Takeshi Kaneshiro, Andy Lau",
    ageRating: "16+",
    telegram: "https://t.me/sav_server/55",
  },
  {
    id: "nosferatu",
    title: "Nosferatu",
    originalTitle: "Nosferatu",
    poster: nosferatu.url,
    release: "2024",
    year: 2024,
    language: "O'zbek tilida (Tarjima)",
    genres: ["Qo'rqinchli", "Gotik drama", "Fentezi"],
    country: "AQSH",
    director: "Robert Eggers",
    actor: "Bill Skarsgård, Lily-Rose Depp, Nicholas Hoult, Willem Dafoe",
    ageRating: "18+",
    telegram: "https://t.me/sav_server/54",
  },
  {
    id: "om-shanti-om",
    title: "Om Shanti Om",
    originalTitle: "Om Shanti Om",
    poster: omshantiom.url,
    release: "2007",
    year: 2007,
    rating: "IMDb 6.8",
    language: "O'zbek tilida (Tarjima)",
    genres: ["Melodrama", "Komediya", "Drama", "Detektiv"],
    country: "Hindiston",
    actor: "Shah Rukh Khan, Deepika Padukone",
    ageRating: "12+",
    telegram: "https://t.me/sav_server/56",
  },
  {
    id: "5-tolqin",
    title: "5-to'lqin",
    originalTitle: "The 5th Wave",
    poster: fifthwave.url,
    release: "2016",
    year: 2016,
    rating: "IMDb 5.2",
    language: "O'zbek tilida (Tarjima)",
    genres: ["Fantastika", "Triller", "Ekshn", "Sarguzasht"],
    country: "AQSH",
    actor: "Chloe Grace Moretz",
    ageRating: "12+",
    telegram: "https://t.me/sav_server/57",
  },
];


export const series: Title[] = [
  {
    id: "ajdar-uyi-3",
    title: "Ajdar uyi (3-mavsum)",
    originalTitle: "House of the Dragon (Season 3)",
    poster: s1.url,
    release: "21-iyun, 2026",
    genres: ["Fantastika", "Jangari", "Drama"],
    country: "AQSH",
    studio: "HBO / HBO Max",
    ageRating: "18+",
    episodes: "8 qism",
    telegram: "https://t.me/ajdaruyiseriali/3",
    isSeries: true,
  },
  {
    id: "taxtlar-oyini",
    title: "Taxtlar o'yini",
    originalTitle: "Game of Thrones",
    poster: s2.url,
    release: "17-aprel, 2011 (Tugallangan)",
    genres: ["Fantastika", "Sarguzasht", "Drama", "Jangari"],
    country: "AQSH",
    studio: "HBO",
    ageRating: "18+",
    episodes: "8 mavsum (jami 73 qism)",
    telegram: "https://t.me/taxtlaroyinibor/3",
    isSeries: true,
  },
  {
    id: "mentalist",
    title: "Mentalist",
    originalTitle: "The Mentalist",
    poster: s4.url,
    release: "23-sentabr, 2008 (Tugallangan)",
    genres: ["Detektiv", "Drama", "Jinoyat", "Sirli"],
    country: "AQSH",
    studio: "CBS",
    ageRating: "16+",
    episodes: "7 mavsum (jami 151 qism)",
    telegram: "https://t.me/ruxshnosm/5",
    isSeries: true,
  },
  {
    id: "yetti-qirollik-ritsari",
    title: "Yetti qirollik ritsari",
    originalTitle: "A Knight of the Seven Kingdoms",
    poster: s3.url,
    release: "2026",
    genres: ["Fantastika", "Sarguzasht", "Drama"],
    country: "AQSH",
    studio: "HBO / HBO Max",
    ageRating: "16+",
    episodes: "6 qism",
    telegram: "https://t.me/yettiqirolik/5",
    isSeries: true,
  },
  {
    id: "qashqirlar-makoni-pistirma",
    title: "Qashqirlar Makoni: Pistirma",
    originalTitle: "Kurtlar Vadisi Pusu",
    poster: qashqa.url,
    genres: ["Jangari", "Dramatik", "Siyosiy"],
    country: "Turkiya",
    studio: "Pana Film",
    actor: "Necati Şaşmaz (Polat Alemdar), Gürkan Uygun (Memati), Kenan Çoban (Abdülhey)",
    language: "O'zbek tilida",
    ageRating: "16+",
    episodes: "1-2 fasl",
    telegram: "https://uzmovi.net/serialar/441-qashqirlar-makoni-1-va-2-fasl-uzbek-ozbek-tilida-barcha-qismlari-toliq-qashqirlar-makoni-pusu-pistirma-uzbek-ozbek-tilida-toliq/episode/14731/1.html",
    isSeries: true,
  },
  {
    id: "breaking-bad",
    title: "Breaking Bad (Barchasiga nuqta)",
    originalTitle: "Breaking Bad",
    poster: breakingbad.url,
    language: "O'zbek tilida (Tarjima)",
    rating: "IMDb 9.5",
    genres: ["Drama", "Kriminal", "Triller"],
    country: "AQSH",
    studio: "AMC / Sony Pictures Television",
    actor: "Bryan Cranston, Aaron Paul",
    ageRating: "18+",
    episodes: "5 mavsum (jami 62 qism)",
    telegram: "https://t.me/helogaysa/3",
    isSeries: true,
  },
  {
    id: "from-tutqunlikda",
    title: "Tutqunlikda",
    originalTitle: "From",
    poster: fromseries.url,
    rating: "IMDb 7.7",
    language: "O'zbek tilida (Tarjima)",
    genres: ["Sirli", "Qo'rqinchli", "Ilmiy fantastika", "Drama", "Triller"],
    country: "AQSH",
    studio: "MGM+",
    actor: "Harold Perrineau va boshqalar",
    ageRating: "18+",
    telegram: "https://t.me/+Cx_jxBYJh0hiMGYy",
    isSeries: true,
  },
];


export const catalog: Title[] = [...films, ...series];

export const GENRES = Array.from(new Set(catalog.flatMap((t) => t.genres))).sort((a, b) =>
  a.localeCompare(b),
);

export const HERO = series[0]!;

export const searchTitles = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return catalog.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      (t.originalTitle ?? "").toLowerCase().includes(q) ||
      t.genres.some((g) => g.toLowerCase().includes(q)),
  );
};
