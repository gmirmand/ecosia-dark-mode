// Declare namespace
var main = main || {};

main.General = function () {
};

main.General.prototype = {
    init: function () {
        PopupEDK.switch();
        PopupEDK.onPopupOpen();
        PopupEDK.googleSearch();
        PopupEDK.closeAlert();
        PopupEDK.showNoDomainAlert();
        PopupEDK.translations();
        PopupEDK.analytics();
    }
};

$(document).ready(function () {
    var g = new main.General();
    g.init();
});

//Start
var PopupEDK;
PopupEDK = {
    service: undefined,
    tracker: undefined,
    tmpConsent: undefined,
    switch: function () {
        var button = $('.switch-onoff__slide');
        button.on('click', function (e) {
            e.preventDefault();
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendRequest(tabs[0].id, {action: "switch"}, function (resp) {
                    if (resp) {
                        if (resp.done === "switch") {
                            PopupEDK.switchBtn();
                        } else {
                            console.log(resp);
                        }
                    }
                });
            });
        });
    },
    logStorage: function (key) {
        chrome.storage.sync.get([key], function (result) {
            console.log(result[key]);
        });
    },
    switchBtn: function () {
        var button = $('.switch-onoff__slide');
        chrome.storage.sync.get(['dk'], function (result) {
            if (result.dk === 'disabled') {
                chrome.storage.sync.set({dk: 'enabled'});
                button.removeClass('open');
            } else {
                chrome.storage.sync.set({dk: 'disabled'});
                button.addClass('open');
            }

            PopupEDK.tracker.sendEvent('Popup', 'Switch', "L'utilisateur a fait un switch", result.dk === 'disabled' ? 'dark enabled' : 'dark disabled');
        });
    },
    onPopupOpen: function () {
        var button = $('.switch-onoff__slide');
        if (chrome.storage !== undefined) {
            chrome.storage.sync.get(['dk'], function (result) {
                if (result.dk === 'disabled') {
                    button.addClass('open');
                } else if (result.dk === 'undefined') {
                    chrome.storage.sync.set({dk: 'disabled'});
                    button.removeClass('open');
                } else {
                    button.removeClass('open');
                }
            });
        }
    },
    googleSearch: function () {
        $('#google-search').on('submit', function () {
            var action = $(this).attr('action');
            $input = $(this).find('.search__input');
            var name = $input.attr('name');
            var value = $input.val();
            var url = action + '?' + name + '=' + value;
            chrome.storage.sync.set({url: url});

            PopupEDK.tracker.sendEvent('Popup', 'Search', "L'utilisateur a fait une recherche google");

            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendRequest(tabs[0].id, {action: "redirect"}, function (resp) {
                    if (resp) {
                        if (resp.done === "redirect") {
                            console.log('Redirected');
                        } else {
                            console.log(resp);
                        }
                    }
                });
            });
        });
    },
    closeAlert: function () {
        var $allAlerts = $('.alert'),
            chromeStorageAlerts = [];
        if (chrome.storage !== undefined) {
            chrome.storage.sync.get(['alerts'], function (result) {
                if (result.alerts !== undefined)
                    chromeStorageAlerts = result.alerts;
                if (chromeStorageAlerts !== undefined) {
                    $.each(chromeStorageAlerts, function (i, value) {
                        $('div[data-alert-id='+value+']').addClass('d-none');
                    });
                }
            });
        }

        setTimeout(function () {
            if ($allAlerts.length !== chromeStorageAlerts.length) {
                $('.warning__container').removeClass('d-none');
            }
        }, 250);

        $('.alert button').on('click', function() {
            PopupEDK.tmpConsent = $(this).data('agree');
        });

        $allAlerts.on('closed.bs.alert', function () {
            if (chrome.storage !== undefined) {
                chromeStorageAlerts.push($(this).data("alert-id"));
                chrome.storage.sync.set({alerts: chromeStorageAlerts});

                if(PopupEDK.tmpConsent) {
                    chrome.storage.sync.set({rgpd_consent: PopupEDK.tmpConsent});
                    PopupEDK.tmpConsent = undefined;
                }
            }
        });
    },
    showNoDomainAlert: function () {

        var tryConnection = new Promise(function (resolve, reject) {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendRequest(tabs[0].id, {action: "testConnection"}, function (resp) {
                    if (resp) {
                        if (resp.done === "ConnectionSuccess") {
                            resolve('ConnectionSuccess');
                        } else {
                            reject(resp);
                        }
                    } else {
                        reject('ConnectionFailed');
                    }
                });
            });
        });

        tryConnection.then(
            function (value) {
                console.log(value);
            }).catch(
            function (error) {
                console.log(error);
                $('.popup__disabled, .popup__container').toggleClass('d-none');
            }
        );
    },
    translations: function() {
        var translate_elmts = $("[data-i18n]");
        for (var i = 0; i < translate_elmts.length; ++i) {
            var item = translate_elmts[i];

            var key = item.getAttribute('data-i18n');
            var target = item.getAttribute('data-i18n-target');

            switch(target) {
                case 'placeholder':
                    item.attr('placeholder', key);
                    break;
                default:
                    item.innerHTML = PopupEDK.getTranslation(key);
            }
        }
    },
    getTranslation: function(key, params) {
        return chrome.i18n.getMessage(key);
    },
    analytics: function() {
        PopupEDK.service = analytics.getService('ecosia_extension');

        PopupEDK.service.getConfig().addCallback(
          function(config) {
              chrome.storage.sync.get(['rgpd_consent'], function (result) {
                  var permitted = result.rgpd_consent;
                  config.setTrackingPermitted(permitted === true);
              });
          });

        PopupEDK.tracker = PopupEDK.service.getTracker('G-TE4M5LGK1Y');  // Supply your GA Tracking ID.

        PopupEDK.tracker.sendAppView('MainView');
    }
};
