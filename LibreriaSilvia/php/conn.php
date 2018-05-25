<?php
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// redireccion de funciones

if ($_GET['func']=='registroClientes()'){
    registroClientes($_GET['telefono'],$_GET['nombre'],$_GET['primerApellido'],$_GET['segundoApellido'],$_GET['correo']);
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//FUNCIONES
function conexion(){
    $serverName = "localhost\sqlexpress,1433";
    $connectionInfo = array( "Database"=>"Nodo", "UID"=>"sa", "PWD"=>"deathnote");
    $conn = sqlsrv_connect( $serverName, $connectionInfo);

    if( $conn ) {
        return $conn;
    }else{
        echo "Error de conexion con SQL Server";
        die( print_r( sqlsrv_errors(), true));
    }
}

function registroClientes($telefono,$nombre,$primerApellido,$seguncoApellido,$correo){

    $conn = conexion();
    $sql ="exec registroClientes @telefono='$telefono',@nombre='$nombre',@primerApellido='$primerApellido',@segundoApellido='$seguncoApellido',@correo='$correo',@contraseña='12365',@respuesta='0'";
    $stmt = sqlsrv_query($conn, $sql);

    $result = array();

    do {
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
            $result[] = $row;
        }
    }   while (sqlsrv_next_result($stmt));


    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);

    echo json_encode($result);
}

