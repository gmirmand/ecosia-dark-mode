// Declare namespace
var main = main || {};

main.General = function () {
};

main.General.prototype = {
    init: function () {
        PopupEDK.init();
        PopupEDK.googleSearch();
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
    }
};