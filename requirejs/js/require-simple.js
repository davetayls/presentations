// root -> /js
// /js/lib/jquery.js

require([
    'jquery',
    'a', // /js/a.js
    'b', // /js/b.js
    'c'
], function($, a,b,c){
    console.log(a, b, c);
})

