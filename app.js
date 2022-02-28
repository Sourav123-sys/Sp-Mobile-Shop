
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
}


// display result

const displayResult =(phone)=>{
    const limited = phone.slice(0,20)
    //console.log(limited)

    limited.map(show=>console.log(show))
}