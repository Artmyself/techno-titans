function ScriptBadge({ children, warn = false }) {
  return <span className={`badge${warn ? ' warn' : ''}`}>{children}</span>
}

export default ScriptBadge