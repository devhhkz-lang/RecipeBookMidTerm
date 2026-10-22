export default function Pagination({ page, pages, onChange }) {
  const numbers = Array.from({ length: pages }, (_, i) => i + 1);
  return (
    <nav className="pagination">
      <button className="btn" disabled={page === 1} onClick={() => onChange(page - 1)}>←</button>
      {numbers.map((n) => (
        <button
          key={n}
          className={n === page ? "btn primary" : "btn"}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}
      <button className="btn" disabled={page === pages} onClick={() => onChange(page + 1)}>→</button>
    </nav>
  );
}
