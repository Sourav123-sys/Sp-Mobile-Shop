
// search result
const searchPhone= async ()=>{

const getName = document.getElementById('give-name')
const recieveName = getName.value
console.log(recieveName)

// load data
const url = (`https://openapi.programming-hero.com/api/phones?search=${recieveName}`)

const res= await fetch(url)
const data = await res.json()
displayResult(data.data)
getName.value=""
}


// display result

const displayResult =(phone)=>{
    const limited = phone.slice(0,20)
    //console.log(limited)
    const display = document.getElementById("search-result")
    display.textContent =""
    limited.map(show=>{
console.log(show)


//console.log(display)
const div = document.createElement("div")
div.innerHTML =`
<div class="card" style="width: 18rem;">
        <img src="${show.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Name: ${show.phone_name}</h5>
          <h5 class="card-title">Brand: ${show.brand}</h5>
         
        <button onClick="phoneDetails(${show.slug})">Explore</button>
        </div>
      </div>

`
display.appendChild(div)

    })
}