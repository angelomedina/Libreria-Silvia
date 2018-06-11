var telefono = "";
var nombre = "";
var correo = "";


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function obtenerParametros() {
    var json = getParameterByName('json');
    telefono=json;
    infoUsuario(telefono);
}

function sigVentanaSaldo() {
    obtenerParametros();
    document.location.href = "../../vistas/cliente/saldo.html?json=" + telefono;
}

function sigVentanaPedido() {
    obtenerParametros();
    document.location.href = "../../vistas/cliente/pedido.html?json=" + telefono;
}

function formularioPedido() {
    obtenerParametros();

    var precio         = 100;
    var pcolor         = $("input:radio[name ='color']:checked").val().toString();
    var pdocumento     = document.getElementById('documento').value.toString();
    var pcantidad      = document.getElementById('cantidad').value.toString();
    var ppaginaInicio  = document.getElementById('paginaInicio').value.toString();
    var ppaginaFin     = document.getElementById('paginaFinal').value.toString();
    var ptelefono      = telefono;


    var montoDOC = 0;
    var pagI = parseInt(ppaginaInicio);
    var pagF = parseInt(ppaginaFin);
    var cant = parseInt(pcantidad);

    if(pcolor == 'B') {precio=150;}

    while(pagI <= pagF) {
        montoDOC=montoDOC+precio;
        pagI++
    }
    montoDOC = montoDOC * cant;
    var paginas = ppaginaInicio+"-"+ppaginaFin;

    swal({
        title: "PRECIO DEL PEDIDO",
        text: "₡ "+montoDOC.toString(),
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((value) => {
        if (value) {
            realizarPedido(pcolor,pdocumento,pcantidad,paginas,montoDOC,ptelefono);
        } else {}
    });


}

function saldo() {

    obtenerParametros();
    var ptelefono  = telefono;

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

                        if(key.toString() == 'telefono'){ document.querySelector('#telefono').innerText = 'Telefono: '+value.toString()}
                        if(key.toString() == 'monto'){ document.querySelector('#saldo').innerText = 'Saldo: '+value.toString()}
                        if(key.toString() == 'nombre'){ document.querySelector('#nombre').innerText = 'Nombre: '+value.toString()}
                        if(key.toString() == 'primerApellido'){ document.querySelector('#apellido1').innerText = 'Primer apellido: '+value.toString()}


                    }
                }
            }
            else{console.log(this.statusText, this.status)}
        }
    };
    xhttp.open("GET", "../../php/conn.php?func=saldo()&telefono="+ptelefono, true);
    xhttp.send();

}


function realizarPedido(color,pdocumento,cantidad,paginas,montoDOC,telefono) {
    console.log("entra");
    var spinner = document.getElementById("spinnerC").style.visibility = "visible"; // empieza mostrando el spinner
    var documento = encodeToHex(pdocumento);

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



                        if(value.toString() == 'Pedido agregado exitosamente') {
                            var spinner = document.getElementById("spinnerC").style.visibility = "hidden"; // oculta el spinner
                            comprobanteCorreo(montoDOC.toString(),cantidad,color,paginas,nombre,correo);
                        }
                    }
                }
            }
            else{console.log(this.statusText, this.status)}
        }
    };
    xhttp.open("GET", "../../php/conn.php?func=realizarPedido()&telefono="+telefono+"&cantidad="+cantidad+"&color="+color+"&pagina="+paginas+"&montoDOC="+montoDOC.toString()+"&documento="+documento, true);
    xhttp.send();

}

function infoUsuario(telefono) {
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

                        if(key.toString() == 'nombre'){
                            nombre = value.toString();}
                        if(key.toString() == 'correo'){
                            correo = value.toString();}
                    }
                }
            }
            else{console.log(this.statusText, this.status)}
        }
    };
    xhttp.open("GET", "../../php/conn.php?func=infoUsuario()&telefono="+telefono, true);
    xhttp.send();
}

function comprobanteCorreo(monto,cantidad,color,paginas,nombre,correo) {

    emailjs.init("user_OB7h697WzggGYQWKOk8NG");

    var service_id = "default_service";
    var template_id = "facturasilvia";

    if(color == 'B'){color="a color";}
    if(color == 'N'){color="blanco y negro";}

    var date  = new Date();
    var fecha = date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear();

    var params = {"monto":monto,"correo":correo,"fecha":fecha,"nombre":nombre,"cantidad":cantidad,"color":color,"paginas":paginas}

    var spinner = document.getElementById("spinnerC").style.visibility = "visible"; // empieza mostrando el spinner

    emailjs.send(service_id,template_id,params)
        .then(function(){
            document.getElementById("myForm").reset();
            var spinner = document.getElementById("spinnerC").style.visibility = "hidden"; // si el correo se envia, oculta spiiner
            comprobanteCorreoAdmi(monto,cantidad,color,paginas,nombre); // llama funcion para enviar comprobante a admin
        }, function(err) {
            alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
        });
    return false;
}


function comprobanteCorreoAdmi(monto,cantidad,color,paginas,nombre) {

    emailjs.init("user_2ssqhTS88pnM0maU686SO");

    var service_id = "default_service";
    var template_id = "informeadminp";

    if(color == 'B'){color="a color";}
    if(color == 'N'){color="blanco y negro";}

    var date  = new Date();
    var fecha = date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear();

    var spinner = document.getElementById("spinnerC").style.visibility = "visible"; // empieza mostrando el spinner
    var params = {"monto":monto,"correo":"wilcr20@gmail.com","fecha":fecha,"nombre":nombre,"cantidad":cantidad,"color":color,"paginas":paginas}

    emailjs.send(service_id,template_id,params)
        .then(function(){
            document.getElementById("myForm").reset();
            var spinner = document.getElementById("spinnerC").style.visibility = "hidden"; // si el correo se envia correctamente, se oculta spinner

            swal("Se ha enviado un comprobante de compra a tu correo electronico");

        }, function(err) {
            alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
        });
    return false;
}






function cancelar() {
    document.getElementById("myForm").reset();
}

function encodeToHex(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16);
    }
    return result;
}

// función que se encargará de subir el archivo
function subirArchivo(archivo) {

    // creo una referencia al lugar donde guardaremos el archivo
    var refStorage = storageService.ref('pdf/').child(archivo.name);
    // Comienzo la tarea de upload
    var uploadTask = refStorage.put(archivo);

    // defino un evento para saber qué pasa con ese upload iniciado
    uploadTask.on('state_changed', null,
        function(error){
            console.log('Error al subir el archivo', error);
        },
        function(){
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                mensajeFinalizado(downloadURL)
            })
        }
    );
}

// a esta función la invocamos para mostrar el mensaje final después del upload
function mensajeFinalizado(url) {

    $("#documento").val(url);
    document.getElementById("documento").disabled = true;

    /*
     var elMensaje = document.getElementById('mensaje');
     var textoMensaje = '<p>Subido el archivo!';
     textoMensaje += '<br>Bytes subidos: ' + bytes;
     textoMensaje += '<br><a href="' + url + '">Ver el fichero</a></p>';
     elMensaje.innerHTML = textoMensaje;
     */
}

function desabilitarDocumentos() {
    document.getElementById("documento").disabled = true;
}

