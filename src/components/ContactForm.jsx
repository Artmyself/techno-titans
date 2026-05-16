function ContactForm({ email, onEmailChange, onSubmit, isLoading }) {
  return (
    <form className="form-card" onSubmit={onSubmit}>
      <div>
        <label htmlFor="email" className="field-label">
          Email address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          className="field-input"
          placeholder="राम@नेपाल.नेपाल"
          autoComplete="email"
          required
        />
      </div>

      <input
        type="submit"
        value={isLoading ? 'Validating email...' : 'Contact us'}
        id="submit"
        className="submit-button"
        disabled={isLoading}
      />
    </form>
  )
}

export default ContactForm