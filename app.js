

// search result
const searchPhone= async ()=>{

const getName = document.getElementById('give-name')
const recieveName = getName.value
console.log(recieveName)
if(recieveName=="" ){
    Swal.fire(`Error!!!!
    please give your phone name to know the details`)
} 
else if(!isNaN(recieveName)){
    
    Swal.fire(`Error!!!!
    Enter a Name`)
}
else{
    const url = (`https://openapi.programming-hero.com/api/phones?search=${recieveName}`)

    const res= await fetch(url)
    const data = await res.json()
    if(data.data.length ==0){
        document.getElementById("spinner").style.display = "block";
        setTimeout(() =>{
            document.getElementById("spinner").style.display = "none";
            Swal.fire(`Sorry!!!!
            The phone you want to search is unavailable`)
          },3000)
    }else{
        // load data
        displayResult(data.data)
        //console.log(data)
        document.getElementById("create-button").textContent =""
       
    }
    
}
}

// display result

const displayResult =(phone)=>{
   
    
    document.getElementById("spinner").style.display = "block";
    setTimeout(() =>{ 
        document.getElementById("spinner").style.display = "none";

    const limited = phone.slice(0,20)
//    console.log(limited)
//    console.log(limited.length)
   const phoneQuantity= phone.length
   //console.log(phoneQuantity)
    const display = document.getElementById("search-result")
    display.textContent =""
    const showDetail = document.getElementById("detail")
showDetail.textContent=""

document.getElementById("load-more").textContent =""


//load more button

const load = document.getElementById("create-button")
const loadMore = document.createElement("div")
loadMore .innerHTML = `<button style="border:none;margin-left:20px;;background-color:blue;width:150px;height:30px;color:white;border-radius:5px"onClick="seeMore()">Load More..</button>`
load.appendChild(loadMore)


    limited.map(show=>{
//console.log(show)
//console.log(display)
const div = document.createElement("div")

const h3 = document.getElementById("quantity")
h3.innerText=` ${phoneQuantity} piece ${document.getElementById('give-name').value} Model available in our stock`

// const availableStock = document.getElementById("available")
// availableStock.innerText=`
// Availbale Stock`

div.classList.add("col")
div.innerHTML =`
<div class="card" style="width: 18rem;">

        <img src="${show.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Name: ${show.phone_name}</h5>
          <h5 class="card-title">Brand: ${show.brand}</h5>
       
          <button style="background-color:rgb(50, 50, 104);color:white;margin-left:60%;border:none;border-radius:10px;width:100px"onClick = "details('${show.slug}')">Details</button>
        </div>
      </div>
`


display.appendChild(div)

//loadMore.appendChild(button)

    })
},2000)
}
// details part




const details = async(id) =>{

    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    phoneDetails(data.data)
    console.log(data.data);

   }

   const phoneDetails =(result)=>{
    document.getElementById("spinner").style.display = "block";
    setTimeout(() =>{
        document.getElementById("spinner").style.display = "none";     
const showDetail = document.getElementById("detail")
showDetail.textContent=""
const div = document.createElement("div")
div.classList.add("col")
div.innerHTML = `

<div class="card mb-3" style="max-width:800px;margin-right:100px">
<div class="row g-0 ">

<div class="col-md-8">
<div class="card-body >
<h5 class="card-title fw-bold text-danger">Model: ${result.name}</h5>
<p class="card-text mb-1">Brand: ${result.brand}</p>
<p class="card-text mb-1">Release-Date: ${result.releaseDate? result.releaseDate:"Coming Soon..." }</p>
<p style="color:red"class=" fw-bold mb-1">Main Features</p>
<li> <span style="background-color:lightgray;padding-left:10px; padding-right:10px;">storage: ${result.mainFeatures.storage? result.mainFeatures.storage:'No data found'}</span></li>
<li><span style="background-color:lightgray;padding-left:10px; padding-right:10px;">Memory: ${result.mainFeatures.memory? result.mainFeatures.memory:'No data found'}</span></li>
<li><span style="background-color:lightgray;padding-left:10px; padding-right:10px;">chipSet: ${result.mainFeatures.chipSet? result.mainFeatures.chipSet:'No data found'}</span></li>
<li ><span style="background-color:lightgray;padding-left:10px; padding-right:10px;">Display: ${result.mainFeatures.displaySize? result.mainFeatures.displaySize:'No data found'}</span></li>
<p style="color:red"class=" fw-bold mb-1">Sensors</p>
<span style="background-color:lightgray;padding-left:10px; padding-right:10px;">${result.mainFeatures.sensors? result.mainFeatures.sensors:'No data found'}</span>
<p style="color:red"class=" fw-bold mb-1">Others</p>
${result.others? 
`<li> <span style="background-color:lightgray;padding-left:10px; padding-right:10px;">Bluetooth:${result.others.Bluetooth} </span></li>
<li><span style="background-color:lightgray;padding-left:10px; padding-right:10px;">Wlan:${result.others.WLAN} </span></li>
<li> <span style="background-color:lightgray;padding-left:10px; padding-right:10px;">GPS:  ${result.others.GPS}</span> </li>
<li> <span style="background-color:lightgray;padding-left:10px; padding-right:10px;">NFC:  ${result.others.NFC} </span></li>
<li> <span style="background-color:lightgray;padding-left:10px; padding-right:10px;">Radio:  ${result.others.Radio}</span></li>
<li> <span style="background-color:lightgray;padding-left:10px; padding-right:10px;">Usb:  ${result.others.USB}</span> </li>`
    
    :'This phone has no other features'}
</div>
</div>

<div class="col-md-4">
<img style="width:100%" src="${result.image}" class="img-fluid rounded-start" alt="..">
</div>
</div>

</div>

`
showDetail.appendChild(div)
   },3000)
}

//optional load part

const seeMore = () =>{
    const MoreName = document.getElementById('give-name')
const recieveMoreName = MoreName.value
MoreName.value=""
const url = (`https://openapi.programming-hero.com/api/phones?search=${recieveMoreName}`)
 fetch(url)
 .then(response => response.json())
    .then(data => extraLoad(data.data,"load"));
// const showNew = data
document.getElementById("create-button").textContent = ""
}

const extraLoad =(newLoad)=>{
    console.log(newLoad,"new")
    const newLimited = newLoad.slice(21,80)
    console.log(newLimited)
    const newDisplay = document.getElementById("load-more")
    newDisplay.textContent =""
    console.log(newDisplay,"dis")
  

newLimited.map(newShow=>{
//console.log(show)
//console.log(display)
const div = document.createElement("div")

div.classList.add("col")
div.innerHTML =`
<div class="card" style="width: 18rem;">

        <img src="${newShow.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Name: ${newShow.phone_name}</h5>
          <h5 class="card-title">Brand: ${newShow.brand}</h5>
       
          <button style="background-color:rgb(50, 50, 104);color:white;margin-left:60%;border:none;border-radius:10px;width:100px"onClick = "details('${newShow.slug}')">Details</button>
        </div>
      </div>
`


newDisplay.appendChild(div)

//loadMore.appendChild(button)

    })

}
