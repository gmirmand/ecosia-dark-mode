// Declare namespace
var main = main || {};

main.General = function () {
};

main.General.prototype = {
    init: function () {
        NewTabEDK.init();
        NewTabEDK.translations();
        NewTabEDK.PopupListener();
        NewTabEDK.DonateLink();
    }
};

$(document).ready(function () {
    var g = new main.General();
    g.init();
});

//Start
var NewTabEDK;
NewTabEDK = {
    init: function () {
        chrome.storage.sync.get(['dk'], function (item) {
            NewTabEDK.toggleDK(item.dk !== 'enabled');
        });

        setTimeout(function () {
            $('body').addClass('transitions');
        }, 333);
    },
    translations: function () {
        var translate_elmts = $("[data-i18n]");
        for (var i = 0; i < translate_elmts.length; ++i) {
            var item = translate_elmts[i];
            var key = item.getAttribute('data-i18n');
            item.innerHTML = NewTabEDK.getTranslation(key);
        }
    },
    getTranslation: function (key, params) {
        return chrome.i18n.getMessage(key);
    },
    toggleDK: function (state) {
        if (state === true) {
            $('body').addClass('EDK__body');
        } else if (state === false) {
            $('body').removeClass('EDK__body');
        } else {
            $('body').toggleClass('EDK__body');
        }
    },
    PopupListener: function () {
        chrome.extension.onRequest.addListener(
            function (request, sender, sendResponse) {
                console.log(request.action);
                switch (request.action) {
                    case "switch":
                        NewTabEDK.toggleDK();
                        sendResponse({done: 'switch'});
                        break;

                    case "redirect":
                        chrome.storage.sync.get(['url'], function (result) {
                            var url = result.url;
                            chrome.storage.sync.set({url: ''});

                            window.location.href = url;
                            sendResponse({done: 'redirect to' + url});
                        });
                        break;

                    case "testConnection":
                        sendResponse({done: 'ConnectionSuccess'});
                        break;

                    default:
                        sendResponse({done: 'no action'});
                }
            }
        );
    },
    DonateLink: function () {
        var language = navigator.language.replace('-', '_');
        $('.donate__link').attr("href", 'https://paypal.me/GMirmand?locale.x=' + language || '');
    }
};
