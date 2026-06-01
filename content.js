// ============================================================
//  WEBSITE CONTENT — Edit this file to update your website
//  No programming knowledge required.
//  Push changes to GitHub and the site updates automatically.
// ============================================================
var CONTENT = {
  // ── Doctor Details ──
  name:     "Dr. Nidhish Kakkad",
  title:    "Consultant Psychiatrist",
  location: "Junagadh, Gujarat",
  tagline:  "Junagadh's Trusted Mind Doctor",
  heroDesc: "Compassionate, evidence-based psychiatric care for every chapter of your mental health journey — from first consultation to long-term recovery. Psychiatric care delivered entirely online via secure video teleconsultation — so you can get expert help from wherever you are, at a time that works for you. You are not alone.",
  acceptingPatients: true,   // shows/hides the "Accepting New Patients" badge

  // ── Contact ──
  phone:    "+91 95126 79105",
  phoneRaw: "919512679105",    // digits only, no + or spaces — used for tel: and wa.me links
  email:    "nhk5596@gmail.com",

  // ── About ──
  aboutQuote: "Mental illness is not a personal failing. My goal is to make every patient feel safe, understood, and hopeful about their path forward.",
  aboutBio:   "Dr. Nidhish Kakkad is a consultant psychiatrist based in Junagadh — one of the few specialists serving Gujarat's Saurashtra region. He treats the full spectrum of mental health conditions, from anxiety and depression to complex psychiatric illness, pairing current evidence-based care with a practice built on patient dignity at every step. Dr. Kakkad offers online consultations in Gujarati, Hindi, and English — extending specialist mental health support to patients across India and to NRIs worldwide who would otherwise struggle to find a psychiatrist in their own language.",
  languages:  ["Gujarati", "Hindi", "English"],

  // ── Stats ──
  statPatients:     "2500+",
  statSatisfaction: "98%",

  // ── Practice Hours ──
  // status: "open" | "limited" | "closed"
  hours: [
    { day: "Monday",    time: "02:00 PM – 04:00 PM (IST) & 07:00 PM - 10:00 PM (IST)", status: "open"    },
    { day: "Tuesday",   time: "02:00 PM – 04:00 PM (IST) & 07:00 PM - 10:00 PM (IST)", status: "open"    },
    { day: "Wednesday", time: "02:00 PM – 04:00 PM (IST) & 07:00 PM - 10:00 PM (IST)", status: "open"    },
    { day: "Thursday",  time: "02:00 PM – 04:00 PM (IST) & 07:00 PM - 10:00 PM (IST)", status: "open"    },
    { day: "Friday",    time: "02:00 PM – 04:00 PM (IST) & 07:00 PM - 10:00 PM (IST)", status: "open"    },
    { day: "Saturday",  time: "02:00 PM – 10:00 PM (IST)", status: "open"    },
    { day: "Sunday",    time: "10:00 AM - 04:00 PM (IST)", status: "limited" },
  ],
  teleconsultationAvailable: true,

  // ── Services ──
  services: [
    { icon: "😧", title: "Depression & Anxiety",
      front: "Evidence-based treatment for mood disorders, generalised anxiety, panic disorder, and social phobia.",
      back:  "Depression and anxiety are highly manageable. A thorough assessment leads to a personalised plan covering MDD, GAD, panic disorder, and social anxiety — using medication and therapy referral where needed." },
    { icon: "🔄", title: "OCD",
      front: "Specialised care for obsessive-compulsive disorder using pharmacotherapy and behavioural interventions.",
      back:  "OCD is highly treatable. SSRIs at effective doses alongside CBT-based guidance form the core treatment. Most patients see meaningful improvement within a few months of starting." },
    { icon: "👥", title: "Bipolar Disorder",
      front: "Mood stabilisation, relapse prevention, and personalised long-term management plans.",
      back:  "Bipolar disorder requires careful, ongoing management. Mood stabilisers and regular monitoring help maintain stability, while recognising early warning signs reduces the risk of relapse." },
    { icon: "❗", title: "PTSD & Trauma",
      front: "Trauma-informed therapy and medication management for post-traumatic stress.",
      back:  "Trauma recovery is possible. A thorough symptom assessment informs a care plan combining medication and therapy referral — all within a safe, non-judgemental setting." },
    { icon: "🛌", title: "Sleep Disorders",
      front: "Diagnosis and treatment of insomnia, hypersomnia, and sleep-related psychiatric conditions.",
      back:  "Sleep problems are often linked to an underlying psychiatric condition. A full assessment of root causes guides targeted treatment to help restore healthy, consistent sleep." },
    { icon: "🧩", title: "Schizophrenia",
      front: "Comprehensive, compassionate management of psychotic disorders and related conditions.",
      back:  "Psychotic disorders are manageable with the right medication and support. Care planning involves families and includes regular monitoring to keep treatment effective over time." },
    { icon: "👶", title: "Child & Adolescent",
      front: "Psychiatric assessment and treatment tailored for children, teenagers, and their families.",
      back:  "Age-appropriate assessments cover ADHD, anxiety, depression, and behavioural issues. Treatment plans are built in close collaboration with parents and, where helpful, schools." },
    { icon: "🚬", title: "Addiction Medicine",
      front: "Supportive, non-judgemental care for substance use disorders and the road to recovery.",
      back:  "Recovery is possible with the right support. Compassionate assessment, guided detox planning, and a structured relapse prevention programme form the foundation of care." },
  ],

  // ── Testimonials ──
  // stars: 5 or 4.5 | featured: true makes it the dark highlighted card | tele: true adds Teleconsultation tag
  testimonials: [
    { stars: 5,   quote: "I've been seeing Dr. Kakkad for over a year now. He doesn't rush consultations and always makes time to actually listen. The treatment plan has made a real difference to my daily life.", detail: "Long-term patient", tele: false },
    { stars: 4.5, quote: "I was nervous about doing a video consultation but Dr. Kakkad made it feel completely natural. My panic attacks are far less frequent now and I finally feel in control again.", detail: "Anxiety & Panic", tele: true, featured: true },
    { stars: 5,   quote: "Our daughter was struggling and we didn't know where to turn. Dr. Kakkad explained everything clearly, answered all our questions, and never made us feel like we were overreacting.", detail: "Parent of patient", tele: false },
    { stars: 4.5, quote: "I wasn't sure about speaking to a psychiatrist online, but the session was completely private and judgement-free. I only wish I had reached out months earlier.", detail: "First consultation", tele: true },
    { stars: 5,   quote: "Work stress had completely taken over my life. After a few sessions with Dr. Kakkad I had practical strategies to manage it. The difference has been remarkable.", detail: "Stress & Burnout", tele: true, featured: true },
    { stars: 4.5, quote: "I'd been struggling with insomnia for two years. Dr. Kakkad identified an underlying condition I hadn't considered and within six weeks my sleep had improved significantly.", detail: "Sleep disorder", tele: false },
    { stars: 5,   quote: "My GP referred me after months without the right diagnosis. Dr. Kakkad identified the issue in the first session. The correct treatment has changed everything.", detail: "Referred patient", tele: false },
  ],

  // ── Footer ──
  footerTagline: "Providing compassionate, evidence-based psychiatric care — online, for everyone. Your mental health matters.",
};
