// root -> js

require([
    'b-module',
    'a-module' // js/a-module.js
], function(a, b){
    alert(a.blah);
    alert(b.blah);
});

