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
    }
};

$(document).ready(function () {
    var g = new main.General();
    g.init();
});

//Start
var PopupEDK;
PopupEDK = {
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
    logStorage: function () {
        chrome.storage.sync.get(['dk'], function (result) {
            console.log(result.dk);
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
        });
        PopupEDK.logStorage();
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
                        $('#' + value).addClass('d-none');
                    });
                }
            });
        }

        setTimeout(function () {
            if ($allAlerts.length !== chromeStorageAlerts.length) {
                $('.warning__container').removeClass('d-none');
            }
        }, 250);

        $allAlerts.on('closed.bs.alert', function () {
            if (chrome.storage !== undefined) {
                chromeStorageAlerts.push(this.id);
                chrome.storage.sync.set({alerts: chromeStorageAlerts});
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

            console.log(target);
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
    }
};