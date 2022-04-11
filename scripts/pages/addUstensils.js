// Ajoute un ustensile via le champs de recherche avancé

function addUstensils(recipes) {
    const searchDishes                              = document.querySelector(".search__dishes__bar");
    const searchResults                             = document.querySelector(".recipes");
    const resultsUstensils                        = document.querySelector(".results-ustensils");
    const searchUstensils                         = document.querySelector(".ustentils");
    const iconUstensils                           = document.querySelector(".iconUstensils");
    const iconCloseUstensils                      = document.querySelector(".iconCloseUstensils");
    
    // Ouverture du bloc 
    iconUstensils.addEventListener("click", () => {
        resultsUstensils.style.display            = "flex";
        searchUstensils.style.width               = "400px";
        iconUstensils.style.display               = "none";
        iconCloseUstensils.style.display          = "block";
    });
    
    // Fermeture du bloc
    iconCloseUstensils.addEventListener("click", () => {
        iconCloseUstensils.style.display          = "none";
        iconUstensils.style.display               = "block";
        resultsUstensils.style.display            = "none";
        searchUstensils.style.width               = "";
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

            // Actualisation du champs de recherche ustensiles
            iconUstensils.addEventListener("click", () => {
                // Récupère les ustensiles des recettes filtrées
                const ustensilsFiltered               = [];

                filteredRecipes.forEach((recipe) => {
                    recipe.ustensils.forEach((ustensil) => {
                        ustensilsFiltered.push(ustensil);
                    })
                });
                
                // Supprime les doublons restant
                const removeDuplicateUstensils        = new Set(ustensilsFiltered);
                const Ustensils                       = [...removeDuplicateUstensils];
                Ustensils.sort();
                resultsUstensils.innerHTML            = "";

                Ustensils.forEach((ustensile) => {
                    // Affiche la liste des ustensiles restant dans le bloc
                    const ustensileNode                = document.createElement("p");
                    ustensileNode.textContent          = ustensile;
                    ustensileNode.style.cursor         = "pointer";
                    resultsUstensils.style.height     = "100px";
                    ustensileNode.classList.add("ustensil", "product");
                    resultsUstensils.appendChild(ustensileNode); 
                    
                    // Cherche un ustensile dans l'input de recherche avancé
                    searchUstensils.addEventListener("input", (e) => {
                    
                        const searchedString                    = e.target.value.toLowerCase();
                        const filteredUstensils               = Ustensils.filter(item => item.toLowerCase().includes(searchedString));

                        // Affiche le bloc ustensiles 
                        resultsUstensils.style.display        = "flex";
                        resultsUstensils.innerHTML            = "";

                        // Ferme le bloc ustensiles
                        if (searchUstensils.value == "") {
                            resultsUstensils.style.display    = "none";
                        };

                        filteredUstensils.forEach((item) => {
                            // Affiche la liste des ustensiles dans le bloc 
                            const ustensile                    = document.createElement("p");
                            ustensile.textContent              = item;
                            ustensile.style.cursor             = "pointer";
                            ustensile.classList.add("ustensil", "product");
                            resultsUstensils.appendChild(ustensile); 

                            // Sélectionne l'ustensile choisi et affiche les recettes correspondantes
                            ustensile.addEventListener("click", () => {
                                searchResults.innerHTML         = "";
                                resultsUstensils.style.display = "none";
                                searchUstensils.style.width = "";
                                searchUstensils.value = "";

                                const newRecipes               = filteredRecipes.filter(recipe => `${recipe.ustensils}`.toLowerCase().includes(searchedString));
                                searchResults.innerHTML             = "";

                                // Affiche les recettes correspondantes 
                                newRecipes.forEach((recipe) => {
                                    const recipeModel               = recipeFactory(recipe);
                                    recipeModel.getRecipeCard();
                                });

                                // Création d'un tag au clic de l'ustensile choisi
                                const tagsContainer             = document.querySelector(".search__tags");
                                const tag                      = document.createElement("div");
                                const ustensileTag             = document.createElement("p");
                                const closeTag                  = document.createElement("img");

                                tag.classList.add("tagU", "tag");
                                ustensileTag.textContent       = ustensile.textContent;
                                ustensileTag.classList.add("ustensileTag", "thisTag");
                                closeTag.setAttribute("src", "../assets/iconTimes.png")
                                closeTag.classList.add("closeTag");
                                closeTag.innerHTML              = '<i class="fas fa-times"></i>';

                                tagsContainer.appendChild(tag); 
                                tag.appendChild(ustensileTag);
                                tag.appendChild(closeTag);

                                // Le tag disparait lorsqu'on clique dessus 
                                tag.addEventListener("click", () => {
                                    tag.style.display          = "none";
                                    searchResults.innerHTML     = "";
                                    searchUstensils.value     = "";
                                    searchDishes.value          = "";
                                        
                                    recipes.forEach((recipe) => {
                                        const recipeModel           = recipeFactory(recipe);
                                        recipeModel.getRecipeCard();
                                    })
                                })
                            }) 
                        })
                    });

                    ustensileNode.addEventListener("click", () => {
                        searchResults.innerHTML = "";
                        resultsUstensils.style.display = "none";
                        searchUstensils.style.width = "";
                        searchUstensils.value = "";
        
                        // Affiche les recettes correspondant à l'ustensile choisi
                        filteredRecipes.forEach((recipe) => {
                            if (recipe.ustensils.includes(ustensileNode.textContent) == true) {
                                const recipeModel               = recipeFactory(recipe);
                                recipeModel.getRecipeCard();
                            }
                        });
        
                        // Création d'un tag au clic de l'ustensile choisi
                        const tagsContainer             = document.querySelector(".search__tags");
                        const tag                      = document.createElement("div");
                        const ustensileTag             = document.createElement("p");
                        const closeTag                  = document.createElement("img");
        
                        tag.classList.add("tagU", "tag");
                        ustensileTag.textContent       = ustensileNode.textContent;
                        ustensileTag.classList.add("ustensileTag", "thisTag");
                        closeTag.setAttribute("src", "../assets/iconTimes.png")
                        closeTag.classList.add("closeTag");
                        closeTag.innerHTML              = '<i class="fas fa-times"></i>';
        
                        tagsContainer.appendChild(tag); 
                        tag.appendChild(ustensileTag);
                        tag.appendChild(closeTag);
        
                        // Le tag disparait lorsqu'on clique dessus 
                        tag.addEventListener("click", () => {
                            tag.style.display          = "none";
                            searchResults.innerHTML     = "";
                            searchUstensils.value     = "";
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
    })
}