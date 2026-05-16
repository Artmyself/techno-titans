import ScriptBadge from './ScriptBadge'

function ValidationResult({ result }) {
  if (!result) {
    return (
      <div className="result-card">
        <strong>Validation result</strong>
        <div className="result-grid">
          <div className="result-row">
            <span className="result-label">Status</span>
            <span>Waiting for submit</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="result-card">
      <strong>{result.valid ? 'VALID' : 'INVALID'}</strong>
      <div className="result-grid">
        <div className="result-row">
          <span className="result-label">Normalized</span>
          <span>{result.normalized_email || '—'}</span>
        </div>
        <div className="result-row">
          <span className="result-label">SMTPUTF8</span>
          <span>{result.requires_smtputf8 ? 'YES' : 'NO'}</span>
        </div>
        <div className="result-row">
          <span className="result-label">ACE domain</span>
          <span>{result.ace_domain || '—'}</span>
        </div>
      </div>

      <div className="badge-list" style={{ marginTop: '1rem' }}>
        {(result.scripts || []).length > 0 ? (
          result.scripts.map((script) => <ScriptBadge key={script}>{script}</ScriptBadge>)
        ) : (
          <ScriptBadge>Script: None detected</ScriptBadge>
        )}
        {Array.isArray(result.warnings) &&
          result.warnings.map((warning) => (
            <ScriptBadge key={warning} warn>
              {warning}
            </ScriptBadge>
          ))}
      </div>
    </div>
  )
}

export default ValidationResult