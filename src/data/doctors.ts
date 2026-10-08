import type { Localized } from "./types";

export type Doctor = {
  slug: string;
  name: Localized;
  role: Localized;
  image: string;
  imageAlt: Localized;
  years: number;
  languages: Localized;
  education: Localized[];
  bio: Localized;
  /** Service slugs this doctor performs */
  services: string[];
};

const img = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const doctors: Doctor[] = [
  {
    slug: "layla-haddad",
    name: { en: "Dr. Layla Haddad", ar: "د. ليلى حداد" },
    role: { en: "Clinical Director · Prosthodontist", ar: "المديرة الطبية · أخصائية تركيبات الأسنان" },
    image: img("1559839734-2b71ea197ec2"),
    imageAlt: {
      en: "Portrait of Dr. Layla Haddad in a white coat",
      ar: "صورة د. ليلى حداد بالمعطف الأبيض",
    },
    years: 16,
    languages: { en: "English, Arabic, French", ar: "الإنجليزية، العربية، الفرنسية" },
    education: [
      { en: "DDS, McGill University", ar: "دكتوراه جراحة الأسنان، جامعة ماكغيل" },
      { en: "MSc Prosthodontics, King's College London", ar: "ماجستير التركيبات، كينغز كوليدج لندن" },
    ],
    bio: {
      en: "Layla founded Lumière to bring calm, design-led dentistry to Dubai. She is known for natural-looking smile makeovers and complex full-mouth rehabilitation.",
      ar: "أسست ليلى لوميير لتقديم طب أسنان هادئ يعتمد على التصميم في دبي، وتشتهر بتجميل الابتسامة بمظهر طبيعي وإعادة تأهيل الفم الكامل.",
    },
    services: ["veneers", "teeth-whitening", "dental-implants"],
  },
  {
    slug: "omar-siddiqui",
    name: { en: "Dr. Omar Siddiqui", ar: "د. عمر صديقي" },
    role: { en: "Oral Surgeon · Implantologist", ar: "جراح الفم · أخصائي زراعة الأسنان" },
    image: img("1612349317150-e413f6a5b16d"),
    imageAlt: {
      en: "Portrait of Dr. Omar Siddiqui with arms crossed",
      ar: "صورة د. عمر صديقي",
    },
    years: 13,
    languages: { en: "English, Arabic, Urdu", ar: "الإنجليزية، العربية، الأوردية" },
    education: [
      { en: "BDS, University of Sharjah", ar: "بكالوريوس طب الأسنان، جامعة الشارقة" },
      { en: "Fellowship in Implantology, ITI Switzerland", ar: "زمالة زراعة الأسنان، ITI سويسرا" },
    ],
    bio: {
      en: "Omar specialises in guided implant surgery and bone grafting, with more than 3,000 implants placed. Patients value his calm chairside manner.",
      ar: "يتخصص عمر في الزراعة الموجّهة والتطعيم العظمي، وقد أجرى أكثر من 3000 زرعة، ويقدّر المرضى هدوءه وأسلوبه المطمئن.",
    },
    services: ["dental-implants", "emergency-care"],
  },
  {
    slug: "sofia-marin",
    name: { en: "Dr. Sofia Marín", ar: "د. صوفيا مارين" },
    role: { en: "Orthodontist · Invisalign Diamond Provider", ar: "أخصائية تقويم · مزوّدة إنفزلاين ماسية" },
    image: img("1594824476967-48c8b964273f"),
    imageAlt: {
      en: "Portrait of Dr. Sofia Marín in teal scrubs",
      ar: "صورة د. صوفيا مارين بالزي الطبي",
    },
    years: 11,
    languages: { en: "English, Spanish, Arabic", ar: "الإنجليزية، الإسبانية، العربية" },
    education: [
      { en: "DDS, Universidad Complutense de Madrid", ar: "دكتوراه طب الأسنان، جامعة كومبلوتنسي مدريد" },
      { en: "MSc Orthodontics, University of Manchester", ar: "ماجستير التقويم، جامعة مانشستر" },
    ],
    bio: {
      en: "Sofia has transformed more than 2,000 smiles with clear aligners, and leads our teen orthodontics programme.",
      ar: "غيّرت صوفيا أكثر من 2000 ابتسامة بالمقوّمات الشفافة، وتقود برنامج تقويم المراهقين لدينا.",
    },
    services: ["invisalign", "teeth-whitening"],
  },
  {
    slug: "karim-mensah",
    name: { en: "Dr. Karim Mensah", ar: "د. كريم منسا" },
    role: { en: "Paediatric & Emergency Dentist", ar: "طبيب أسنان أطفال وطوارئ" },
    image: img("1622253692010-333f2da6031d"),
    imageAlt: {
      en: "Portrait of Dr. Karim Mensah smiling in blue scrubs",
      ar: "صورة د. كريم منسا مبتسماً بالزي الطبي الأزرق",
    },
    years: 10,
    languages: { en: "English, French, Arabic", ar: "الإنجليزية، الفرنسية، العربية" },
    education: [
      { en: "BDS, University of Bristol", ar: "بكالوريوس طب الأسنان، جامعة بريستول" },
      { en: "MClinDent Paediatric Dentistry, UCL", ar: "ماجستير طب أسنان الأطفال، جامعة لندن" },
    ],
    bio: {
      en: "Karim makes dentistry fun for children and fast for emergencies. He is certified in conscious sedation and special-needs care.",
      ar: "يجعل كريم طب الأسنان ممتعاً للأطفال وسريعاً في الطوارئ، وهو معتمد في التهدئة الواعية ورعاية أصحاب الهمم.",
    },
    services: ["kids-dentistry", "emergency-care", "teeth-whitening"],
  },
];

export function getDoctor(slug: string) {
  return doctors.find((d) => d.slug === slug);
}
