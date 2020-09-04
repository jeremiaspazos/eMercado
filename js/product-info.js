function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
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


function showComments(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
    
    let comment = array[i]

    htmlContentToAppend += `<div id="coments" class="card text-left">
    <h3>`+ comment.user + `</h3>
    <p class ="font-italic">`+comment.description +`</p>
    <p>`+comment.score +`</p>
    <small>`+comment.dateTime +`</small>
    
  </div>`
    }
    document.getElementById("comment-container").innerHTML = htmlContentToAppend
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            infoArray = resultObj.data;
            
            let productName = document.getElementById("productName");
            let productDescription = document.getElementById("productDescription");
            let productCount = document.getElementById("productCount");
            
            productName.innerHTML = infoArray.name;
            productDescription.innerHTML = infoArray.description;
            productCount.innerHTML = infoArray.soldCount;

            showImagesGallery(infoArray.images);

        }
    });
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            commentsArray = resultObj.data;


        showComments(commentsArray);
        }
    })
})