import { Link, useLocation } from 'react-router-dom'

function SuccessPage() {
  const location = useLocation()
  const state = location.state

  return (
    <main className="page success-layout">
      <section className="panel success-card">
        <div className="eyebrow-2">Validation complete</div>
        <h1>Thank you</h1>
        <p>Your UA-ready email was validated successfully.</p>

        {state ? (
          <div className="result-grid" style={{ marginTop: '1.5rem' }}>
            <div className="result-row">
              <span className="result-label">Email</span>
              <span>{state.normalized_email}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Scripts</span>
              <span>{(state.scripts || []).join(', ') || 'None'}</span>
            </div>
            <div className="result-row">
              <span className="result-label">SMTPUTF8</span>
              <span>{state.requires_smtputf8 ? 'Required' : 'Not required'}</span>
            </div>
          </div>
        ) : null}

        <Link to="/" className="back-link">
          Validate another email
        </Link>
      </section>
    </main>
  )
}

export default SuccessPage