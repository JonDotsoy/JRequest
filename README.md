JRequest
========

JRequest es una aplicación PHP basada en módulos que controlan una salida requerida por AJAX o IFrames, con el objetivo de agilizar el desarrollo de las aplicaciones web e incorporar menos código PHP dentro de las aplicaciones web.

Construir mi primer módulo JRequest
-----------------------------------

### 1.- Crear directorio del modulo

Se debe crear el directorio dentro del directiro `modules/`.

### 2.- Crear ejecutor main

El directorio de nuestro modulo debe de contener el ejecutor `main.php`.

### 3.- Crear salida AJAX o HTML

Dependiendo del resultado requerido ocuparemos la variable de salida `$out_html` o `$out_ajax`.

Para la salida AJAX se ocupara la variable `$out_ajax`.

```
$out_ajax['name'] = "Juan";
```

Para la salida HTML se ocupara la variable $out_html.

```
$out_html .= "<dl><dt>Nombre</dt><dd>Juan</dd></dl>";
```

versiones
---------

### v1.1 [Descargar](https://github.com/alfa30/JRequest/releases/tag/v1.1)

- Permite o denega el error entre los módulos con la variable de configuración `$show_err`.

### v1.0 [Descargar](https://github.com/alfa30/JRequest/releases/tag/v1.0)

- Gestiona y ejecuta módulos.
- Crear carpeta módulos si esta no existe.
- Permite recuperar respuestas de módulos por `include`.
- Permite realizar respuestas mediante AJAX y HTML.
- Puede ejecutar nuevamente un módulo, en cuanto ya se hayan ejecutados todos.
- Permite al módulo almacenar una memoria de configuración `config[]`.
- Se tiene presente la variable `$mode`, para conocer el momento en el que es ejecutado el módulo.

Compatibilidad
--------------

 - PHP 5.4.22.

Licencia
--------

![Atribución-NoComercial-CompartirIgual 4.0 Internacional](http://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)

JRequest por [Jonathan Delgado Zamorano](http://jonad.in/) se distribuye bajo una [Licencia Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional](http://creativecommons.org/licenses/by-nc-sa/4.0/).
Basada en una obra en [https://github.com/alfa30/JRequest/](https://github.com/alfa30/JRequest/).

Esta obra está licenciada bajo la Licencia Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional. Para ver una copia de esta licencia, visita http://creativecommons.org/licenses/by-nc-sa/4.0/.
