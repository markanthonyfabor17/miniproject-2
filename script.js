// const searchBtn = document.getElementById('search-btn');
// const mealList = document.getElementById('meal');
// const mealDetailsContent = document.querySelector('.meal-details-content');
// const recipeCloseBtn = document.getElementById('recipe-close-btn');

// searchBtn.addEventListener('click', getMealList);


// function getMealList() {
//     let searchInputTxt = document.getElementById('search-input').value.trim();
//     fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
//         .then(response => response.json())
//         .then(data => {
//             let html = "";
//             if (data.meals) {
//                 data.meals.forEach(meal => {
//                     html += `
//                     <div class="meal-item" data-id = "${meal.idMeal}">
//                         <div class="meal-img">
//                             <img src="${meal.strMealThumb}" alt="recipe_food">
//                         </div>
//                         <div class="meal-name">
//                             <h3>${meal.strMeal}</h3>
//                             <a href="#" class="recipe-btn">Learn Recipe</a>
//                         </div>
//                     </div>

//                 `;
//                 })

//             }

//             mealList.innerHTML = html;
//         });
// }

// function getMealList() {
//     let searchInputTxt = document.getElementById('search-input').value.trim();
//     fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error(`Error fetching meals: ${response.status}`);
//             }
//         })
//         .then(data => {
//             let html = "";
//             if (data.meals) {
//                 data.meals.forEach(meal => {
//                     html += `
//                     <div class="meal-item" data-id = "${meal.idMeal}">
//                         <div class="meal-img">
//                             <img src="${meal.strMealThumb}" alt="recipe_food">
//                         </div>
//                         <div class="meal-name">
//                             <h3>${meal.strMeal}</h3>
//                             <a href="#" class="recipe-btn">Learn Recipe</a>
//                         </div>
//                     </div>

//                 `;
//                 })

//             } else {
//                 html = `<p>No meals found</p>`;
//             }

//             mealList.innerHTML = html;
//         })
//         .catch(error => {
//             console.error(error);
//         });
// }
// function addMealToCart(event) {
//     let mealId = event.target.dataset.id;
//     let mealName = event.target.parentElement.firstElementChild.textContent;
//     let mealImg = event.target.parentElement.firstElementChild.src;
//     let mealPrice = event.target.parentElement.nextElementSibling.textContent;
//     let meal = {
//         id: mealId,
//         name: mealName,
//         img: mealImg,
//         price: mealPrice
//     }
//     let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart'))
//     }




const formOpenBtn = document.querySelector("#form-open"),
    home = document.querySelector(".home"),
    formContainer = document.querySelector(".form_container"),
    formCloseBtn = document.querySelector(".form_close"),
    signupBtn = document.querySelector("#signup"),
    loginBtn = document.querySelector("#login"),
    pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if (getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("uil-eye-slash", "uil-eye");
        } else {
            getPwInput.type = "password";
            icon.classList.replace("uil-eye", "uil-eye-slash");
        }
    });
});

signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.remove("active");
});








const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Here's Recipe</a>
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}


// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>Step: ${meal.strInstructions}</p>
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}


