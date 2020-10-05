//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let nombre = document.getElementById("nombre");
let precio = document.getElementById("precio");
let moneda = document.getElementById("moneda");
let unidades = document.getElementById("unidades");
let envio = document.getElementById("envio");
let img = document.getElementById("img");
let subtotal = document.getElementById("subtotal");
let total = document.getElementById("total");
let tipoEnvio = 1.15;


function totals  () {
    let nSubTotal = precio.innerHTML * unidades.value;
    subtotal.innerHTML = nSubTotal;
    let nTotal = nSubTotal * tipoEnvio;
    
    total.innerHTML = nTotal.toFixed(2);
}


document.addEventListener("DOMContentLoaded", function(e){
fetch(CART_INFO_URL).then(data => data.json())
.then((data) =>{
    
    nombre.innerHTML = data.articles[0].name;
    precio.innerHTML =  data.articles[0].unitCost;
    moneda.innerHTML = data.articles[0].currency;
    img.setAttribute("src", data.articles[0].src);
   
   

   
    });
    document.getElementById("premiumradio").addEventListener("change", function(){
        tipoEnvio = 1.15;
        totals();
    });
    
    document.getElementById("expressradio").addEventListener("change", function(){
        tipoEnvio = 1.07;
        totals();
    });

    document.getElementById("standardradio").addEventListener("change", function(){
        tipoEnvio = 1.05;
        totals();
    });
});