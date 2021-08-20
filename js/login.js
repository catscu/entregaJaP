
function verificar(){

    let dato = document.getElementById('user');
    let contrasenia = document.getElementById('pswd');
    let usuario = {};
    if(dato.value.trim() ==='' || contrasenia.value.trim() ===''){
        alert('Hay que completar los campos vacíos');
    }else{
        location.href = "index.html";
        usuario.nombre = dato.value;
        usuario.estado = "conectado";

        localStorage.setItem('usuario', JSON.stringify(usuario));
    }

}

function desconectar(){
    localStorage.clear();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let usuario = JSON.parse(localStorage.getItem('usuario'));



});