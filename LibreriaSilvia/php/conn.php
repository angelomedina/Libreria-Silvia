<?php

if ($_GET['func']=='registroClientes()'){
    registroClientes($_GET['telefono'],$_GET['nombre'],$_GET['primerApellido'],$_GET['segundoApellido'],$_GET['correo'],$_GET['contraseña']);
}

if ($_GET['func']=='activarVale()'){
    activarVale($_GET['telefono'],$_GET['monto']);
}

if ($_GET['func']=='realizarPedido()'){
    realizarPedido($_GET['telefono'],$_GET['cantidad'],$_GET['color'],$_GET['pagina'],$_GET['montoDOC'],$_GET['documento']);
}

if ($_GET['func']=='mostrarSolicitudes()'){
    mostrarSolicitudes();
}

if ($_GET['func']=='saldo()'){
    saldo($_GET['telefono']);
}

if ($_GET['func']=='login()'){
    login($_GET['telefono'],$_GET['contraseña']);
}

if ($_GET['func']=='infoUsuario()'){
    infoUsuario($_GET['telefono']);
}

if ($_GET['func']=='getFecha()'){
    getFecha();
}

if ($_GET['func']=='getGrafico()'){
    getGrafico($_GET['fecha']);
}

if ($_GET['func']=='estadoSolicitud()'){
    estadoSolicitud($_GET['id']);
}

if ($_GET['func']=='mostrarSolicitudesListas()'){
    mostrarSolicitudesListas();
}

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

function conexionCentral(){
    $serverName = "localhost\sqlexpress,1433";
    $connectionInfo = array( "Database"=>"Central", "UID"=>"sa", "PWD"=>"deathnote");
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

function mostrarSolicitudes(){

    $conn = conexion();
    $result = array();

    $sql = "select u.nombre, u.primerApellido,u.segundoApellido, u.correo,s.fecha, s.id,s.telefono,d.documento,s.cantidad,s.color,s.pagina,s.estado
            from  solicitud as s inner join  documento as d on d.idSolicitud = s.id  
            inner join [Central].dbo.usuario as u on s.telefono = u.telefono";
    $stmt = sqlsrv_query( $conn, $sql );

    if($stmt === false) {
        sqlsrv_close($conn);

        $result[] = "Error: mostrar solicitud";
        echo json_encode($result);
    }
    else {

        do {
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
                $result[] = $row;
            }
        }   while (sqlsrv_next_result($stmt));
        sqlsrv_close($conn);
        echo json_encode($result);
    }
}

function saldo($telefono){

    $conn = conexion();
    $result = array();

    $sql = "select c.monto,c.telefono,u.nombre,u.primerApellido,u.primerApellido 
            from 
            [localhost].Central.dbo.usuario as u 
            inner join
            [localhost].Central.dbo.cliente as c on u.telefono = c.telefono
            where c.telefono = '$telefono'";
    $stmt = sqlsrv_query( $conn, $sql );

    if($stmt === false) {
        sqlsrv_close($conn);

        $result[] = "Error: mostrar solicitud";
        echo json_encode($result);
    }
    else {

        do {
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
                $result[] = $row;
            }
        }   while (sqlsrv_next_result($stmt));
        sqlsrv_close($conn);
        echo json_encode($result);
    }
}

function login($telefono,$contraseña){

    $conn = conexionCentral();
    $result = array();

    $sql = "select telefono,nombre,primerApellido,segundoApellido,correo,tipo,pass from usuario where telefono='$telefono' and pass='$contraseña'";
    $stmt = sqlsrv_query( $conn, $sql );

    if($stmt === false) {
        $result[] = "Error: de login";
        echo json_encode($result);
        sqlsrv_close($conn);
    }
    else {

        do {
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
                $result[] = $row;
            }
        }   while (sqlsrv_next_result($stmt));
        sqlsrv_close($conn);
        echo json_encode($result);
    }
}

function infoUsuario($telefono){

    $conn = conexion();
    $result = array();

    $sql = "select correo,nombre from [localhost].Central.dbo.usuario where telefono = '$telefono'";
    $stmt = sqlsrv_query( $conn, $sql );

    if($stmt === false) {
        sqlsrv_close($conn);

        $result[] = "Error: mostrar solicitud";
        echo json_encode($result);
    }
    else {

        do {
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
                $result[] = $row;
            }
        }   while (sqlsrv_next_result($stmt));
        sqlsrv_close($conn);
        echo json_encode($result);
    }
}

function getFecha(){
    $conn = conexion();
    $result = array();

    $sql = " Select convert (varchar(10), getdate(),111) fecha from solicitud ";
    $stmt = sqlsrv_query( $conn, $sql );

    if($stmt === false) {
        sqlsrv_close($conn);

        $result[] = "Error: mostrar solicitud";
        echo json_encode($result);
    }
    else {

        do {
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
                $result[] = $row;
            }
        }   while (sqlsrv_next_result($stmt));
        sqlsrv_close($conn);
        echo json_encode($result);
    }
}

function getGrafico($fecha){
    $conn = conexion();
    $result = array();

    $sql = "exec datosGrafico '$fecha',0 ,0,0,0";
    $stmt = sqlsrv_query( $conn, $sql );

    if($stmt === false) {
        sqlsrv_close($conn);

        $result[] = "Error: mostrar solicitud";
        echo json_encode($result);
    }
    else {

        do {
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
                $result[] = $row;
            }
        }   while (sqlsrv_next_result($stmt));
        sqlsrv_close($conn);
        echo json_encode($result);
    }
}

function estadoSolicitud($id){
    $conn = conexion();
    $result = array();

    $sql = "exec  solicitudLista '$id'";
    $stmt = sqlsrv_query( $conn, $sql );

    if($stmt === false) {
        sqlsrv_close($conn);

        $result[] = "Error: mostrar solicitud";
        echo json_encode($result);
    }
    else {

        echo "Solicitud marcada como lista";
    }
}

function mostrarSolicitudesListas(){

    $conn = conexion();
    $result = array();

    $sql = "select id,telefono,fecha,montoCompra,cantidad,color,pagina,estado from solicitud where estado = 'F'";
    $stmt = sqlsrv_query( $conn, $sql );

    if($stmt === false) {
        sqlsrv_close($conn);

        $result[] = "Error: mostrar solicitud";
        echo json_encode($result);
    }
    else {

        do {
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
                $result[] = $row;
            }
        }   while (sqlsrv_next_result($stmt));
        sqlsrv_close($conn);
        echo json_encode($result);
    }
}