function saldo() {
    var telefono  ="0000-1111";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            if(this.statusText== "OK" && this.status == 200) {
                console.log(this.response);
            }
            else{console.log(this.statusText, this.status)}
        }
    };
    xhttp.open("GET", "../php/conn.php?func=saldo()&telefono="+telefono, true);
    xhttp.send();

}

function realizarPedido() {

    var telefono ="0000-1111";
    var cantidad = 1;
    var color    = "B";
    var pagina   = "1-20";
    var montoDOC = 700;
    var documento="aasdd";

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