function showImagesGallery(array) {

	let htmlContentToAppend = "";
	let indicator = "";
	let imagenes = "";
	let imgToAppend = "";

	htmlContentToAppend += `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
		<ol id="indicadores" class="carousel-indicators">
		
		</ol>
		<div id="contenedorImagen" class="carousel-inner">
		
		</div>
		<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
		  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
		  <span class="sr-only">Previous</span>
		</a>
		<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
		  <span class="carousel-control-next-icon" aria-hidden="true"></span>
		  <span class="sr-only">Next</span>
		</a>
	  </div>`
	document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;

	for (i = 0; i < array.length; i++) {
		if (i == 0) {
			indicator =
				`<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>`
		} else {
			indicator += `<li data-target="#carouselExampleIndicators" data-slide-to="` + i + `"></li>`
		};
	};
	for (i = 0; i < array.length; i++) {
		imagenes = array[i];
		console.log(imagenes)
		if (i == 0) {
			imgToAppend = `
			<div class="carousel-item active">
      <img src="`+ imagenes + `" class="d-block img-fluid" alt="...">
    </div> `
		} else {
			imgToAppend +=
				`<div class="carousel-item">
			<img src="`+ imagenes + `" class="d-block img-fluid" alt="...">
		  </div> `
		};
	};
	document.getElementById("indicadores").innerHTML = indicator;
	document.getElementById("contenedorImagen").innerHTML = imgToAppend

};


function showComments(array) {
	let containerPre = document.getElementById("comment-container");

	let htmlContentToAppend = "";

	for (let i = 0; i < array.length; i++) {

		let comment = array[i]


		htmlContentToAppend += `
		Valoracion:`
		for (let x = 0; x < 5; x++) {
			if (x >= comment.score) {
				htmlContentToAppend += `<p class="fa fa-star">`
			}
			else {
				htmlContentToAppend += `<p class="fa fa-star checked">`
			}
		};
		htmlContentToAppend +=
			`			<div class="review">
		<div class="d-flex flex-row comment-user">
							<div class="">
								<div class="d-flex flex-row align-items-center"><span class="name font-weight-bold">`+ comment.user + `</span><span class="dot"></span><span class="date">` + comment.dateTime + `</span></div>
								
							</div>
						</div>
						<div class="mb-4">
							<p class="comment-text">`+ comment.description + `</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
		`



		/* `
		
	<div class="list-group-item list-group-item-action ">
		<div>
				<h4 class="mb-1">`+ comment.user + `</h4>
				<small class="text-muted">` + comment.dateTime + ` </small>
			</div>
			<div>`+ comment.description +`</div>
</div>
`
*/

	}
	containerPre.innerHTML += htmlContentToAppend;
};



function agregarComentario(event) {
	event.preventDefault();
	let valoracion = document.getElementById("valoracion").value;
	let comentario = document.getElementById("comentario").value;
	let container = document.getElementById("comment-usuario");
	let nombreUsuario = JSON.parse(localStorage.getItem('usuario'));
	let today = new Date();
	let fechaActual = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	let horaActual = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	htmlContentToAppend = `
	<div class="container text-left border">
		<div class="">
		  <span>Valoración:</span>
		  <span class="fa fa-star"></span>
		  <span class="fa fa-star"></span>
		  <span class="fa fa-star"></span>
		  <span class="fa fa-star"></span>
		  <span class="fa fa-star"></span>   
		</div>
		<div class="list-group-item list-group-item-action ">
		<div>
				<h4 class="mb-1">`+ nombreUsuario + `</h4>
				<small class="text-muted">` + fechaActual + ` ` + horaActual + ` </small>
			</div>
			<div>`+ comentario + `</div>
</div>
	<br>
	`
	var elementoComentario = document.createElement('div');
	elementoComentario.innerHTML += htmlContentToAppend;

	var estrellas = elementoComentario.getElementsByClassName('fa-star');

	for (var i = 0; i < valoracion; i++) {
		estrellas[i].classList.add('checked');
	};

	container.appendChild(elementoComentario);
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

	getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
		if (resultObj.status === "ok") {
			infoArray = resultObj.data;

			let productName = document.getElementById("productName");
			let productDescription = document.getElementById("productDescription");
			let productCount = document.getElementById("productCount");

			let parameters = new URLSearchParams(location.search);
			let name = parameters.get('producto');


			productName.innerHTML = name;
			productDescription.innerHTML = infoArray.description;
			productCount.innerHTML = infoArray.soldCount;

			showImagesGallery(infoArray.images);

		}
		getJSONData(PRODUCTS_URL).then(function (resultObj) {
			if (resultObj.status === "ok") {
				product = resultObj.data;
				let htmlContentToAppend = "";
				for (i = 0; i < infoArray.relatedProducts.length; i++) {
					let productos = product[infoArray.relatedProducts[i]];


					htmlContentToAppend +=
						`
						<div class="col-12 col-sm-4 offset-1">
						<a href="product-info.html?producto=` + productos.name + `">
				<div class="card-sm" style="width: 18rem;">
				<img class="card-img-top" src="` + productos.imgSrc + `" alt="Card image cap">
				<div class="card-body">
				  <h5 class="card-title">`+ productos.name + `</h5>
				  <p class="card-text">`+ productos.description + `</p>
				</div>
			  </div>
			  </a>
			  </div>`

				};
				document.getElementById("relatedpro").innerHTML = htmlContentToAppend;
			}

		})
		getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
			if (resultObj.status === "ok") {
				commentsArray = resultObj.data;


				showComments(commentsArray);
			}
		})
	});
});