export default function Filters({
  search, cuisine, sort, cuisines,
  onSearch, onCuisine, onSort, onReset,
}) {
  return (
    <div className="filters">
      <input
        type="search"
        placeholder="Поиск по названию..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <select value={cuisine} onChange={(e) => onCuisine(e.target.value)}>
        <option value="all">Все кухни</option>
        {cuisines.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select value={sort} onChange={(e) => onSort(e.target.value)}>
        <option value="name">По названию</option>
        <option value="rating">По рейтингу</option>
        <option value="time">По времени</option>
      </select>
      <button className="btn" onClick={onReset}>Сбросить</button>
    </div>
  );
}
