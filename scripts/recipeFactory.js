function recipeFactory(data) {
    const { name, description, time, ingredients } = data;

    function getRecipeCard() {
        const recipeSection                     = document.querySelector(".recipes"); 
        const recipeContainer                   = document.createElement("article");
        const recipeImg                         = document.createElement("div");
        const headerContainer                   = document.createElement("div");
        const recipeName                        = document.createElement("h2");
        const duration                          = document.createElement("div");
        const recipeTime                        = document.createElement("p");
        const iconTime                          = document.createElement("img");
        const recipeBloc                        = document.createElement("div");
        const recipeDesc                        = document.createElement("div");
        const recipeDescription                 = document.createElement("p");
        
        recipeSection.style.display             = "flex";
        recipeSection.style.justifyContent      = "space-between";
        recipeSection.style.flexWrap            = "wrap";
        recipeSection.style.marginTop           = "50px";

        recipeContainer.classList.add("container");
        recipeContainer.style.width             = "30%";
        recipeContainer.style.borderRadius      = "5px";
        recipeContainer.style.background        = "#E7E7E7";
        recipeContainer.style.marginBottom      = "50px";
        recipeContainer.classList.add("recipe-container");

        recipeImg.style.width                   = "100%";
        recipeImg.style.height                  = "180px";
        recipeImg.style.background              = "#C7BEBE";
        recipeImg.style.borderTopLeftRadius     = "5px";
        recipeImg.style.borderTopRightRadius     = "5px";
        recipeImg.classList.add("recipe-img");

        recipeBloc.style.width                  = "100%";
        recipeBloc.style.height                 = "190px";
        recipeBloc.style.padding                = "20px";
        recipeBloc.classList.add("recipeBloc");

        recipeDesc.classList.add("recipeDesc");
        recipeDesc.style.display                = "flex";
        recipeDesc.style.height                 = "110px";
 
        headerContainer.style.display           = "flex";
        headerContainer.style.justifyContent    = "space-between";
        headerContainer.style.marginBottom      = "15px";
        headerContainer.style.fontFamily        = "Lato, sans-serif";
        headerContainer.classList.add("headerContainer");

        recipeName.textContent                  = name;
        recipeName.style.fontWeight             = "none";
        recipeName.style.fontSize               = "18px";

        duration.style.display                  = "flex";

        recipeTime.textContent                  = time + " min";
        recipeTime.style.fontSize               = "18px";

        iconTime.setAttribute("src", "../assets/clock.svg");
        iconTime.style.width                    = "18px";
        iconTime.style.marginRight              = "5px";

        recipeDescription.textContent           = description;
        recipeDescription.style.height          = "100%";
        recipeDescription.style.fontSize        = "12px";
        recipeDescription.style.fontFamily      = "Roboto, sans-serif";
        recipeDescription.style.width           = "50%";
        recipeDescription.style.marginLeft      = "5%";
        recipeDescription.style.overflow        = "hidden";
        recipeDescription.style.textOverflow    = "ellipsis";    
        
        
        const recipeIngredients = document.createElement("ul");
        const Ingredients                       = ingredients;

        Ingredients.forEach((myObject) => {
            const myIngredient                  = document.createElement("li");
            myIngredient.style.fontSize         = "12px";
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

            recipeDesc.appendChild(recipeIngredients);
            recipeIngredients.appendChild(myIngredient);
        });   
        
        recipeSection.appendChild(recipeContainer);
        recipeContainer.appendChild(recipeImg);
        recipeContainer.appendChild(recipeBloc);
        recipeBloc.appendChild(headerContainer);
        headerContainer.appendChild(recipeName);
        headerContainer.appendChild(duration);
        duration.appendChild(iconTime);
        duration.appendChild(recipeTime);
        recipeBloc.appendChild(recipeDesc);
        recipeDesc.appendChild(recipeDescription);
    };

    return { name, description, time, ingredients, getRecipeCard}
}