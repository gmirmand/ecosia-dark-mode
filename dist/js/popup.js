var PopupEDK,main=main||{};main.General=function(){},main.General.prototype={init:function(){PopupEDK.switch(),PopupEDK.onPopupOpen(),PopupEDK.googleSearch(),PopupEDK.closeAlert(),PopupEDK.showNoDomainAlert(),PopupEDK.translations(),PopupEDK.analytics(),setTimeout(function(){$("body").addClass("transitions")},333)}},$(document).ready(function(){(new main.General).init()}),PopupEDK={service:void 0,tracker:void 0,tmpConsent:void 0,switch:function(){$(".switch-onoff__slide").on("click",function(e){e.preventDefault(),chrome.tabs.query({active:!0,currentWindow:!0},function(e){chrome.tabs.sendRequest(e[0].id,{action:"switch"},function(e){PopupEDK.switchBtn()})})})},logStorage:function(n){chrome.storage.sync.get([n],function(e){console.log(e[n])})},addBodyClass:function(e){!0===e?$("body").removeClass("EDK__body"):!1===e&&$("body").addClass("EDK__body")},switchBtn:function(){var o=$(".switch-onoff__slide");chrome.storage.sync.get(["dk"],function(e){"disabled"===e.dk?(chrome.storage.sync.set({dk:"enabled"}),o.removeClass("open"),PopupEDK.addBodyClass(!0)):(chrome.storage.sync.set({dk:"disabled"}),o.addClass("open"),PopupEDK.addBodyClass(!1));var n="disabled"===e.dk?"dark enabled":"dark disabled";PopupEDK.tracker.sendEvent("Popup","Switch","L'utilisateur a fait un switch | Status : "+n)})},onPopupOpen:function(){var n=$(".switch-onoff__slide");void 0!==chrome.storage&&chrome.storage.sync.get(["dk"],function(e){"disabled"===e.dk?(n.addClass("open"),PopupEDK.addBodyClass(!1)):("undefined"===e.dk&&chrome.storage.sync.set({dk:"disabled"}),n.removeClass("open"),PopupEDK.addBodyClass(!0))})},googleSearch:function(){$("#google-search").on("submit",function(){PopupEDK.tracker.sendEvent("Popup","Search","L'utilisateur a fait une recherche google");var e=$(this).attr("action");$input=$(this).find(".search__input");var n=e+"?"+$input.attr("name")+"="+$input.val();chrome.storage.sync.set({url:n}),chrome.tabs.query({active:!0,currentWindow:!0},function(e){chrome.tabs.sendRequest(e[0].id,{action:"redirect"},function(e){e&&("redirect"===e.done?console.log("Redirected"):console.log(e))})})})},closeAlert:function(){var e=$(".alert"),n=[];void 0!==chrome.storage&&chrome.storage.sync.get(["alerts"],function(e){void 0!==e.alerts&&(n=e.alerts),void 0!==n&&$.each(n,function(e,n){$("div[data-alert-id="+n+"]").addClass("d-none")})}),setTimeout(function(){e.length!==n.length&&$(".warning__container").removeClass("d-none")},250),$(".alert button").on("click",function(){PopupEDK.tmpConsent=$(this).data("agree")}),e.on("closed.bs.alert",function(){void 0!==chrome.storage&&(n.push($(this).data("alert-id")),chrome.storage.sync.set({alerts:n}),PopupEDK.tmpConsent&&(chrome.storage.sync.set({rgpd_consent:PopupEDK.tmpConsent}),PopupEDK.tmpConsent=void 0))})},showNoDomainAlert:function(){new Promise(function(n,o){chrome.tabs.query({active:!0,currentWindow:!0},function(e){chrome.tabs.sendRequest(e[0].id,{action:"testConnection"},function(e){e?"ConnectionSuccess"===e.done?n("ConnectionSuccess"):o(e):o("ConnectionFailed")})})}).then(function(e){console.log(e)}).catch(function(e){console.error(e),$(".popup__not-on-domain-warning").toggleClass("d-none")})},translations:function(){for(var e=$("[data-i18n]"),n=0;n<e.length;++n){var o=e[n],t=o.getAttribute("data-i18n");switch(o.getAttribute("data-i18n-target")){case"placeholder":o.attr("placeholder",t);break;default:o.innerHTML=PopupEDK.getTranslation(t)}}},getTranslation:function(e,n){return chrome.i18n.getMessage(e)},analytics:function(){PopupEDK.service=analytics.getService("ecosia_extension"),PopupEDK.service.getConfig().addCallback(function(o){chrome.storage.sync.get(["rgpd_consent"],function(e){var n=e.rgpd_consent;o.setTrackingPermitted(!0===n)})}),PopupEDK.tracker=PopupEDK.service.getTracker("UA-160182955-1"),PopupEDK.tracker.sendAppView("MainView"),PopupEDK.tracker.sendEvent("Popup","Open","L'utilisateur a ouvert la popup"),$(".donate__link").on("click",function(){PopupEDK.tracker.sendEvent("Popup","Donate","L'utilisateur a cliqué sur le bouton de donation")})}};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvcHVwLmpzIl0sIm5hbWVzIjpbIlBvcHVwRURLIiwibWFpbiIsIkdlbmVyYWwiLCJwcm90b3R5cGUiLCJpbml0Iiwic3dpdGNoIiwib25Qb3B1cE9wZW4iLCJnb29nbGVTZWFyY2giLCJjbG9zZUFsZXJ0Iiwic2hvd05vRG9tYWluQWxlcnQiLCJ0cmFuc2xhdGlvbnMiLCJhbmFseXRpY3MiLCJzZXRUaW1lb3V0IiwiJCIsImFkZENsYXNzIiwiZG9jdW1lbnQiLCJyZWFkeSIsInNlcnZpY2UiLCJ1bmRlZmluZWQiLCJ0cmFja2VyIiwidG1wQ29uc2VudCIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwiY2hyb21lIiwidGFicyIsInF1ZXJ5IiwiYWN0aXZlIiwiY3VycmVudFdpbmRvdyIsInNlbmRSZXF1ZXN0IiwiaWQiLCJhY3Rpb24iLCJyZXNwIiwic3dpdGNoQnRuIiwibG9nU3RvcmFnZSIsImtleSIsInN0b3JhZ2UiLCJzeW5jIiwiZ2V0IiwicmVzdWx0IiwiY29uc29sZSIsImxvZyIsImFkZEJvZHlDbGFzcyIsImlzRGFyayIsInJlbW92ZUNsYXNzIiwiYnV0dG9uIiwiZGsiLCJzZXQiLCJzdGF0dXMiLCJzZW5kRXZlbnQiLCJ0aGlzIiwiYXR0ciIsIiRpbnB1dCIsImZpbmQiLCJ1cmwiLCJ2YWwiLCJkb25lIiwiJGFsbEFsZXJ0cyIsImNocm9tZVN0b3JhZ2VBbGVydHMiLCJhbGVydHMiLCJlYWNoIiwiaSIsInZhbHVlIiwibGVuZ3RoIiwiZGF0YSIsInB1c2giLCJyZ3BkX2NvbnNlbnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInRoZW4iLCJjYXRjaCIsImVycm9yIiwidG9nZ2xlQ2xhc3MiLCJ0cmFuc2xhdGVfZWxtdHMiLCJpdGVtIiwiZ2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwiZ2V0VHJhbnNsYXRpb24iLCJwYXJhbXMiLCJpMThuIiwiZ2V0TWVzc2FnZSIsImdldFNlcnZpY2UiLCJnZXRDb25maWciLCJhZGRDYWxsYmFjayIsImNvbmZpZyIsInBlcm1pdHRlZCIsInNldFRyYWNraW5nUGVybWl0dGVkIiwiZ2V0VHJhY2tlciIsInNlbmRBcHBWaWV3Il0sIm1hcHBpbmdzIjoiQUFDQSxJQTJCQUEsU0EzQkFDLEtBQUFBLE1BQUEsR0FFQUEsS0FBQUMsUUFBQSxhQUdBRCxLQUFBQyxRQUFBQyxVQUFBLENBQ0FDLEtBQUEsV0FDQUosU0FBQUssU0FDQUwsU0FBQU0sY0FDQU4sU0FBQU8sZUFDQVAsU0FBQVEsYUFDQVIsU0FBQVMsb0JBQ0FULFNBQUFVLGVBQ0FWLFNBQUFXLFlBRUFDLFdBQUEsV0FDQUMsRUFBQSxRQUFBQyxTQUFBLGdCQUNBLE9BSUFELEVBQUFFLFVBQUFDLE1BQUEsWUFDQSxJQUFBZixLQUFBQyxTQUNBRSxTQUtBSixTQUFBLENBQ0FpQixhQUFBQyxFQUNBQyxhQUFBRCxFQUNBRSxnQkFBQUYsRUFDQWIsT0FBQSxXQUNBUSxFQUFBLHdCQUNBUSxHQUFBLFFBQUEsU0FBQUMsR0FDQUEsRUFBQUMsaUJBQ0FDLE9BQUFDLEtBQUFDLE1BQUEsQ0FBQUMsUUFBQSxFQUFBQyxlQUFBLEdBQUEsU0FBQUgsR0FDQUQsT0FBQUMsS0FBQUksWUFBQUosRUFBQSxHQUFBSyxHQUFBLENBQUFDLE9BQUEsVUFBQSxTQUFBQyxHQUNBaEMsU0FBQWlDLG1CQUtBQyxXQUFBLFNBQUFDLEdBQ0FYLE9BQUFZLFFBQUFDLEtBQUFDLElBQUEsQ0FBQUgsR0FBQSxTQUFBSSxHQUNBQyxRQUFBQyxJQUFBRixFQUFBSixPQUdBTyxhQUFBLFNBQUFDLElBQ0EsSUFBQUEsRUFDQTlCLEVBQUEsUUFBQStCLFlBQUEsY0FDQSxJQUFBRCxHQUNBOUIsRUFBQSxRQUFBQyxTQUFBLGNBR0FtQixVQUFBLFdBQ0EsSUFBQVksRUFBQWhDLEVBQUEsd0JBQ0FXLE9BQUFZLFFBQUFDLEtBQUFDLElBQUEsQ0FBQSxNQUFBLFNBQUFDLEdBQ0EsYUFBQUEsRUFBQU8sSUFDQXRCLE9BQUFZLFFBQUFDLEtBQUFVLElBQUEsQ0FBQUQsR0FBQSxZQUNBRCxFQUFBRCxZQUFBLFFBQ0E1QyxTQUFBMEMsY0FBQSxLQUVBbEIsT0FBQVksUUFBQUMsS0FBQVUsSUFBQSxDQUFBRCxHQUFBLGFBQ0FELEVBQUEvQixTQUFBLFFBQ0FkLFNBQUEwQyxjQUFBLElBR0EsSUFBQU0sRUFBQSxhQUFBVCxFQUFBTyxHQUFBLGVBQUEsZ0JBQ0E5QyxTQUFBbUIsUUFBQThCLFVBQUEsUUFBQSxTQUFBLDZDQUFBRCxNQUdBMUMsWUFBQSxXQUNBLElBQUF1QyxFQUFBaEMsRUFBQSw2QkFDQUssSUFBQU0sT0FBQVksU0FDQVosT0FBQVksUUFBQUMsS0FBQUMsSUFBQSxDQUFBLE1BQUEsU0FBQUMsR0FDQSxhQUFBQSxFQUFBTyxJQUNBRCxFQUFBL0IsU0FBQSxRQUNBZCxTQUFBMEMsY0FBQSxLQUNBLGNBQUFILEVBQUFPLElBQ0F0QixPQUFBWSxRQUFBQyxLQUFBVSxJQUFBLENBQUFELEdBQUEsYUFDQUQsRUFBQUQsWUFBQSxRQUNBNUMsU0FBQTBDLGNBQUEsT0FRQW5DLGFBQUEsV0FDQU0sRUFBQSxrQkFBQVEsR0FBQSxTQUFBLFdBQ0FyQixTQUFBbUIsUUFBQThCLFVBQUEsUUFBQSxTQUFBLDZDQUVBLElBQUFsQixFQUFBbEIsRUFBQXFDLE1BQUFDLEtBQUEsVUFDQUMsT0FBQXZDLEVBQUFxQyxNQUFBRyxLQUFBLGtCQUNBLElBRUFDLEVBQUF2QixFQUFBLElBRkFxQixPQUFBRCxLQUFBLFFBRUEsSUFEQUMsT0FBQUcsTUFFQS9CLE9BQUFZLFFBQUFDLEtBQUFVLElBQUEsQ0FBQU8sSUFBQUEsSUFFQTlCLE9BQUFDLEtBQUFDLE1BQUEsQ0FBQUMsUUFBQSxFQUFBQyxlQUFBLEdBQUEsU0FBQUgsR0FDQUQsT0FBQUMsS0FBQUksWUFBQUosRUFBQSxHQUFBSyxHQUFBLENBQUFDLE9BQUEsWUFBQSxTQUFBQyxHQUNBQSxJQUNBLGFBQUFBLEVBQUF3QixLQUNBaEIsUUFBQUMsSUFBQSxjQUVBRCxRQUFBQyxJQUFBVCxXQU9BeEIsV0FBQSxXQUNBLElBQUFpRCxFQUFBNUMsRUFBQSxVQUNBNkMsRUFBQSxRQUNBeEMsSUFBQU0sT0FBQVksU0FDQVosT0FBQVksUUFBQUMsS0FBQUMsSUFBQSxDQUFBLFVBQUEsU0FBQUMsUUFDQXJCLElBQUFxQixFQUFBb0IsU0FDQUQsRUFBQW5CLEVBQUFvQixhQUNBekMsSUFBQXdDLEdBQ0E3QyxFQUFBK0MsS0FBQUYsRUFBQSxTQUFBRyxFQUFBQyxHQUNBakQsRUFBQSxxQkFBQWlELEVBQUEsS0FBQWhELFNBQUEsY0FNQUYsV0FBQSxXQUNBNkMsRUFBQU0sU0FBQUwsRUFBQUssUUFDQWxELEVBQUEsdUJBQUErQixZQUFBLFdBRUEsS0FFQS9CLEVBQUEsaUJBQUFRLEdBQUEsUUFBQSxXQUNBckIsU0FBQW9CLFdBQUFQLEVBQUFxQyxNQUFBYyxLQUFBLFdBR0FQLEVBQUFwQyxHQUFBLGtCQUFBLGdCQUNBSCxJQUFBTSxPQUFBWSxVQUNBc0IsRUFBQU8sS0FBQXBELEVBQUFxQyxNQUFBYyxLQUFBLGFBQ0F4QyxPQUFBWSxRQUFBQyxLQUFBVSxJQUFBLENBQUFZLE9BQUFELElBRUExRCxTQUFBb0IsYUFDQUksT0FBQVksUUFBQUMsS0FBQVUsSUFBQSxDQUFBbUIsYUFBQWxFLFNBQUFvQixhQUNBcEIsU0FBQW9CLGdCQUFBRixPQUtBVCxrQkFBQSxXQUNBLElBQUEwRCxRQUFBLFNBQUFDLEVBQUFDLEdBQ0E3QyxPQUFBQyxLQUFBQyxNQUFBLENBQUFDLFFBQUEsRUFBQUMsZUFBQSxHQUFBLFNBQUFILEdBQ0FELE9BQUFDLEtBQUFJLFlBQUFKLEVBQUEsR0FBQUssR0FBQSxDQUFBQyxPQUFBLGtCQUFBLFNBQUFDLEdBQ0FBLEVBQ0Esc0JBQUFBLEVBQUF3QixLQUNBWSxFQUFBLHFCQUVBQyxFQUFBckMsR0FHQXFDLEVBQUEsMEJBTUFDLEtBQ0EsU0FBQVIsR0FDQXRCLFFBQUFDLElBQUFxQixLQUNBUyxNQUNBLFNBQUFDLEdBQ0FoQyxRQUFBZ0MsTUFBQUEsR0FDQTNELEVBQUEsaUNBQUE0RCxZQUFBLGFBSUEvRCxhQUFBLFdBRUEsSUFEQSxJQUFBZ0UsRUFBQTdELEVBQUEsZUFDQWdELEVBQUEsRUFBQUEsRUFBQWEsRUFBQVgsU0FBQUYsRUFBQSxDQUNBLElBQUFjLEVBQUFELEVBQUFiLEdBRUExQixFQUFBd0MsRUFBQUMsYUFBQSxhQUdBLE9BRkFELEVBQUFDLGFBQUEscUJBR0EsSUFBQSxjQUNBRCxFQUFBeEIsS0FBQSxjQUFBaEIsR0FDQSxNQUNBLFFBQ0F3QyxFQUFBRSxVQUFBN0UsU0FBQThFLGVBQUEzQyxNQUlBMkMsZUFBQSxTQUFBM0MsRUFBQTRDLEdBQ0EsT0FBQXZELE9BQUF3RCxLQUFBQyxXQUFBOUMsSUFFQXhCLFVBQUEsV0FDQVgsU0FBQWlCLFFBQUFOLFVBQUF1RSxXQUFBLG9CQUVBbEYsU0FBQWlCLFFBQUFrRSxZQUFBQyxZQUNBLFNBQUFDLEdBQ0E3RCxPQUFBWSxRQUFBQyxLQUFBQyxJQUFBLENBQUEsZ0JBQUEsU0FBQUMsR0FDQSxJQUFBK0MsRUFBQS9DLEVBQUEyQixhQUNBbUIsRUFBQUUsc0JBQUEsSUFBQUQsT0FJQXRGLFNBQUFtQixRQUFBbkIsU0FBQWlCLFFBQUF1RSxXQUFBLGtCQUVBeEYsU0FBQW1CLFFBQUFzRSxZQUFBLFlBRUF6RixTQUFBbUIsUUFBQThCLFVBQUEsUUFBQSxPQUFBLG1DQUVBcEMsRUFBQSxpQkFBQVEsR0FBQSxRQUFBLFdBQ0FyQixTQUFBbUIsUUFBQThCLFVBQUEsUUFBQSxTQUFBIiwiZmlsZSI6InBvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVjbGFyZSBuYW1lc3BhY2VcbnZhciBtYWluID0gbWFpbiB8fCB7fTtcblxubWFpbi5HZW5lcmFsID0gZnVuY3Rpb24gKCkge1xufTtcblxubWFpbi5HZW5lcmFsLnByb3RvdHlwZSA9IHtcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFBvcHVwRURLLnN3aXRjaCgpO1xuICAgICAgICBQb3B1cEVESy5vblBvcHVwT3BlbigpO1xuICAgICAgICBQb3B1cEVESy5nb29nbGVTZWFyY2goKTtcbiAgICAgICAgUG9wdXBFREsuY2xvc2VBbGVydCgpO1xuICAgICAgICBQb3B1cEVESy5zaG93Tm9Eb21haW5BbGVydCgpO1xuICAgICAgICBQb3B1cEVESy50cmFuc2xhdGlvbnMoKTtcbiAgICAgICAgUG9wdXBFREsuYW5hbHl0aWNzKCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3RyYW5zaXRpb25zJyk7XG4gICAgICAgIH0sIDMzMylcbiAgICB9XG59O1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGcgPSBuZXcgbWFpbi5HZW5lcmFsKCk7XG4gICAgZy5pbml0KCk7XG59KTtcblxuLy9TdGFydFxudmFyIFBvcHVwRURLO1xuUG9wdXBFREsgPSB7XG4gICAgc2VydmljZTogdW5kZWZpbmVkLFxuICAgIHRyYWNrZXI6IHVuZGVmaW5lZCxcbiAgICB0bXBDb25zZW50OiB1bmRlZmluZWQsXG4gICAgc3dpdGNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBidXR0b24gPSAkKCcuc3dpdGNoLW9ub2ZmX19zbGlkZScpO1xuICAgICAgICBidXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHthY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWV9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRSZXF1ZXN0KHRhYnNbMF0uaWQsIHthY3Rpb246IFwic3dpdGNoXCJ9LCBmdW5jdGlvbiAocmVzcCkge1xuICAgICAgICAgICAgICAgICAgICBQb3B1cEVESy5zd2l0Y2hCdG4oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGxvZ1N0b3JhZ2U6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoW2tleV0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdFtrZXldKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBhZGRCb2R5Q2xhc3M6IGZ1bmN0aW9uIChpc0RhcmspIHtcbiAgICAgICAgaWYgKGlzRGFyayA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdFREtfX2JvZHknKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0RhcmsgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ0VES19fYm9keScpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzd2l0Y2hCdG46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJ1dHRvbiA9ICQoJy5zd2l0Y2gtb25vZmZfX3NsaWRlJyk7XG4gICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsnZGsnXSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5kayA9PT0gJ2Rpc2FibGVkJykge1xuICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtkazogJ2VuYWJsZWQnfSk7XG4gICAgICAgICAgICAgICAgYnV0dG9uLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgUG9wdXBFREsuYWRkQm9keUNsYXNzKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7ZGs6ICdkaXNhYmxlZCd9KTtcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICBQb3B1cEVESy5hZGRCb2R5Q2xhc3MoZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gcmVzdWx0LmRrID09PSAnZGlzYWJsZWQnID8gJ2RhcmsgZW5hYmxlZCcgOiAnZGFyayBkaXNhYmxlZCc7XG4gICAgICAgICAgICBQb3B1cEVESy50cmFja2VyLnNlbmRFdmVudCgnUG9wdXAnLCAnU3dpdGNoJywgXCJMJ3V0aWxpc2F0ZXVyIGEgZmFpdCB1biBzd2l0Y2ggfCBTdGF0dXMgOiBcIiArIHN0YXR1cyk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgb25Qb3B1cE9wZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJ1dHRvbiA9ICQoJy5zd2l0Y2gtb25vZmZfX3NsaWRlJyk7XG4gICAgICAgIGlmIChjaHJvbWUuc3RvcmFnZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbJ2RrJ10sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRrID09PSAnZGlzYWJsZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICBQb3B1cEVESy5hZGRCb2R5Q2xhc3MoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LmRrID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7ZGs6ICdkaXNhYmxlZCd9KTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIFBvcHVwRURLLmFkZEJvZHlDbGFzcyh0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBidXR0b24ucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgUG9wdXBFREsuYWRkQm9keUNsYXNzKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnb29nbGVTZWFyY2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnI2dvb2dsZS1zZWFyY2gnKS5vbignc3VibWl0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUG9wdXBFREsudHJhY2tlci5zZW5kRXZlbnQoJ1BvcHVwJywgJ1NlYXJjaCcsIFwiTCd1dGlsaXNhdGV1ciBhIGZhaXQgdW5lIHJlY2hlcmNoZSBnb29nbGVcIik7XG5cbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSAkKHRoaXMpLmF0dHIoJ2FjdGlvbicpO1xuICAgICAgICAgICAgJGlucHV0ID0gJCh0aGlzKS5maW5kKCcuc2VhcmNoX19pbnB1dCcpO1xuICAgICAgICAgICAgdmFyIG5hbWUgPSAkaW5wdXQuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gJGlucHV0LnZhbCgpO1xuICAgICAgICAgICAgdmFyIHVybCA9IGFjdGlvbiArICc/JyArIG5hbWUgKyAnPScgKyB2YWx1ZTtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHt1cmw6IHVybH0pO1xuXG4gICAgICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kUmVxdWVzdCh0YWJzWzBdLmlkLCB7YWN0aW9uOiBcInJlZGlyZWN0XCJ9LCBmdW5jdGlvbiAocmVzcCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3AuZG9uZSA9PT0gXCJyZWRpcmVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlZGlyZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNsb3NlQWxlcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRhbGxBbGVydHMgPSAkKCcuYWxlcnQnKSxcbiAgICAgICAgICAgIGNocm9tZVN0b3JhZ2VBbGVydHMgPSBbXTtcbiAgICAgICAgaWYgKGNocm9tZS5zdG9yYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsnYWxlcnRzJ10sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmFsZXJ0cyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICBjaHJvbWVTdG9yYWdlQWxlcnRzID0gcmVzdWx0LmFsZXJ0cztcbiAgICAgICAgICAgICAgICBpZiAoY2hyb21lU3RvcmFnZUFsZXJ0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChjaHJvbWVTdG9yYWdlQWxlcnRzLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2RpdltkYXRhLWFsZXJ0LWlkPScgKyB2YWx1ZSArICddJykuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCRhbGxBbGVydHMubGVuZ3RoICE9PSBjaHJvbWVTdG9yYWdlQWxlcnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJy53YXJuaW5nX19jb250YWluZXInKS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDI1MCk7XG5cbiAgICAgICAgJCgnLmFsZXJ0IGJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFBvcHVwRURLLnRtcENvbnNlbnQgPSAkKHRoaXMpLmRhdGEoJ2FncmVlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRhbGxBbGVydHMub24oJ2Nsb3NlZC5icy5hbGVydCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChjaHJvbWUuc3RvcmFnZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY2hyb21lU3RvcmFnZUFsZXJ0cy5wdXNoKCQodGhpcykuZGF0YShcImFsZXJ0LWlkXCIpKTtcbiAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7YWxlcnRzOiBjaHJvbWVTdG9yYWdlQWxlcnRzfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoUG9wdXBFREsudG1wQ29uc2VudCkge1xuICAgICAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7cmdwZF9jb25zZW50OiBQb3B1cEVESy50bXBDb25zZW50fSk7XG4gICAgICAgICAgICAgICAgICAgIFBvcHVwRURLLnRtcENvbnNlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHNob3dOb0RvbWFpbkFsZXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0cnlDb25uZWN0aW9uID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoe2FjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZX0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZFJlcXVlc3QodGFic1swXS5pZCwge2FjdGlvbjogXCJ0ZXN0Q29ubmVjdGlvblwifSwgZnVuY3Rpb24gKHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwLmRvbmUgPT09IFwiQ29ubmVjdGlvblN1Y2Nlc3NcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ0Nvbm5lY3Rpb25TdWNjZXNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXNwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgnQ29ubmVjdGlvbkZhaWxlZCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdHJ5Q29ubmVjdGlvbi50aGVuKFxuICAgICAgICAgICAgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICAgICAgfSkuY2F0Y2goXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAkKCcucG9wdXBfX25vdC1vbi1kb21haW4td2FybmluZycpLnRvZ2dsZUNsYXNzKCdkLW5vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9LFxuICAgIHRyYW5zbGF0aW9uczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdHJhbnNsYXRlX2VsbXRzID0gJChcIltkYXRhLWkxOG5dXCIpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYW5zbGF0ZV9lbG10cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0cmFuc2xhdGVfZWxtdHNbaV07XG5cbiAgICAgICAgICAgIHZhciBrZXkgPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pMThuJyk7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaTE4bi10YXJnZXQnKTtcblxuICAgICAgICAgICAgc3dpdGNoICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdwbGFjZWhvbGRlcic6XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYXR0cigncGxhY2Vob2xkZXInLCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpdGVtLmlubmVySFRNTCA9IFBvcHVwRURLLmdldFRyYW5zbGF0aW9uKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFRyYW5zbGF0aW9uOiBmdW5jdGlvbiAoa2V5LCBwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIGNocm9tZS5pMThuLmdldE1lc3NhZ2Uoa2V5KTtcbiAgICB9LFxuICAgIGFuYWx5dGljczogZnVuY3Rpb24gKCkge1xuICAgICAgICBQb3B1cEVESy5zZXJ2aWNlID0gYW5hbHl0aWNzLmdldFNlcnZpY2UoJ2Vjb3NpYV9leHRlbnNpb24nKTtcblxuICAgICAgICBQb3B1cEVESy5zZXJ2aWNlLmdldENvbmZpZygpLmFkZENhbGxiYWNrKFxuICAgICAgICAgICAgZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsncmdwZF9jb25zZW50J10sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlcm1pdHRlZCA9IHJlc3VsdC5yZ3BkX2NvbnNlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5zZXRUcmFja2luZ1Blcm1pdHRlZChwZXJtaXR0ZWQgPT09IHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgUG9wdXBFREsudHJhY2tlciA9IFBvcHVwRURLLnNlcnZpY2UuZ2V0VHJhY2tlcignVUEtMTYwMTgyOTU1LTEnKTsgIC8vIEdBIFRyYWNraW5nIElELlxuXG4gICAgICAgIFBvcHVwRURLLnRyYWNrZXIuc2VuZEFwcFZpZXcoJ01haW5WaWV3Jyk7XG5cbiAgICAgICAgUG9wdXBFREsudHJhY2tlci5zZW5kRXZlbnQoJ1BvcHVwJywgJ09wZW4nLCBcIkwndXRpbGlzYXRldXIgYSBvdXZlcnQgbGEgcG9wdXBcIik7XG5cbiAgICAgICAgJCgnLmRvbmF0ZV9fbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFBvcHVwRURLLnRyYWNrZXIuc2VuZEV2ZW50KCdQb3B1cCcsICdEb25hdGUnLCBcIkwndXRpbGlzYXRldXIgYSBjbGlxdcOpIHN1ciBsZSBib3V0b24gZGUgZG9uYXRpb25cIik7XG4gICAgICAgIH0pXG4gICAgfVxufTtcbiJdfQ==
