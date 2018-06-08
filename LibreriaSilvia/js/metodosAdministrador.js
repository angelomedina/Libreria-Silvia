google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function activarVale() {

    var telefono = document.getElementById('telefono_recarga').value.toString();
    var monto = document.getElementById('monto_recarga').value.toString();


    if (telefono != "" && telefono.length ==8) {    // validaciones para el input de telefono

        var t1= telefono[0] +""+telefono[1] +""+telefono[2] +""+telefono[3];
        var t2= telefono[4] +""+telefono[5] +""+telefono[6] +""+telefono[7];
        var telefono = t1+"-"+t2;       // realiaz concatenacnion de telefono para el formato requerido 1234-5678

            if (monto != "" && monto > 0) { // valida monto ingresado

                var xhttp = new XMLHttpRequest();   // ejecutara solicitud solamente si los datos ingresado son validos
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

                                    if (value.toString() == 'Vale agregado exitosamente') {

                                        swal("Listo!", value.toString() + "!", "success");

                                    }
                                }
                            }
                        }
                        else {
                            console.log(this.statusText, this.status)
                        }
                    }
                };
                xhttp.open("GET", "../../php/conn.php?func=activarVale()&telefono=" + telefono + "&monto=" + monto.toString(), true);
                xhttp.send();
            }
            else {alert("Monto digitado no válido.");}
    }
    else{alert ("Debe de ingresar un número de telefono válido de 8 digitos para continuar. ");}

}

function mostrarSolicitudes() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            if(this.statusText== "OK" && this.status == 200) {

                var response = this.response;
                var json     = JSON.parse(response);

                if(json.length > 0){
                    rellenarTabla(json);
                }else{
                    swal({
                        title: "Bandeja de entrada vacia!",
                        text: "No dispone de pedidos",
                        icon: "warning",
                        button: "Ok!",

                    }).then((value) => {
                        document.location.href = "../../vistas/administrador/main.html";
                    });
                }
            }
            else{console.log(this.statusText, this.status)}
        }
    };
    xhttp.open("GET", "../../php/conn.php?func=mostrarSolicitudes()", true);
    xhttp.send();

}

function drawChart(json) {

    if(typeof json !== "undefined") {

        var cantidad    = 0;
        var color       = 0;
        var blancoNegro = 0;
        var monto       = 0;

        for (var i = 0; i < json.length; i++){

            var obj = json[i];
            for (var key in obj){

                var value = obj[key];

                if(key == 'Cantidad') {
                    cantidad = parseInt(value);
                }
                if(key == 'Color') {
                    color = parseInt(value);
                }
                if(key == 'Blanco y Negro') {
                    blancoNegro = parseInt(value);
                }
                if(key == 'Monto total') {
                    monto = parseInt(value);
                }

            }
        }

        var data = google.visualization.arrayToDataTable([
            ['Language', 'Speakers (in millions)'],
            ['Cantidad', cantidad], ['A color', color], ['Blanco y negro', blancoNegro],
            ['Monto', monto/1000]
        ]);

        var options = {
            slices: {
                4: {offset: 0.2},
                12: {offset: 0.3},
                14: {offset: 0.4},
                15: {offset: 0.5},
            },
            backgroundColor: 'transparent',
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }
    else{

        var data = google.visualization.arrayToDataTable([
            ['Language', 'Speakers (in millions)'],
            ['Cantidad', 1], ['A color', 1], ['Blanco y negro', 1],
            ['Monto', 1]
        ]);

        var options = {
            slices: {
                4: {offset: 0.2},
                12: {offset: 0.3},
                14: {offset: 0.4},
                15: {offset: 0.5},
            },
            backgroundColor: 'transparent',
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }
}

function getFecha() {

    var fecha = "";
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

                        if(fecha != value.toString()) {
                            agregagrElementosSelect(value.toString())
                            fecha = value.toString();
                        }
                    }
                }
            }
            else{console.log(this.statusText, this.status)}
        }
    };
    xhttp.open("GET", "../../php/conn.php?func=getFecha()", true);
    xhttp.send();
}

function agregagrElementosSelect(fecha) {
            var select = document.getElementsByName('Fecha')[0];
            var option = document.createElement("option");
            option.text = fecha;
            select.add(option);
}

function rellenarTabla(solicitudesJson) {

    var tabla = document.getElementById("tablaSolicitudes");

    var numeroSolicitud=1; // para lograr mostrar en orden de llegada las solicitudes

    for( x= 0; x <solicitudesJson.length; x++) {
        // se generan las 8 celdas respectivas por cada solicitud
        var Nrow = tabla.insertRow(numeroSolicitud);

        var cell1 = Nrow.insertCell(0);
        var cell2 = Nrow.insertCell(1);
        var cell3 = Nrow.insertCell(2);
        var cell4 = Nrow.insertCell(3);
        var cell5 = Nrow.insertCell(4);
        var cell6 = Nrow.insertCell(5);
        var cell7 = Nrow.insertCell(6);
        var cell8 = Nrow.insertCell(7);
        var cell9= Nrow.insertCell(8);
        var cell10= Nrow.insertCell(9);

        numeroSolicitud++;

        var paginas= JSON.stringify(solicitudesJson[x]["pagina"]); // ejemplos de dato: "1-45", "23-87"
        var paginaInicio ="";  // variables para almacenar
        var paginaFin ="";  // las paginas

        var char = 1; //indice
        while (paginas[char] != "-") { // se halla la pagina inicial
            paginaInicio += paginas[char]; // a traves de ciclo hasta topar con '-'
            char++;
        }

        char++;
        while (paginas[char] !='"'){ // se halla la pagina final
            paginaFin += paginas[char]; // a traves de ciclo hasta topar con "
            char++;
        }
        // se crean variables para castearlas adecaudamaente
        var nombre = JSON.stringify(solicitudesJson[x]["nombre"]).replace(/['"]+/g, '');
        var apell1= JSON.stringify(solicitudesJson[x]["primerApellido"]).replace(/['"]+/g, '');
        var apell2= JSON.stringify(solicitudesJson[x]["segundoApellido"]).replace(/['"]+/g, '');
        var fechaJson = JSON.stringify(solicitudesJson[x]["fecha"]["date"]).split(".");
        var correo=  JSON.stringify(solicitudesJson[x]["correo"]).replace(/['"]+/g, '');
        var telefono = JSON.stringify(solicitudesJson[x]["telefono"]).replace(/['"]+/g, '');
        var fechaPura= fechaJson[0].replace(/['"]+/g, '');

        pCorreo= correo.toString();
        pNombre= nombre.toString();
        pFecha = fechaPura.toString();

        cell1.innerHTML= JSON.stringify(solicitudesJson[x]["id"]);
        cell2.innerHTML = nombre+" "+apell1 +" "+ apell2;
        cell3.innerHTML = JSON.stringify(solicitudesJson[x]["color"]).replace(/['"]+/g, '');
        cell4.innerHTML = JSON.stringify(solicitudesJson[x]["cantidad"]);
        cell5.innerHTML = paginaInicio;
        cell6.innerHTML = paginaFin;
        cell7.innerHTML= correo;
        cell8.innerHTML = telefono;
        cell9.innerHTML = fechaJson[0].replace(/['"]+/g, '');

        cell10.innerHTML = '<a class="btn2" onclick="pedidoLink(this)">Abrir</a>  <br><br>  <a class="btn2" onclick="pedidoListo(this)">Listo</a>'

    }
}

function rellenarTablaSolicitudesListas(solicitudesJson) {

    var tabla = document.getElementById("tablaSolicitudesLista");

    var numeroSolicitud=1; // para lograr mostrar en orden de llegada las solicitudes

    for( x= 0; x <solicitudesJson.length; x++) {
        // se generan las 8 celdas respectivas por cada solicitud
        var Nrow = tabla.insertRow(numeroSolicitud);
        var cell1 = Nrow.insertCell(0);
        var cell2 = Nrow.insertCell(1);
        var cell3 = Nrow.insertCell(2);
        var cell4 = Nrow.insertCell(3);
        var cell5 = Nrow.insertCell(4);
        var cell6 = Nrow.insertCell(5);
        var cell7 = Nrow.insertCell(6);
        var cell8 = Nrow.insertCell(7);

        numeroSolicitud++;

        var paginas= JSON.stringify(solicitudesJson[x]["pagina"]); // ejemplos de dato: "1-45", "23-87"
        var paginaInicio ="";  // variables para almacenar
        var paginaFin ="";  // las paginas

        var char = 1; //indice
        while (paginas[char] != "-") { // se halla la pagina inicial
            paginaInicio += paginas[char]; // a traves de ciclo hasta topar con '-'
            char++;
        }

        char++;
        while (paginas[char] !='"'){ // se halla la pagina final
            paginaFin += paginas[char]; // a traves de ciclo hasta topar con "
            char++;
        }
        // se crean variables para castearlas adecaudamaente
        var nombre = JSON.stringify(solicitudesJson[x]["nombre"]).replace(/['"]+/g, '');
        var apell1= JSON.stringify(solicitudesJson[x]["primerApellido"]).replace(/['"]+/g, '');
        var apell2= JSON.stringify(solicitudesJson[x]["segundoApellido"]).replace(/['"]+/g, '');
        var fechaJson = JSON.stringify(solicitudesJson[x]["fecha"]["date"]).split(".");
        var correo=  JSON.stringify(solicitudesJson[x]["correo"]).replace(/['"]+/g, '');
        var telefono = JSON.stringify(solicitudesJson[x]["telefono"]).replace(/['"]+/g, '');
        var fechaPura= fechaJson[0].replace(/['"]+/g, '');

        pCorreo= correo.toString();
        pNombre= nombre.toString();
        pFecha = fechaPura.toString();

        cell1.innerHTML = nombre+" "+apell1 +" "+ apell2;
        cell2.innerHTML = JSON.stringify(solicitudesJson[x]["color"]).replace(/['"]+/g, '');
        cell3.innerHTML = JSON.stringify(solicitudesJson[x]["cantidad"]);
        cell4.innerHTML = paginaInicio;
        cell5.innerHTML = paginaFin;
        cell6.innerHTML= correo;
        cell7.innerHTML = telefono;
        cell8.innerHTML = fechaJson[0].replace(/['"]+/g, '');

    }
}

function pedidoListo(row) {

    var i = row.parentNode.parentNode.rowIndex;  // se consigue el indice de la fila a utilizar para conseguir los datos

    var nombre= document.getElementById("tablaSolicitudes").rows[i].cells[1].innerText;
    var correo= document.getElementById("tablaSolicitudes").rows[i].cells[6].innerText;
    var fecha = document.getElementById("tablaSolicitudes").rows[i].cells[7].innerText;
    var id= document.getElementById("tablaSolicitudes").rows[i].cells[0].innerText;

    console.log("ID: "+ id + ","+nombre+","+fecha);

    var service_id = "default_service";
    var template_id = "pedidolisto";

    document.getElementById("tablaSolicitudes").deleteRow(i);  // elimina fila de la tabla de solicitudes

    var params = {"to_email":correo,"nombre":nombre,"fecha":fecha}

    emailjs.send(service_id,template_id,params)
        .then(function(){

            estadoSolicitud(id);  // recibe ID de solicitud .....

            swal({
                title: "Correo de confimación listo!",
                text: "Destinatario: "+correo,
                icon: "success",
                button: "Ok!",
            });
        }, function(err) {
            alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
        });
    return false;
}

function setFecha(){
    var combo    = document.getElementById("Fecha");
    var selected = combo.options[combo.selectedIndex].text;
    getGrafic(selected);
}

function getGrafic(pfecha) {

    var fecha = pfecha.toString()+"/01";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            if(this.statusText== "OK" && this.status == 200) {

                var arr = this.response;
                var json = JSON.parse(arr);
                drawChart(json);

            }
            else{console.log(this.statusText, this.status)}
        }
    };
    xhttp.open("GET", "../../php/conn.php?func=getGrafico()&fecha="+fecha, true);
    xhttp.send();
}

function estadoSolicitud(id){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            if(this.statusText== "OK" && this.status == 200) {

                //swal("Infome de estado!", this.response.toString());
                //si llega aqui esta lista el seteo de estado
            }
            else{console.log(this.statusText, this.status)}
        }
    };
    xhttp.open("GET", "../../php/conn.php?func=estadoSolicitud()&id="+id.toString(), true);
    xhttp.send();
}

function mostrarSolicitudesListas() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            if(this.statusText== "OK" && this.status == 200) {

                var arr = this.response;
                var json = JSON.parse(arr);

                rellenarTablaSolicitudesListas(json);

            }
            else{console.log(this.statusText, this.status)}
        }
    };
    xhttp.open("GET", "../../php/conn.php?func=mostrarSolicitudesListas()", true);
    xhttp.send();

}

function mostrarLink(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            if(this.statusText== "OK" && this.status == 200) {

                var arr = this.response;
                var json = JSON.parse(arr);

                for (var i = 0; i < json.length; i++){

                    var obj = json[i];
                    for (var key in obj){

                        var value = obj[key];

                        var link = hexToString (value.toString());
                        document.location.href = link;
                    }
                }


            }
            else{console.log(this.statusText, this.status)}
        }
    };
    xhttp.open("GET", "../../php/conn.php?func=abrirLink()&id="+id.toString(), true);
    xhttp.send();
}

function pedidoLink(row) {

    var i = row.parentNode.parentNode.rowIndex;  // se consigue el indice de la fila a utilizar para conseguir los datos

    var id= document.getElementById("tablaSolicitudes").rows[i].cells[0].innerText;
    mostrarLink(id);


}

function hexToString (hex) {
    var string = '';
    for (var i = 0; i < hex.length; i += 2) {
        string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return string;
}

