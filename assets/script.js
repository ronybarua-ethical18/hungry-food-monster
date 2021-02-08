// get searched item from api 
const displayMeal = () => {
    const search = document.getElementById('search');
    const searchValue = search.value;
    const singleMeal = document.getElementById('meal-list');
    singleMeal.innerHTML = ''; //auto refresh single meal content while error message gone
    showErrorMessage(''); //auto refresh error message
    if (searchValue === '') {
        showErrorMessage('Please enter a dish name!');
    }
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then(response => response.json())
            .then(data => {
                if (data.meals !== null) {
                    data.meals.forEach(meal => {
                        const mealDiv = document.createElement('div');
                        const mealInfo = `<img src ="${meal.strMealThumb}">
                        <h3 id="${meal.idMeal}">${meal.strMeal}</h3>`;
                        mealDiv.innerHTML = mealInfo;
                        mealDiv.className = 'meal-width'
                        singleMeal.appendChild(mealDiv);

                        // adding event hadler for showing meal details 
                        mealDiv.addEventListener('click', function () {
                            getItemById(`${meal.idMeal}`);
                            toggle();
                        });
                    })
                }
                else {
                    showErrorMessage('Searched Item is not found, try new dish!');
                }
            })
    }
    search.value = '';
}

// get meal item by meal ID 
const getItemById = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            console.log(meal);
            renderSingleMeal(meal);
        });
}

// getting meal details including ingredients for individual meal 
const renderSingleMeal = (meal) => {
    const mealDetails = document.getElementById('meal-details');

    //fetching ingredients for individual meal
    const Ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            Ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }
        else {
            break;
        }
    }
    mealDetails.innerHTML = `
        <img src ="${meal.strMealThumb}">   
        <h2>${meal.strMeal}</h2>
        <p>${meal.strInstructions}</p>
        <h3>Ingredients</h3>
        <ul class="ingredient">${Ingredients.map(ingredient => `<li><i class="fas fa-check-square"></i>${ingredient}</li>`).join('')}</ul> 
        <button onClick="toggle()">Close</button>`;
}

// popup box for single meal details 
const toggleIndividualId = (id) => {
    return document.getElementById(id).classList.toggle('active');
}

// calling for the toggle value for individual id
const toggle = () => {
    toggleIndividualId('blur');
    toggleIndividualId('meal-details');
}

// handling error message 
const showErrorMessage = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = error;
}