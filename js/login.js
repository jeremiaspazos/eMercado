function enviarDatos(evento) {
    //Evito que se repita el Bucle
    evento.preventDefault(); 
    sessionStorage.setItem('logueado', 'true');
    window.location.href = 'index.html';
    
    //Albergo los datos del usuario
    let usuarioLog = document.getElementById("login").value; 
    let usuarioString = JSON.stringify(usuarioLog);
    localStorage.setItem("usuario", usuarioString);
    
    
    return true;

}
document.getElementById('login-form').addEventListener('submit', enviarDatos);

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token)
    var info = profile.getName(googleUser)
    let usuario = JSON.stringify(info)
    var marcelo = localStorage.setItem("usuario", usuario)
    console.log(marcelo)
    sessionStorage.setItem('logueado', 'true');
    if(marcelo =! null){
    window.location.href="index.html"
    }
}
  

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
