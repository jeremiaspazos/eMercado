//Funcion para introducir el JSON a nuestro HTML
var productsArray = []

function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let products = array[i];


        htmlContentToAppend += `
            <div class="col-12 col-sm-8 col-md-4 card">
            <div class="card">
            <a href="product-info.html?producto=` + products.name + `">
            <img src="` + products.imgSrc + `" class="card-img-top"/>
            <div class="card-body">
            <h5 class="card-title">` + products.name + `</h5>
            <div class="d-flex w-100 justify-content-between">
                  <small class="text-muted">` + products.cost + `USD </small>
            </div>
              <div>` + products.description + `</div>
              <br>
            
            <div>Se han vendido ` + products.soldCount + ` hasta el momento </div>
           </div>
           </a>
           </div>
           </div>
                
    
        `


    };
    document.getElementById("container-products").innerHTML = htmlContentToAppend;
};
//Funciones para botones de orden y filtro

function ordenPrecioAscendente(array) {
    array.sort(function (a, b) {
        if (a.cost > b.cost) { return -1; }
        if (a.cost < b.cost) { return 1; }
        return 0;
    })
    showProductsList(array);
};

function ordenPrecioDescendente(array) {
    array.sort(function (a, b) {
        if (a.cost < b.cost) { return -1; }
        if (a.cost > b.cost) { return 1; }
        return 0;
    })
    showProductsList(array);
};

function ordenRelevancia(array) {
    array.sort(function (a, b) {
        if (a.soldCount > b.soldCount) { return -1; }
        if (a.soldCount < b.soldCount) { return 1; }
        return 0;
    })
    showProductsList(array);
};

function filtroPrecio(array) {
    let arrayAux = [];
    let min = document.getElementById("priceMin").value
    let max = document.getElementById("priceMax").value
    for (i = 0; i < array.length; i++) {
        if ((!min || array[i].cost >= min) && (!max || array[i].cost <= max)) {
            arrayAux.push(array[i]);
        }
        showProductsList(arrayAux)
    }
};
function limpiarFiltro(array) {
    let min = document.getElementById("priceMin").value
    let max = document.getElementById("priceMax").value
    max = ""
    min = ""
    showProductsList(array)
};

//Tengo que continuar trabajando en esta Funcionalidad.

function filtroPorTecleo(array) {
    let arrayAux = []
    let buscador = document.getElementById("browser").value.toUpperCase()
    for (i = 0; i < array.length; i++) {
        if (array[i].name.toUpperCase().includes(buscador))
            arrayAux.push(array[i])
    }
    showProductsList(arrayAux)
};



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            //Muestro la lista de productos
            showProductsList(productsArray);
        }
    });
});


//AddeventListener de los botones para ordenar. Actucan al Click con el boton en el html
document.getElementById("sortAsc").addEventListener("click", function () {
    ordenPrecioAscendente(productsArray);
});
document.getElementById("sortDesc").addEventListener("click", function () {
    ordenPrecioDescendente(productsArray);
});
document.getElementById("sortRel").addEventListener("click", function () {
    ordenRelevancia(productsArray);
});
document.getElementById("filter").addEventListener("click", function () {
    filtroPrecio(productsArray);
});
document.getElementById("cleanFilter").addEventListener("click", function () {
    limpiarFiltro(productsArray);
});

document.getElementById("browser").addEventListener("keyup", function () {
    filtroPorTecleo(productsArray)
});