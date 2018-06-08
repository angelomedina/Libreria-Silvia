

function registroClientes() {

    var telefono = document.getElementById('telefono_registro').value.toString();
    var nombre = document.getElementById('nombre_registro').value.toString();
    var primerApellido = document.getElementById('primerApellido_registro').value.toString();
    var segundoApellido = document.getElementById('segundoApellido_registro').value.toString();
    var correo = document.getElementById('correo_registro').value.toString();
    var contraseña = document.getElementById('contraseña_registro').value.toString();
    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i; // expresion de validacion para el correo

    if (nombre != "") {
        if (primerApellido != "" && segundoApellido != "") {
            if (contraseña != "") {  // sno se admite sin contraseñas
                if (telefono != "" && telefono.length == 8) {    // validaciones para el input de telefono
                    var t1 = telefono[0] + "" + telefono[1] + "" + telefono[2] + "" + telefono[3];
                    var t2 = telefono[4] + "" + telefono[5] + "" + telefono[6] + "" + telefono[7];
                    var telefono = t1 + "-" + t2;       // realiaz concatenacnion de telefono para el formato requerido 1234-5678

                    if (emailRegex.test(correo)) { // se verifica que cumpla con el fomato de correo

                        var xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function () {

                            if (this.readyState == 4 && this.status == 200) {
                                if (this.statusText == "OK" && this.status == 200) {


                                    var json = this.response;
                                    var arr = JSON.parse(json);

                                    for (var i = 0; i < arr.length; i++) {

                                        var obj = arr[i];
                                        for (var key in obj) {

                                            var value = obj[key];
                                            swal("Resultado", value.toString());

                                            if (value.toString() == 'Usuario agregado exitosamente') {

                                                swal("Listo!", "Usuario agregado exitosamente!", "success")
                                                    .then((value) => {
                                                    document.location.href = "../../vistas/login-registro/login.html";
                                                });

                                            }
                                        }
                                    }
                                }
                                else {
                                    console.log(this.statusText, this.status)
                                }
                            }
                        };
                        xhttp.open("GET", "../../php/conn.php?func=registroClientes()&telefono=" + telefono + "&nombre=" + nombre + "&primerApellido=" + primerApellido + "&segundoApellido=" + segundoApellido + "&correo=" + correo + "&contraseña=" + contraseña, true);
                        xhttp.send();
                    }
                    else{alert ("Debe de ingresar un email con formato válido para registrarse.");}
                }
                else{alert ("Debe de ingresar un número de usuario válido de 8 digitos para registrarse. ");}
            }
            else{alert("Debe de ingresar una contraseña para registrarse.");}
        }
        else{alert("Debe de ingresar sus apellidos para registrarse.");}
    }
    else{alert("Debe de ingresar su nombre para registrarse.");}
}

function login() {

    var telefono = document.getElementById('usuario_login').value.toString();
    var contraseña = document.getElementById('contraseña_login').value.toString();

    var ptelefono = "";

    if (telefono != "" && telefono.length == 8) {    // validaciones para el input de telefono
        var t1 = telefono[0] + "" + telefono[1] + "" + telefono[2] + "" + telefono[3];
        var t2 = telefono[4] + "" + telefono[5] + "" + telefono[6] + "" + telefono[7];
        var telefono = t1 + "-" + t2;       // realiaz concatenacnion de telefono para el formato requerido 1234-5678

        if(contraseña != "") { //valida el ingreso de contraseña


            var xhttp = new XMLHttpRequest();   // ejecutara solicitud solamente si los datos ingresado son validos
            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {
                    if (this.statusText == "OK" && this.status == 200) {

                        if (this.response != '[]') {

                            var json = this.response;
                            var arr = JSON.parse(json);

                            for (var i = 0; i < arr.length; i++) {

                                var obj = arr[i];
                                for (var key in obj) {

                                    var value = obj[key];

                                    if (key.toString() == 'telefono') {
                                        ptelefono = value.toString()
                                    }

                                    if (key.toString() == 'tipo') {

                                        if (value.toString() == 'C') {
                                            //cliente
                                            siguienteVentana(ptelefono, 'C');
                                        } else {
                                            //admi
                                            siguienteVentana(ptelefono, 'A');
                                        }
                                    }
                                }
                            }
                        } else {
                            swal({
                                title: "Estas seguro?",
                                text: "Por favor verifique los datos!",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                            })
                        }
                    }
                    else {
                        console.log(this.statusText, this.status)
                    }
                }
            };
            xhttp.open("GET", "../../php/conn.php?func=login()&telefono=" + telefono + "&contraseña=" + contraseña, true);
            xhttp.send();
        }
        else{alert("Debe de ingresar su contraseña en el campo especifico para continuar.");}
    }
    else{alert ("Debe de ingresar un número de usuario válido de 8 digitos para continuar. ");}

}

function siguienteVentana(json, tipo) {

    if(tipo == 'C'){
        document.location.href = "../../vistas/cliente/pedido.html?json=" + json;
    }else{
        document.location.href = "../../vistas/administrador/main.html" ;
    }
}