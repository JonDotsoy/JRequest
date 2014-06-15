/**!
  * jRequest.js Javascript Library v1.6.36
  * https://github.com/alfa30/JRequest
  * 
  * Copyright 2014 jonad.in. and other contributors
  *
  * Released under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 license
  * https://raw.githubusercontent.com/alfa30/JRequest/master/LICENSE
  *
  * @author Jonathan Delgado Zamorano <jonad.correo@gmail.com>
  */
(function(w, jq) {
    var memory_proces = [];
    w.request = function(arg1, arg2, arg3) {
        var fn = function(res) {
        };
        var cof = new w.request._config();
        var req = {};
        if (!arg2 && !arg3) {
            fn = arg1;
        } else if (!arg3) {
            fn  = arg2;
            req = arg1;
        } else {
            fn  = arg3;
            req = arg2;
            for (key in arg1) {
                cof[key] = arg1[key];
            }
        }

        /* Si la variable de configuracion "recursive" es true, no envia el request si no que lo almacena para ejecutarlo en cada request. */
        if (cof.recursive) {
            memory_proces.push({"count": 0,"fn": fn,"req": req,"cof": cof});
        } else {
            w.request_direct(cof, req, fn);
        }
    };
    w.request_direct = function(cof, req, fn) {
        var res = {};
        var err = null;
        var req_send = req;
        /* remplasa las variables request que se alacenaron en la memoria de procesos */
        for (key in memory_proces) {
            /* Si la memoria indica que el mentod es igual al utilizado actualmente, se procede a remplazar las variables request */
            if (memory_proces[key].cof.method.toUpperCase() == cof.method.toUpperCase()) {
                for (rkey in memory_proces[key].req) {
                    req_send[rkey] = memory_proces[key].req[rkey];
                }
            }
        };
        jq.ajax({"dataType": "json","url": cof.path_jrequest,"type": cof.method,"data": req}).success(function(dt) {
            res = dt;
        }).fail(function(gerr) {
            err = gerr;
        }).complete(function() {
            /* Recorreo la memoria de procesos */
            for (key in memory_proces) {
                /* Si el metodo de request es igual al acutal se ejecuta la funcion o si el proceso en la memoria es "REQUEST" */
                if (memory_proces[key].cof.method.toUpperCase() == cof.method.toUpperCase() || memory_proces[key].cof.method.toUpperCase() == "REQUEST") {
                    memory_proces[key].fn(res, err);
                };
            }
            fn(res, err);
        });
    };
    // contiene las configuraciones por defecto
    w.request.config = {
        recursive       : false,
        path_jrequest   : "/JRequest/request.php",
        rounds          : 0,
        method          : "GET"
    }
    w.request._config = function() {
        this.recursive     = w.request.config.recursive;
        this.path_jrequest = w.request.config.path_jrequest;
        this.rounds        = w.request.config.rounds;
        this.method        = w.request.config.method;
    }
})(window, jQuery)
