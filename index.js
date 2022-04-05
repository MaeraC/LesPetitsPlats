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

        // Ajoute un ingrédient via le champs de recherche avancé
        addIngredients(recipes);

        // Ajoute un appareil via le champs de recherche avancé
        addAppliances(recipes);

        // Ajoute un ustensile via le champs de recherche avancé
        addUstensils(recipes);

        // Commence la recherche par un tag Ingrédient
        searchIngredients(recipes);

    })       
};

getRecipes();

function buildRecipes() {
    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        recipeModel.getRecipeCard();
    })
};