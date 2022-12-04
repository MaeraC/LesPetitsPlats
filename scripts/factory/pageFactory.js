fetch("https://maerac.github.io/LesPetitsPlats/data/recipes.json")
    .then((res) => res.json())
    .then((data) => {

        const recipes = data.recipes;

        recipes.forEach((recipe) => {
            // Verifie si l'url contient l'id de la recette
            let verifyUrl = new URLSearchParams(window.location.search);
            verifyUrl.has(recipe.id);
            let param = verifyUrl.get('id');

            // Si l'id de la recette correspond à la bonne url affiche la lightbox
            if (recipe.id == param) {
                lightboxFactory();
            }

            function lightboxFactory() {
    
                const recipeSection                     = document.querySelector(".recipe-lightbox");
                const recipeImg                         = document.createElement("img");
                const recipeName                        = document.createElement("h1");
                const duration                          = document.createElement("div");
                const recipeTime                        = document.createElement("p");
                const iconTime                          = document.createElement("img");
                const recipeIngredients                 = document.createElement("ul");
                const Ingredients                       = recipe.ingredients;
                const recipeDescription                 = document.createElement("p");

                recipeSection.style.fontFamily          = "Lato";
                recipeSection.style.marginBottom        = "50px";

                recipeImg.style.width                   = "100%";
                recipeImg.style.height                  = "200px";
                recipeImg.style.background              = "#C7BEBE";

                recipeName.textContent                  = recipe.name;
                recipeName.style.fontSize               = "25px";
                recipeName.style.textAlign              = "center";
                recipeName.style.margin                 = "20px";

                duration.style.display                  = "flex";

                recipeTime.textContent                  = recipe.time + " minutes";
                recipeTime.style.fontSize               = "18px";

                iconTime.setAttribute("src", "https://maerac.github.io/LesPetitsPlats/assets/clock.svg");
                iconTime.style.width                    = "18px";
                iconTime.style.marginRight              = "5px";

                recipeIngredients.style.margin          = "20px 0";
                recipeIngredients.classList.add("recipe-ing");
                

                Ingredients.forEach((myObject) => {
                    const myIngredient                  = document.createElement("li");
                    myIngredient.style.fontSize         = "15px";
                    myIngredient.style.fontFamily       = "Lato, sans-serif";
                    myIngredient.style.listStyle        = "none";
                    
                    if (myObject.unit === undefined) {
                        myIngredient.innerHTML = '<p class="bold">' + myObject.ingredient + ' :' + '<span class="quantity">' + myObject.quantity + '</span>' + '</p>';
                    }
                    else {

                        myIngredient.innerHTML = '<p class="bold">' + myObject.ingredient + ' :' + '<span class="quantity">' + myObject.quantity  +  myObject.unit + '</span>' + '</p>';
                    };

                    if (myObject.quantity === undefined) {
                        myIngredient.innerHTML = '<p class="bold">' + myObject.ingredient + '</p>';
                    
                    };

                    recipeIngredients.appendChild(myIngredient);
                });  

                recipeDescription.textContent           = recipe.description;
                recipeDescription.style.fontSize        = "15px";
                recipeDescription.style.fontFamily      = "Roboto, sans-serif";   
                
                recipeSection.appendChild(recipeImg);
                recipeSection.appendChild(recipeName);
                recipeSection.appendChild(duration);
                duration.appendChild(iconTime);
                duration.appendChild(recipeTime);
                recipeSection.appendChild(recipeIngredients);
                recipeSection.appendChild(recipeDescription);
            }
        })
    }) 