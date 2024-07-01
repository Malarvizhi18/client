// src/RecipeFinder.js
import React, { useState } from 'react';
import axios from 'axios';

const RecipeFinder = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const appId = '71690ded';
  const appKey = '4d0e62e1f80dfc15a493e49a5676fe6d';
  const searchRecipes = async () => {
    const apiUrl = `https://api.edamam.com/search?q=${ingredients}&app_id=${appId}&app_key=${appKey}`;

    try {
      const response = await axios.get(apiUrl);
      setRecipes(response.data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div className="items-center justify-center background">
      <center>
    <h1 className="text-4xl font-bold mb-4 text-white  items-center">
      <img className="rounded-full h-20 w-20 " src="https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?b=1&s=612x612&w=0&k=20&c=X6CkFGpSKhNZeiii8Pp2M_YrBdqs7tRaBytkGi48a0U=" alt="" />
      Recipe Finder</h1></center>
    <div className="flex flex-col items-center mb-4">
      <input
        className="p-2 border border-gray-300 rounded mb-2 w-80"
        type="text"
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded w-80 hover:bg-blue-600"
        onClick={searchRecipes}
      >
        Search
      </button>
    </div>
    <div className="flex flex-wrap justify-center gap-4">
      {recipes.length > 0 ? (
        recipes.map(({ recipe }) => (
          <div key={recipe.uri} className="p-4 bg-white shadow rounded w-80">
            <h2 className="text-xl font-bold mb-2">{recipe.label}</h2>
            <img className="w-full h-auto rounded mb-2" src={recipe.image} alt={recipe.label} />
            <p className="mb-2">{recipe.ingredientLines.join(', ')}</p>
            <a
              href={recipe.url}
              className="text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Recipe
            </a>
          </div>
        ))
      ) : (
        <p className='text-white font-bold'>No recipes found</p>
      )}
    </div>
  </div>
  );
};

export default RecipeFinder;
