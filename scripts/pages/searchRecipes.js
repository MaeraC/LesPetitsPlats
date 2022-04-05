// Cherche les recettes via la barre de recherche principale

function searchRecipes(recipes) {
    const searchDishes                          = document.querySelector(".search__dishes__bar");
    const searchResults                         = document.querySelector(".recipes");

    // Filtre les recettes 
    searchDishes.addEventListener("input", (e) => {
        const searchedString                    = e.target.value.toLowerCase();

        // À partir de trois caractères
        if (searchedString.length > 2) {
            searchResults.innerHTML             = "";

            const filteredRecipes               = recipes.filter(recipe => {
                const nameFound                 = `${recipe.name}`.toLowerCase().includes(searchedString);
                const descriptionFound          =  `${recipe.description}`.toLowerCase().includes(searchedString);
                const nbIngredients             = recipe.ingredients.filter(item => `${item.ingredient}`.toLowerCase().includes(searchedString)).length ;

                if (nbIngredients > 0 || nameFound || descriptionFound) {
                    return recipe;
                }
            });

            // Affiche les recettes filtrées
            filteredRecipes.forEach((recipe) => {
                const recipeModel               = recipeFactory(recipe);
                recipeModel.getRecipeCard();
            });
        }

        // Ré-actualise les recettes si no-searchedString
        if (searchedString.length === 0) {
            searchResults.innerHTML             = "";

            recipes.forEach((recipe) => {
                const recipeModel               = recipeFactory(recipe);
                recipeModel.getRecipeCard();
            })
        };

        // Affiche un message d'erreur si aucun résultat
        const recipesDisplayed = document.querySelectorAll("article");

        if (recipesDisplayed.length === 0) {
            const errorMsg = document.querySelector(".error");
            errorMsg.textContent = "Aucune recette ne correspond à votre critère.";
        }
        else {
            const errorMsg = document.querySelector(".error");
            errorMsg.textContent = "";
        }  
    })
}