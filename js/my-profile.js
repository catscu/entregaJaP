
function previewFile(){
    let preview = document.getElementById("imagenPerfil");
    let file = document.querySelector('input[type=file]').files[0];
    let reader = new FileReader();

    reader.onloadend = function(){
        preview.src = reader.result;
        document.getElementById('contenido').innerHTML= reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
       
      }else {
        preview.src = "img/avatar.png";
      }
}

function guardar(){
    let preview = document.getElementById("imagenPerfil");
    let perfil = {};
    let clave = document.getElementById("clave");
    let claveCodificada = md5(clave.value);

    perfil.nombre = document.getElementById("nombre").value;
    perfil.apellido = document.getElementById("apellido").value;
    perfil.edad = document.getElementById("edad").value;
    perfil.email = document.getElementById("email").value;
    perfil.phone = document.getElementById("phone").value;
    //perfil.clave = document.getElementById("clave");
    perfil.imagen = preview.src;

    console.log(perfil);

    
    localStorage.setItem('usuario', JSON.stringify(perfil));
    localStorage.setItem('clave', claveCodificada);
    clave.value="";

    console.log(perfil);
    alert ("Perfil guardado");
    location.reload();

}


function convertir(img) {
    img.crossOrigin="anonymous";
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var contexto = canvas.getContext("2d");
    contexto.drawImage(img, 0, 0,img.width, img.height);
    var dataURL = canvas.toDataURL("image/jpeg");
    localStorage.setItem("image", imgAsDataURL);
    console.log(imgAsDataURL);
    return dataURL;
  }

  document.addEventListener('DOMContentLoaded',function(){
  var imgbase64 = convertir(document.getElementById("imagenPerfil"));
  localStorage.imagen=imgbase64;
  document.getElementById('imagen2').src=`${localStorage.imagen}`;
  document.getElementById('contenido').innerHTML=localStorage.imagen;
  console.log(imgbase64);
  });

 


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    
    let preview = document.getElementById('imagenPerfil');
    let perfil = JSON.parse(localStorage.getItem('usuario'));

    if (perfil !== null){
        document.getElementById('img').src = perfil.imagen;
        document.getElementById('nom').innerHTML = perfil.nombre;
        document.getElementById('ap').innerHTML = perfil.apellido;
        document.getElementById('ed').innerHTML = perfil.edad;
        document.getElementById('em').innerHTML = perfil.email;
        document.getElementById('tel').innerHTML = perfil.phone;

    }else{
        //document.getElementById('imagenPerfil').src = imgAsDataURL;

    }

});