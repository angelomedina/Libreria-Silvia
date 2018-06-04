google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);


function activarVale() {

    var telefono=document.getElementById('telefono_recarga').value.toString();
    var monto   =document.getElementById('monto_recarga').value.toString();

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

                        if(value.toString() == 'Vale agregado exitosamente') {

                            swal("Listo!", value.toString()+"!", "success");

                        }
                    }
                }
            }
            else{console.log(this.statusText, this.status)}
        }
    };
    xhttp.open("GET", "../../php/conn.php?func=activarVale()&telefono="+telefono+"&monto="+monto.toString(), true);
    xhttp.send();
}

function mostrarSolicitudes() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            if(this.statusText== "OK" && this.status == 200) {

                var response = this.response;
                var json     = JSON.parse(response);

                rellenarTabla(json);
            }
            else{console.log(this.statusText, this.status)}
        }
    };
    xhttp.open("GET", "../../php/conn.php?func=mostrarSolicitudes()", true);
    xhttp.send();

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

        cell1.innerHTML = JSON.stringify(solicitudesJson[x]["nombre"])+" "+
            JSON.stringify(solicitudesJson[x]["primerApellido"])+
            JSON.stringify(solicitudesJson[x]["segundoApellido"]);
        cell2.innerHTML = JSON.stringify(solicitudesJson[x]["color"]);
        cell3.innerHTML = JSON.stringify(solicitudesJson[x]["cantidad"]);
        cell4.innerHTML = paginaInicio;
        cell5.innerHTML = paginaFin;
        cell6.innerHTML= JSON.stringify(solicitudesJson[x]["correo"]);
        cell7.innerHTML = JSON.stringify(solicitudesJson[x]["telefono"]);
        cell8.innerHTML = JSON.stringify(solicitudesJson[x]["fecha"]);
        cell9.innerHTML = '<a class="btn2" onclick="abrirDocumento()">Abrir</a>  <br><br>  <a class="btn2" onclick="solicitudLista(this)">Listo</a>'
    }
}

function solicitudLista(row) {
    var i = row.parentNode.parentNode.rowIndex;
    document.getElementById("tablaSolicitudes").deleteRow(i);  // elimina fila de la tabla de solicitudes

}

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Language', 'Speakers (in millions)'],
        ['Cantidad', 50], ['Tipo', 10], ['Color', 10],
        ['Monto', 10]
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

function pedidoListo(correo,nombre,fecha) {
    var service_id = "default_service";
    var template_id = "pedidolisto";


    var params = {"to_email":correo,"nombre":nombre,"fecha":fecha}

    emailjs.send(service_id,template_id,params)
        .then(function(){
        }, function(err) {
            alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
        });
    return false;
}