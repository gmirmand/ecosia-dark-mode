// Declare namespace
var main = main || {};

main.General = function () {
};

main.General.prototype = {
    init: function () {
        EDK.init();
    }
};

$(document).ready(function () {
    var g = new main.General();
    g.init();
});

//Start
var EDK;
EDK = {
    //Init
    init: function () {
        console.log("test");
        EDK.DK_class();
    },
    DK_class: function(){
        $('body').addClass('EDK');
        console.log("test");
    }
};
console.log("test");