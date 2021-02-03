// Declare namespace
var global = global || {};

global.General = function () {
};

global.General.prototype = {
    init: function () {
        GlobalEDK.DonateLink();
    }
};

$(document).ready(function () {
    var g = new global.General();
    g.init();
});

//Start
var GlobalEDK;
GlobalEDK = {
    DonateLink: function () {
        var language = navigator.language.replace('-', '_');
        $('.newtab-page .donate__link, .popup__body .donate__link').attr("href", 'https://paypal.me/GMirmand?locale.x=' + language || '');
    }
};