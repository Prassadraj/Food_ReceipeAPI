let div = document.createElement("div");


document.body.appendChild(div);

let form = document.createElement("form");
form.innerHTML = `
  <div class="container">
    <h2 id="h">Search Your Fav Food Receipe</h2>
    <input type="text" id="input">
    <button id="btn" onclick="button()" >Search</button>
    <div class="itemBox">
  </div>
  
`
div.appendChild(form);
let topEle=document.createElement('div')
topEle.innerHTML=`<div><button class="totop" onclick="ToTop()">To top</button></div>`
div.appendChild(topEle)

function ToTop(){
    document.body.scrollTop=0
    document.documentElement.scrollTop=0
}

function button(){
    event.preventDefault()
    let val=document.getElementById("input").value
    let itemBox=document.querySelector('.itemBox')
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);

        if(data.meals){
            itemBox.innerHTML=""
        data.meals.forEach(element => {
            let mealDiv=document.createElement('div')
            mealDiv.className="mealDiv"
            mealDiv.classList.add('element')
            mealDiv.innerHTML=`
            <h2 class="mealHeading">${element.strMeal}</h2>
            <img class="mealImg" width="300px" src="${element.strMealThumb}" />
            <p class="mealNotes" class="strInstructions">${element.strInstructions}</p>`
            itemBox.appendChild(mealDiv)
        })}
        else{
            itemBox.innerHTML=`<h1 class="receipe">Receipe Not Found</h1>`
            
        }
        

        document.getElementById("input").value=" "
        
    })
    
}
ScrollReveal({
    reset:true,
    distance:'70px',
    duration:2500,
    delay:400,debug:true

})
ScrollReveal().reveal('.mealDiv', { delay: 10, origin: 'left' });
ScrollReveal().reveal('.mealDiv > .mealImg', { delay: 300, origin: 'right' });
ScrollReveal().reveal('.mealDiv > .mealNotes', { delay: 300, origin: 'bottom' });

