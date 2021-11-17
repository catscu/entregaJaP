let comments = [];

/*function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6 img-hover-zoom">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
    }
    document.getElementById("productInfoImages").innerHTML = htmlContentToAppend;
}*/

function carousel(array){
    let htmlContentToAppend = '<div id="carouselExampleInterval" class="carousel slide" data-ride="carousel"><div class="carousel-inner">';

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        if(i === 0){
            htmlContentToAppend += `
            <div class="carousel-item active img-hover-zoom" data-interval="4000">
                <img src="` + imageSrc + `" class="d-block img-fluid" alt="PrimeraSlide">
            </div>
            `
        }else{
            htmlContentToAppend += `
            <div class="carousel-item img-hover-zoom" data-interval="4000">
                <img src="` + imageSrc + `" class="d-block img-fluid" alt="OtraSlide">
            </div>
            `
        }
    }
    htmlContentToAppend += `
    </div>
        <a class="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Anterior</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Siguiente</span>
        </a>
    </div>`;
    document.getElementById("productInfoImages").innerHTML = htmlContentToAppend;
}

function mostrarComentarios(array){

    let htmlContentToAppend = "";
    

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
    //htmlContentToAppend += `</div>`;
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

function mostrarProdRel(){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            product = resultObj.data;

            let arrayRelacionados = productInfo; 
            let allProdRelac = [];   
            let htmlContentToAppend = '<div class="container"><div class="row">';

            for(i=0; i < productInfo.relatedProducts.length; i++){
                arrayRelacionados = productInfo.relatedProducts[i];
                
                allProdRelac = product[arrayRelacionados];

                htmlContentToAppend += `
                <div class="col-md-4 card shadow-sm custom-card img-hover-zoom">
                    <img src="`+ allProdRelac.imgSrc +`" class="card-img-top bd-placeholder-img mb-3" alt="ProdRel">
                    <h4 class="mb-1">`+ allProdRelac.name +`</h4>
                    <h3 class="mb-1">`+ allProdRelac.currency + ' ' + allProdRelac.cost +`</h3>
                    <p>`+ allProdRelac.description +`</p>
                </div>
                `
            }
            htmlContentToAppend += `</div></div>`;
            document.getElementById("prodRel").innerHTML = htmlContentToAppend;
        }
    })
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
            //showImagesGallery(productInfo.images);
            carousel(productInfo.images);
            
            //Muestro los productos relacionados
            mostrarProdRel();
        }
    });
    

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            comments = resultObj.data;

            //Muestro los comentarios
            mostrarComentarios(comments);
            console.log(comments);
        }
    });

    document.getElementById("enviaCom").addEventListener("click", function(){
        comentar();
    });
    
});