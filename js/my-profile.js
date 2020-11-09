let nombre =  document.getElementById("nombre")
let edad =  document.getElementById("edad")
let tel =  document.getElementById("tel")
let email =  document.getElementById("email")

function modificarDatos() {
   nombre.disabled = false;
   edad.disabled = false;
   tel.disabled = false;
   email.disabled = false;
} 
function guardarDatos() {
    nombre.disabled = true;
   edad.disabled = true;
   tel.disabled = true;
   email.disabled = true;
   nombreString = JSON.stringify(nombre.value)
   edadString = JSON.stringify(edad.value)
   telString = JSON.stringify(tel.value)
   emailString = JSON.stringify(email.value)
   localStorage.setItem("nombre", nombreString)
   localStorage.setItem("edad", edadString)
   localStorage.setItem("tel", telString)
   localStorage.setItem("email", emailString)
}


document.addEventListener("DOMContentLoaded", function (e) {
      if(localStorage.getItem("edad") != null){
         nombre.value = JSON.parse(localStorage.getItem("nombre"))
         edad.value = JSON.parse(localStorage.getItem("edad"))
         email.value = JSON.parse(localStorage.getItem("email"))
         tel.value = JSON.parse(localStorage.getItem("tel"))
      }
});