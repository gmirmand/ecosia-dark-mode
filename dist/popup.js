var PopupEDK,main=main||{};main.General=function(){},main.General.prototype={init:function(){PopupEDK.switch(),PopupEDK.onPopupOpen(),PopupEDK.googleSearch(),PopupEDK.closeAlert(),PopupEDK.showNoDomainAlert(),PopupEDK.translations(),PopupEDK.analytics()}},$(document).ready(function(){(new main.General).init()}),PopupEDK={service:void 0,tracker:void 0,tmpConsent:void 0,switch:function(){$(".switch-onoff__slide").on("click",function(e){e.preventDefault(),chrome.tabs.query({active:!0,currentWindow:!0},function(e){chrome.tabs.sendRequest(e[0].id,{action:"switch"},function(e){e&&("switch"===e.done?PopupEDK.switchBtn():console.log(e))})})})},logStorage:function(n){chrome.storage.sync.get([n],function(e){console.log(e[n])})},switchBtn:function(){var n=$(".switch-onoff__slide");chrome.storage.sync.get(["dk"],function(e){"disabled"===e.dk?(chrome.storage.sync.set({dk:"enabled"}),n.removeClass("open")):(chrome.storage.sync.set({dk:"disabled"}),n.addClass("open")),PopupEDK.tracker.sendEvent("Popup","Switch","L'utilisateur a fait un switch","disabled"===e.dk?"dark enabled":"dark disabled")})},onPopupOpen:function(){var n=$(".switch-onoff__slide");void 0!==chrome.storage&&chrome.storage.sync.get(["dk"],function(e){"disabled"===e.dk?n.addClass("open"):("undefined"===e.dk&&chrome.storage.sync.set({dk:"disabled"}),n.removeClass("open"))})},googleSearch:function(){$("#google-search").on("submit",function(){var e=$(this).attr("action");$input=$(this).find(".search__input");var n=e+"?"+$input.attr("name")+"="+$input.val();chrome.storage.sync.set({url:n}),PopupEDK.tracker.sendEvent("Popup","Search","L'utilisateur a fait une recherche google"),chrome.tabs.query({active:!0,currentWindow:!0},function(e){chrome.tabs.sendRequest(e[0].id,{action:"redirect"},function(e){e&&("redirect"===e.done?console.log("Redirected"):console.log(e))})})})},closeAlert:function(){var e=$(".alert"),n=[];void 0!==chrome.storage&&chrome.storage.sync.get(["alerts"],function(e){void 0!==e.alerts&&(n=e.alerts),void 0!==n&&$.each(n,function(e,n){$("div[data-alert-id="+n+"]").addClass("d-none")})}),setTimeout(function(){e.length!==n.length&&$(".warning__container").removeClass("d-none")},250),$(".alert button").on("click",function(){PopupEDK.tmpConsent=$(this).data("agree")}),e.on("closed.bs.alert",function(){void 0!==chrome.storage&&(n.push($(this).data("alert-id")),chrome.storage.sync.set({alerts:n}),PopupEDK.tmpConsent&&(chrome.storage.sync.set({rgpd_consent:PopupEDK.tmpConsent}),PopupEDK.tmpConsent=void 0))})},showNoDomainAlert:function(){new Promise(function(n,t){chrome.tabs.query({active:!0,currentWindow:!0},function(e){chrome.tabs.sendRequest(e[0].id,{action:"testConnection"},function(e){e?"ConnectionSuccess"===e.done?n("ConnectionSuccess"):t(e):t("ConnectionFailed")})})}).then(function(e){console.log(e)}).catch(function(e){console.log(e),$(".popup__disabled, .popup__container").toggleClass("d-none")})},translations:function(){for(var e=$("[data-i18n]"),n=0;n<e.length;++n){var t=e[n],o=t.getAttribute("data-i18n");switch(t.getAttribute("data-i18n-target")){case"placeholder":t.attr("placeholder",o);break;default:t.innerHTML=PopupEDK.getTranslation(o)}}},getTranslation:function(e,n){return chrome.i18n.getMessage(e)},analytics:function(){PopupEDK.service=analytics.getService("ecosia_extension"),PopupEDK.service.getConfig().addCallback(function(t){chrome.storage.sync.get(["rgpd_consent"],function(e){var n=e.rgpd_consent;t.setTrackingPermitted(!0===n)})}),PopupEDK.tracker=PopupEDK.service.getTracker("G-TE4M5LGK1Y"),PopupEDK.tracker.sendAppView("MainView")}};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvcHVwLmpzIl0sIm5hbWVzIjpbIlBvcHVwRURLIiwibWFpbiIsIkdlbmVyYWwiLCJwcm90b3R5cGUiLCJpbml0Iiwic3dpdGNoIiwib25Qb3B1cE9wZW4iLCJnb29nbGVTZWFyY2giLCJjbG9zZUFsZXJ0Iiwic2hvd05vRG9tYWluQWxlcnQiLCJ0cmFuc2xhdGlvbnMiLCJhbmFseXRpY3MiLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsInNlcnZpY2UiLCJ1bmRlZmluZWQiLCJ0cmFja2VyIiwidG1wQ29uc2VudCIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwiY2hyb21lIiwidGFicyIsInF1ZXJ5IiwiYWN0aXZlIiwiY3VycmVudFdpbmRvdyIsInNlbmRSZXF1ZXN0IiwiaWQiLCJhY3Rpb24iLCJyZXNwIiwiZG9uZSIsInN3aXRjaEJ0biIsImNvbnNvbGUiLCJsb2ciLCJsb2dTdG9yYWdlIiwia2V5Iiwic3RvcmFnZSIsInN5bmMiLCJnZXQiLCJyZXN1bHQiLCJidXR0b24iLCJkayIsInNldCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzZW5kRXZlbnQiLCJ0aGlzIiwiYXR0ciIsIiRpbnB1dCIsImZpbmQiLCJ1cmwiLCJ2YWwiLCIkYWxsQWxlcnRzIiwiY2hyb21lU3RvcmFnZUFsZXJ0cyIsImFsZXJ0cyIsImVhY2giLCJpIiwidmFsdWUiLCJzZXRUaW1lb3V0IiwibGVuZ3RoIiwiZGF0YSIsInB1c2giLCJyZ3BkX2NvbnNlbnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInRoZW4iLCJjYXRjaCIsImVycm9yIiwidG9nZ2xlQ2xhc3MiLCJ0cmFuc2xhdGVfZWxtdHMiLCJpdGVtIiwiZ2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwiZ2V0VHJhbnNsYXRpb24iLCJwYXJhbXMiLCJpMThuIiwiZ2V0TWVzc2FnZSIsImdldFNlcnZpY2UiLCJnZXRDb25maWciLCJhZGRDYWxsYmFjayIsImNvbmZpZyIsInBlcm1pdHRlZCIsInNldFRyYWNr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Q0EsT0FBQXRELE9BQUF1RCxLQUFBQyxXQUFBMUMsSUFFQXpCLFVBQUEsV0FDQVgsU0FBQWUsUUFBQUosVUFBQW9FLFdBQUEsb0JBRUEvRSxTQUFBZSxRQUFBaUUsWUFBQUMsWUFDQSxTQUFBQyxHQUNBNUQsT0FBQWUsUUFBQUMsS0FBQUMsSUFBQSxDQUFBLGdCQUFBLFNBQUFDLEdBQ0EsSUFBQTJDLEVBQUEzQyxFQUFBdUIsYUFDQW1CLEVBQUFFLHNCQUFBLElBQUFELE9BSUFuRixTQUFBaUIsUUFBQWpCLFNBQUFlLFFBQUFzRSxXQUFBLGdCQUVBckYsU0FBQWlCLFFBQUFxRSxZQUFBIiwiZmlsZSI6InBvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVjbGFyZSBuYW1lc3BhY2VcbnZhciBtYWluID0gbWFpbiB8fCB7fTtcblxubWFpbi5HZW5lcmFsID0gZnVuY3Rpb24gKCkge1xufTtcblxubWFpbi5HZW5lcmFsLnByb3RvdHlwZSA9IHtcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFBvcHVwRURLLnN3aXRjaCgpO1xuICAgICAgICBQb3B1cEVESy5vblBvcHVwT3BlbigpO1xuICAgICAgICBQb3B1cEVESy5nb29nbGVTZWFyY2goKTtcbiAgICAgICAgUG9wdXBFREsuY2xvc2VBbGVydCgpO1xuICAgICAgICBQb3B1cEVESy5zaG93Tm9Eb21haW5BbGVydCgpO1xuICAgICAgICBQb3B1cEVESy50cmFuc2xhdGlvbnMoKTtcbiAgICAgICAgUG9wdXBFREsuYW5hbHl0aWNzKCk7XG4gICAgfVxufTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIHZhciBnID0gbmV3IG1haW4uR2VuZXJhbCgpO1xuICAgIGcuaW5pdCgpO1xufSk7XG5cbi8vU3RhcnRcbnZhciBQb3B1cEVESztcblBvcHVwRURLID0ge1xuICAgIHNlcnZpY2U6IHVuZGVmaW5lZCxcbiAgICB0cmFja2VyOiB1bmRlZmluZWQsXG4gICAgdG1wQ29uc2VudDogdW5kZWZpbmVkLFxuICAgIHN3aXRjaDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYnV0dG9uID0gJCgnLnN3aXRjaC1vbm9mZl9fc2xpZGUnKTtcbiAgICAgICAgYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kUmVxdWVzdCh0YWJzWzBdLmlkLCB7YWN0aW9uOiBcInN3aXRjaFwifSwgZnVuY3Rpb24gKHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwLmRvbmUgPT09IFwic3dpdGNoXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQb3B1cEVESy5zd2l0Y2hCdG4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGxvZ1N0b3JhZ2U6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoW2tleV0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdFtrZXldKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzd2l0Y2hCdG46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJ1dHRvbiA9ICQoJy5zd2l0Y2gtb25vZmZfX3NsaWRlJyk7XG4gICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsnZGsnXSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5kayA9PT0gJ2Rpc2FibGVkJykge1xuICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtkazogJ2VuYWJsZWQnfSk7XG4gICAgICAgICAgICAgICAgYnV0dG9uLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtkazogJ2Rpc2FibGVkJ30pO1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBQb3B1cEVESy50cmFja2VyLnNlbmRFdmVudCgnUG9wdXAnLCAnU3dpdGNoJywgXCJMJ3V0aWxpc2F0ZXVyIGEgZmFpdCB1biBzd2l0Y2hcIiwgcmVzdWx0LmRrID09PSAnZGlzYWJsZWQnID8gJ2RhcmsgZW5hYmxlZCcgOiAnZGFyayBkaXNhYmxlZCcpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIG9uUG9wdXBPcGVuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBidXR0b24gPSAkKCcuc3dpdGNoLW9ub2ZmX19zbGlkZScpO1xuICAgICAgICBpZiAoY2hyb21lLnN0b3JhZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoWydkayddLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kayA9PT0gJ2Rpc2FibGVkJykge1xuICAgICAgICAgICAgICAgICAgICBidXR0b24uYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5kayA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe2RrOiAnZGlzYWJsZWQnfSk7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnb29nbGVTZWFyY2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnI2dvb2dsZS1zZWFyY2gnKS5vbignc3VibWl0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFjdGlvbiA9ICQodGhpcykuYXR0cignYWN0aW9uJyk7XG4gICAgICAgICAgICAkaW5wdXQgPSAkKHRoaXMpLmZpbmQoJy5zZWFyY2hfX2lucHV0Jyk7XG4gICAgICAgICAgICB2YXIgbmFtZSA9ICRpbnB1dC5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAkaW5wdXQudmFsKCk7XG4gICAgICAgICAgICB2YXIgdXJsID0gYWN0aW9uICsgJz8nICsgbmFtZSArICc9JyArIHZhbHVlO1xuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe3VybDogdXJsfSk7XG5cbiAgICAgICAgICAgIFBvcHVwRURLLnRyYWNrZXIuc2VuZEV2ZW50KCdQb3B1cCcsICdTZWFyY2gnLCBcIkwndXRpbGlzYXRldXIgYSBmYWl0IHVuZSByZWNoZXJjaGUgZ29vZ2xlXCIpO1xuXG4gICAgICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kUmVxdWVzdCh0YWJzWzBdLmlkLCB7YWN0aW9uOiBcInJlZGlyZWN0XCJ9LCBmdW5jdGlvbiAocmVzcCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3AuZG9uZSA9PT0gXCJyZWRpcmVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlZGlyZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNsb3NlQWxlcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRhbGxBbGVydHMgPSAkKCcuYWxlcnQnKSxcbiAgICAgICAgICAgIGNocm9tZVN0b3JhZ2VBbGVydHMgPSBbXTtcbiAgICAgICAgaWYgKGNocm9tZS5zdG9yYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsnYWxlcnRzJ10sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmFsZXJ0cyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICBjaHJvbWVTdG9yYWdlQWxlcnRzID0gcmVzdWx0LmFsZXJ0cztcbiAgICAgICAgICAgICAgICBpZiAoY2hyb21lU3RvcmFnZUFsZXJ0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChjaHJvbWVTdG9yYWdlQWxlcnRzLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2RpdltkYXRhLWFsZXJ0LWlkPScrdmFsdWUrJ10nKS5hZGRDbGFzcygnZC1ub25lJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoJGFsbEFsZXJ0cy5sZW5ndGggIT09IGNocm9tZVN0b3JhZ2VBbGVydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCgnLndhcm5pbmdfX2NvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjUwKTtcblxuICAgICAgICAkKCcuYWxlcnQgYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBQb3B1cEVESy50bXBDb25zZW50ID0gJCh0aGlzKS5kYXRhKCdhZ3JlZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkYWxsQWxlcnRzLm9uKCdjbG9zZWQuYnMuYWxlcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoY2hyb21lLnN0b3JhZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNocm9tZVN0b3JhZ2VBbGVydHMucHVzaCgkKHRoaXMpLmRhdGEoXCJhbGVydC1pZFwiKSk7XG4gICAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe2FsZXJ0czogY2hyb21lU3RvcmFnZUFsZXJ0c30pO1xuXG4gICAgICAgICAgICAgICAgaWYoUG9wdXBFREsudG1wQ29uc2VudCkge1xuICAgICAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7cmdwZF9jb25zZW50OiBQb3B1cEVESy50bXBDb25zZW50fSk7XG4gICAgICAgICAgICAgICAgICAgIFBvcHVwRURLLnRtcENvbnNlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHNob3dOb0RvbWFpbkFsZXJ0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyIHRyeUNvbm5lY3Rpb24gPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kUmVxdWVzdCh0YWJzWzBdLmlkLCB7YWN0aW9uOiBcInRlc3RDb25uZWN0aW9uXCJ9LCBmdW5jdGlvbiAocmVzcCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3AuZG9uZSA9PT0gXCJDb25uZWN0aW9uU3VjY2Vzc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnQ29ubmVjdGlvblN1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlc3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdDb25uZWN0aW9uRmFpbGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0cnlDb25uZWN0aW9uLnRoZW4oXG4gICAgICAgICAgICBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgICAgICAgICB9KS5jYXRjaChcbiAgICAgICAgICAgIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAkKCcucG9wdXBfX2Rpc2FibGVkLCAucG9wdXBfX2NvbnRhaW5lcicpLnRvZ2dsZUNsYXNzKCdkLW5vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9LFxuICAgIHRyYW5zbGF0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0cmFuc2xhdGVfZWxtdHMgPSAkKFwiW2RhdGEtaTE4bl1cIik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhbnNsYXRlX2VsbXRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRyYW5zbGF0ZV9lbG10c1tpXTtcblxuICAgICAgICAgICAgdmFyIGtleSA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWkxOG4nKTtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pMThuLXRhcmdldCcpO1xuXG4gICAgICAgICAgICBzd2l0Y2godGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAncGxhY2Vob2xkZXInOlxuICAgICAgICAgICAgICAgICAgICBpdGVtLmF0dHIoJ3BsYWNlaG9sZGVyJywga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pbm5lckhUTUwgPSBQb3B1cEVESy5nZXRUcmFuc2xhdGlvbihrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRUcmFuc2xhdGlvbjogZnVuY3Rpb24oa2V5LCBwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIGNocm9tZS5pMThuLmdldE1lc3NhZ2Uoa2V5KTtcbiAgICB9LFxuICAgIGFuYWx5dGljczogZnVuY3Rpb24oKSB7XG4gICAgICAgIFBvcHVwRURLLnNlcnZpY2UgPSBhbmFseXRpY3MuZ2V0U2VydmljZSgnZWNvc2lhX2V4dGVuc2lvbicpO1xuXG4gICAgICAgIFBvcHVwRURLLnNlcnZpY2UuZ2V0Q29uZmlnKCkuYWRkQ2FsbGJhY2soXG4gICAgICAgICAgZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsncmdwZF9jb25zZW50J10sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBwZXJtaXR0ZWQgPSByZXN1bHQucmdwZF9jb25zZW50O1xuICAgICAgICAgICAgICAgICAgY29uZmlnLnNldFRyYWNraW5nUGVybWl0dGVkKHBlcm1pdHRlZCA9PT0gdHJ1ZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIFBvcHVwRURLLnRyYWNrZXIgPSBQb3B1cEVESy5zZXJ2aWNlLmdldFRyYWNrZXIoJ0ctVEU0TTVMR0sxWScpOyAgLy8gU3VwcGx5IHlvdXIgR0EgVHJhY2tpbmcgSUQuXG5cbiAgICAgICAgUG9wdXBFREsudHJhY2tlci5zZW5kQXBwVmlldygnTWFpblZpZXcnKTtcbiAgICB9XG59O1xuIl19
