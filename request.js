/**!
  * jRequest.js Javascript Library v1.6.32
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
        var cof = new w.request.config();
        var req = {};
        if (!arg2 && !arg3) {
            fn = arg1;
        } else if (!arg3) {
            fn = arg2;
            req = arg1;
        } else {
            fn = arg3;
            req = arg2;
            for (key in arg1) {
                cof[key] = arg1[key];
            }
        }
        if (cof.recursive) {
            memory_proces.push({"count": 0,"fn": fn,"req": req,"cof": cof});
        }
        w.request_direct(cof, req, fn);
    };
    w.request_direct = function(cof, req, fn) {
        var res = {};
        var err = null;
        var req_send = req;
        for (key in memory_proces) {
            if (memory_proces[key].cof.method == cof.method) {
                for (rkey in memory_proces[key].req) {
                    req_send[rkey] = memory_proces[key].req[rkey];
                }
            }
        }
        ;
        jq.ajax({"dataType": "json","url": cof.path_jrequest,"type": cof.method,"data": req}).success(function(dt) {
            res = dt;
        }).fail(function(gerr) {
            err = gerr;
        }).complete(function() {
            fn(res, err);
        });
    };
    w.request.version = function(ver) {
        return w.request.version.ver(ver);
    };
    w.request.version.Name = "jRequest";
    w.request.version.Version = "1.6.32";
    w.request.version.N_Version = 1.632;
    w.request.version.ver = function(ver) {
        if (!ver) {
            return w.request.version.Name + " v" + w.request.version.Version;
        } else if (typeof ver == "string") {
            ver = ver + "";
            vern = 0;
            if (ver.indexOf(".")) {
                indi1 = ver.substr(0, ver.indexOf("."));
                indi2 = ver.substr(ver.indexOf(".") + 1);
                indi2 = indi2.replace("\.", "");
                vern = parseInt(indi1 + "." + indi2);
            } else {
                vern = ver + 0;
            }
            return w.request.version.ver(vern);
        } else if (typeof ver == "number") {
            if (w.request.version.N_Version <= ver) {
                return true;
            } else {
                return false;
            }
        }
    };
    w.request.config = function() {
        this.recursive = false;
        this.path_jrequest = "/JRequest/request.php";
        this.rounds = 0;
        this.method = "GET";
    }
})(window, jQuery)
