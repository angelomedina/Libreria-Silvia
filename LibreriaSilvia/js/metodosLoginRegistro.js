function registroClientes() {

    var telefono        = document.getElementById('telefono_registro').value.toString();
    var nombre          = document.getElementById('nombre_registro').value.toString();
    var primerApellido  = document.getElementById('primerApellido_registro').value.toString();
    var segundoApellido = document.getElementById('segundoApellido_registro').value.toString();
    var correo          = document.getElementById('correo_registro').value.toString();
    var contraseña      = document.getElementById('contraseña_registro').value.toString();


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            if(this.statusText== "OK" && this.status == 200) {


                var json = this.response;
                var arr = JSON.parse(json);

                for (var i = 0; i < arr.length; i++){

                    var obj = arr[i];
                    for (var key in obj){

                        var value = obj[key];
                        swal("Resultado",value.toString());

                        if(value.toString() == 'Usuario agregado exitosamente') {

                            swal("Listo!", "Usuario agregado exitosamente!", "success")
                                .then((value) => {
                                    document.location.href = "../../vistas/login-registro/login.html";});
                        }
                    }
                }
            }
            else{console.log(this.statusText, this.status)}
        }
    };
    xhttp.open("GET", "../../php/conn.php?func=registroClientes()&telefono="+telefono+"&nombre="+nombre+"&primerApellido="+primerApellido+"&segundoApellido="+segundoApellido+"&correo="+correo+"&contraseña="+contraseña, true);
    xhttp.send();

}

function login() {

    var telefono  = document.getElementById('usuario_login').value.toString();
    var contraseña = document.getElementById('contraseña_login').value.toString();

    var ptelefono="";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            if(this.statusText== "OK" && this.status == 200) {

                if(this.response != '[]') {

                    var json = this.response;
                    var arr = JSON.parse(json);

                    for (var i = 0; i < arr.length; i++){

                        var obj = arr[i];
                        for (var key in obj){

                            var value = obj[key];

                            if(key.toString() == 'telefono'){ ptelefono=value.toString()}

                            if(key.toString() == 'tipo'){

                                if(value.toString() == 'C') {
                                    //cliente
                                    siguienteVentana(ptelefono,'C');
                                }else{
                                    //admi
                                    siguienteVentana(ptelefono,'A');
                                }
                            }
                        }
                    }
                }else{
                    swal({
                        title: "Estas seguro?",
                        text: "Por favor verifique los datos!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                }
            }
            else{
                console.log(this.statusText, this.status)
            }
        }
    };
    xhttp.open("GET", "../../php/conn.php?func=login()&telefono="+telefono+"&contraseña="+contraseña, true);
    xhttp.send();
}

function siguienteVentana(json, tipo) {

    if(tipo == 'C'){
        document.location.href = "../../vistas/cliente/pedido.php?json=" + json;
    }else{
        document.location.href = "../../vistas/administrador/main.html" ;
    }
}