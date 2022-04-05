// Ajoute un ingrédient via le champs de recherche avancé

function addIngredients(recipes) {
    const searchDishes                              = document.querySelector(".search__dishes__bar");
    const searchResults                             = document.querySelector(".recipes");
    const resultsIngredients                        = document.querySelector(".results-ingredients");
    const searchIngredients                         = document.querySelector(".ingredients");
    const iconIngredients                           = document.querySelector(".iconIngredients");
    const iconCloseIngredients                      = document.querySelector(".iconCloseIngredients");

    // Ouverture du bloc 
    iconIngredients.addEventListener("click", () => {
        resultsIngredients.style.display            = "flex";
        searchIngredients.style.width               = "653px";
        iconIngredients.style.display               = "none";
        iconCloseIngredients.style.display          = "block";
    });

    // Fermeture du bloc
    iconCloseIngredients.addEventListener("click", () => {
        iconCloseIngredients.style.display          = "none";
        iconIngredients.style.display               = "block";
        resultsIngredients.style.display            = "none";
        searchIngredients.style.width               = "";
    });

    searchDishes.addEventListener("input", (e) => {
        const searchedString                        = e.target.value.toLowerCase();

        // À partir de trois caractères
        if (searchedString.length > 2) {
            searchResults.innerHTML                 = "";

            const filteredRecipes                   = recipes.filter(recipe => {
                const nameFound                     = `${recipe.name}`.toLowerCase().includes(searchedString);
                const descriptionFound              =  `${recipe.description}`.toLowerCase().includes(searchedString);
                const nbIngredients                 = recipe.ingredients.filter(item => `${item.ingredient}`.toLowerCase().includes(searchedString)).length ;

                if (nbIngredients > 0 || nameFound || descriptionFound) {
                    return recipe;
                }
            });

            // Affiche les recettes filtrées
            filteredRecipes.forEach((recipe) => {
                const recipeModel                   = recipeFactory(recipe);
                recipeModel.getRecipeCard();
            });

            // Actualisation du champs de recherche Ingrédients
            // Récupère les ingrédients des recettes filtrées
            const ingredientsFiltered               = [];
            filteredRecipes.forEach((recipe) => {
                recipe.ingredients.forEach((ingredient) => {
                    ingredientsFiltered.push(ingredient.ingredient);
                })
            });

            // Supprime les doublons restant
            const removeDuplicateIngredients        = new Set(ingredientsFiltered);
            const Ingredients                       = [...removeDuplicateIngredients];
            Ingredients.sort();
            resultsIngredients.innerHTML            = "";

            Ingredients.forEach((ingredient) => {
                // Affiche la liste des ingrédients restant dans le bloc
                const ingredientNode                = document.createElement("p");
                ingredientNode.textContent          = ingredient;
                ingredientNode.style.cursor         = "pointer";
                resultsIngredients.style.height     = "100px";
                ingredientNode.classList.add("ingredient", "product");
                resultsIngredients.appendChild(ingredientNode); 
                
                // Cherche un ingrédient dans l'input de recherche avancé
                searchIngredients.addEventListener("input", (e) => {
                
                    const searchedString                    = e.target.value.toLowerCase();
                    const filteredIngredients               = Ingredients.filter(item => item.toLowerCase().includes(searchedString));

                    // Affiche le bloc ingrédients 
                    resultsIngredients.style.display        = "flex";
                    resultsIngredients.innerHTML            = "";

                    // Ferme le bloc ingrédients
                    if (searchIngredients.value == "") {
                        resultsIngredients.style.display    = "none";
                    };

                    filteredIngredients.forEach((item) => {
                        // Affiche la liste des ingrédients dans le bloc 
                        const ingredient                    = document.createElement("p");
                        ingredient.textContent              = item;
                        ingredient.style.cursor             = "pointer";
                        ingredient.classList.add("ingredient", "product");
                        resultsIngredients.appendChild(ingredient); 

                        // Sélectionne l'ingrédient choisi et affiche les recettes correspondantes
                        ingredient.addEventListener("click", () => {
                            searchResults.innerHTML         = "";
                            resultsIngredients.style.display = "none";
                            searchIngredients.style.width = "";

                            // Filtre les recettes selon l'ingrédient choisi
                            const newRecipes           = filteredRecipes.filter(recipe => {
                                const nbIngredients         = recipe.ingredients.filter(item => `${item.ingredient}`.toLowerCase().includes(searchedString)).length ;
                
                                if (nbIngredients > 0) {
                                    return recipe;
                                }
                            });

                            // Affiche les recettes filtrées
                            newRecipes.forEach((item) => {
                                const recipeModel           = recipeFactory(item);
                                recipeModel.getRecipeCard();
                            });

                            // Création d'un tag au clic de l'ingrédient choisi
                            const tagsContainer             = document.querySelector(".search__tags");
                            const tagI                      = document.createElement("div");
                            const ingredientTag             = document.createElement("p");
                            const closeTag                  = document.createElement("img");

                            tagI.classList.add("tagI", "tag");
                            ingredientTag.textContent       = ingredient.textContent;
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
                                });
                            });
                        }) 
                    });
                })
            });
        }
    })
}

