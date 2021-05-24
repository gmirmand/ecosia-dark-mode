// Declare namespace
var newtab = newtab || {};

newtab.General = function () {
};

newtab.General.prototype = {
    init: function () {
        NewTabEDK.init();
        NewTabEDK.translations();
        NewTabEDK.PopupListener();
        NewTabEDK.analytics();
        NewTabEDK.tuto();
    }
};

$(document).ready(function () {
    var g = new newtab.General();
    g.init();
});

//Start
var NewTabEDK;
NewTabEDK = {
    init: function () {
        chrome.storage.sync.get(['dk'], function (item) {
            NewTabEDK.toggleDK(item.dk === 'disabled');
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
    analytics: function () {
        NewTabEDK.service = analytics.getService('ecosia_extension');

        NewTabEDK.service.getConfig().addCallback(
            function (config) {
                chrome.storage.sync.get(['rgpd_consent'], function (result) {
                    var permitted = result.rgpd_consent;
                    config.setTrackingPermitted(permitted === true);
                });
            });

        NewTabEDK.tracker = NewTabEDK.service.getTracker('UA-160182955-1');  // GA Tracking ID.

        NewTabEDK.tracker.sendAppView('NewTabView');

        NewTabEDK.tracker.sendEvent('New tab', 'Open', "L'utilisateur a ouvert un nouvel onglet");

        $('.donate__link').on('click', function () {
            NewTabEDK.tracker.sendEvent('New tab', 'Donate', "L'utilisateur a cliqué sur le bouton de donation");
        });
    },
    tuto: function() {
        var tutoPlayed = localStorage.getItem('tutoPlayed');

        $('.newtab-page__tuto-close').on('click', function () {
            localStorage.setItem('tutoPlayed', true);
            $('.newtab-page__tuto').addClass('hidden');
        });

        if(!tutoPlayed) {
            $('.newtab-page__tuto').removeClass('hidden');
        }
    }
};
