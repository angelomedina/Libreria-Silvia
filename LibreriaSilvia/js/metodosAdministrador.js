function activarVale() {

    var telefono="0000-1111";
    var monto   =500;

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
    xhttp.open("GET", "../php/conn.php?func=mostrarSolicitudes()", true);
    xhttp.send();

}