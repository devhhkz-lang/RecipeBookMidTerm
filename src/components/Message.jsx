export default function Message({ text, type, onRetry, retryText = "Повторить" }) {
  return (
    <div className={`message ${type || ""}`}>
      <p>{text}</p>
      {onRetry && <button className="btn" onClick={onRetry}>{retryText}</button>}
    </div>
  );
}
