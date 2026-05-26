import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">M+</span>
              </div>
              <span className="text-white font-semibold">Dr. [Doctor Name]</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Providing compassionate, evidence-based psychiatric care in [City], India.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[['/', 'Home'], ['/about', 'About'], ['/book', 'Book Appointment']].map(([path, label]) => (
                <li key={path}>
                  <Link to={path} className="text-slate-400 hover:text-teal-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>📍 [Clinic Address, City]</li>
              <li>📞 [Phone Number]</li>
              <li>✉️ [Email Address]</li>
              <li>🕐 Mon–Sat, 10 AM – 6 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dr. [Doctor Name]. All rights reserved.</p>
          <Link to="/admin" className="hover:text-slate-400 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
