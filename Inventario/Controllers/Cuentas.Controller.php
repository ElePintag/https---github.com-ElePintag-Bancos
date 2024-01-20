<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}


require_once('../Models/Cuentas.model.php');
$cuentas = new Clase_Cuentas;
switch ($_GET["op"]) {
    case 'todos':
        $datos = array(); //defino un arreglo
        $datos = $cuentas->todos(); //llamo al modelo de usuarios e invoco al procedimiento todos y almaceno en una variable
        while ($fila = mysqli_fetch_assoc($datos)) { //recorro el arreglo de datos
            $todos[] = $fila;
        }
        echo json_encode($todos); //devuelvo el arreglo en formato json
        break;
    case "uno":
        $ID_cuenta = $_POST["ID_cuenta"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $cuentas->uno($ID_cuenta); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        $uno = mysqli_fetch_assoc($datos); //recorro el arreglo de datos
        echo json_encode($uno); //devuelvo el arreglo en formato json
        break;
    case 'insertar':
        $ID_banco = $_POST["ID_banco"];
        $Tipo_cuenta = $_POST["Tipo_cuenta"];
        $Saldo = $_POST["Saldo"];

        $datos = array(); //defino un arreglo
        $datos = $cuentas->insertar($ID_banco, $Tipo_cuenta, $Saldo); //llamo al modelo de usuarios e invoco al procedimiento insertar
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
    case 'actualizar':
        $ID_cuenta = $_POST["ID_cuenta"];
        $Tipo_cuenta = $_POST["Tipo_cuenta"];
        $ID_banco = $_POST["ID_banco"];
        $Saldo = $_POST["Saldo"];
        $datos = array(); //defino un arreglo
        $datos = $cuentas->actualizar($ID_cuenta, $ID_banco, $Tipo_cuenta, $Saldo); //llamo al modelo de usuarios e invoco al procedimiento actual
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;

    case 'eliminar':
        $ID_cuenta = $_POST["ID_cuenta"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $cuentas->eliminar($ID_cuenta); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
}
