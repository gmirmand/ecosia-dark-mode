// Declare namespace
var main = main || {};

main.General = function () {
};

main.General.prototype = {
    init: function () {
        NewTabEDK.translations();
    }
};

$(document).ready(function () {
    var g = new main.General();
    g.init();
});

//Start
var NewTabEDK;
NewTabEDK = {
    translations: function() {
        var translate_elmts = $("[data-i18n]");
        for (var i = 0; i < translate_elmts.length; ++i) {
            console.log(translate_elmts);
            var item = translate_elmts[i];
            var key = item.getAttribute('data-i18n');
            item.innerHTML = NewTabEDK.getTranslation(key);
        }
    },
    getTranslation: function(key, params) {
        return chrome.i18n.getMessage(key);
    }
};