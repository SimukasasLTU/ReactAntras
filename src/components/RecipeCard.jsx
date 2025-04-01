import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();

  return (
    <div className="recipe-card">
      <h3>{recipe.name}</h3>
      <p><strong>Prep time:</strong> {recipe.prepTimeMinutes} min</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>

      <div className="button-group">
        <button onClick={() => navigate(`/recipe/${recipe.id}`)}>Peržiūrėti</button>
        <button onClick={() => onToggleFavorite(recipe.id)}>
          {isFavorite ? "💔 Pašalinti" : "❤️ Į mėgstamus"}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
