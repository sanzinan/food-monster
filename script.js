
const search = document.getElementById('search');
search.addEventListener('click', function () {
    const foodName = document.getElementById('foodInput').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ foodName }`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('foods').innerHTML = "";
            document.getElementById('foodsData').innerHTML = ' ';
            const foods = document.getElementById('foods');
            data.meals.forEach(element => {
                const food = document.createElement('div')
                food.innerHTML = `
            <img src="${ element.strMealThumb }" onClick="handleFoodClick(${ element.idMeal })">
            <h1 onClick="handleFoodClick(${ element.idMeal })" >${ element.strMeal }</h1>
            `;
                food.className = "card";
                foods.appendChild(food);
            });
            
        })
        .catch(error => {
            console.log(error);
            document.getElementById('foods').innerHTML = "";
            document.getElementById('foodsData').innerHTML = ' ';
            const foods = document.getElementById('foods');
            const notFound = document.createElement('h1')
            notFound.innerHTML = `Sorry!!! This item is not found...Try again!`;
            foods.appendChild(notFound);
        })
})

let handleFoodClick = foodId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ foodId }`)
        .then(res => res.json())
        .then(data => {
            let foodData = document.getElementById('foodsData');
            document.getElementById('foodsData').innerHTML = ' ';
            document.getElementById('foodsData').style.display = 'block';
            let foodDetails = document.createElement('div')
            foodDetails.innerHTML = `
            <img src="${ data.meals[0].strMealThumb }">
            <h1>${ data.meals[0].strMeal }</h1>
            <br>
            <h1>Category: ${ data.meals[0].strCategory }</h1>
            <br>
            <h3>1. ${ data.meals[0].strMeasure1 }</h3>
            <h3>2. ${ data.meals[0].strMeasure2 }</h3>
            <h3>3. ${ data.meals[0].strMeasure3 }</h3>
            <h3>4. ${ data.meals[0].strMeasure4 }</h3>
            <h3>5. ${ data.meals[0].strMeasure5 }</h3>
            <h3>6. ${ data.meals[0].strMeasure6 }</h3>

            
            `;
            foodDetails.className = "food-details";
            foodData.appendChild(foodDetails);
        })
}
