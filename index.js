let recipes = [];

function getRecipes() {
    fetch("data/recipes.json")
    .then((res) => res.json())
    .then((data) => {
        recipes = data.recipes;

        // Affiche les recettes
        buildRecipes(recipes);

        // Cherche une recette dans la barre de recherche principale
        searchRecipes(recipes);

    })       
};

getRecipes();

function buildRecipes() {
    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        recipeModel.getRecipeCard();
    })
};