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
