<?php

// config
$path_module      = "modules/";// almacena la ruta de los modulos
$path_module_ejec = "main.php";// archivo que es ejecutado por modulo
$mode_no_ajax     = false; // si es true permite simpre la ajecucion ajax aun que no se alla solicitado
$out_ajax         = array();// almacena la salida ajax
$out_html         = ""; // almacena la salida html
$end_ejec         = array();// almacena los modulos que se deben ejecutar al final
$err_no_module    = true;// si es true muestra error al no encontrase ejecutro del modulo
$modules_cache    = array();// almacena todos los modulos ejecutados

// ejecuta todo el listado de modulos y los ejecuta
$dir = opendir($path_module);
while ($file = readdir($dir)) {
	$mode = "middle";// almacena el periodo en el cual se esta ejecutando el modulo
	// Exclulle los directorios padres
	if ($file != ".." && $file != ".") {
		if (is_dir($path_module.$file)) {
			$path_file_coplet = $path_module.$file."/".$path_module_ejec; // contiene la ruta completa del modulo
			// si el modulo existe lo ejecuta, si no 
			if (file_exists($path_file_coplet)) {
				$config = array("path"=>$path_file_coplet);// permite llevar al modulo unaconfiguracion que luego le cervira
				// Ejecuta el modulo
				include $path_file_coplet;
				// detectacta configuracion end_ejec si este es true almacena el modulo y lo ejecuta al final
				if (isset($config["end_ejec"]) && $config["end_ejec"] == true) {
					$end_ejec[] = $config;
				}
				$modules_cache[] = $config;
			} else {
				// define si se genera o no un error de estar mal contruido el modulo
				if ($err_no_module)
					throw new Exception("The '$file' module has no executor '$path_module_ejec'", 1);
			}
		}
	}
}

// ejecuta los modulos al final
foreach ($end_ejec as $key => $value) {
	$mode = "end";
	$config = $value;
	include $value["path"];
}

if(
	(
		!empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&
		strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'
	) ||
	$mode_no_ajax
){
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json; charset=utf-8');

	echo json_encode($out_ajax);
}else{
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: text/html; charset=utf-8');

	echo $out_html;
}
?>