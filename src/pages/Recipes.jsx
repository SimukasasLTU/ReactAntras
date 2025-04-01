import { useEffect, useState, useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import { AuthContext } from "../context/AuthContext";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const { user } = useContext(AuthContext);

  const RECIPES_PER_PAGE = 5;

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then(res => res.json())
      .then(data => setRecipes(data.recipes));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/favorites?userId=${user.id}`)
      .then(res => res.json())
      .then(data => setFavorites(data.map(f => f.recipeId)));
  }, [user]);

  const toggleFavorite = async (recipeId) => {
    const exists = favorites.includes(recipeId);
    if (exists) {
      const fav = await fetch(`http://localhost:3000/favorites?userId=${user.id}&recipeId=${recipeId}`).then(res => res.json());
      if (fav[0]) {
        await fetch(`http://localhost:3000/favorites/${fav[0].id}`, { method: "DELETE" });
        setFavorites(favorites.filter(id => id !== recipeId));
      }
    } else {
      await fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, recipeId }),
      });
      setFavorites([...favorites, recipeId]);
    }
  };

  const start = (page - 1) * RECIPES_PER_PAGE;
  const currentRecipes = recipes.slice(start, start + RECIPES_PER_PAGE);

  return (
    <div>
      <h2>Receptai</h2>
      {currentRecipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favorites.includes(recipe.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Atgal</button>
        <span style={{ margin: "0 10px" }}>Puslapis: {page}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={start + RECIPES_PER_PAGE >= recipes.length}>Kitas</button>
      </div>
    </div>
  );
};

export default Recipes;
