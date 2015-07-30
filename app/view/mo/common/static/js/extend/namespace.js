(function(){
    //local namespace
    if (typeof webos == "undefined") {
        window.webos  = {
            page   : {},
            widget : {},
            data   : {},
            util   : {},
            common : {}
        };
    };
    webos.uniqueId = 0;
    webos.obtainId = function() {
        return "_webos_" + (++webos.uniqueId);
    };
    //over wirte
    $.stringify = function stringify(obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';
            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);

            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null) v = $.stringify(v);
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    };
    //over wirte
    $.parseJSON = function( data ) {
        var rvalidchars = /^[\],:{}\s]*$/,
            rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
            
        if ( typeof data === "object"){
            return data;
        }
        
        if ( typeof data !== "string" || !data ) {
            return null;
        }
        data = $.trim( data );
        if ( rvalidchars.test(data.replace(rvalidescape, "@")
            .replace(rvalidtokens, "]")
            .replace(rvalidbraces, "")) ) {
            return window.JSON && window.JSON.parse ?
                window.JSON.parse( data ) :
                (new Function("return " + data))();
        } else {
        }
    };
})();
