define(
    [
        'a-module', // -> js/a-module.js
        'lib/jump'  // -> js/lib/jump.js
    ], // dependencies
    function(a, jump){
        return {
            blah: a.blah+'eeeee',
            jump: jump
        };
    }
);
