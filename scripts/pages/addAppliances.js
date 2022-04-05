function addAppliances(recipes) {
    // Ajoute un appareil via le champs de recherche avancé

    const searchDishes                              = document.querySelector(".search__dishes__bar");
    const searchResults                             = document.querySelector(".recipes");
    const resultsAppliances                        = document.querySelector(".results-appliances");
    const searchAppliances                         = document.querySelector(".appareils");
    const iconAppliances                           = document.querySelector(".iconAppliances");
    const iconCloseAppliances                      = document.querySelector(".iconCloseAppliances");
    
    // Ouverture du bloc 
    iconAppliances.addEventListener("click", () => {
        resultsAppliances.style.display            = "flex";
        searchAppliances.style.width               = "400px";
        iconAppliances.style.display               = "none";
        iconCloseAppliances.style.display          = "block";
    });
    
    // Fermeture du bloc
    iconCloseAppliances.addEventListener("click", () => {
        iconCloseAppliances.style.display          = "none";
        iconAppliances.style.display               = "block";
        resultsAppliances.style.display            = "none";
        searchAppliances.style.width               = "";
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

            // Actualisation du champs de recherche Appareils
            // Récupère les appareils des recettes filtrées
            const AppliancesFiltered               = filteredRecipes.map(recipe => `${recipe.appliance}`);
            
            // Supprime les doublons restant
            const removeDuplicateAppliances        = new Set(AppliancesFiltered);
            const Appliances                       = [...removeDuplicateAppliances];
            Appliances.sort();
            resultsAppliances.innerHTML            = "";

            Appliances.forEach((appliance) => {
                // Affiche la liste des appareils restant dans le bloc
                const applianceNode                = document.createElement("p");
                applianceNode.textContent          = appliance;
                applianceNode.style.cursor         = "pointer";
                resultsAppliances.style.height     = "100px";
                applianceNode.classList.add("appliance", "product");
                resultsAppliances.appendChild(applianceNode); 
                
                // Cherche un appareil dans l'input de recherche avancé
                searchAppliances.addEventListener("input", (e) => {
                
                    const searchedString                    = e.target.value.toLowerCase();
                    const filteredAppliances               = Appliances.filter(item => item.toLowerCase().includes(searchedString));

                    // Affiche le bloc Appareils 
                    resultsAppliances.style.display        = "flex";
                    resultsAppliances.innerHTML            = "";

                    // Ferme le bloc Appareils
                    if (searchAppliances.value == "") {
                        resultsAppliances.style.display    = "none";
                    };

                    filteredAppliances.forEach((item) => {
                        // Affiche la liste des appareils dans le bloc 
                        const appliance                    = document.createElement("p");
                        appliance.textContent              = item;
                        appliance.style.cursor             = "pointer";
                        appliance.classList.add("appliance", "product");
                        resultsAppliances.appendChild(appliance); 

                        // Sélectionne l'appareil choisi et affiche les recettes correspondantes
                        appliance.addEventListener("click", () => {
                            searchResults.innerHTML         = "";
                            resultsAppliances.style.display = "none";
                            searchAppliances.style.width = "";

                            const newRecipes               = filteredRecipes.filter(recipe => `${recipe.appliance}`.toLowerCase().includes(searchedString));
                            searchResults.innerHTML             = "";

                            // Affiche les recettes correspondantes 
                            newRecipes.forEach((recipe) => {
                                const recipeModel               = recipeFactory(recipe);
                                recipeModel.getRecipeCard();
                            });

                            // Création d'un tag au clic de l'appareil choisi
                            const tagsContainer             = document.querySelector(".search__tags");
                            const tag                      = document.createElement("div");
                            const applianceTag             = document.createElement("p");
                            const closeTag                  = document.createElement("img");

                            tag.classList.add("tag");
                            applianceTag.textContent       = appliance.textContent;
                            applianceTag.classList.add("applianceTag", "thisTag");
                            closeTag.setAttribute("src", "../assets/iconTimes.png")
                            closeTag.classList.add("closeTag");
                            closeTag.innerHTML              = '<i class="fas fa-times"></i>';

                            tagsContainer.appendChild(tag); 
                            tag.appendChild(applianceTag);
                            tag.appendChild(closeTag);

                            // Le tag disparait lorsqu'on clique dessus 
                            tag.addEventListener("click", () => {
                                tag.style.display          = "none";
                                searchResults.innerHTML     = "";
                                searchAppliances.value     = "";
                                searchDishes.value          = "";
                                    
                                recipes.forEach((recipe) => {
                                    const recipeModel           = recipeFactory(recipe);
                                    recipeModel.getRecipeCard();
                                })
                            })
                        }) 
                    })
                })
            })
        }
    })
}