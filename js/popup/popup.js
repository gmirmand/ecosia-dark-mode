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
        PopupEDK.switch();
        PopupEDK.onPopupOpen();
    },
    switch: function () {
        var button = $('.switch-onoff__slide');
        button.on('click', function (e) {
            e.preventDefault();
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendRequest(tabs[0].id, {action: "switch"}, function (resp) {
                    if (resp.done === "switch") {
                        PopupEDK.switchBtn();
                    } else {
                        console.log(resp);
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
};