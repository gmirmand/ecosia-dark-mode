// Declare namespace
var main = main || {};

main.General = function () {
};

main.General.prototype = {
    init: function () {
        PopupEDK.init();
    }
};

$(document).ready(function () {
    var g = new main.General();
    g.init();
});

//Start
var PopupEDK;
PopupEDK = {
    //Init
    init: function () {
        console.log("test");
        PopupEDK.switch();
    },
    switch: function(){
        var button = $('.switch-button');

        button.on('click', function(e) {
            e.preventDefault();
            $(button).toggleClass('open');

        });
    }
};
console.log("test");