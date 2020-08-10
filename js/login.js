function enviarDatos(evento) {
    evento.preventDefault(); //Evita que se haga la peticion de envio de datos
    sessionStorage.setItem('logueado', 'true');
    window.location.href = 'index.html';
    return true;
}
document.getElementById('login-form').addEventListener('submit', enviarDatos);


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
