document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search-btn');
  const ingredientInput = document.getElementById('ingredient-input');
  const recipesList = document.getElementById('recipes-list');

  searchBtn.addEventListener('click', () => {
    const ingredient = ingredientInput.value.trim();
    if (ingredient) {
      fetchRecipes(ingredient);
    }
  });

  async function fetchRecipes(ingredient) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      displayRecipes(data.meals);
    } catch (error) {
      alert('Error fetching data. Please try again later.');
    }
  }

  function displayRecipes(recipes) {
    recipesList.innerHTML = '';
    if (recipes) {
      recipes.forEach(recipe => {
        const li = document.createElement('li');
        li.innerHTML = `
          <h3>${recipe.strMeal}</h3>
          <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" width="100">
        `;
        recipesList.appendChild(li);
      });
    } else {
      recipesList.innerHTML = '<li>No recipes found. Please try another ingredient.</li>';
    }
  }
});
