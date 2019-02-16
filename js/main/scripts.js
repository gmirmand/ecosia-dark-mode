// Declare namespace
var main = main || {};

main.General = function () {
};

main.General.prototype = {
    init: function () {
        GlobalEDK.init();
    }
};

$(document).ready(function () {
    var g = new main.General();
    g.init();
});

//Start
var GlobalEDK;
GlobalEDK = {
    //Init
    init: function () {
        console.log("test");
        GlobalEDK.DK_class();
    },
    DK_class: function(){
        $('body').addClass('GlobalEDK');
        console.log("test");
    }
};
console.log("test");