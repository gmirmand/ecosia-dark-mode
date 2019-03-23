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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvcHVwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InBvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVjbGFyZSBuYW1lc3BhY2VcclxudmFyIG1haW4gPSBtYWluIHx8IHt9O1xyXG5cclxubWFpbi5HZW5lcmFsID0gZnVuY3Rpb24gKCkge1xyXG59O1xyXG5cclxubWFpbi5HZW5lcmFsLnByb3RvdHlwZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBQb3B1cEVESy5pbml0KCk7XHJcbiAgICAgICAgUG9wdXBFREsuZ29vZ2xlU2VhcmNoKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZyA9IG5ldyBtYWluLkdlbmVyYWwoKTtcclxuICAgIGcuaW5pdCgpO1xyXG59KTtcclxuXHJcbi8vU3RhcnRcclxudmFyIFBvcHVwRURLO1xyXG5Qb3B1cEVESyA9IHtcclxuICAgIC8vSW5pdFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFBvcHVwRURLLnN3aXRjaCgpO1xyXG4gICAgICAgIFBvcHVwRURLLm9uUG9wdXBPcGVuKCk7XHJcbiAgICB9LFxyXG4gICAgc3dpdGNoOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGJ1dHRvbiA9ICQoJy5zd2l0Y2gtb25vZmZfX3NsaWRlJyk7XHJcbiAgICAgICAgYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoe2FjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZX0sIGZ1bmN0aW9uICh0YWJzKSB7XHJcbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kUmVxdWVzdCh0YWJzWzBdLmlkLCB7YWN0aW9uOiBcInN3aXRjaFwifSwgZnVuY3Rpb24gKHJlc3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcC5kb25lID09PSBcInN3aXRjaFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQb3B1cEVESy5zd2l0Y2hCdG4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGxvZ1N0b3JhZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbJ2RrJ10sIGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LmRrKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBzd2l0Y2hCdG46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYnV0dG9uID0gJCgnLnN3aXRjaC1vbm9mZl9fc2xpZGUnKTtcclxuICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbJ2RrJ10sIGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5kayA9PT0gJ2Rpc2FibGVkJykge1xyXG4gICAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe2RrOiAnZW5hYmxlZCd9KTtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe2RrOiAnZGlzYWJsZWQnfSk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFBvcHVwRURLLmxvZ1N0b3JhZ2UoKTtcclxuICAgIH0sXHJcbiAgICBvblBvcHVwT3BlbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBidXR0b24gPSAkKCcuc3dpdGNoLW9ub2ZmX19zbGlkZScpO1xyXG4gICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsnZGsnXSwgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0LmRrID09PSAnZGlzYWJsZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQuZGsgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7ZGs6ICdkaXNhYmxlZCd9KTtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBnb29nbGVTZWFyY2g6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcjZ29vZ2xlLXNlYXJjaCcpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSAkKHRoaXMpLmF0dHIoJ2FjdGlvbicpO1xyXG4gICAgICAgICAgICAkaW5wdXQgPSAkKHRoaXMpLmZpbmQoJy5zZWFyY2hfX2lucHV0Jyk7XHJcbiAgICAgICAgICAgIHZhciBuYW1lID0gJGlucHV0LmF0dHIoJ25hbWUnKTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gJGlucHV0LnZhbCgpO1xyXG4gICAgICAgICAgICB2YXIgdXJsID0gYWN0aW9uICsgJz8nICsgbmFtZSArICc9JyArIHZhbHVlO1xyXG4gICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7dXJsOiB1cmx9KTtcclxuXHJcbiAgICAgICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHthY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWV9LCBmdW5jdGlvbiAodGFicykge1xyXG4gICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZFJlcXVlc3QodGFic1swXS5pZCwge2FjdGlvbjogXCJyZWRpcmVjdFwifSwgZnVuY3Rpb24gKHJlc3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcC5kb25lID09PSBcInJlZGlyZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZWRpcmVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTsiXX0=
