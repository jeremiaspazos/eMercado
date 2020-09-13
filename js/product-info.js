function showImagesGallery(array) {

	let htmlContentToAppend = "";

	for (let i = 0; i < array.length; i++) {
		let imageSrc = array[i];

		htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

		document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
	}
}


function showComments(array) {
	let containerPre = document.getElementById("comment-container");

	let htmlContentToAppend = "";

	for (let i = 0; i < array.length; i++) {

		let comment = array[i]


		htmlContentToAppend += `
	<div class="card text-left">
		<div class="">
		  <span>Valoración: `+ comment.score + `</span>
		</div>
		<div class="valoracion text-justify">
		  <p class="descripcion_valoracion">`+ comment.description + `</p>
		  <p class="usuario-valoracion">Usuario: `+ comment.user + `</p>
		  <small>Fecha de publicación: `+ comment.dateTime + `</small>
		</div>
	</div>
    `
	}
	containerPre.innerHTML += htmlContentToAppend;
}



function agregarComentario(event) {
	event.preventDefault();
	let valoracion = document.getElementById("valoracion").value;
	let comentario = document.getElementById("comentario").value;
	let container = document.getElementById("comment-usuario");
	let nombreUsuario = JSON.parse(localStorage.getItem('usuario'));
	console.log(nombreUsuario)
	let today = new Date();
	let fechaActual = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	let horaActual = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	htmlContentToAppend = `
	<div class="card text-left">
		<div class="">
		  <span>Valoración: `+ valoracion + `</span>
		  <span class="fa fa-star"></span>
		  <span class="fa fa-star"></span>
		  <span class="fa fa-star"></span>
		  <span class="fa fa-star"></span>
		  <span class="fa fa-star"></span>   
		</div>
		<div class="valoracion text-justify">
		  <p class="descripcion_valoracion">`+ comentario + `</p>
		  <p class="usuario-valoracion">Usuario: `+ nombreUsuario + `</p>
		  <small>Fecha de publicación: `+ fechaActual + ` ` + horaActual + `</small>
		</div>
	</div>
	`
	var elementoComentario = document.createElement('div');
	elementoComentario.innerHTML += htmlContentToAppend;

	var estrellas = elementoComentario.getElementsByClassName('fa-star');
	console.log(estrellas);

	for (var i = 0; i < valoracion; i++) {
		estrellas[i].classList.add('checked');
	}

	container.appendChild(elementoComentario);
}

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
			let nombre = window.location.search;
			let nombreCorto = nombre.split("%20");
			let name1 = nombreCorto[0].split("?");
			let name2 = nombreCorto[1];



			productName.innerHTML = name1[1] + " " + name2;
			productDescription.innerHTML = infoArray.description;
			productCount.innerHTML = infoArray.soldCount;

			showImagesGallery(infoArray.images);

		}
	});
});

document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
		if (resultObj.status === "ok") {
			commentsArray = resultObj.data;


			showComments(commentsArray);
		}
	})
})