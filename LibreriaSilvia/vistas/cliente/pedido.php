<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Librería Silvia </title>

    <script type="text/javascript" src="../../js/metodosCliente.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdn.emailjs.com/dist/email.min.js"></script>
    <script type="text/javascript">(function(){emailjs.init("user_OB7h697WzggGYQWKOk8NG");})();</script>
    <link   rel="stylesheet" href="../../css/stylesCliente.css">


</head>
        <body background="../../css/fondos/6.jpg" style="background-repeat:no-repeat;background-position: 0px 115px;background-size: 100% 92%">
        <div id="header">Librería Silvia</div>
        <br><br><br><br><br><br>


        <div class="blockquote"> <br><br>
            <h1>Impresión</h1>
            <div class="row">
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">

                            <form  action="../../php/subirArchivo.php"  method="post" enctype="multipart/form-data">
                                <input style="margin-left: 25%;"  class="hidden" type="file" name="archivo" id="archivo"></input>
                                <input style="margin-left: 2%;"   type="submit" value="Subir archivo"></input>
                            </form>

                            <h2 style="margin-left: 8%; ">Color</h2>

                            <label class="container">Color
                                <input type="radio" checked="checked" name="color" value="B" >
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Blanco y negro
                                <input type="radio" name="color" value="N">
                                <span class="checkmark"></span>
                            </label>

                            <form id="myForm">
                                <h2 style="margin-left: 5%; ">Ingrese el documento</h2>
                                <input type="text" id="documento">

                                <h2 style="margin-left: 6%; ">Cantidad</h2>
                                <input type="text" id="cantidad"><br>
                                </h2>
                                <h2 style="margin-left: 12%; ">Página inicio</h2>
                                <input type="text" id="paginaInicio">
                                <h2 style="margin-left: 4%; ">Página final</h2>
                                <input type="text" id="paginaFinal"><br><br><br>
                            </form>
                        </div>
                        <a class="btn" onclick="sigVentanaSaldo()"  style="margin-left: 25%;"> Verificar Saldo </a>
                        <a class="btn" onclick="formularioPedido()" style="margin-left: 1%;"> Enviar </a>
                        <a class="btn" onclick="cancelar()"         style="margin-left: 1%;"> Cancelar</a>
                    </div>
                </div>
            </div>
        </div>
        </div>
</body>