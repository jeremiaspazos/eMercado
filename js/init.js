const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
//Funcion para ser enviado al login la primera vez que se ingresa al Home

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
//Funcion para ser enviado al login la primera vez que se ingresa al Home


//funcion para incrustar nombre de usuario en NavBar
  var usuario = JSON.parse(localStorage.getItem("usuario"))
  var div1 = document.createElement("div");
  div1.setAttribute("class","dropdown");
  var htmlcontent= `
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              `+usuario+`
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
              <a class="dropdown-item" href="cart.html">Carrito de compras</a>
              <a class="dropdown-item" href="login.html" onclick="borrarDatos()" >Cerrar sesión</a>

            </div>
  `
  div1.innerHTML= htmlcontent;
  document.querySelectorAll('nav.site-header div')[0].appendChild(div1);


function borrarDatos(){
  sessionStorage.removeItem('logueado', 'true');
  localStorage.clear()
  
};


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
  if (!sessionStorage.getItem('logueado') &&
  !window.location.href.endsWith('login.html')){
  window.location.href = 'login.html';
};
  

});
