function registroClientes() {

    var telefono="0000-1991";
    var nombre="0";
    var primerApellido="0";
    var segundoApellido="0";
    var correo="0@gmail.com";
    var contraseña="nughvhg";


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            if(this.statusText== "OK" && this.status == 200) {
                console.log(this.response);
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
                        title: "Are you sure?",
                        text: "Once deleted, you will not be able to recover this imaginary file!",
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
        swal("Good job!", "You clicked the button!", "success")
            .then((value) => {
                document.location.href = "../../vistas/cliente/pedido.html?json=" + json;
            });
    }else{
        swal("Good job!", "You clicked the button!", "success")
            .then((value) => {
                document.location.href = "../../vistas/administrador/main.html?json=" + json;
            });
    }
}