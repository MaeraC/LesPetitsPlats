function severalTags(recipes) {

    const containerTag = document.querySelector(".search__tags");
    const icons = document.querySelectorAll(".icon");
    const searchResults = document.querySelector(".recipes");
    const searchInput = document.querySelectorAll(".searchInput");
    const searchDishes = document.querySelector(".search__dishes__bar");
    const results = document.querySelectorAll(".results");

    icons.forEach((icon) => {
        icon.addEventListener("click", () => {
            const products = document.querySelectorAll(".product");
    
            // Récupère tous les ingredients, ustensiles, et appareils  
            products.forEach((product) => {
                product.addEventListener("click", () => {
                    const tags = document.querySelectorAll(".thisTag")
                    const newRecipes = [];

                    tags.forEach((tag) => {
                        // retrouve les recettes filtres affichees
                        const filteredRecipes = recipes.filter(recipe => {
                            const appliances = recipe.appliance.includes(tag.textContent);
                            const ustensiles = recipe.ustensils.includes(tag.textContent);
                            const Ingredients = recipe.ingredients.filter(item => item.ingredient.includes(tag.textContent)).length;

                            if (appliances > 0 || ustensiles || Ingredients) {
                                return recipe;
                            }
                        });

                        // Filtre les recettes affichées selon le tag suivant
                        const newFilter = filteredRecipes.filter(recipe => {
                            const ustensiles = recipe.ustensils.includes(containerTag.children[0].textContent && containerTag.children[1].textContent);
                            const appliances = recipe.appliance.includes(containerTag.children[0].textContent && containerTag.children[1].textContent);
                            const Ingredients = recipe.ingredients.filter(item => item.ingredient.includes(containerTag.children[0].textContent && containerTag.children[1].textContent)).length
                            
                            if (ustensiles > 0 || appliances || Ingredients) {
                                return recipe;
                            }
                        }); 

                        newRecipes.push(newFilter); 
                    });  

                    
                    // Beug - Supprime les recettes inutiles 
                    const itemDeleted = newRecipes.splice(1, 1);

                    searchResults.innerHTML = "";

                    // Affiche les nouvelles recettes filtrées
                    newRecipes.forEach((array) => {

                        array.forEach((recipe) => {
                           const recipeModel               = recipeFactory(recipe);
                            recipeModel.getRecipeCard();
                        })
                    }) 
                }) 
            })
        })
    });

    console.log(searchInput)

    searchInput.forEach((input) => {
    
        input.addEventListener("input", () => {
            const products = document.querySelectorAll(".product");
    
            // Récupère tous les ingredients, ustensiles, et appareils  
            products.forEach((product) => {
                product.addEventListener("click", () => {
                    const tags = document.querySelectorAll(".thisTag")
                    const newRecipes = [];

                    tags.forEach((tag) => {
                        // retrouve les recettes filtres affichees
                        const filteredRecipes = recipes.filter(recipe => {
                            const appliances = recipe.appliance.includes(tag.textContent);
                            const ustensiles = recipe.ustensils.includes(tag.textContent);
                            const Ingredients = recipe.ingredients.filter(item => item.ingredient.includes(tag.textContent)).length;

                            
                            if (appliances > 0 || ustensiles || Ingredients) {
                                return recipe
                            }  
                        });

                        // Filtre les recettes affichées selon le tag suivant
                        const newFilter = filteredRecipes.filter(recipe => {
                            const ustensiles = recipe.ustensils.includes(containerTag.children[0].textContent && containerTag.children[1].textContent);
                            const appliances = recipe.appliance.includes(containerTag.children[0].textContent && containerTag.children[1].textContent);
                            const Ingredients = recipe.ingredients.filter(item => item.ingredient.includes(containerTag.children[0].textContent && containerTag.children[1].textContent)).length
                           
                            if (ustensiles > 0 || appliances || Ingredients) {
                                return recipe
                            } 
                        }); 

                        newRecipes.push(newFilter); 
                    });  

                    // Beug - Supprime les recettes inutiles 
                    const itemDeleted = newRecipes.splice(1, 1);

                    searchResults.innerHTML = "";

                    // Affiche les nouvelles recettes filtrées
                    newRecipes.forEach((array) => {

                        array.forEach((recipe) => {
                           const recipeModel               = recipeFactory(recipe);
                            recipeModel.getRecipeCard();
                        })
                    }) 
                }) 
            })
        })
    }) 

    searchDishes.addEventListener("click", () => {
        const searchInputs = document.querySelectorAll(".searchInput");
        const resultsBloc = document.querySelectorAll(".results");
        const iconClose = document.querySelectorAll(".iconClose");

        icons.forEach((icon) => {
            icon.style.display = "block";
        })

        iconClose.forEach((icon) => {
            icon.style.display = "none";
        })

        searchInputs.forEach((input) => {
            input.style.width = "";
        })

        resultsBloc.forEach((bloc) => {
            bloc.style.display = "none";
        })
    })

    
}

