import type { FaqItem, Localized } from "./types";

export type ServiceIcon = "sparkles" | "tooth" | "aligner" | "gem" | "baby" | "siren";

export type Service = {
  slug: string;
  icon: ServiceIcon;
  image: string;
  imageAlt: Localized;
  title: Localized;
  short: Localized;
  intro: Localized;
  priceFrom: number;
  priceUnit?: Localized;
  duration: Localized;
  benefits: Localized[];
  steps: { title: Localized; body: Localized }[];
  faqs: FaqItem[];
};

const img = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const services: Service[] = [
  {
    slug: "teeth-whitening",
    icon: "sparkles",
    image: img("1580489944761-15a19d654956"),
    imageAlt: {
      en: "Smiling woman with bright, naturally white teeth",
      ar: "امرأة مبتسمة بأسنان بيضاء ومشرقة بشكل طبيعي",
    },
    title: { en: "Teeth Whitening", ar: "تبييض الأسنان" },
    short: {
      en: "Up to eight shades brighter in a single, sensitivity-controlled visit.",
      ar: "أسنان أفتح حتى ثماني درجات في جلسة واحدة مع التحكم في الحساسية.",
    },
    intro: {
      en: "Our in-chair whitening combines a gentle hydrogen-peroxide gel with LED activation and enamel-protecting desensitisers, so you leave with a luminous, natural-looking smile — not a chalky one.",
      ar: "يجمع التبييض في العيادة بين جل بيروكسيد الهيدروجين اللطيف وتنشيط بضوء LED ومواد واقية للمينا، لتغادر بابتسامة مشرقة وطبيعية المظهر.",
    },
    priceFrom: 1200,
    duration: { en: "60–90 minutes", ar: "60–90 دقيقة" },
    benefits: [
      { en: "Shade matched to your skin tone", ar: "درجة لون تناسب لون بشرتك" },
      { en: "Enamel-safe, low-sensitivity protocol", ar: "بروتوكول آمن للمينا وقليل الحساسية" },
      { en: "Take-home trays for touch-ups", ar: "قوالب منزلية للمحافظة على النتيجة" },
    ],
    steps: [
      {
        title: { en: "Shade consultation", ar: "استشارة اللون" },
        body: {
          en: "We photograph your teeth, check for sensitivity and agree on a realistic target shade.",
          ar: "نصوّر أسنانك ونفحص الحساسية ونتفق على درجة لون واقعية.",
        },
      },
      {
        title: { en: "Gum protection & polish", ar: "حماية اللثة والتلميع" },
        body: {
          en: "A light-cured barrier shields your gums while teeth are gently polished.",
          ar: "نحمي اللثة بطبقة عازلة ثم نلمّع الأسنان بلطف.",
        },
      },
      {
        title: { en: "LED-activated whitening", ar: "التبييض بتقنية LED" },
        body: {
          en: "Three short cycles of whitening gel, monitored closely for comfort.",
          ar: "ثلاث دورات قصيرة من جل التبييض مع متابعة دقيقة لراحتك.",
        },
      },
      {
        title: { en: "Aftercare kit", ar: "عناية ما بعد الجلسة" },
        body: {
          en: "You go home with a desensitising gel and custom trays for future touch-ups.",
          ar: "تحصل على جل مضاد للحساسية وقوالب مخصصة للمتابعة المنزلية.",
        },
      },
    ],
    faqs: [
      {
        q: { en: "Will whitening make my teeth sensitive?", ar: "هل يسبب التبييض حساسية للأسنان؟" },
        a: {
          en: "Some patients feel mild sensitivity for 24–48 hours. Our protocol includes potassium nitrate desensitisers to keep it minimal.",
          ar: "قد يشعر بعض المرضى بحساسية خفيفة لمدة 24–48 ساعة، ويتضمن بروتوكولنا مواد تقلل ذلك إلى الحد الأدنى.",
        },
      },
      {
        q: { en: "How long do results last?", ar: "كم تدوم النتائج؟" },
        a: {
          en: "Typically 12–24 months, depending on coffee, tea and smoking habits. Take-home trays make touch-ups easy.",
          ar: "عادة من 12 إلى 24 شهراً حسب عادات القهوة والشاي والتدخين، والقوالب المنزلية تسهّل المحافظة عليها.",
        },
      },
      {
        q: { en: "Does whitening work on crowns or veneers?", ar: "هل يعمل التبييض على التيجان أو القشور؟" },
        a: {
          en: "No — restorations keep their colour. We'll plan any replacements so everything matches.",
          ar: "لا، تحتفظ التركيبات بلونها، وسنخطط لأي استبدال لضمان تناسق الألوان.",
        },
      },
    ],
  },
  {
    slug: "dental-implants",
    icon: "tooth",
    image: img("1593022356769-11f762e25ed9"),
    imageAlt: {
      en: "Dental implant models showing titanium posts and crowns",
      ar: "نماذج زراعة أسنان تظهر الدعامات المصنوعة من التيتانيوم والتيجان",
    },
    title: { en: "Dental Implants", ar: "زراعة الأسنان" },
    short: {
      en: "Permanent, natural-feeling replacements guided by 3D digital planning.",
      ar: "بدائل دائمة بإحساس طبيعي بتخطيط رقمي ثلاثي الأبعاد.",
    },
    intro: {
      en: "We plan every implant on a 3D CBCT scan and place it with a surgical guide for millimetre precision, faster healing and a crown that looks and feels like your own tooth.",
      ar: "نخطط لكل زرعة باستخدام أشعة CBCT ثلاثية الأبعاد ونضعها بدليل جراحي لدقة متناهية وشفاء أسرع وتاج يبدو ويشعر كسنّك الطبيعي.",
    },
    priceFrom: 4500,
    priceUnit: { en: "per implant", ar: "للزرعة الواحدة" },
    duration: { en: "2–3 visits over 3–4 months", ar: "2–3 زيارات خلال 3–4 أشهر" },
    benefits: [
      { en: "Swiss & Swedish premium implant systems", ar: "أنظمة زراعة سويسرية وسويدية فاخرة" },
      { en: "Guided, minimally invasive surgery", ar: "جراحة موجّهة بأقل تدخل ممكن" },
      { en: "Lifetime implant warranty", ar: "ضمان مدى الحياة على الزرعة" },
    ],
    steps: [
      {
        title: { en: "3D scan & plan", ar: "مسح وتخطيط ثلاثي الأبعاد" },
        body: {
          en: "A low-dose CBCT scan lets us map bone and nerves and design your implant virtually.",
          ar: "تتيح لنا أشعة CBCT منخفضة الجرعة رسم العظم والأعصاب وتصميم الزرعة افتراضياً.",
        },
      },
      {
        title: { en: "Guided placement", ar: "الزراعة الموجّهة" },
        body: {
          en: "Under local anaesthetic (sedation available), the implant is placed through a custom guide.",
          ar: "تحت التخدير الموضعي (والتهدئة متاحة) توضع الزرعة عبر دليل مخصص.",
        },
      },
      {
        title: { en: "Healing & integration", ar: "الالتئام والاندماج" },
        body: {
          en: "Over 8–12 weeks the implant fuses with your bone. A temporary tooth keeps you smiling.",
          ar: "خلال 8–12 أسبوعاً تندمج الزرعة مع العظم، مع سنّ مؤقتة تحافظ على ابتسامتك.",
        },
      },
      {
        title: { en: "Final crown", ar: "التاج النهائي" },
        body: {
          en: "A hand-layered zirconia crown is fitted and colour-matched to neighbouring teeth.",
          ar: "يُركّب تاج زركونيا مصنوع يدوياً بلون مطابق للأسنان المجاورة.",
        },
      },
    ],
    faqs: [
      {
        q: { en: "Is implant surgery painful?", ar: "هل جراحة الزراعة مؤلمة؟" },
        a: {
          en: "Most patients describe it as easier than an extraction. Local anaesthetic and optional sedation keep you comfortable.",
          ar: "يصفها معظم المرضى بأنها أسهل من خلع السن، والتخدير الموضعي والتهدئة الاختيارية يضمنان راحتك.",
        },
      },
      {
        q: { en: "Am I a candidate if I've lost bone?", ar: "هل يمكنني الزراعة إذا فقدت جزءاً من العظم؟" },
        a: {
          en: "Often yes. Bone grafting or sinus lifts can rebuild support; your 3D scan tells us exactly what's needed.",
          ar: "غالباً نعم، فالتطعيم العظمي أو رفع الجيب الأنفي يعيد بناء الدعم، وتحدد الأشعة ثلاثية الأبعاد ما يلزم بدقة.",
        },
      },
      {
        q: { en: "How long do implants last?", ar: "كم تدوم زراعة الأسنان؟" },
        a: {
          en: "With good hygiene and check-ups, implants can last a lifetime. Crowns typically last 15+ years.",
          ar: "مع العناية الجيدة والمتابعة قد تدوم الزرعة مدى الحياة، والتيجان عادة أكثر من 15 عاماً.",
        },
      },
    ],
  },
  {
    slug: "invisalign",
    icon: "aligner",
    image: img("1609840114035-3c981b782dfe"),
    imageAlt: {
      en: "Patient holding a clear Invisalign aligner",
      ar: "مريضة تحمل مقوّم إنفزلاين الشفاف",
    },
    title: { en: "Invisalign", ar: "إنفزلاين" },
    short: {
      en: "Nearly invisible aligners with a digital preview of your final smile.",
      ar: "مقوّمات شبه خفية مع معاينة رقمية لابتسامتك النهائية.",
    },
    intro: {
      en: "As a Diamond Invisalign provider, we use iTero 5D scanning to show you your finished smile before you start, then guide you with clear, removable aligners and remote check-ins.",
      ar: "بصفتنا مزوّد إنفزلاين من الفئة الماسية، نستخدم ماسح iTero 5D لنريك ابتسامتك النهائية قبل البدء، ثم نرافقك بمقوّمات شفافة قابلة للإزالة ومتابعة عن بُعد.",
    },
    priceFrom: 12000,
    duration: { en: "6–18 months", ar: "6–18 شهراً" },
    benefits: [
      { en: "See your result before you commit", ar: "شاهد النتيجة قبل أن تلتزم" },
      { en: "Removable — eat and brush normally", ar: "قابلة للإزالة — تناول طعامك ونظّف أسنانك بشكل طبيعي" },
      { en: "Fewer visits with remote monitoring", ar: "زيارات أقل مع المتابعة عن بُعد" },
    ],
    steps: [
      {
        title: { en: "iTero 5D scan", ar: "مسح iTero 5D" },
        body: {
          en: "A quick, mess-free scan replaces traditional moulds.",
          ar: "مسح سريع ونظيف يغني عن القوالب التقليدية.",
        },
      },
      {
        title: { en: "Smile preview", ar: "معاينة الابتسامة" },
        body: {
          en: "We design your movement plan and show you a 3D preview of your final smile.",
          ar: "نصمم خطة تحريك الأسنان ونعرض لك معاينة ثلاثية الأبعاد للنتيجة.",
        },
      },
      {
        title: { en: "Aligner series", ar: "سلسلة المقوّمات" },
        body: {
          en: "You switch aligners every 1–2 weeks, with check-ins every 8–10 weeks.",
          ar: "تبدّل المقوّم كل 1–2 أسبوع مع متابعة كل 8–10 أسابيع.",
        },
      },
      {
        title: { en: "Retention", ar: "التثبيت" },
        body: {
          en: "Custom retainers keep your new smile exactly where it belongs.",
          ar: "مثبتات مخصصة تحافظ على ابتسامتك الجديدة في مكانها.",
        },
      },
    ],
    faqs: [
      {
        q: { en: "How many hours a day do I wear aligners?", ar: "كم ساعة يومياً أرتدي المقوّم؟" },
        a: {
          en: "20–22 hours. Remove them only to eat, drink anything other than water, and brush.",
          ar: "من 20 إلى 22 ساعة، وتُزال فقط للأكل وشرب غير الماء وتنظيف الأسنان.",
        },
      },
      {
        q: { en: "Is Invisalign suitable for teenagers?", ar: "هل يناسب إنفزلاين المراهقين؟" },
        a: {
          en: "Yes. Invisalign Teen includes compliance indicators and replacement aligners.",
          ar: "نعم، ويتضمن إنفزلاين للمراهقين مؤشرات للالتزام ومقوّمات بديلة.",
        },
      },
      {
        q: { en: "Do you offer payment plans?", ar: "هل تتوفر خطط تقسيط؟" },
        a: {
          en: "Yes — 0% instalments over up to 12 months with selected UAE banks and Tabby.",
          ar: "نعم، تقسيط بدون فوائد حتى 12 شهراً مع بنوك إماراتية مختارة وتابي.",
        },
      },
    ],
  },
  {
    slug: "veneers",
    icon: "gem",
    image: img("1494790108377-be9c29b29330"),
    imageAlt: {
      en: "Woman with a confident, even smile after cosmetic dentistry",
      ar: "امرأة بابتسامة واثقة ومتناسقة بعد تجميل الأسنان",
    },
    title: { en: "Porcelain Veneers", ar: "قشور البورسلين" },
    short: {
      en: "Hand-crafted, ultra-thin porcelain designed around your face.",
      ar: "قشور بورسلين رقيقة جداً مصنوعة يدوياً بما يتناسب مع ملامح وجهك.",
    },
    intro: {
      en: "Using Digital Smile Design, we plan veneers around your facial proportions, lip line and personality — then let you test-drive the shape with a temporary mock-up before anything is final.",
      ar: "باستخدام تصميم الابتسامة الرقمي نخطط القشور وفق تناسق وجهك وخط الشفاه وشخصيتك، ثم تجرّب الشكل بنموذج مؤقت قبل اعتماده.",
    },
    priceFrom: 1800,
    priceUnit: { en: "per tooth", ar: "للسنّ الواحدة" },
    duration: { en: "2 visits over 2 weeks", ar: "زيارتان خلال أسبوعين" },
    benefits: [
      { en: "Minimal-prep, enamel-preserving technique", ar: "تقنية بأقل تحضير تحافظ على المينا" },
      { en: "Try your new smile before it's made", ar: "جرّب ابتسامتك الجديدة قبل تصنيعها" },
      { en: "Stain-resistant e.max porcelain", ar: "بورسلين e.max مقاوم للتصبغ" },
    ],
    steps: [
      {
        title: { en: "Digital Smile Design", ar: "تصميم الابتسامة الرقمي" },
        body: {
          en: "Photos, video and scans are used to design a smile that suits your face.",
          ar: "نستخدم الصور والفيديو والمسح لتصميم ابتسامة تناسب وجهك.",
        },
      },
      {
        title: { en: "Mock-up trial", ar: "تجربة النموذج" },
        body: {
          en: "A temporary resin preview lets you see and feel the result.",
          ar: "نموذج مؤقت من الراتنج يتيح لك رؤية النتيجة والإحساس بها.",
        },
      },
      {
        title: { en: "Gentle preparation", ar: "التحضير اللطيف" },
        body: {
          en: "Minimal enamel is refined and precise scans are sent to our master ceramist.",
          ar: "نحضّر جزءاً بسيطاً من المينا ونرسل مسحاً دقيقاً إلى خبير الخزف.",
        },
      },
      {
        title: { en: "Bonding & polish", ar: "التثبيت والتلميع" },
        body: {
          en: "Your veneers are bonded, bite-checked and polished to a natural lustre.",
          ar: "تُثبّت القشور ويُضبط الإطباق وتُلمّع لتكتسب لمعاناً طبيعياً.",
        },
      },
    ],
    faqs: [
      {
        q: { en: "Will veneers look fake?", ar: "هل تبدو القشور غير طبيعية؟" },
        a: {
          en: "Not when designed properly. We layer translucency and texture so they read as natural teeth.",
          ar: "ليس عند تصميمها بشكل صحيح، إذ نضيف الشفافية والملمس لتبدو كأسنان طبيعية.",
        },
      },
      {
        q: { en: "How long do porcelain veneers last?", ar: "كم تدوم قشور البورسلين؟" },
        a: {
          en: "10–20 years with good care and a night guard if you grind your teeth.",
          ar: "من 10 إلى 20 عاماً مع العناية الجيدة واستخدام واقٍ ليلي عند صرير الأسنان.",
        },
      },
      {
        q: { en: "Are veneers reversible?", ar: "هل يمكن التراجع عن القشور؟" },
        a: {
          en: "Traditional veneers are not fully reversible. We'll discuss no-prep options if that matters to you.",
          ar: "القشور التقليدية غير قابلة للتراجع كلياً، وسنناقش خيارات بدون تحضير إن كان ذلك مهماً لك.",
        },
      },
    ],
  },
  {
    slug: "kids-dentistry",
    icon: "baby",
    image: img("1607613009820-a29f7bb81c04"),
    imageAlt: {
      en: "Colourful bamboo toothbrushes in a cup on a bright shelf",
      ar: "فرش أسنان ملونة من الخيزران في كوب على رف مشرق",
    },
    title: { en: "Kids Dentistry", ar: "طب أسنان الأطفال" },
    short: {
      en: "Gentle, playful care that builds healthy habits — and zero fear.",
      ar: "رعاية لطيفة ومرحة تبني عادات صحية دون أي خوف.",
    },
    intro: {
      en: "Our paediatric suite is designed for little ones: ceiling screens, tell-show-do explanations and a team trained to make every visit feel like an adventure, not an appointment.",
      ar: "صُمم جناح الأطفال لدينا خصيصاً للصغار: شاشات في السقف وشرح بأسلوب «أخبر وأرِ ونفّذ» وفريق مدرَّب ليجعل كل زيارة مغامرة لا موعداً.",
    },
    priceFrom: 250,
    duration: { en: "30–45 minutes", ar: "30–45 دقيقة" },
    benefits: [
      { en: "Child-friendly, anxiety-free environment", ar: "بيئة مريحة للأطفال وخالية من القلق" },
      { en: "Fissure sealants & fluoride protection", ar: "حشوات الشقوق الوقائية والفلورايد" },
      { en: "Parents welcome in the room", ar: "يمكن للوالدين البقاء في الغرفة" },
    ],
    steps: [
      {
        title: { en: "Happy visit", ar: "زيارة تعارف" },
        body: {
          en: "A first ride in the chair, a meet-the-tools tour and a gentle look.",
          ar: "جولة أولى على الكرسي والتعرّف على الأدوات وفحص لطيف.",
        },
      },
      {
        title: { en: "Check-up & clean", ar: "الفحص والتنظيف" },
        body: {
          en: "We check development, clean and polish, and apply fluoride varnish.",
          ar: "نتابع نمو الأسنان وننظفها ونلمعها ونضع طبقة الفلورايد.",
        },
      },
      {
        title: { en: "Prevention plan", ar: "خطة وقائية" },
        body: {
          en: "Sealants, diet tips and brushing coaching tailored to your child.",
          ar: "حشوات وقائية ونصائح غذائية وتدريب على التنظيف حسب احتياج طفلك.",
        },
      },
      {
        title: { en: "Reward & recall", ar: "مكافأة وموعد متابعة" },
        body: {
          en: "A little prize, a report for parents and a reminder for the next visit.",
          ar: "هدية صغيرة وتقرير للوالدين وتذكير بالموعد القادم.",
        },
      },
    ],
    faqs: [
      {
        q: { en: "When should my child first see a dentist?", ar: "متى يجب أن يزور طفلي طبيب الأسنان لأول مرة؟" },
        a: {
          en: "By their first birthday, or within six months of the first tooth appearing.",
          ar: "قبل عيد ميلاده الأول أو خلال ستة أشهر من ظهور أول سن.",
        },
      },
      {
        q: { en: "What if my child is very anxious?", ar: "ماذا لو كان طفلي قلقاً جداً؟" },
        a: {
          en: "We go at their pace, and offer happy-gas (nitrous oxide) when appropriate.",
          ar: "نتقدم وفق وتيرته، ونوفر غاز الضحك عند الحاجة.",
        },
      },
      {
        q: { en: "Do you treat children with special needs?", ar: "هل تعالجون الأطفال من أصحاب الهمم؟" },
        a: {
          en: "Yes. Tell us in advance and we'll plan a quieter, longer appointment.",
          ar: "نعم، أخبرونا مسبقاً لنخطط لموعد أطول وأكثر هدوءاً.",
        },
      },
    ],
  },
  {
    slug: "emergency-care",
    icon: "siren",
    image: img("1606811841689-23dfddce3e95"),
    imageAlt: {
      en: "Dentist treating a patient in a modern treatment room",
      ar: "طبيب أسنان يعالج مريضاً في غرفة علاج حديثة",
    },
    title: { en: "Emergency Care", ar: "طوارئ الأسنان" },
    short: {
      en: "Same-day relief for pain, swelling, trauma and broken teeth.",
      ar: "تخفيف فوري في اليوم نفسه للألم والتورم والإصابات وكسور الأسنان.",
    },
    intro: {
      en: "Toothache doesn't keep office hours. We hold daily emergency slots and a WhatsApp triage line so you can be seen — and out of pain — the same day.",
      ar: "ألم الأسنان لا يلتزم بمواعيد العمل، لذلك نخصص مواعيد طوارئ يومية وخط فرز عبر واتساب لتتم رؤيتك وتخفيف ألمك في اليوم نفسه.",
    },
    priceFrom: 350,
    duration: { en: "Same-day appointment", ar: "موعد في اليوم نفسه" },
    benefits: [
      { en: "Reserved emergency slots every day", ar: "مواعيد طوارئ محجوزة يومياً" },
      { en: "WhatsApp photo triage", ar: "فرز أولي بالصور عبر واتساب" },
      { en: "Pain relief as the first priority", ar: "تخفيف الألم أولويتنا الأولى" },
    ],
    steps: [
      {
        title: { en: "Message or call", ar: "راسلنا أو اتصل" },
        body: {
          en: "Send a photo on WhatsApp or call — we'll advise immediately.",
          ar: "أرسل صورة عبر واتساب أو اتصل وسننصحك فوراً.",
        },
      },
      {
        title: { en: "Rapid assessment", ar: "تقييم سريع" },
        body: {
          en: "Digital X-rays pinpoint the cause within minutes of arrival.",
          ar: "تحدد الأشعة الرقمية السبب خلال دقائق من وصولك.",
        },
      },
      {
        title: { en: "Relief first", ar: "تخفيف الألم أولاً" },
        body: {
          en: "We stabilise the tooth and stop the pain before discussing next steps.",
          ar: "نثبّت السن ونوقف الألم قبل مناقشة الخطوات التالية.",
        },
      },
      {
        title: { en: "Definitive plan", ar: "خطة علاج نهائية" },
        body: {
          en: "You leave with a clear, costed plan for any follow-up treatment.",
          ar: "تغادر بخطة واضحة ومحددة التكلفة لأي علاج لاحق.",
        },
      },
    ],
    faqs: [
      {
        q: { en: "What counts as a dental emergency?", ar: "ما الذي يُعد طارئاً في طب الأسنان؟" },
        a: {
          en: "Severe pain, facial swelling, a knocked-out or broken tooth, or bleeding that won't stop.",
          ar: "الألم الشديد أو تورم الوجه أو سقوط السن أو كسره أو نزيف لا يتوقف.",
        },
      },
      {
        q: { en: "What should I do with a knocked-out tooth?", ar: "ماذا أفعل بالسن التي سقطت؟" },
        a: {
          en: "Hold it by the crown, rinse gently, store it in milk and come in within 60 minutes.",
          ar: "أمسكها من التاج واشطفها بلطف واحفظها في الحليب وتعال خلال 60 دقيقة.",
        },
      },
      {
        q: { en: "Can I walk in without an appointment?", ar: "هل يمكنني الحضور دون موعد؟" },
        a: {
          en: "Yes, but messaging us first on WhatsApp means we can prepare and see you faster.",
          ar: "نعم، لكن مراسلتنا أولاً عبر واتساب تتيح لنا الاستعداد ورؤيتك أسرع.",
        },
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
