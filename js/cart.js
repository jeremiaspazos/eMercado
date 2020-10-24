var htmlContentToAppend = "";
var cartArray=[];
var USD = 40;
let pesos = 0
let pesos2 = 0  
var tipoEnvio = 1.15;



function totals  () {
    let subtotalFinal = document.getElementById("subtotalN").innerHTML

     var total = subtotalFinal * tipoEnvio
     var costoEnvio = total - subtotalFinal
     document.getElementById("costoEnvio").innerHTML =`Envio: `+costoEnvio.toFixed(2)+``
     document.getElementById("total").innerHTML =`Total: `+total.toFixed(2)+``
    
    
}

        
    

function cartDisplay (array){
    
    for(i = 0 ; i < array.length; i++){
      let  article = array[i]
      
     htmlContentToAppend += `
        <div class="list-group-item list-group-item-action" style="border-radius: 15px; margin-top: 5px;">
            <div class="row">
                <div class="col-3">
                    <img src="` + article.src + `" class="img-thumbnail" style="width:150px;">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ article.name + `</h4>
                        <p class="text-muted">` + article.unitCost + ` `+article.currency+` </p>
                    </div>
                <div class="col-3">
                <p>Cantidad <input type="number" min="0" id="count`+i+`" value="`+article.count+`" onkeyup="articleSubtotals(cartArray)" onchange="articleSubtotals(cartArray)"></p>
                <p id="subtotal`+i+`">Subtotal por articulo = </p>
                </div>
                </div>
            </div>
        </div>
        `

    }
    document.getElementById("container-cart").innerHTML = htmlContentToAppend
}

function articleSubtotals(array){
    for(i=0 ; i<array.length ; i++){
        let article = array[i];
        let count="count";
        let sub="subtotal";
        let subtotals= document.getElementById(sub+i);
        let inputs = document.getElementById(count+i).value;
        let suma = article.unitCost * inputs;
        document.getElementById(sub+i).innerHTML = `El subtotal por articulo es de `+suma+` `+article.currency+``
        
     
    }
    
}; 

function subtotalUyu(array){
    for(i=0; i<array.length ; i++) {
        let article = array[i];
        let sub="subtotal";
        let currency = array[i].currency
        
        let count="count";
        let inputs = document.getElementById(count+i).value;
        let suma = article.unitCost * inputs;
        if(currency != "UYU"){
            pesos = suma * USD
        } else {
            pesos2 = suma
        }
        suma = pesos + pesos2
        document.getElementById("subtotalCompra").innerHTML = `<p> El subtotal es de `+array[0].currency+` <p id="subtotalN" style="font-size:20px;">`+suma+`</p></p>`
        totals()
    }

    

};
function subtotalUSD(array){
    for(i=0; i<array.length ; i++) {
        let article = array[i];
        let sub="subtotal";
        let currency = array[i].currency
        
        let count="count";
        let inputs = document.getElementById(count+i).value;
        let suma = article.unitCost * inputs;
        if(currency == "UYU"){
            pesos = suma / USD;
        } else {
            pesos2 = suma;
        }
        suma = pesos + pesos2;
        document.getElementById("subtotalCompra").innerHTML = `<p> El subtotal es de `+array[1].currency+` <p id="subtotalN" style="font-size:20px;">`+suma+`</p></p>`;
        totals()
    }

    

};
function exchanger(array){
    let dolar = document.getElementById("dolar").checked
    let pesos = document.getElementById("pesos").checked
    let input0= document.getElementById("count0")
    let input1= document.getElementById("count1")
    
    if( dolar == true ){
        input0.setAttribute("onchange", "subtotalUSD(cartArray), articleSubtotals(cartArray)")
        input0.setAttribute("onkeyup", "subtotalUSD(cartArray), articleSubtotals(cartArray)")
        input1.setAttribute("onchange", "subtotalUSD(cartArray), articleSubtotals(cartArray)")
        input1.setAttribute("onkeyup", "subtotalUSD(cartArray), articleSubtotals(cartArray)")
    } else {
        input0.setAttribute("onchange", "subtotalUyu(cartArray), articleSubtotals(cartArray)")
        input0.setAttribute("onkeyup", "subtotalUyu(cartArray), articleSubtotals(cartArray)")
        input1.setAttribute("onchange", "subtotalUyu(cartArray), articleSubtotals(cartArray)")
        input1.setAttribute("onkeyup", "subtotalUyu(cartArray), articleSubtotals(cartArray)")
        
    }
}




document.addEventListener("DOMContentLoaded", function(e){
fetch(CART_INFO_URL).then(data => data.json())
.then((data) =>{
    cartArray = data.articles
    
    cartDisplay(cartArray);
    articleSubtotals(cartArray);
    exchanger(cartArray);
    subtotalUSD(cartArray)
   
    });
    document.getElementById("dolar").addEventListener("click", function(){
        exchanger(cartArray)
        subtotalUSD(cartArray)
    });
    document.getElementById("pesos").addEventListener("click", function(){
        exchanger(cartArray)
        subtotalUyu(cartArray)
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