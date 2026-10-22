export default function RecipeCard({ recipe, onOpen }) {
  return (
    <article className="card" onClick={() => onOpen(recipe.id)}>
      {recipe.image ? (
        <img src={recipe.image} alt={recipe.name} loading="lazy" />
      ) : (
        <div className="placeholder">🍽️</div>
      )}
      <div className="card-body">
        <h3>{recipe.name}</h3>
        <p className="muted">{recipe.cuisine}</p>
        <div className="meta">
          <span className={`badge ${recipe.difficulty.toLowerCase()}`}>{recipe.difficulty}</span>
          <span>⏱ {recipe.cookTimeMinutes} мин</span>
          <span>⭐ {recipe.rating ? recipe.rating.toFixed(1) : "новый"}</span>
        </div>
      </div>
    </article>
  );
}
