var productsArray = [];
let lista = [];
let listafiltrada = [];

function showProductsList(array){
    showSpinner();
    let max = parseInt(document.getElementById("max").value);
    let min = parseInt(document.getElementById("min").value);
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];
    if(product.cost >= min && product.cost <= max )
        {
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.desc + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                        </div>
                        <h3 class="mb-1">`+ product.currency + ' ' + product.cost +`</h3>
                        <div>
                        <p>` + product.description + ` </p>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById("lista-productos").innerHTML = htmlContentToAppend;
    }
    hideSpinner();

}

function ordenar(){
    productsArray.sort((a,b)=> {return a.cost-b.cost});
    showProductsList(productsArray);
    console.log(productsArray);
}

function ordenarInverso(){
    productsArray.sort((a,b)=> {return a.cost-b.cost});
    productsArray.reverse();
    showProductsList(productsArray);
    console.log(productsArray);   
}

function relevante(){
    productsArray.sort((a,b)=> {return a.soldCount-b.soldCount});
    productsArray.reverse();
    showProductsList(productsArray);
}

function verificacion() {
    let textoEscrito = document.getElementById("buscador").value;
    
    let listafiltrada = productsArray.filter((product) => { //filter devuelve un nuevo array conteniendo los coincidentes
        return (product.name.toLowerCase().indexOf(textoEscrito.toLowerCase()) && product.description.toLowerCase().indexOf(textoEscrito.toLowerCase())) > -1; //si lo escrito está en el array devuelve su posición
        //si no lo está devuelve -1
    })
    showProductsList(listafiltrada); // escribo la lista filtrada
  }
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });

    document.getElementById("asc").addEventListener("click", ()=>{
        ordenar();
    });

    document.getElementById("des").addEventListener("click", ()=>{
        ordenarInverso();
    });
    
    document.getElementById("rel").addEventListener("click", ()=>{
        relevante();
    });

    document.getElementById("max").addEventListener("change", ()=>{
        showProductsList(productsArray);
    });

    document.getElementById("min").addEventListener("change", ()=>{
        showProductsList(productsArray);
    });

    document.getElementById("buscador").addEventListener("keyup",()=>{

        verificacion();


    });

    document.getElementById("buscador").addEventListener("mouseover", verificacion);

    
});