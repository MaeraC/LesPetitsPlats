// Cherche un appareil via le champs de recherche avancé

function searchAppliances(recipes) {
    const searchDishes                              = document.querySelector(".search__dishes__bar");
    const searchResults                             = document.querySelector(".recipes");
    const resultsAppliances                        = document.querySelector(".results-appliances");
    const searchAppliances                         = document.querySelector(".appareils");
    const iconAppliances                           = document.querySelector(".iconAppliances");
    const iconCloseAppliances                      = document.querySelector(".iconCloseAppliances");

    // Récupère tous les appareils 
    const appliancesArray               = recipes.map(recipe => `${recipe.appliance}`)
            
    // Supprime les doublons
    const removeDuplicateAppliances        = new Set(appliancesArray);
    const Appliances                       = [...removeDuplicateAppliances];
    Appliances.sort();
    resultsAppliances.innerHTML            = "";

    // Cherche un appareil au clic 
    iconAppliances.addEventListener("click", () => {
        
        Appliances.forEach((appliance) => {
            // Affiche la liste de tous les ingrédients dans le bloc
            const applianceNode                = document.createElement("p");
            applianceNode.textContent          = appliance;
            applianceNode.style.cursor         = "pointer";
            resultsAppliances.style.height     = "100px";
            applianceNode.classList.add("appliances", "product");
            applianceNode.style.display = "block";
            resultsAppliances.appendChild(applianceNode); 

            applianceNode.addEventListener("click", () => {
                searchResults.innerHTML = "";
                resultsAppliances.style.width = "";
                searchAppliances.style.width = "";
                resultsAppliances.style.display = "none";

                // Affiche les recettes correspondant à l'appareil choisi
                recipes.forEach((recipe) => {
                    if (recipe.appliance.includes(applianceNode.textContent) == true) {
                        const recipeModel               = recipeFactory(recipe);
                        recipeModel.getRecipeCard();
                    }
                });

                // Création d'un tag au clic de l'appareil choisi
                const tagsContainer             = document.querySelector(".search__tags");
                const tag                      = document.createElement("div");
                const applianceTag             = document.createElement("p");
                const closeTag                  = document.createElement("img");

                tag.classList.add("tag");
                applianceTag.textContent       = applianceNode.textContent;
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

    // Cherche un appareil à la frappe 
    searchAppliances.addEventListener("input", (e) => {
        resultsAppliances.innerHTML = "";
        resultsAppliances.style.display = "flex";
        searchAppliances.style.width = "400px";
        iconAppliances.style.display = "none";
        iconCloseAppliances.style.display = "block";

        const searchedString                        = e.target.value.toLowerCase();
        const filteredAppliances               = Appliances.filter(item => item.toLowerCase().includes(searchedString));

        // Affiche les appareils filtrés
        filteredAppliances.forEach((appliance) => {
            const applianceNode                = document.createElement("p");
            applianceNode.textContent          = appliance;
            applianceNode.style.cursor         = "pointer";
            resultsAppliances.style.height     = "100px";
            applianceNode.classList.add("appliances", "product");
            applianceNode.style.display = "block";
            resultsAppliances.appendChild(applianceNode); 

            applianceNode.addEventListener("click", () => {
                searchResults.innerHTML = "";
                resultsAppliances.style.width = "";
                searchAppliances.style.width = "";
                resultsAppliances.style.display = "none";

                // Affiche les recettes correspondant à l'appareil choisi
                recipes.forEach((recipe) => {
                    if (recipe.appliance.includes(applianceNode.textContent) == true) {
                        const recipeModel               = recipeFactory(recipe);
                        recipeModel.getRecipeCard();
                    }
                });

                // Création d'un tag au clic de l'appareil choisi
                const tagsContainer             = document.querySelector(".search__tags");
                const tag                      = document.createElement("div");
                const applianceTag             = document.createElement("p");
                const closeTag                  = document.createElement("img");

                tag.classList.add("tag");
                applianceTag.textContent       = applianceNode.textContent;
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
}