!function(){if("undefined"!=typeof document&&"undefined"!=typeof document.body&&"undefined"!=typeof window.attachEvent&&"undefined"==typeof window.localStorage){var e="_simulateLocalStorage",t=365,n=null,a=new Date;a.setDate(t+a.getDate()),n=document.createElement("input"),n.type="hidden",n.addBehavior("#default#userData"),document.body.appendChild(n),n.expires=a.toUTCString();var o={setItem:function(t,a){n.load(e),n.setAttribute(t,a),n.save(e)},getItem:function(t){return n.load(e),n.getAttribute(t)},removeItem:function(t){n.load(e),n.removeAttribute(t),n.save(e)},clear:function(){n.load(e);var t=new Date;t.setDate(t.getDate()-1),n.expires=t.toUTCString(),n.save(e)}};window.localStorage=o}}();