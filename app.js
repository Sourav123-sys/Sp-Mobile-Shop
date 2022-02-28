
// search result
const searchPhone= async ()=>{

const getName = document.getElementById('give-name')
const recieveName = getName.value
console.log(recieveName)
if(recieveName=="" ){
    Swal.fire(`Error!!!!
    please give your phone name to know the details`)
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
        getName.value=""
    }
}



}


// display result

const displayResult =(phone)=>{
    document.getElementById("spinner").style.display = "block";
    setTimeout(() =>{ 
        document.getElementById("spinner").style.display = "none";
    const limited = phone.slice(0,20)
    //console.log(limited)
    const display = document.getElementById("search-result")
    display.textContent =""
    const showDetail = document.getElementById("detail")
showDetail.textContent=""
    limited.map(show=>{
//console.log(show)


//console.log(display)
const div = document.createElement("div")
div.classList.add("col")
div.innerHTML =`
<div class="card" style="width: 18rem;">
        <img src="${show.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Name: ${show.phone_name}</h5>
          <h5 class="card-title">Brand: ${show.brand}</h5>
          <button onClick = "details('${show.slug}')">Details</button>
        </div>
      </div>

`
display.appendChild(div)

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
<div class="card mb-3" style="max-width:840px">
<div class="row g-0">

<div class="col-md-4">
<img style=width:"100%" src="${result.image}" class="img-fluid rounded-start" alt="..">
</div>

<div class="col-md-8">
<div class="card-body >
<h5 class="card-title fw-bold text-danger">Model: ${result.name}</h5>
<p class="card-text mb-1">Brand: ${result.brand}</p>
<p class="card-text mb-1">Release-Date: ${result.releaseDate? result.releaseDate:"No release date found" }</p>
<p style="color:red"class=" fw-bold mb-1">Main Features</p>
<li>storage: ${result.mainFeatures.storage? result.mainFeatures.storage:'No data found'}</li>
<li>Memory: ${result.mainFeatures.memory? result.mainFeatures.memory:'No data found'}</li>
<li>chipSet: ${result.mainFeatures.chipSet? result.mainFeatures.chipSet:'No data found'}</li>
<li>Display: ${result.mainFeatures.displaySize? result.mainFeatures.displaySize:'No data found'}</li>
<p style="color:red"class=" fw-bold mb-1">Sensors</p>
${result.mainFeatures.sensors? result.mainFeatures.sensors:'No data found'}
<p style="color:red"class=" fw-bold mb-1">Others</p>
${result.others? 
`<li>Bluetooth:${result.others.Bluetooth} </li>
<li>Wlan:${result.others.WLAN} </li>
<li>GPS:${result.others.GPS} </li>
<li>NFC:${result.others.NFC} </li>
<li>Radio:${result.others.Radio} </li>
<li>Bluetooth:${result.others.USB} </li>`
    
    :'No data found'}

</div>

</div>

</div>

</div>

`
showDetail.appendChild(div)
   },3000)
}