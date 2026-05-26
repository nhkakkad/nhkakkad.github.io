import { useState } from 'react'

const TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
]

const INITIAL_FORM = {
  name: '', email: '', phone: '', age: '',
  gender: '', date: '', timeSlot: '',
  visitType: 'new', reason: '',
}

export default function BookAppointment() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL
  const today = new Date().toISOString().split('T')[0]

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((err) => ({ ...err, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Valid 10-digit Indian mobile number'
    if (!form.age || isNaN(form.age) || +form.age < 5 || +form.age > 100) e.age = 'Enter a valid age (5–100)'
    if (!form.gender) e.gender = 'Please select a gender'
    if (!form.date) e.date = 'Preferred date is required'
    if (!form.timeSlot) e.timeSlot = 'Please select a time slot'
    if (form.reason.trim().length < 10) e.reason = 'Please describe your concern (min. 10 characters)'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setStatus('submitting')
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ ...form, submittedAt: new Date().toISOString() }),
      })
      setStatus('success')
      setForm(INITIAL_FORM)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Request Received!</h2>
          <p className="text-slate-500 mb-6 leading-relaxed">
            Thank you for reaching out. Dr. [Doctor Name]'s office will contact you within 24 hours to confirm your appointment.
          </p>
          <button onClick={() => setStatus('idle')} className="btn-primary">
            Book Another Appointment
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">Book an Appointment</h1>
          <p className="text-slate-500 text-lg">Fill in the form below. We'll confirm within 24 hours.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 card">
            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                Something went wrong. Please try again or call us directly.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div className="sm:col-span-2">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Your full name"
                  className={`form-input ${errors.name ? 'border-red-400' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="you@example.com"
                  className={`form-input ${errors.email ? 'border-red-400' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={`form-input ${errors.phone ? 'border-red-400' : ''}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="form-label">Age *</label>
                <input
                  type="number"
                  value={form.age}
                  onChange={set('age')}
                  placeholder="e.g. 28"
                  min={5}
                  max={100}
                  className={`form-input ${errors.age ? 'border-red-400' : ''}`}
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
              </div>

              <div>
                <label className="form-label">Gender *</label>
                <select
                  value={form.gender}
                  onChange={set('gender')}
                  className={`form-input ${errors.gender ? 'border-red-400' : ''}`}
                >
                  <option value="">Select...</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-binary</option>
                  <option>Prefer not to say</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>

              <div>
                <label className="form-label">Preferred Date *</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={set('date')}
                  min={today}
                  className={`form-input ${errors.date ? 'border-red-400' : ''}`}
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="form-label">Preferred Time Slot *</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setForm((f) => ({ ...f, timeSlot: slot }))
                        setErrors((e) => ({ ...e, timeSlot: '' }))
                      }}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        form.timeSlot === slot
                          ? 'bg-teal-600 border-teal-600 text-white'
                          : 'border-slate-300 text-slate-600 hover:border-teal-400 hover:text-teal-600'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="form-label">Visit Type *</label>
                <div className="flex gap-6 mt-1">
                  {[['new', 'New Patient'], ['followup', 'Follow-up Visit']].map(([val, label]) => (
                    <label key={val} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="visitType"
                        value={val}
                        checked={form.visitType === val}
                        onChange={set('visitType')}
                        className="accent-teal-600 w-4 h-4"
                      />
                      <span className="text-sm text-slate-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="form-label">Reason for Consultation *</label>
                <textarea
                  value={form.reason}
                  onChange={set('reason')}
                  rows={4}
                  placeholder="Briefly describe your concern or symptoms..."
                  className={`form-input resize-none ${errors.reason ? 'border-red-400' : ''}`}
                />
                {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
              </div>

            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Submitting…' : 'Request Appointment'}
              </button>
            </div>
          </form>

          {/* Info sidebar */}
          <div className="space-y-5">
            <div className="card">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <span>📍</span> Location
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                [Clinic Name]<br />
                [Street Address]<br />
                [City, State – PIN Code]
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <span>🕐</span> Clinic Hours
              </h3>
              <ul className="text-sm text-slate-600 space-y-1.5">
                <li className="flex justify-between"><span>Mon – Fri</span><span>10 AM – 6 PM</span></li>
                <li className="flex justify-between"><span>Saturday</span><span>10 AM – 2 PM</span></li>
                <li className="flex justify-between"><span>Sunday</span><span className="text-slate-400">Closed</span></li>
              </ul>
            </div>

            <div className="card">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <span>📞</span> Emergency?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                For mental health emergencies, please call <strong>iCall: 9152987821</strong> or visit your nearest hospital emergency.
              </p>
            </div>

            <div className="card bg-teal-50 border-teal-100">
              <h3 className="font-semibold text-teal-700 mb-3">📋 What to Expect</h3>
              <ul className="text-sm text-teal-800 space-y-2">
                <li>✓ Confirmation call within 24 hours</li>
                <li>✓ 45–60 min initial consultation</li>
                <li>✓ Bring prior medical records</li>
                <li>✓ Strictly confidential</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
