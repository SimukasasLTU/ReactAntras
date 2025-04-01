import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then(setRecipe);
  }, [id]);

  if (!recipe) return <p className="container">🔄 Kraunama...</p>;

  return (
    <div className="container">
      <div className="recipe-card">
        <h2>{recipe.name}</h2>
        <p><strong>Kategorija:</strong> {recipe.mealType.join(", ")}</p>
        <p><strong>Paruošimo laikas:</strong> {recipe.prepTimeMinutes} min</p>
        <p><strong>Porcijos:</strong> {recipe.servings}</p>

        <h4>🧂 Ingredientai:</h4>
        <ul>
          {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
        </ul>

        <h4>📋 Instrukcijos:</h4>
        <ol>
          {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
        </ol>

        <button onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
          ⬅ Grįžti
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
