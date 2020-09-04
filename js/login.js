function enviarDatos(evento) {
    //Evito que se repita el Bucle
    evento.preventDefault(); 
    sessionStorage.setItem('logueado', 'true');
    window.location.href = 'index.html';
    
    //Albergo los datos del usuario
    let usuarioLog = {
        nombre: document.getElementById("login").value,
        password: document.getElementById("password").value
    }; 
    let usuarioString = JSON.stringify(usuarioLog);
    localStorage.setItem("usuarioAndPass", usuarioString);
    
    
    return true;

}
document.getElementById('login-form').addEventListener('submit', enviarDatos);

//Funcion para ser enviado al login la primera vez que se ingresa al Home
if (!sessionStorage.getItem('logueado') &&
  !window.location.href.endsWith('login.html')){
  window.location.href = 'login.html';
};
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
