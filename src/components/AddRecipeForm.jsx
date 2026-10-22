import { useState } from "react";

const empty = {
  name: "",
  cuisine: "",
  difficulty: "Easy",
  time: "",
  ingredients: "",
  instructions: "",
};

export default function AddRecipeForm({ cuisines, onAdd }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  // Один обработчик для всех полей
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Строки из textarea -> массив
  const toList = (text) => text.split("\n").map((s) => s.trim()).filter(Boolean);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.cuisine.trim() || Number(form.time) <= 0) {
      setError("Заполните название, кухню и время (больше 0).");
      return;
    }
    onAdd({
      id: Date.now(),
      local: true,
      name: form.name.trim(),
      cuisine: form.cuisine.trim(),
      difficulty: form.difficulty,
      cookTimeMinutes: Number(form.time),
      rating: 0,
      ingredients: toList(form.ingredients),
      instructions: toList(form.instructions),
    });
    setForm(empty);
    setError("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Новый рецепт</h2>
      <input name="name" placeholder="Название" value={form.name} onChange={handleChange} />
      <input
        name="cuisine"
        placeholder="Кухня (например, Italian)"
        list="cuisines"
        value={form.cuisine}
        onChange={handleChange}
      />
      <datalist id="cuisines">
        {cuisines.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
      <div className="row">
        <select name="difficulty" value={form.difficulty} onChange={handleChange}>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <input
          name="time"
          type="number"
          min="1"
          placeholder="Время, мин"
          value={form.time}
          onChange={handleChange}
        />
      </div>
      <textarea
        name="ingredients"
        placeholder="Ингредиенты (каждый с новой строки)"
        value={form.ingredients}
        onChange={handleChange}
      />
      <textarea
        name="instructions"
        placeholder="Шаги приготовления (каждый с новой строки)"
        value={form.instructions}
        onChange={handleChange}
      />
      {error && <p className="error-text">{error}</p>}
      <button className="btn primary" type="submit">Добавить</button>
    </form>
  );
}
