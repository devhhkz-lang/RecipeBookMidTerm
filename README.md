# 🍳 Recipe Book

React SPA — каталог рецептов на публичном API [DummyJSON](https://dummyjson.com/recipes).

**Demo:** _вставьте ссылку на деплой_

## Возможности
- Загрузка 50 рецептов из публичного API
- Поиск по названию, фильтр по кухне, сортировка (название / рейтинг / время)
- Пагинация (9 рецептов на странице)
- Детальный просмотр в модальном окне (отдельный запрос по id)
- Добавление своего рецепта через контролируемую форму с валидацией
- Состояния loading, error (с кнопкой «Повторить»), empty, success
- Адаптивный интерфейс

## Стек
React 18, Vite, чистый CSS. Без сторонних UI-библиотек.

## Структура
```
src/
  App.jsx                 — главный компонент: данные, фильтры, страницы
  App.css                 — стили
  components/
    Filters.jsx           — поиск, кухня, сортировка, сброс
    RecipeCard.jsx        — карточка рецепта
    Pagination.jsx        — переключение страниц
    RecipeModal.jsx       — детали рецепта (свой useEffect + AbortController)
    AddRecipeForm.jsx     — контролируемая форма добавления
    Message.jsx           — loading / error / empty
```

## Запуск
```bash
npm install
npm run dev      # разработка
npm run build    # production-сборка
```

## Деплой
Vercel / Netlify: подключить репозиторий, framework — Vite, build command `npm run build`, output `dist`.
