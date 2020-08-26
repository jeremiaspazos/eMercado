//Funcion para introducir el JSON a nuestro HTML
var productsArray = []

function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let products= array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.imgSrc + `" alt="` + products.desc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        
                        <h4 class="mb-1">`+ products.name +`</h4>
                        <small class="text-muted">` + products.cost + `USD </small>
                    </div>
                    <div>` + products.description + `</div>

                </div>
            </div>
        </div>
        `

        document.getElementById("container-products").innerHTML = htmlContentToAppend;//nombre de ID debe corregirse.
    }
}

function ordenPrecioAscendente (array){
let products = []
products = array.sort(function(a, b){
    if ( a.cost > b.cost ){ return -1; }
    if ( a.cost < b.cost ){ return 1; }
    return 0;
})
showProductsList(array)
}

function ordenPrecioDescendente (array){
    let products = []
    products = array.sort(function(a, b){
        if ( a.cost < b.cost ){ return -1; }
        if ( a.cost > b.cost ){ return 1; }
        return 0;
    })
    showProductsList(array)    
}

function ordenRelevancia (array){
    let products = []
    products = array.sort(function(a,b){
        if(a.soldCount < b.soldCount) {return -1;}
        if(a.soldCount > b.soldCount) {return 1;}
        return 0;
    })
    showProductsList(array)
}
    

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductsList(productsArray);
        }
    });
});
document.getElementById("sortAsc").addEventListener("click", function(){
    ordenPrecioAscendente(productsArray);
});
document.getElementById("sortDesc").addEventListener("click", function(){
    ordenPrecioDescendente(productsArray);
});
document.getElementById("sortRel").addEventListener("click", function(){
    ordenRelevancia(productsArray);
});