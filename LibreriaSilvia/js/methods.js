
function registroClientes() {
    //++++++++++++++++++++++++++++++++
    //PARAMETROS
    var telefono="0000-1111";
    var nombre="0";
    var primerApellido="0";
    var segundoApellido="0";
    var correo="0@gmail.com";
    var contraseña="nughvhg";

    //++++++++++++++++++++++++++++++++++
    //SOLICITUD
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            if(this.statusText== "OK" && this.status == 200) {
               console.log(this.response);
            }
            else{console.log(this.statusText, this.status)}
        }
    };
    xhttp.open("GET", "../php/conn.php?func=registroClientes()&telefono="+telefono+"&nombre="+nombre+"&primerApellido="+primerApellido+"&segundoApellido="+segundoApellido+"&correo="+correo+"&contraseña="+contraseña, true);
    xhttp.send();

}

function activarVale() {
    //++++++++++++++++++++++++++++++++
    //PARAMETROS
    var telefono="0000-1111";
    var monto   =500;

    //++++++++++++++++++++++++++++++++++
    //SOLICITUD
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            if(this.statusText== "OK" && this.status == 200) {
               console.log(this.response)
            }
            else{console.log(this.statusText, this.status)}
        }
    };
    xhttp.open("GET", "../php/conn.php?func=activarVale()&telefono="+telefono+"&monto="+monto.toString(), true);
    xhttp.send();

}

function realizarPedido() {
    //++++++++++++++++++++++++++++++++
    //PARAMETROS
    var telefono ="0000-1111";
    var cantidad = 1;
    var color    = "B";
    var pagina   = "1-20";
    var montoDOC = 700;
    var documento="aasdd";

    //exec  realizarPedido '7227-9636',2,'B','1-5',700,'tarea1',0

    //++++++++++++++++++++++++++++++++++
    //SOLICITUD
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            if(this.statusText== "OK" && this.status == 200) {
                console.log(this.response);
            }
            else{console.log(this.statusText, this.status)}
        }
    };
    xhttp.open("GET", "../php/conn.php?func=realizarPedido()&telefono="+telefono+"&cantidad="+cantidad.toString()+"&color="+color+"&pagina="+pagina+"&montoDOC="+montoDOC.toString()+"&documento="+documento, true);
    xhttp.send();

}