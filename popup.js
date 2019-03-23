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
                    if (resp.done === "redirect") {
                        console.log('Redirected');
                    } else {
                        console.log(resp);
                    }
                });
            });
        });
    }
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvcHVwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJwb3B1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlY2xhcmUgbmFtZXNwYWNlXHJcbnZhciBtYWluID0gbWFpbiB8fCB7fTtcclxuXHJcbm1haW4uR2VuZXJhbCA9IGZ1bmN0aW9uICgpIHtcclxufTtcclxuXHJcbm1haW4uR2VuZXJhbC5wcm90b3R5cGUgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgUG9wdXBFREsuaW5pdCgpO1xyXG4gICAgICAgIFBvcHVwRURLLmdvb2dsZVNlYXJjaCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGcgPSBuZXcgbWFpbi5HZW5lcmFsKCk7XHJcbiAgICBnLmluaXQoKTtcclxufSk7XHJcblxyXG4vL1N0YXJ0XHJcbnZhciBQb3B1cEVESztcclxuUG9wdXBFREsgPSB7XHJcbiAgICAvL0luaXRcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBQb3B1cEVESy5zd2l0Y2goKTtcclxuICAgICAgICBQb3B1cEVESy5vblBvcHVwT3BlbigpO1xyXG4gICAgfSxcclxuICAgIHN3aXRjaDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBidXR0b24gPSAkKCcuc3dpdGNoLW9ub2ZmX19zbGlkZScpO1xyXG4gICAgICAgIGJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHthY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWV9LCBmdW5jdGlvbiAodGFicykge1xyXG4gICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZFJlcXVlc3QodGFic1swXS5pZCwge2FjdGlvbjogXCJzd2l0Y2hcIn0sIGZ1bmN0aW9uIChyZXNwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3AuZG9uZSA9PT0gXCJzd2l0Y2hcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQb3B1cEVESy5zd2l0Y2hCdG4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgbG9nU3RvcmFnZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsnZGsnXSwgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGspO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHN3aXRjaEJ0bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBidXR0b24gPSAkKCcuc3dpdGNoLW9ub2ZmX19zbGlkZScpO1xyXG4gICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsnZGsnXSwgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0LmRrID09PSAnZGlzYWJsZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7ZGs6ICdlbmFibGVkJ30pO1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7ZGs6ICdkaXNhYmxlZCd9KTtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5hZGRDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUG9wdXBFREsubG9nU3RvcmFnZSgpO1xyXG4gICAgfSxcclxuICAgIG9uUG9wdXBPcGVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGJ1dHRvbiA9ICQoJy5zd2l0Y2gtb25vZmZfX3NsaWRlJyk7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoWydkayddLCBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZGsgPT09ICdkaXNhYmxlZCcpIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5hZGRDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5kayA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtkazogJ2Rpc2FibGVkJ30pO1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24ucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGdvb2dsZVNlYXJjaDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJyNnb29nbGUtc2VhcmNoJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9ICQodGhpcykuYXR0cignYWN0aW9uJyk7XHJcbiAgICAgICAgICAgICRpbnB1dCA9ICQodGhpcykuZmluZCgnLnNlYXJjaF9faW5wdXQnKTtcclxuICAgICAgICAgICAgdmFyIG5hbWUgPSAkaW5wdXQuYXR0cignbmFtZScpO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAkaW5wdXQudmFsKCk7XHJcbiAgICAgICAgICAgIHZhciB1cmwgPSBhY3Rpb24gKyAnPycgKyBuYW1lICsgJz0nICsgdmFsdWU7XHJcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHt1cmw6IHVybH0pO1xyXG5cclxuICAgICAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoe2FjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZX0sIGZ1bmN0aW9uICh0YWJzKSB7XHJcbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kUmVxdWVzdCh0YWJzWzBdLmlkLCB7YWN0aW9uOiBcInJlZGlyZWN0XCJ9LCBmdW5jdGlvbiAocmVzcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwLmRvbmUgPT09IFwicmVkaXJlY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVkaXJlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTsiXX0=
