<?php

/**
  * JRequest es una aplicación PHP basada en módulos que controlan una salida
  * requerida por AJAX o IFrames, con el objetivo de agilizar el desarrollo de las
  * aplicaciones web e incorporar menos código PHP dentro de las aplicaciones web.
  *
  * URL: https://github.com/alfa30/JRequest
  *
  * @author Jonathan Delgado Zamorano <jonad.correo@gmail.com>
  * 
  */

// Configuración app
$path_module      = "modules/";// Almacena la ruta de los módulos
$path_module_ejec = "main.php";// Archivo que es ejecutado por modulo
$mode_no_ajax     = false; // Si es true permite siempre la ejecución Ajax aunque no se allá solicitado
$out_ajax         = array();// Almacena la salida Ajax
$out_html         = ""; // Almacena la salida HTML
$end_ejec         = array();// Almacena los módulos que se deben ejecutar al final
$err_no_module    = true;// Si es true muestra error al no encontrase ejecutor del modulo
$modules_cache    = array();// Almacena todos los módulos ejecutados
$show_err         = false;// Permite o denega el error entre los módulos con la variable de configuración `$show_err`.
// Mantiene las variables versiones de la aplicación. *remplazar al subir nueva versión. 
$jrequest         = array(
						"version"   =>"1.6.32",// Número de la versión en String
						"n_version" =>1.632, // Número de la versión en integer
						"name"      =>"jRequest", // Nombre de la aplicación
						// Valida la versión. Si el digito es mayor al entregado retorna true.
						"ver"       =>function($ver = null){
							global $jrequest,$out_html,$out_ajax;
							if ($ver == null) {
								return $jrequest["name"]." v". $jrequest["version"];
							} elseif (gettype($ver) == "string") {
								$ver = $ver."";
								$vern = 0;
								if (strstr($ver, ".")) {
									$indi1 = substr($ver,0,mb_strpos($ver, "."));
									$indi2 = substr($ver,mb_strpos($ver, ".")+1);
									$indi2 = str_replace(".", "", $indi2);
									$vern = ($indi1.".".$indi2)+0;
								} else {
									$vern = $ver+0;
								}
								return $jrequest["ver"]($vern);
							} elseif (gettype($ver) == "integer" || gettype($ver) == "double" || gettype($ver) == "float") {
								if ($jrequest["n_version"] <=$ver) {
									return true;
								} else {
									return false;
								}
							}
						}
					);

// Comprueba si existe directorio, si no existe lo crea.
if (!file_exists($path_module)) if (!mkdir($path_module)) throw new Exception("Could not create directory for modules", 1);

// Ejecuta todo el listado de módulos y los ejecuta
$dir = opendir($path_module);
while ($file = readdir($dir)) {
	$mode = "middle";// Almacena el periodo en el cual se está ejecutando el modulo
	// Excluye los directorios padres
	if ($file != ".." && $file != ".") {
		if (is_dir($path_module.$file)) {
			$path_file_coplet = $path_module.$file."/".$path_module_ejec; // Contiene la ruta completa del modulo
			// Si el modulo existe lo ejecuta
			if (file_exists($path_file_coplet)) {
				$config = array("path"=>$path_file_coplet);// Permite llevar al módulo una configuración que luego le servirá
				// Ejecuta el modulo
				if ($show_err)
					include($path_file_coplet);
				else
					@include($path_file_coplet);
				// Detecta configuración 'end_ejec' si este es true almacena el modulo y lo ejecuta al final
				if (isset($config["end_ejec"]) && $config["end_ejec"] == true) {
					$end_ejec[] = $config;
				}
				$modules_cache[] = $config;
			} else {
				// Define si se genera o no un error de estar mal construido el modulo
				if ($err_no_module)
					throw new Exception("The '$file' module has no executor '$path_module_ejec'", 1);
			}
		}
	}
}

// Ejecuta los módulos declarados como 'end_ejec'
foreach ($end_ejec as $key => $value) {
	$mode   = "end";// Almacena el periodo en el cual se está ejecutando el modulo
	$config = $value;
	include $value["path"];
}

// Si es llamado con la sentencia 'include' este no se ejecuta.
if ((count(get_included_files()) <= count($modules_cache)+1))
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
	} else {
		header('Cache-Control: no-cache, must-revalidate');
		header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
		header('Content-type: text/html; charset=utf-8');

		echo $out_html;
	}
?>