function ContactForm({ email, onEmailChange, onSubmit, isLoading }) {
  return (
    <form className="form-card" onSubmit={onSubmit}>
      <div>
        <label htmlFor="email" className="field-label">
          Email address
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          className="field-input"
          placeholder="राम@नेपाल.नेपाल"
          autoComplete="email"
        />
      </div>

      <input
        type="submit"
        value={isLoading ? 'Validating...' : 'Submit'}
        id="submit"
        className="submit-button"
        disabled={isLoading}
      />
    </form>
  )
}

export default ContactForm