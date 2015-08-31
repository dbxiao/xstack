(function() {
// test Availability
if (typeof document == "undefined" || typeof document.body == "undefined") {
    //if (disk.DEBUG)console.warn("Storage Module Need Document Availability");
    return;
}   
    
if (typeof window.attachEvent != "undefined" 
    && typeof window.localStorage == "undefined") {
    
    // add local storage support
    var localFileName = "_simulateLocalStorage",
        expires = 365,
        formField = null;
        
    var expire = new Date();
    expire.setDate(expires + expire.getDate());
    
    formField = document.createElement("input");
    formField.type = "hidden";
    formField.addBehavior('#default#userData');
    document.body.appendChild(formField);
    formField.expires = expire.toUTCString();
    
    var storage = {
        setItem : function(key, value) {
            formField.load(localFileName);
            formField.setAttribute(key, value);
            formField.save(localFileName);
        },
        getItem : function(key) {
            formField.load(localFileName);
            return formField.getAttribute(key);
        },
        removeItem : function(key) {
            formField.load(localFileName);
            formField.removeAttribute(key);
            formField.save(localFileName);
        },
        clear : function() {
            formField.load(localFileName);
            var d = new Date();
            d.setDate(d.getDate() - 1);
            formField.expires = d.toUTCString();
            formField.save(localFileName);
        }
    };
    window["localStorage"] = storage;
}
})();