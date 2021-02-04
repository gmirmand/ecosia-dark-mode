var NewTabEDK,newtab=newtab||{};newtab.General=function(){},newtab.General.prototype={init:function(){NewTabEDK.init(),NewTabEDK.translations(),NewTabEDK.PopupListener(),NewTabEDK.analytics()}},$(document).ready(function(){(new newtab.General).init()}),NewTabEDK={init:function(){chrome.storage.sync.get(["dk"],function(e){NewTabEDK.toggleDK("disabled"===e.dk)}),setTimeout(function(){$("body").addClass("transitions")},333)},translations:function(){for(var e=$("[data-i18n]"),n=0;n<e.length;++n){var t=e[n],a=t.getAttribute("data-i18n");t.innerHTML=NewTabEDK.getTranslation(a)}},getTranslation:function(e,n){return chrome.i18n.getMessage(e)},toggleDK:function(e){!0===e?$("body").addClass("EDK__body"):!1===e?$("body").removeClass("EDK__body"):$("body").toggleClass("EDK__body")},PopupListener:function(){chrome.extension.onRequest.addListener(function(e,n,t){switch(console.log(e.action),e.action){case"switch":NewTabEDK.toggleDK(),t({done:"switch"});break;case"redirect":chrome.storage.sync.get(["url"],function(e){e=e.url;chrome.storage.sync.set({url:""}),window.location.href=e,t({done:"redirect to"+e})});break;case"testConnection":t({done:"ConnectionSuccess"});break;default:t({done:"no action"})}})},analytics:function(){NewTabEDK.service=analytics.getService("ecosia_extension"),NewTabEDK.service.getConfig().addCallback(function(n){chrome.storage.sync.get(["rgpd_consent"],function(e){e=e.rgpd_consent;n.setTrackingPermitted(!0===e)})}),NewTabEDK.tracker=NewTabEDK.service.getTracker("UA-160182955-1"),NewTabEDK.tracker.sendAppView("NewTabView"),NewTabEDK.tracker.sendEvent("New tab","Open","L'utilisateur a ouvert un nouvel onglet"),$(".donate__link").on("click",function(){NewTabEDK.tracker.sendEvent("New tab","Donate","L'utilisateur a cliqué sur le bouton de donation")})}};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld3RhYi5qcyJdLCJuYW1lcyI6WyJOZXdUYWJFREsiLCJuZXd0YWIiLCJHZW5lcmFsIiwicHJvdG90eXBlIiwiaW5pdCIsInRyYW5zbGF0aW9ucyIsIlBvcHVwTGlzdGVuZXIiLCJhbmFseXRpY3MiLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImNocm9tZSIsInN0b3JhZ2UiLCJzeW5jIiwiZ2V0IiwiaXRlbSIsInRvZ2dsZURLIiwiZGsiLCJzZXRUaW1lb3V0IiwiYWRkQ2xhc3MiLCJ0cmFuc2xhdGVfZWxtdHMiLCJpIiwibGVuZ3RoIiwia2V5IiwiZ2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwiZ2V0VHJhbnNsYXRpb24iLCJwYXJhbXMiLCJpMThuIiwiZ2V0TWVzc2FnZSIsInN0YXRlIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGVDbGFzcyIsImV4dGVuc2lvbiIsIm9uUmVxdWVzdCIsImFkZExpc3RlbmVyIiwicmVxdWVzdCIsInNlbmRlciIsInNlbmRSZXNwb25zZSIsImNvbnNvbGUiLCJsb2ciLCJhY3Rpb24iLCJkb25lIiwicmVzdWx0IiwidXJsIiwic2V0Iiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwic2VydmljZSIsImdldFNlcnZpY2UiLCJnZXRDb25maWciLCJhZGRDYWxsYmFjayIsImNvbmZpZyIsInBlcm1pdHRlZCIsInJncGRfY29uc2VudCIsInNldFRyYWNraW5nUGVybWl0dGVkIiwidHJhY2tlciIsImdldFRyYWNrZXIiLCJzZW5kQXBwVmlldyIsInNlbmRFdmVudCIsIm9uIl0sIm1hcHBpbmdzIjoiQUFDQSxJQW9CQUEsVUFwQkFDLE9BQUFBLFFBQUEsR0FFQUEsT0FBQUMsUUFBQSxhQUdBRCxPQUFBQyxRQUFBQyxVQUFBLENBQ0FDLEtBQUEsV0FDQUosVUFBQUksT0FDQUosVUFBQUssZUFDQUwsVUFBQU0sZ0JBQ0FOLFVBQUFPLGNBSUFDLEVBQUFDLFVBQUFDLE1BQUEsWUFDQSxJQUFBVCxPQUFBQyxTQUNBRSxTQUtBSixVQUFBLENBQ0FJLEtBQUEsV0FDQU8sT0FBQUMsUUFBQUMsS0FBQUMsSUFBQSxDQUFBLE1BQUEsU0FBQUMsR0FDQWYsVUFBQWdCLFNBQUEsYUFBQUQsRUFBQUUsTUFHQUMsV0FBQSxXQUNBVixFQUFBLFFBQUFXLFNBQUEsZ0JBQ0EsTUFFQWQsYUFBQSxXQUVBLElBREEsSUFBQWUsRUFBQVosRUFBQSxlQUNBYSxFQUFBLEVBQUFBLEVBQUFELEVBQUFFLFNBQUFELEVBQUEsQ0FDQSxJQUFBTixFQUFBSyxFQUFBQyxHQUNBRSxFQUFBUixFQUFBUyxhQUFBLGFBQ0FULEVBQUFVLFVBQUF6QixVQUFBMEIsZUFBQUgsS0FHQUcsZUFBQSxTQUFBSCxFQUFBSSxHQUNBLE9BQUFoQixPQUFBaUIsS0FBQUMsV0FBQU4sSUFFQVAsU0FBQSxTQUFBYyxJQUNBLElBQUFBLEVBQ0F0QixFQUFBLFFBQUFXLFNBQUEsY0FDQSxJQUFBVyxFQUNBdEIsRUFBQSxRQUFBdUIsWUFBQSxhQUVBdkIsRUFBQSxRQUFBd0IsWUFBQSxjQUdBMUIsY0FBQSxXQUNBSyxPQUFBc0IsVUFBQUMsVUFBQUMsWUFDQSxTQUFBQyxFQUFBQyxFQUFBQyxHQUVBLE9BREFDLFFBQUFDLElBQUFKLEVBQUFLLFFBQ0FMLEVBQUFLLFFBQ0EsSUFBQSxTQUNBekMsVUFBQWdCLFdBQ0FzQixFQUFBLENBQUFJLEtBQUEsV0FDQSxNQUVBLElBQUEsV0FDQS9CLE9BQUFDLFFBQUFDLEtBQUFDLElBQUEsQ0FBQSxPQUFBLFNBQUE2QixHQUNBQyxFQUFBRCxFQUFBQyxJQUNBakMsT0FBQUMsUUFBQUMsS0FBQWdDLElBQUEsQ0FBQUQsSUFBQSxLQUVBRSxPQUFBQyxTQUFBQyxLQUFBSixFQUNBTixFQUFBLENBQUFJLEtBQUEsY0FBQUUsTUFFQSxNQUVBLElBQUEsaUJBQ0FOLEVBQUEsQ0FBQUksS0FBQSxzQkFDQSxNQUVBLFFBQ0FKLEVBQUEsQ0FBQUksS0FBQSxrQkFLQW5DLFVBQUEsV0FDQVAsVUFBQWlELFFBQUExQyxVQUFBMkMsV0FBQSxvQkFFQWxELFVBQUFpRCxRQUFBRSxZQUFBQyxZQUNBLFNBQUFDLEdBQ0ExQyxPQUFBQyxRQUFBQyxLQUFBQyxJQUFBLENBQUEsZ0JBQUEsU0FBQTZCLEdBQ0FXLEVBQUFYLEVBQUFZLGFBQ0FGLEVBQUFHLHNCQUFBLElBQUFGLE9BSUF0RCxVQUFBeUQsUUFBQXpELFVBQUFpRCxRQUFBUyxXQUFBLGtCQUVBMUQsVUFBQXlELFFBQUFFLFlBQUEsY0FFQTNELFVBQUF5RCxRQUFBRyxVQUFBLFVBQUEsT0FBQSwyQ0FFQXBELEVBQUEsaUJBQUFxRCxHQUFBLFFBQUEsV0FDQTdELFVBQUF5RCxRQUFBRyxVQUFBLFVBQUEsU0FBQSIsImZpbGUiOiJuZXd0YWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZWNsYXJlIG5hbWVzcGFjZVxudmFyIG5ld3RhYiA9IG5ld3RhYiB8fCB7fTtcblxubmV3dGFiLkdlbmVyYWwgPSBmdW5jdGlvbiAoKSB7XG59O1xuXG5uZXd0YWIuR2VuZXJhbC5wcm90b3R5cGUgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBOZXdUYWJFREsuaW5pdCgpO1xuICAgICAgICBOZXdUYWJFREsudHJhbnNsYXRpb25zKCk7XG4gICAgICAgIE5ld1RhYkVESy5Qb3B1cExpc3RlbmVyKCk7XG4gICAgICAgIE5ld1RhYkVESy5hbmFseXRpY3MoKTtcbiAgICB9XG59O1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGcgPSBuZXcgbmV3dGFiLkdlbmVyYWwoKTtcbiAgICBnLmluaXQoKTtcbn0pO1xuXG4vL1N0YXJ0XG52YXIgTmV3VGFiRURLO1xuTmV3VGFiRURLID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoWydkayddLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgTmV3VGFiRURLLnRvZ2dsZURLKGl0ZW0uZGsgPT09ICdkaXNhYmxlZCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygndHJhbnNpdGlvbnMnKTtcbiAgICAgICAgfSwgMzMzKTtcbiAgICB9LFxuICAgIHRyYW5zbGF0aW9uczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdHJhbnNsYXRlX2VsbXRzID0gJChcIltkYXRhLWkxOG5dXCIpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYW5zbGF0ZV9lbG10cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0cmFuc2xhdGVfZWxtdHNbaV07XG4gICAgICAgICAgICB2YXIga2V5ID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaTE4bicpO1xuICAgICAgICAgICAgaXRlbS5pbm5lckhUTUwgPSBOZXdUYWJFREsuZ2V0VHJhbnNsYXRpb24oa2V5KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0VHJhbnNsYXRpb246IGZ1bmN0aW9uIChrZXksIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gY2hyb21lLmkxOG4uZ2V0TWVzc2FnZShrZXkpO1xuICAgIH0sXG4gICAgdG9nZ2xlREs6IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICBpZiAoc3RhdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnRURLX19ib2R5Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ0VES19fYm9keScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdFREtfX2JvZHknKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgUG9wdXBMaXN0ZW5lcjogZnVuY3Rpb24gKCkge1xuICAgICAgICBjaHJvbWUuZXh0ZW5zaW9uLm9uUmVxdWVzdC5hZGRMaXN0ZW5lcihcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcXVlc3QuYWN0aW9uKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlcXVlc3QuYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzd2l0Y2hcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIE5ld1RhYkVESy50b2dnbGVESygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtkb25lOiAnc3dpdGNoJ30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJlZGlyZWN0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbJ3VybCddLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9IHJlc3VsdC51cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe3VybDogJyd9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7ZG9uZTogJ3JlZGlyZWN0IHRvJyArIHVybH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGVzdENvbm5lY3Rpb25cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7ZG9uZTogJ0Nvbm5lY3Rpb25TdWNjZXNzJ30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7ZG9uZTogJ25vIGFjdGlvbid9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSxcbiAgICBhbmFseXRpY3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgTmV3VGFiRURLLnNlcnZpY2UgPSBhbmFseXRpY3MuZ2V0U2VydmljZSgnZWNvc2lhX2V4dGVuc2lvbicpO1xuXG4gICAgICAgIE5ld1RhYkVESy5zZXJ2aWNlLmdldENvbmZpZygpLmFkZENhbGxiYWNrKFxuICAgICAgICAgICAgZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsncmdwZF9jb25zZW50J10sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlcm1pdHRlZCA9IHJlc3VsdC5yZ3BkX2NvbnNlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5zZXRUcmFja2luZ1Blcm1pdHRlZChwZXJtaXR0ZWQgPT09IHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgTmV3VGFiRURLLnRyYWNrZXIgPSBOZXdUYWJFREsuc2VydmljZS5nZXRUcmFja2VyKCdVQS0xNjAxODI5NTUtMScpOyAgLy8gR0EgVHJhY2tpbmcgSUQuXG5cbiAgICAgICAgTmV3VGFiRURLLnRyYWNrZXIuc2VuZEFwcFZpZXcoJ05ld1RhYlZpZXcnKTtcblxuICAgICAgICBOZXdUYWJFREsudHJhY2tlci5zZW5kRXZlbnQoJ05ldyB0YWInLCAnT3BlbicsIFwiTCd1dGlsaXNhdGV1ciBhIG91dmVydCB1biBub3V2ZWwgb25nbGV0XCIpO1xuXG4gICAgICAgICQoJy5kb25hdGVfX2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBOZXdUYWJFREsudHJhY2tlci5zZW5kRXZlbnQoJ05ldyB0YWInLCAnRG9uYXRlJywgXCJMJ3V0aWxpc2F0ZXVyIGEgY2xpcXXDqSBzdXIgbGUgYm91dG9uIGRlIGRvbmF0aW9uXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuIl19
