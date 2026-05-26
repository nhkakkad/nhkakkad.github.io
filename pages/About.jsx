// TODO: Replace all [bracketed placeholders] with real doctor information

const EDUCATION = [
  { year: '[Year]', degree: 'MD (Psychiatry)', institute: '[Medical College], [City]' },
  { year: '[Year]', degree: 'MBBS', institute: '[Medical College], [City]' },
]

const MEMBERSHIPS = [
  'Indian Psychiatric Society (IPS)',
  'Indian Medical Association (IMA)',
  '[Additional Membership or Certification]',
]

export default function About() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">About Dr. [Doctor Name]</h1>
          <p className="text-slate-500 text-lg">Psychiatrist · [City], India</p>
        </div>

        {/* Profile row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 items-start">
          {/* Photo placeholder */}
          <div className="flex justify-center">
            <div className="w-56 h-56 bg-teal-100 rounded-2xl flex items-center justify-center border-4 border-teal-200">
              <svg className="w-24 h-24 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Dr. [Full Name]</h2>
            <p className="text-teal-600 font-medium mb-5">
              MD (Psychiatry) &middot; Reg. No. [MCI/State Council Number]
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              [Write a 2–3 sentence introduction here. For example: "Dr. [Name] is a board-certified psychiatrist with over [X] years of experience in diagnosing and treating a wide range of mental health conditions. He/She practices at [Clinic/Hospital] in [City], India."]
            </p>
            <p className="text-slate-600 leading-relaxed">
              [Add a second paragraph about areas of special interest, patient population served, or values that guide the practice.]
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Education */}
          <div className="card">
            <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-base">🎓</span>
              Education &amp; Training
            </h3>
            <ul className="space-y-5">
              {EDUCATION.map(({ year, degree, institute }) => (
                <li key={degree} className="flex gap-4">
                  <div className="text-sm font-medium text-teal-600 w-16 flex-shrink-0 pt-0.5">{year}</div>
                  <div>
                    <div className="font-medium text-slate-800">{degree}</div>
                    <div className="text-sm text-slate-500 mt-0.5">{institute}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Memberships */}
          <div className="card">
            <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-base">🏅</span>
              Memberships &amp; Certifications
            </h3>
            <ul className="space-y-3">
              {MEMBERSHIPS.map((m) => (
                <li key={m} className="flex items-center gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0"></span>
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Approach */}
          <div className="card md:col-span-2">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-base">💡</span>
              Approach to Care
            </h3>
            <p className="text-slate-600 leading-relaxed">
              [Describe the doctor's treatment philosophy here. For example: "Dr. [Name] believes in a holistic, patient-centered approach to mental health. Treatment plans combine pharmacotherapy with psychoeducation and lifestyle modifications tailored to each individual. Every patient is treated with empathy and respect, with an emphasis on building a strong therapeutic relationship grounded in trust."]
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
