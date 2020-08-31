var infoArray = []

function showInfo(infoArray){
    let htmlContentToAppend = "";
    let info = infoArray

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class= "col-3">
                    <img src="` + info.images[1] + `"class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        
                        <h4 class="mb-1">`+ info.name +`</h4>
                        <small class="text-muted">` + info.cost + `USD </small>
                    </div>
                    <div>` + info.description + `</div>
                    <br>
                    <br>
                    <br>
                    <div>Se han vendido ` + info.soldCount + ` hasta el momento </div>

                </div>
            </div>
        </div>
        `

        document.getElementById("containerInfo").innerHTML = htmlContentToAppend;
    }



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            infoArray = resultObj.data;
            //Muestro la lista de productos
            showInfo(infoArray);
        }
    });
});