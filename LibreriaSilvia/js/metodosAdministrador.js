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
                console.log(this.response);
            }
            else{console.log(this.statusText, this.status)}
        }
    };
    xhttp.open("GET", "../../php/conn.php?func=mostrarSolicitudes()", true);
    xhttp.send();

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