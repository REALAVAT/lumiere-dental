import type { Localized } from "./types";

export type Testimonial = {
  name: Localized;
  detail: Localized;
  quote: Localized;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: { en: "Hessa A.", ar: "حصة أ." },
    detail: { en: "Porcelain veneers", ar: "قشور البورسلين" },
    quote: {
      en: "I was terrified of looking 'done'. Dr. Layla let me try the shape first, and now people just say I look rested. It's the most natural smile I've ever had.",
      ar: "كنت أخشى أن تبدو ابتسامتي مصطنعة، لكن د. ليلى جعلتني أجرب الشكل أولاً، والآن يقول الناس إنني أبدو مرتاحة فقط. إنها أكثر ابتسامة طبيعية حظيت بها.",
    },
    rating: 5,
  },
  {
    name: { en: "James R.", ar: "جيمس ر." },
    detail: { en: "Dental implant", ar: "زراعة الأسنان" },
    quote: {
      en: "Walked in nervous, walked out wondering why I'd waited two years. The 3D planning made everything feel precise and under control.",
      ar: "دخلت متوتراً وخرجت أتساءل لماذا انتظرت عامين. التخطيط ثلاثي الأبعاد جعل كل شيء دقيقاً وتحت السيطرة.",
    },
    rating: 5,
  },
  {
    name: { en: "Mariam K.", ar: "مريم ك." },
    detail: { en: "Kids dentistry", ar: "طب أسنان الأطفال" },
    quote: {
      en: "My six-year-old now asks when she can visit 'Dr. Karim's spaceship' again. I never thought I'd say that about a dentist.",
      ar: "ابنتي ذات الست سنوات تسأل الآن متى ستزور «سفينة د. كريم الفضائية» مجدداً. لم أتخيل أن أقول هذا عن طبيب أسنان.",
    },
    rating: 5,
  },
  {
    name: { en: "Arjun P.", ar: "أرجون ب." },
    detail: { en: "Invisalign", ar: "إنفزلاين" },
    quote: {
      en: "Fourteen months, almost no visits thanks to remote check-ins, and the result matches the 3D preview exactly. Worth every dirham.",
      ar: "أربعة عشر شهراً وزيارات قليلة جداً بفضل المتابعة عن بُعد، والنتيجة مطابقة تماماً للمعاينة ثلاثية الأبعاد. تستحق كل درهم.",
    },
    rating: 5,
  },
  {
    name: { en: "Nour E.", ar: "نور إ." },
    detail: { en: "Emergency care", ar: "طوارئ الأسنان" },
    quote: {
      en: "Cracked a tooth on a Friday night, sent a photo on WhatsApp and was seen first thing the next morning. Calm, fast, and painless.",
      ar: "انكسر سني ليلة جمعة، فأرسلت صورة عبر واتساب وتمت رؤيتي صباح اليوم التالي مباشرة. هدوء وسرعة ودون ألم.",
    },
    rating: 5,
  },
  {
    name: { en: "Sophie L.", ar: "صوفي ل." },
    detail: { en: "Teeth whitening", ar: "تبييض الأسنان" },
    quote: {
      en: "Six shades brighter with zero sensitivity. The clinic feels more like a boutique hotel than a dental office.",
      ar: "أفتح بست درجات دون أي حساسية. العيادة أقرب إلى فندق بوتيك منها إلى عيادة أسنان.",
    },
    rating: 5,
  },
];
