
const displayMeal = () => {
    const search = document.getElementById('search');
    const searchValue = search.value;
    if (searchValue === '') {
        alert('Please enter dish name');
    }
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then(response => response.json())  
            .then(data => {
                console.log(data);
                const singleMeal = document.getElementById('meal-list');
                data.meals.forEach(meal => {
                    const mealDiv = document.createElement('div');
                    const mealInfo = `
                        <img src ="${meal.strMealThumb}">
                        <h3 id="${meal.idMeal}">${meal.strMeal}</h3> `;
                    mealDiv.innerHTML = mealInfo;
                    mealDiv.className = 'meal-width'
                    singleMeal.appendChild(mealDiv);

                    // adding event hadler for showing meal details 
                    mealDiv.addEventListener('click', function () {
                        getItemById(`${meal.idMeal}`);
                        toggle();
                    });
                })
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
            Ingredients.push(`${meal[`strIngredient${i}`]}`);
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
const toggle = () => {
    // calling for the toggle value for individual id
    toggleIndividualId('blur');
    toggleIndividualId('meal-details');
}
const reloadPage = () =>{
    document.location.reload();
}