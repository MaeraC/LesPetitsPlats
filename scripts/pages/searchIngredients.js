// Cherche un ingrédient via le champs de recherche avancé

function searchIngredients(recipes) {
    const searchDishes                              = document.querySelector(".search__dishes__bar");
    const searchResults                             = document.querySelector(".recipes");
    const resultsIngredients                        = document.querySelector(".results-ingredients");
    const searchIngredients                         = document.querySelector(".ingredients");
    const iconIngredients                           = document.querySelector(".iconIngredients");
    const iconCloseIngredients                      = document.querySelector(".iconCloseIngredients");

    // Récupère tous les ingrédients
    const ingredientsArray               = [];

    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            ingredientsArray.push(ingredient.ingredient);
        })
    });

    // Supprime les doublons 
    const removeDuplicateIngredients        = new Set(ingredientsArray);
    const Ingredients                       = [...removeDuplicateIngredients];
    Ingredients.sort();
    resultsIngredients.innerHTML            = "";

    // Cherche un ingrédient au clic 
    iconIngredients.addEventListener("click", () => {
        
        Ingredients.forEach((ingredient) => {
            // Affiche la liste de tous les ingrédients dans le bloc
            const ingredientNode                = document.createElement("p");
            ingredientNode.textContent          = ingredient;
            ingredientNode.style.cursor         = "pointer";
            resultsIngredients.style.height     = "100px";
            ingredientNode.classList.add("ingredient", "product");
            resultsIngredients.appendChild(ingredientNode); 

            ingredientNode.addEventListener("click", () => {
                searchResults.innerHTML = "";
                resultsIngredients.style.width = "";
                searchIngredients.style.width = "";
                resultsIngredients.style.display = "none";

                // Affiche les recettes correspondant à l'ingrédient choisi
                recipes.forEach((recipe) => {
                    const ingredientRecipes = recipe.ingredients.map(item => `${item.ingredient}`);

                    if (ingredientRecipes.includes(ingredientNode.textContent) == true) {
                        
                        const recipeModel           = recipeFactory(recipe);
                        recipeModel.getRecipeCard(); 
                    }
                });
                
                // Création d'un tag au clic de l'ingrédient choisi
                const tagsContainer             = document.querySelector(".search__tags");
                const tagI                      = document.createElement("div");
                const ingredientTag             = document.createElement("p");
                const closeTag                  = document.createElement("img");

                tagI.classList.add("tagI", "tag");
                ingredientTag.textContent       = ingredientNode.textContent;
                ingredientTag.classList.add("applianceTag", "thisTag");
                closeTag.setAttribute("src", "../assets/iconTimes.png")
                closeTag.classList.add("closeTag");
                closeTag.innerHTML              = '<i class="fas fa-times"></i>';

                tagsContainer.appendChild(tagI); 
                tagI.appendChild(ingredientTag);
                tagI.appendChild(closeTag);

                // Le tag disparait lorsqu'on clique dessus 
                tagI.addEventListener("click", () => {
                    tagI.style.display          = "none";
                    searchResults.innerHTML     = "";
                    searchIngredients.value     = "";
                    searchDishes.value          = "";
                        
                    recipes.forEach((recipe) => {
                        const recipeModel           = recipeFactory(recipe);
                        recipeModel.getRecipeCard();
                    })
                })
            })
        })
    })

    // Cherche un ingrédient à la frappe 
    searchIngredients.addEventListener("input", (e) => {
        resultsIngredients.innerHTML = "";
        resultsIngredients.style.display = "flex";
        searchIngredients.style.width = "653px";
        iconIngredients.style.display = "none";
        iconCloseIngredients.style.display = "block";

        const searchedString                        = e.target.value.toLowerCase();
        const filteredIngredients               = Ingredients.filter(item => item.toLowerCase().includes(searchedString));

        // Affiche les ingrédients filtrés
        filteredIngredients.forEach((ingredient) => {
            const ingredientNode                = document.createElement("p");
            ingredientNode.textContent          = ingredient;
            ingredientNode.style.cursor         = "pointer";
            resultsIngredients.style.height     = "100px";
            ingredientNode.classList.add("ingredient", "product");
            resultsIngredients.appendChild(ingredientNode); 

            ingredientNode.addEventListener("click", () => {
                searchResults.innerHTML = "";
                searchIngredients.style.width = "";
                resultsIngredients.style.display = "none";
                iconCloseIngredients.style.display = "none";
                iconIngredients.style.display = "block";

                // Affiche les recettes correspondant à l'ingrédient choisi
                recipes.forEach((recipe) => {
                    const ingredientRecipes = recipe.ingredients.map(item => `${item.ingredient}`);

                    if (ingredientRecipes.includes(ingredientNode.textContent) == true) {
                        
                        const recipeModel           = recipeFactory(recipe);
                        recipeModel.getRecipeCard();
                        return recipe;
                    }
                });

                // Création d'un tag au clic de l'ingrédient choisi
                const tagsContainer             = document.querySelector(".search__tags");
                const tagI                      = document.createElement("div");
                const ingredientTag             = document.createElement("p");
                const closeTag                  = document.createElement("img");

                tagI.classList.add("tagI");
                ingredientTag.textContent       = ingredientNode.textContent;
                ingredientTag.classList.add("applianceTag", "thisTag");
                closeTag.setAttribute("src", "../assets/iconTimes.png")
                closeTag.classList.add("closeTag");
                closeTag.innerHTML              = '<i class="fas fa-times"></i>';

                tagsContainer.appendChild(tagI); 
                tagI.appendChild(ingredientTag);
                tagI.appendChild(closeTag);

                // Le tag disparait lorsqu'on clique dessus 
                tagI.addEventListener("click", () => {
                    tagI.style.display          = "none";
                    searchResults.innerHTML     = "";
                    searchIngredients.value     = "";
                    searchDishes.value          = "";
                        
                    recipes.forEach((recipe) => {
                        const recipeModel           = recipeFactory(recipe);
                        recipeModel.getRecipeCard();
                    })
                })
            })
        })
    })
}