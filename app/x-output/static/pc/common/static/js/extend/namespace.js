!function(){"undefined"==typeof webos&&(window.webos={page:{},widget:{},data:{},util:{},common:{}}),webos.uniqueId=0,webos.obtainId=function(){return"_webos_"+ ++webos.uniqueId},$.stringify=function(a){var t=typeof a;if("object"!=t||null===a)return"string"==t&&(a='"'+a+'"'),String(a);var n,w,c=[],g=a&&a.constructor==Array;for(n in a)w=a[n],t=typeof w,a.hasOwnProperty(n)&&("string"==t?w='"'+w+'"':"object"==t&&null!==w&&(w=$.stringify(w)),c.push((g?"":'"'+n+'":')+String(w)));return(g?"[":"{")+String(c)+(g?"]":"}")},$.parseJSON=function(a){var w=/^[\],:{}\s]*$/,c=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,g=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,b=/(?:^|:|,)(?:\s*\[)+/g;return"object"==typeof a?a:"string"==typeof a&&a?(a=$.trim(a),w.test(a.replace(c,"@").replace(g,"]").replace(b,""))?window.JSON&&window.JSON.parse?window.JSON.parse(a):new Function("return "+a)():void 0):null}}();