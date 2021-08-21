
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    location.href = "index.html";
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  function onLoad() {
      gapi.load('auth2', function() {
          gapi.auth2.init();
      });
  }

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
    signOut();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let usuario = JSON.parse(localStorage.getItem('usuario'));

    /*
    if(usuario.estado === 'conectado'){
        location.href = "index.html";
    }
    si logeo, al usar desconectar no me deja entrar de vuelta a login.html igual
    */

});