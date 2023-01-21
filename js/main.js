let btn = document.querySelector("button")
let num = document.querySelector("#num").value
let car = document.querySelector("#car").value
// event listner
btn.addEventListener("click", getLink) 

// function
function getLink() {
    car = document.querySelector("#car").value
    num = document.querySelector("#num").value.split(" ").join("").split("-").join("")

    window.open(`https://api.whatsapp.com/send/?phone=%2B${car}${num}&text&type=phone_number&app_absent=0`)
}

// fetch caracteristica de numeros
fetch ("../js/phone.json")
 .then(res => res.json())
 .then(data => {
     console.log(data)
 })
 .catch(err => `Error ${err}`)

