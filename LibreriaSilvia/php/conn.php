<?php
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// redireccion de funciones

if ($_GET['func']=='registroClientes()'){
    registroClientes($_GET['telefono'],$_GET['nombre'],$_GET['primerApellido'],$_GET['segundoApellido'],$_GET['correo'],$_GET['contraseña']);
}

if ($_GET['func']=='activarVale()'){
    activarVale($_GET['telefono'],$_GET['monto']);
}

if ($_GET['func']=='realizarPedido()'){
    realizarPedido($_GET['telefono'],$_GET['cantidad'],$_GET['color'],$_GET['pagina'],$_GET['montoDOC'],$_GET['documento']);
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

function registroClientes($telefono,$nombre,$primerApellido,$seguncoApellido,$correo,$contraseña){

    $conn=conexion();
    $result = array();

    $sql ="exec registroClientes '$telefono','$nombre','$primerApellido','$seguncoApellido','$correo','$contraseña','0',''";
    $stmt = sqlsrv_query($conn, $sql);

    if($stmt === false) {
        sqlsrv_close($conn);

        $result[] = "Error: registro cliente";
        echo json_encode($result);
    }
    else {
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
            $result[] = $row;
        }
        echo json_encode($result);
        sqlsrv_close($conn);
    }
}

function activarVale($telefono,$monto){

    $conn = conexion();
    $sql ="exec activarVale '$telefono','$monto','0',''";

    $stmt = sqlsrv_query( $conn, $sql );
    if($stmt === false) {
        sqlsrv_close($conn);

        $result[] = "Error: activar vale";
        echo json_encode($result);
    }
    else {
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
            $result[] = $row;
        }
        echo json_encode($result);
        sqlsrv_close($conn);
    }
}

function realizarPedido($telefono,$cantidad,$color,$pagina,$montoDOC,$documento){

    $conn = conexion();
    $sql ="exec  realizarPedido '$telefono',$cantidad,'$color','$pagina','$montoDOC','$documento',0,''";

    $stmt = sqlsrv_query( $conn, $sql );
    if($stmt === false) {
        sqlsrv_close($conn);

        $result[] = "Error: realizar pedido";
        echo json_encode($result);
    }
    else {

        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
                $result[] = $row;
        }
        echo json_encode($result);
        sqlsrv_close($conn);
    }

}

