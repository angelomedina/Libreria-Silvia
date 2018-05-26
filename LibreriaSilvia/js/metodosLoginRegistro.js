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

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            if(this.statusText== "OK" && this.status == 200) {

                if(this.response != '[]') {
                    console.log(this.response);
                    swal({
                        title: "Good job!",
                        text: "You clicked the button!",
                        icon: "success",
                        button: "Aww yiss!",
                    });
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