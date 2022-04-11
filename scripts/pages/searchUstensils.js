// Cherche un ustensile via le champs de recherche avancé

function searchUstensils(recipes) {
    const searchDishes                              = document.querySelector(".search__dishes__bar");
    const searchResults                             = document.querySelector(".recipes");
    const resultsUstensils                        = document.querySelector(".results-ustensils");
    const searchUstensils                         = document.querySelector(".ustentils");
    const iconUstensils                           = document.querySelector(".iconUstensils");
    const iconCloseUstensils                      = document.querySelector(".iconCloseUstensils");

    // Récupère tous les ustensiles 
    const ustensilsArray               = [];

    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            ustensilsArray.push(ustensil);
        })
    });
            
    // Supprime les doublons
    const removeDuplicateUstensils        = new Set(ustensilsArray);
    const Ustensils                       = [...removeDuplicateUstensils];
    Ustensils.sort();
    resultsUstensils.innerHTML            = "";

    // Cherche un ustensile au clic 
    iconUstensils.addEventListener("click", () => {
        
        Ustensils.forEach((ustensile) => {
            // Affiche la liste de tous les ustensiles dans le bloc
            const ustensileNode                = document.createElement("p");
            ustensileNode.textContent          = ustensile;
            ustensileNode.style.cursor         = "pointer";
            resultsUstensils.style.height     = "100px";
            ustensileNode.classList.add("ustensil", "product");
            ustensileNode.style.display = "block";
            resultsUstensils.appendChild(ustensileNode); 

            ustensileNode.addEventListener("click", () => {
                searchResults.innerHTML = "";
                resultsUstensils.style.display = "none";
                resultsUstensils.style.width = "";
                searchUstensils.style.width = "";

                // Affiche les recettes correspondant à l'ustensile choisi
                recipes.forEach((recipe) => {
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

    // Cherche un ustensile à la frappe 
    searchUstensils.addEventListener("input", (e) => {
        resultsUstensils.innerHTML = "";
        resultsUstensils.style.display = "flex";
        searchUstensils.style.width = "400px";
        iconUstensils.style.display = "none";
        iconCloseUstensils.style.display = "block";

        const searchedString                        = e.target.value.toLowerCase();
        const filteredUstensils               = Ustensils.filter(item => item.toLowerCase().includes(searchedString));

        // Affiche les ustensiles filtrés
        filteredUstensils.forEach((ustensile) => {
            const ustensileNode                = document.createElement("p");
            ustensileNode.textContent          = ustensile;
            ustensileNode.style.cursor         = "pointer";
            resultsUstensils.style.height     = "100px";
            ustensileNode.classList.add("ustensil", "product");
            ustensileNode.style.display = "block";
            resultsUstensils.appendChild(ustensileNode); 

            ustensileNode.addEventListener("click", () => {
                searchResults.innerHTML = "";
                resultsUstensils.style.display = "none";
                resultsUstensils.style.width = "";
                searchUstensils.style.width = "";

                // Affiche les recettes correspondant à l'ustensile choisi
                recipes.forEach((recipe) => {
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