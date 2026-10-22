import { useState, useEffect } from "react";
import Message from "./Message.jsx";

export default function RecipeModal({ recipe, onClose }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  // Загружаем полные данные рецепта при смене id
  useEffect(() => {
    // Рецепты, добавленные пользователем, есть только локально
    if (recipe.local) {
      setData(recipe);
      setStatus("success");
      return;
    }
    const controller = new AbortController();
    setStatus("loading");
    fetch(`https://dummyjson.com/recipes/${recipe.id}`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("Bad response");
        return r.json();
      })
      .then((d) => {
        setData(d);
        setStatus("success");
      })
      .catch((e) => {
        if (e.name !== "AbortError") setStatus("error");
      });
    return () => controller.abort(); // отменяем устаревший запрос
  }, [recipe.id]);

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>✕</button>
        <h2>{recipe.name}</h2>

        {status === "loading" && <Message text="Загрузка..." />}
        {status === "error" && <Message text="Не удалось загрузить рецепт." type="error" />}

        {status === "success" && (
          <>
            {data.image && <img className="modal-img" src={data.image} alt={data.name} />}
            <p className="muted">
              {data.cuisine} · {data.difficulty} · ⏱ {data.cookTimeMinutes} мин
              {data.caloriesPerServing ? ` · ${data.caloriesPerServing} ккал` : ""}
            </p>
            <h3>Ингредиенты</h3>
            <ul>
              {data.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <h3>Приготовление</h3>
            <ol>
              {data.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
}
