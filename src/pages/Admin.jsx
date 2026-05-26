import { useState, useEffect, useCallback } from 'react'

const SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL
const TOKEN = import.meta.env.VITE_APPS_SCRIPT_TOKEN
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'MindCare2024'

const STATUS_STYLES = {
  Pending:   'bg-yellow-100 text-yellow-700',
  Confirmed: 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
}

const STATUSES = ['Pending', 'Confirmed', 'Completed', 'Cancelled']

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('adminAuth') === 'true')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  const login = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuth', 'true')
      setAuthed(true)
    } else {
      setLoginError('Incorrect password. Please try again.')
    }
  }

  const logout = () => {
    sessionStorage.removeItem('adminAuth')
    setAuthed(false)
    setPassword('')
    setAppointments([])
  }

  const fetchAppointments = useCallback(async () => {
    setLoading(true)
    setFetchError('')
    try {
      const res = await fetch(`${SCRIPT_URL}?action=getAppointments&token=${TOKEN}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setAppointments(data.appointments || [])
    } catch {
      setFetchError('Failed to load appointments. Check your Apps Script setup and token.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authed) fetchAppointments()
  }, [authed, fetchAppointments])

  const updateStatus = async (id, status) => {
    setSaving(true)
    try {
      await fetch(`${SCRIPT_URL}?action=updateStatus&token=${TOKEN}&id=${encodeURIComponent(id)}&status=${encodeURIComponent(status)}`)
      setAppointments((prev) => prev.map((a) => a.ID === id ? { ...a, Status: status } : a))
      if (selected?.ID === id) setSelected((s) => ({ ...s, Status: status }))
    } finally {
      setSaving(false)
    }
  }

  const saveNotes = async () => {
    if (!selected) return
    setSaving(true)
    try {
      await fetch(`${SCRIPT_URL}?action=updateNotes&token=${TOKEN}&id=${encodeURIComponent(selected.ID)}&notes=${encodeURIComponent(notes)}`)
      setAppointments((prev) => prev.map((a) => a.ID === selected.ID ? { ...a, 'Doctor Notes': notes } : a))
      setSelected((s) => ({ ...s, 'Doctor Notes': notes }))
    } finally {
      setSaving(false)
    }
  }

  const openModal = (a) => {
    setSelected(a)
    setNotes(a['Doctor Notes'] || '')
  }

  const filtered = appointments
    .filter((a) => statusFilter === 'All' || a.Status === statusFilter)
    .filter((a) =>
      !search ||
      [a.Name, a.Email, a.Phone, a.Reason].join(' ').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b['Submitted At']) - new Date(a['Submitted At']))

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.Status === 'Pending').length,
    confirmed: appointments.filter((a) => a.Status === 'Confirmed').length,
    today: appointments.filter((a) => {
      const today = new Date().toISOString().split('T')[0]
      return a.Date === today
    }).length,
  }

  // ── Login screen ──────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Admin Panel</h1>
            <p className="text-slate-500 text-sm mt-1">Restricted to authorized personnel only</p>
          </div>
          <form onSubmit={login} className="card">
            <div className="mb-5">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setLoginError('') }}
                className={`form-input ${loginError ? 'border-red-400' : ''}`}
                placeholder="Enter admin password"
                autoFocus
              />
              {loginError && <p className="text-red-500 text-xs mt-1">{loginError}</p>}
            </div>
            <button type="submit" className="btn-primary w-full text-center">
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Dashboard ─────────────────────────────────────────────────────
  return (
    <div className="py-8 px-4 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Appointment Dashboard</h1>
            <p className="text-slate-500 text-sm mt-0.5">Manage all patient appointments</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchAppointments} className="btn-secondary !py-2 !px-4 text-sm">
              Refresh
            </button>
            <button
              onClick={logout}
              className="text-slate-500 hover:text-red-600 text-sm px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Appointments', value: stats.total, color: 'text-slate-800' },
            { label: 'Pending',            value: stats.pending,   color: 'text-yellow-600' },
            { label: 'Confirmed',          value: stats.confirmed, color: 'text-blue-600' },
            { label: "Today's",            value: stats.today,     color: 'text-teal-600' },
          ].map(({ label, value, color }) => (
            <div key={label} className="card text-center py-5">
              <p className={`text-3xl font-bold ${color} mb-1`}>{value}</p>
              <p className="text-slate-500 text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, reason..."
            className="form-input max-w-xs"
          />
          <div className="flex flex-wrap gap-2">
            {['All', ...STATUSES].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                  statusFilter === s
                    ? 'bg-teal-600 border-teal-600 text-white'
                    : 'border-slate-300 text-slate-600 hover:border-teal-400'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading appointments…</div>
        ) : fetchError ? (
          <div className="card text-center py-10 text-red-500">{fetchError}</div>
        ) : filtered.length === 0 ? (
          <div className="card text-center py-10 text-slate-400">No appointments found.</div>
        ) : (
          <div className="card overflow-x-auto !p-0">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Name', 'Phone', 'Preferred Date', 'Time', 'Visit Type', 'Status', 'Update Status'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-slate-600 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr
                    key={a.ID}
                    className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => openModal(a)}
                  >
                    <td className="px-4 py-3 font-medium text-slate-800">{a.Name}</td>
                    <td className="px-4 py-3 text-slate-600">{a.Phone}</td>
                    <td className="px-4 py-3 text-slate-600">{a.Date}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{a['Time Slot']}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        a['Visit Type'] === 'new'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {a['Visit Type'] === 'new' ? 'New' : 'Follow-up'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLES[a.Status] || 'bg-slate-100 text-slate-600'}`}>
                        {a.Status}
                      </span>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={a.Status}
                        onChange={(e) => updateStatus(a.ID, e.target.value)}
                        disabled={saving}
                        className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-white"
                      >
                        {STATUSES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Patient Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex justify-between items-start mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">{selected.Name}</h2>
                <span className={`text-xs px-2 py-1 rounded-full font-medium mt-1.5 inline-block ${STATUS_STYLES[selected.Status]}`}>
                  {selected.Status}
                </span>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100"
              >
                ×
              </button>
            </div>

            {/* Patient details grid */}
            <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
              {[
                ['Email', selected.Email],
                ['Phone', selected.Phone],
                ['Age', selected.Age],
                ['Gender', selected.Gender],
                ['Preferred Date', selected.Date],
                ['Time Slot', selected['Time Slot']],
                ['Visit Type', selected['Visit Type'] === 'new' ? 'New Patient' : 'Follow-up'],
                ['Submitted', selected['Submitted At'] ? new Date(selected['Submitted At']).toLocaleString('en-IN') : '—'],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                  <p className="font-medium text-slate-800 break-words">{val || '—'}</p>
                </div>
              ))}
            </div>

            {/* Reason */}
            <div className="mb-5">
              <p className="text-xs text-slate-500 mb-1">Reason for Consultation</p>
              <p className="text-slate-700 bg-slate-50 rounded-lg p-3 text-sm leading-relaxed">
                {selected.Reason || '—'}
              </p>
            </div>

            {/* Doctor notes */}
            <div className="mb-5">
              <label className="form-label">Doctor's Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add clinical notes about this patient..."
                className="form-input resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end flex-wrap">
              <select
                value={selected.Status}
                onChange={(e) => updateStatus(selected.ID, e.target.value)}
                disabled={saving}
                className="text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white"
              >
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <button
                onClick={saveNotes}
                disabled={saving}
                className="btn-primary !py-2 !px-4 text-sm disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
