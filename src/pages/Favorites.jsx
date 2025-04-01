import { useEffect, useState, useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import { AuthContext } from "../context/AuthContext";

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);

  const fetchFavorites = async () => {
    const favs = await fetch(`http://localhost:3000/favorites?userId=${user.id}`).then(res => res.json());
    setFavoritesList(favs);

    const recipeFetches = await Promise.all(
      favs.map(f =>
        fetch(`https://dummyjson.com/recipes/${f.recipeId}`).then(res => res.json())
      )
    );
    setFavoriteRecipes(recipeFetches);
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const removeFavorite = async (recipeId) => {
    const fav = favoritesList.find(f => f.recipeId === recipeId);
    if (fav) {
      await fetch(`http://localhost:3000/favorites/${fav.id}`, { method: "DELETE" });
      fetchFavorites();
    }
  };

  return (
    <div>
      <h2>Mano mėgstami receptai</h2>
      {favoriteRecipes.length === 0 ? (
        <p>Neturite mėgstamų receptų.</p>
      ) : (
        favoriteRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={true}
            onToggleFavorite={() => removeFavorite(recipe.id)}
          />
        ))
      )}
    </div>
  );
};

export default Favorites;
