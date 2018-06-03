<?php
if ($_FILES['archivo']["error"] > 0)
{
    echo "Error al subir archivo";
}
else
{

    move_uploaded_file($_FILES['archivo']['tmp_name'], "subidas/" . $_FILES['archivo']['name']);

    $VAR='subidas/'.$_FILES['archivo']['name'];

    echo "Exito al subir el archivo";

};
?>
