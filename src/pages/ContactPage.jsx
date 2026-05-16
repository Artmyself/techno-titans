import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import ValidationResult from '../components/ValidationResult'
import { validateContactEmail } from '../services/api'

const examples = ['राम@नेपाल.नेपाल', '用户@例子.中国', 'أحمد@مثال.مصر']

function ContactPage() {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await validateContactEmail(email)
      setResult(response)

      if (response.valid) {
        // Wait 1 second before redirecting so user sees the validation result
        setTimeout(() => {
          navigate('/success', { state: response })
        }, 1000)
      }
    } catch (submitError) {
      setError(submitError?.response?.data?.detail || 'Validation service unavailable.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="page">
      <div className="page-inner hero-grid">
        <section className="panel hero-copy">
          <div className="eyebrow">CAN InfoTech UA-Ready Contact Platform</div>
          <h1 className="title">
            Contact systems that understand
            <span>internationalized email</span>
          </h1>
          <p className="lead">
            A focused demo for UA readiness, SMTPUTF8 support, Unicode normalization, and
            multilingual email validation without breaking the automation selectors.
          </p>

          <div className="example-row">
            {examples.map((example) => (
              <button key={example} type="button" className="chip" onClick={() => setEmail(example)}>
                {example}
              </button>
            ))}
          </div>
        </section>

        <section className="panel form-panel">
          <ContactForm
            email={email}
            onEmailChange={setEmail}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {error ? (
            <div className="result-card" style={{ marginTop: '1rem' }}>
              <strong>Submission error</strong>
              <p style={{ marginTop: '0.5rem', color: '#fca5a5' }}>{error}</p>
            </div>
          ) : null}

          <div style={{ marginTop: '1rem' }}>
            <ValidationResult result={result} />
          </div>
        </section>
      </div>
    </main>
  )
}

export default ContactPage