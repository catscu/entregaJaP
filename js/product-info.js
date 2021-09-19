let comments = [];

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

        document.getElementById("productInfoImages").innerHTML = htmlContentToAppend;
    }
}

function mostrarComentarios(array){

    let htmlContentToAppend = "";
    htmlContentToAppend += `<div class="list-group">`;

    for(let i = 0; i < array.length; i++){
        let comentarios = array[i];
 
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1"><strong>`+ comentarios.user +`</strong>  <small>`+ calificar(comentarios.score) +`</small></h4>
                <small>` + comentarios.dateTime + `</small>
            </div>
            <p class="mb-1">`+ comentarios.description +`</p>
        </div>`
    }
    htmlContentToAppend += `</div>`;
    document.getElementById("listaComentarios").innerHTML = htmlContentToAppend;
}

function calificar(num){
    let puntuacion = "";

    for(let i=1; i<=5; i++){
        if(i<=num){
            puntuacion += `<i class="fas fa-smile-beam"></i>`;
        }else{
            puntuacion += `<i class="far fa-meh-blank"></i>`;
        }
    }
    return puntuacion;
}

function comentar(){
    let nuevoCom = {};
    let scoreCom = parseInt(document.getElementById('valor').innerHTML);
    let textoCom = document.getElementById('newCom').value;
    let usuario = document.getElementById('usuario').innerHTML;
    let fecha = new Date();

    nuevoCom.score = scoreCom;
    nuevoCom.description = textoCom;
    nuevoCom.user = usuario;
    nuevoCom.dateTime = fecha.getFullYear() + "-" + (fecha.getMonth()+1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();

    comments.push(nuevoCom);

    mostrarComentarios(comments);
    console.log(comments);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
 
    
    
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productInfo = resultObj.data;

            let productInfoName  = document.getElementById("productName");
            let productInfoDescription = document.getElementById("productDescription");
            let productInfoCost = document.getElementById("productCost");
            let productInfoSoldCount = document.getElementById("productSoldCount");
        
            productInfoName.innerHTML = productInfo.name;
            productInfoDescription.innerHTML = productInfo.description;
            productInfoCost.innerHTML = productInfo.currency + " " + productInfo.cost;
            productInfoSoldCount.innerHTML = productInfo.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(productInfo.images);
        }
    });
    
    /*showComments(comentarios);*/

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            comments = resultObj.data;

            mostrarComentarios(comments);
            console.log(comments);
        }
    });

    document.getElementById("enviaCom").addEventListener("click", function(){
        comentar();
    });
    
});