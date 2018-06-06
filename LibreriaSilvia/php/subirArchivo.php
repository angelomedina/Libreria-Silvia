<?php

if ($_FILES['archivo']["error"] > 0)
{
    header('Location: ../vistas/cliente/pedido.php?json='.urlencode('7227-9636').'&'.'nombre='.urlencode("Error").'&'.'mensaje='.urlencode("Error"));
}
else
{

    move_uploaded_file($_FILES['archivo']['tmp_name'], "subidas/" . $_FILES['archivo']['name']);

    $VAR='subidas/'.$_FILES['archivo']['name'];
    $nombre   = $_FILES['archivo']['name'];
    $mensaje  = "Exito";
    $telefono =  "<script>document.write(palabra)";


    header('Location: ../vistas/cliente/pedido.php?json='.urlencode($telefono).'&'.'nombre='.urlencode($nombre).'&'.'mensaje='.urlencode($mensaje));
};
?>
