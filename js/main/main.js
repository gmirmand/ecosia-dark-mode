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
        GlobalEDK.EDK_class();
        GlobalEDK.EDK_image();
        GlobalEDK.PopupListener();
    },
    EDK_class: function () {
        chrome.storage.sync.get(['dk'], function (result) {
            if (result.dk === 'disabled') {
                $('body').addClass('EDK__body');
            }
        });
    },
    EDK_image: function () {
        //Logo on main page
        $('.logos-container a').append(
            '<img src="https://i.ibb.co/hdLbcZC/logo-ecosia-dark-full.png" alt="Ecosia" border="0">'
        );

        //this permit to add a filter to svg image that are place in background without applying the filter on the child content
        $('.info-section').each(function () {
            $(this).append('<div class="bg-filter"></div>')
        });
    },
    PopupListener: function () {
        chrome.extension.onRequest.addListener(
            function (request, sender, sendResponse) {
                if (request.action === "switch") {
                    $('body').toggleClass('EDK__body');
                    sendResponse({done: 'switch'});
                } else {
                    sendResponse({done: 'no action'});
                }
            });
    }
};