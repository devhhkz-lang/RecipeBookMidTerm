import { useState, useEffect } from "react";
import Filters from "./components/Filters.jsx";
import RecipeCard from "./components/RecipeCard.jsx";
import Pagination from "./components/Pagination.jsx";
import RecipeModal from "./components/RecipeModal.jsx";
import AddRecipeForm from "./components/AddRecipeForm.jsx";
import Message from "./components/Message.jsx";

const PER_PAGE = 9;

export default function App() {
  // Данные и статус загрузки
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | error | success
  const [reload, setReload] = useState(0);

  // Состояние интерфейса
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("all");
  const [sort, setSort] = useState("name");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Загружаем все рецепты один раз (и повторно при нажатии "Повторить")
  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    fetch("https://dummyjson.com/recipes?limit=0", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("Bad response");
        return r.json();
      })
      .then((d) => {
        setRecipes(d.recipes);
        setStatus("success");
      })
      .catch((e) => {
        if (e.name !== "AbortError") setStatus("error");
      });
    return () => controller.abort(); // cleanup: отменяем запрос
  }, [reload]);

  // Поиск + фильтр + сортировка — обычные переменные, не state
  const cuisines = [...new Set(recipes.map((r) => r.cuisine))].sort();
  const filtered = recipes
    .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
    .filter((r) => cuisine === "all" || r.cuisine === cuisine)
    .sort((a, b) =>
      sort === "rating"
        ? b.rating - a.rating
        : sort === "time"
        ? a.cookTimeMinutes - b.cookTimeMinutes
        : a.name.localeCompare(b.name)
    );

  // Пагинация
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // При смене фильтра всегда возвращаемся на 1 страницу
  function changeFilter(setter) {
    return (value) => {
      setter(value);
      setPage(1);
    };
  }

  function reset() {
    setSearch("");
    setCuisine("all");
    setSort("name");
    setPage(1);
  }

  function addRecipe(recipe) {
    setRecipes((prev) => [recipe, ...prev]); // иммутабельно
    setShowForm(false);
    reset();
  }

  const selected = recipes.find((r) => r.id === selectedId);

  return (
    <div className="app">
      <header className="header">
        <h1>🍳 Книга рецептов</h1>
        <button className="btn primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Закрыть форму" : "+ Добавить рецепт"}
        </button>
      </header>

      {showForm && <AddRecipeForm cuisines={cuisines} onAdd={addRecipe} />}

      {status === "loading" && <Message text="Загружаем рецепты..." />}
      {status === "error" && (
        <Message
          text="Не удалось загрузить рецепты."
          type="error"
          onRetry={() => setReload((n) => n + 1)}
        />
      )}

      {status === "success" && (
        <>
          <Filters
            search={search}
            cuisine={cuisine}
            sort={sort}
            cuisines={cuisines}
            onSearch={changeFilter(setSearch)}
            onCuisine={changeFilter(setCuisine)}
            onSort={changeFilter(setSort)}
            onReset={reset}
          />
          <p className="count">Найдено: {filtered.length}</p>

          {filtered.length === 0 ? (
            <Message text="Ничего не найдено. Попробуйте другой запрос." onRetry={reset} retryText="Сбросить" />
          ) : (
            <>
              <div className="grid">
                {visible.map((r) => (
                  <RecipeCard key={r.id} recipe={r} onOpen={setSelectedId} />
                ))}
              </div>
              <Pagination page={page} pages={pages} onChange={setPage} />
            </>
          )}
        </>
      )}

      {selected && (
        <RecipeModal key={selected.id} recipe={selected} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}
