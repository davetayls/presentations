define(
    [
        'a-module', // -> js/a-module.js
    ], // dependencies
    function(a){
        return {
            a: new a.A()
        };
    }
);
