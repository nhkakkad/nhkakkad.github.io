import { Link } from 'react-router-dom'

const SERVICES = [
  { icon: '🧠', title: 'Depression & Anxiety', desc: 'Evidence-based treatment for mood and anxiety disorders.' },
  { icon: '🔄', title: 'OCD', desc: 'Specialized care for obsessive-compulsive disorder.' },
  { icon: '⚡', title: 'Bipolar Disorder', desc: 'Mood stabilization and long-term management.' },
  { icon: '🌙', title: 'Sleep Disorders', desc: 'Diagnosis and treatment of insomnia and related issues.' },
  { icon: '🧩', title: 'Schizophrenia', desc: 'Comprehensive management of psychotic disorders.' },
  { icon: '💊', title: 'Addiction Medicine', desc: 'Support for substance use disorders and recovery.' },
  { icon: '🌱', title: 'PTSD & Trauma', desc: 'Trauma-informed therapy and medication management.' },
  { icon: '👶', title: 'Child & Adolescent', desc: 'Psychiatric care tailored for younger patients.' },
]

const FEATURES = [
  { icon: '🤝', title: 'Personalized Care', desc: 'Every treatment plan is tailored specifically to you.' },
  { icon: '🔬', title: 'Evidence-Based', desc: 'Treatment grounded in the latest clinical research.' },
  { icon: '🔒', title: 'Confidential', desc: 'Your privacy and dignity are always protected.' },
  { icon: '📅', title: 'Flexible Scheduling', desc: 'Book appointments at your convenience, online.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-600 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm mb-6">
            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
            Accepting new patients
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Dr. [Doctor Name]
          </h1>
          <p className="text-xl md:text-2xl text-teal-100 mb-3 font-light">
            MD (Psychiatry) &middot; [Hospital / Clinic Name]
          </p>
          <p className="text-lg text-teal-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Compassionate, evidence-based psychiatric care to help you reclaim your mental well-being and live a fuller life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="bg-white text-teal-700 hover:bg-teal-50 font-semibold px-8 py-3.5 rounded-lg transition-colors shadow-lg"
            >
              Book an Appointment
            </Link>
            <Link
              to="/about"
              className="border-2 border-white/60 text-white hover:bg-white/10 font-medium px-8 py-3.5 rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Areas of Expertise</h2>
            <p className="section-subtitle">Comprehensive mental health care across a wide range of conditions</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map(({ icon, title, desc }) => (
              <div key={title} className="card hover:shadow-md transition-shadow group">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-semibold text-slate-800 mb-1.5 group-hover:text-teal-600 transition-colors">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose This Practice?</h2>
            <p className="section-subtitle">A supportive environment for your healing journey</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="text-center p-6">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="py-20 px-4 bg-teal-50">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-40 h-40 bg-teal-200 rounded-2xl flex items-center justify-center flex-shrink-0">
            <svg className="w-20 h-20 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Meet Dr. [Doctor Name]</h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              [Short bio — 2 sentences about the doctor's background and commitment to patient care. Replace this placeholder with real content.]
            </p>
            <Link to="/about" className="btn-primary text-sm !py-2.5">
              Read Full Profile
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-teal-700">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Take the First Step?</h2>
          <p className="text-teal-100 mb-8 text-lg">
            Seeking help is a sign of strength. Schedule a consultation today.
          </p>
          <Link
            to="/book"
            className="bg-white text-teal-700 hover:bg-teal-50 font-semibold px-8 py-3.5 rounded-lg transition-colors shadow-lg inline-block"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
