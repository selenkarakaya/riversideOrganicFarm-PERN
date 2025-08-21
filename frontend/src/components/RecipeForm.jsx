import { useState } from "react";

function RecipeForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState(1);
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipeData = { title, description, servings, ingredients };
    console.log(recipeData);
    // burada backend API çağrısı yapabilirsin
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="number"
        value={servings}
        onChange={(e) => setServings(e.target.value)}
        min={1}
      />

      <h3>Ingredients</h3>
      {ingredients.map((ing, index) => (
        <div key={index}>
          <input
            value={ing.name}
            onChange={(e) =>
              handleIngredientChange(index, "name", e.target.value)
            }
            placeholder="Ingredient name"
          />
          <input
            value={ing.quantity}
            onChange={(e) =>
              handleIngredientChange(index, "quantity", e.target.value)
            }
            placeholder="Quantity"
          />
          <button type="button" onClick={() => removeIngredient(index)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={addIngredient}>
        Add Ingredient
      </button>
      <button type="submit">Save Recipe</button>
    </form>
  );
}

export default RecipeForm;
