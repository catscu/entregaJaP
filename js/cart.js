let CART_2ARTICLES_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
let cuentaBan = false;
let tarjetaCred = false;
let envio = false;
let modal = false;

function mostrarCarrito(array){

  let carrito = "";
  
  for(let i = 0; i < array.length; i++){
      let producto = array[i];

        carrito +=  `<tr>
        <td><img class="img-fluid img-thumbnail" style="width: 25%" src="${producto.src}" alt=""> <span style="float: right">${producto.name}</span></td>
        <td><input type="number" id="count" min="1" value="${producto.count}" style="width: 1.5cm" onchange="costosCarrito()"</td>
        <td><span class="divisa${i}">${producto.currency}</span> <span class="costoUnitario">${(producto.unitCost).toFixed(2)}</span></td>
        <td><span class="divisa${i}">${producto.currency}</span> <span id="precio${i}">${producto.count*producto.unitCost}</span></td>
        <td><button class="btn btn-danger" onClick="eliminarArt(${i});"><i class="far fa-trash-alt"></i></button></td>
        </tr>`
    
  }
  document.getElementById("cart").innerHTML = carrito;
}

function eliminarArt(id){
  cartProduct.articles.splice(id,1);
  mostrarCarrito(cartProduct.articles);
  costosCarrito();
}

function costosCarrito(){
    
  let costounidad = document.getElementsByClassName("costoUnitario");
  let cantidad = document.getElementsByTagName ("input");
  let radioEn = document.getElementsByName("envio");
  let subtotal = 0;
  let total = 0;
  let costoEnvio = 0;
  
  for (let i=0; i< costounidad.length; i++){
    subtotal += parseFloat(costounidad[i].innerHTML) * parseFloat(cantidad[i].value);
    total += parseFloat(costounidad[i].innerHTML) * parseFloat(cantidad[i].value);
    document.getElementById("precio"+i).innerHTML = (parseFloat(costounidad[i].innerHTML) * parseFloat(cantidad[i].value)).toFixed(2);
  }
  document.getElementById("subtotal").innerHTML = (subtotal).toFixed(2);

  for (let i=0; i< radioEn.length; i++){
        if(radioEn[i].checked){
          costoEnvio += parseFloat(radioEn[i].value)/100 * total;
    }
  } 
  document.getElementById("metEnvio").innerHTML = (costoEnvio).toFixed(2);
  
  document.getElementById("total").innerHTML = (total + costoEnvio).toFixed(2);
  

}

function validar(){

  let calle = document.getElementById("calle").value.trim();
  let puerta = document.getElementById("puerta").value.trim();
  let esquina = document.getElementById("esquina").value.trim();

  let numBanco = document.getElementById("numCuenta").value.trim();
  let numTarjeta = document.getElementById("numTar").value.trim();
  let csv = document.getElementById("csv").value.trim();
  let fecha = document.getElementById("fecha").value.trim();

  if(calle === "" || puerta === "" || esquina === ""){
    envio = false;
  }else{
    envio = true;
  }

  if(tarjetaCred){
    if(numTarjeta === "" || csv === "" || fecha === ""){
      modal = false;
    }else{
      modal = true;
    }
  }

  if(cuentaBan){
    if(numBanco === ""){
      modal = false;
    }else{
      modal = true;
    }
  }

  if(envio && modal){
    alert("compraste exitosamente!!");
  }else{
    alert("faltan campos por completar!!!");
  }
}


function pesos(){

  for(let i=0; i< cartProduct.articles.length; i++){
    if(cartProduct.articles[i].currency === "USD"){
      cartProduct.articles[i].currency = "UYU";
      cartProduct.articles[i].unitCost = parseFloat(cartProduct.articles[i].unitCost * 40);
    }
  }

  document.getElementById("monSub").innerHTML = "UYU";
  document.getElementById("monEnvio").innerHTML = "UYU";
  document.getElementById("monTot").innerHTML = "UYU";

}

function dolares(){

  for(let i=0; i< cartProduct.articles.length; i++){
    if(cartProduct.articles[i].currency === "UYU"){
      cartProduct.articles[i].currency = "USD";
      cartProduct.articles[i].unitCost = parseFloat(cartProduct.articles[i].unitCost / 40);
    }
  }
  document.getElementById("monSub").innerHTML = "USD";
  document.getElementById("monEnvio").innerHTML = "USD";
  document.getElementById("monTot").innerHTML = "USD";
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_2ARTICLES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            cartProduct = resultObj.data;
            
            dolares();
            mostrarCarrito(cartProduct.articles);
            costosCarrito();


        }
    }); 

    document.getElementById("compra").addEventListener("click", ()=>{
      document.getElementById("formEnvio").classList.add("was-validated");

    });
    
    document.getElementById("cuentaBan").addEventListener("click", ()=>{
      document.getElementById("numTar").disabled = true;
      document.getElementById("csv").disabled = true;
      document.getElementById("fecha").disabled = true;
      document.getElementById("numCuenta").disabled = false;
      document.getElementById("modalForm").classList.add("was-validated");
      cuentaBan = true;
      tarjetaCred = false;    
    });

    document.getElementById("tarjeta").addEventListener("click", ()=>{
      document.getElementById("numTar").disabled = false;
      document.getElementById("csv").disabled = false;
      document.getElementById("fecha").disabled = false;
      document.getElementById("numCuenta").disabled = true;
      document.getElementById("modalForm").classList.add("was-validated");
      cuentaBan = false;
      tarjetaCred = true;   
    });

    document.getElementById("pes").addEventListener("click", ()=>{
      pesos();
      mostrarCarrito(cartProduct.articles);
      costosCarrito();
      
    });

    document.getElementById("dol").addEventListener("click", ()=>{
      dolares();
      mostrarCarrito(cartProduct.articles);
      costosCarrito();

    });



});

