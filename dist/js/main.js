var GlobalEDK,main=main||{};main.General=function(){},main.General.prototype={init:function(){GlobalEDK.init()}},$(document).ready(function(){(new main.General).init()}),GlobalEDK={init:function(){GlobalEDK.EDK_class(),GlobalEDK.EDK_image(),GlobalEDK.PopupListener()},EDK_class:function(){chrome.storage.sync.get(["dk"],function(n){"disabled"===n.dk&&$("body").addClass("EDK__body")})},EDK_image:function(){$(".search-section__logo").append('<img src="https://i.ibb.co/hdLbcZC/logo-ecosia-dark-full.png" alt="Ecosia" border="0">'),$(".info-section").each(function(){$(this).append('<div class="bg-filter"></div>')})},PopupListener:function(){chrome.extension.onRequest.addListener(function(n,e,o){switch(n.action){case"switch":$("body").toggleClass("EDK__body"),o({done:"switch"});break;case"redirect":chrome.storage.sync.get(["url"],function(n){var e=n.url;chrome.storage.sync.set({url:""}),window.location.href=e,o({done:"redirect to"+e})});break;case"testConnection":o({done:"ConnectionSuccess"});break;default:o({done:"no action"})}})}};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiR2xvYmFsRURLIiwibWFpbiIsIkdlbmVyYWwiLCJwcm90b3R5cGUiLCJpbml0IiwiJCIsImRvY3VtZW50IiwicmVhZHkiLCJFREtfY2xhc3MiLCJFREtfaW1hZ2UiLCJQb3B1cExpc3RlbmVyIiwiY2hyb21lIiwic3RvcmFnZSIsInN5bmMiLCJnZXQiLCJyZXN1bHQiLCJkayIsImFkZENsYXNzIiwiYXBwZW5kIiwiZWFjaCIsInRoaXMiLCJleHRlbnNpb24iLCJvblJlcXVlc3QiLCJhZGRMaXN0ZW5lciIsInJlcXVlc3QiLCJzZW5kZXIiLCJzZW5kUmVzcG9uc2UiLCJhY3Rpb24iLCJ0b2dnbGVDbGFzcyIsImRvbmUiLCJ1cmwiLCJzZXQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiXSwibWFwcGluZ3MiOiJBQUNBLElBaUJBQSxVQWpCQUMsS0FBQUEsTUFBQSxHQUVBQSxLQUFBQyxRQUFBLGFBR0FELEtBQUFDLFFBQUFDLFVBQUEsQ0FDQUMsS0FBQSxXQUNBSixVQUFBSSxTQUlBQyxFQUFBQyxVQUFBQyxNQUFBLFlBQ0EsSUFBQU4sS0FBQUMsU0FDQUUsU0FLQUosVUFBQSxDQUVBSSxLQUFBLFdBQ0FKLFVBQUFRLFlBQ0FSLFVBQUFTLFlBQ0FULFVBQUFVLGlCQUVBRixVQUFBLFdBQ0FHLE9BQUFDLFFBQUFDLEtBQUFDLElBQUEsQ0FBQSxNQUFBLFNBQUFDLEdBQ0EsYUFBQUEsRUFBQUMsSUFDQVgsRUFBQSxRQUFBWSxTQUFBLGdCQUlBUixVQUFBLFdBQ0FKLEVBQUEseUJBQUFhLE9BQ0EsMEZBSUFiLEVBQUEsaUJBQUFjLEtBQUEsV0FDQWQsRUFBQWUsTUFBQUYsT0FBQSxvQ0FHQVIsY0FBQSxXQUNBQyxPQUFBVSxVQUFBQyxVQUFBQyxZQUNBLFNBQUFDLEVBQUFDLEVBQUFDLEdBQ0EsT0FBQUYsRUFBQUcsUUFFQSxJQUFBLFNBQ0F0QixFQUFBLFFBQUF1QixZQUFBLGFBQ0FGLEVBQUEsQ0FBQUcsS0FBQSxXQUNBLE1BRUEsSUFBQSxXQUNBbEIsT0FBQUMsUUFBQUMsS0FBQUMsSUFBQSxDQUFBLE9BQUEsU0FBQUMsR0FDQSxJQUFBZSxFQUFBZixFQUFBZSxJQUNBbkIsT0FBQUMsUUFBQUMsS0FBQWtCLElBQUEsQ0FBQUQsSUFBQSxLQUVBRSxPQUFBQyxTQUFBQyxLQUFBSixFQUNBSixFQUFBLENBQUFHLEtBQUEsY0FBQUMsTUFFQSxNQUVBLElBQUEsaUJBQ0FKLEVBQUEsQ0FBQUcsS0FBQSxzQkFDQSxNQUVBLFFBQ0FILEVBQUEsQ0FBQUcsS0FBQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVjbGFyZSBuYW1lc3BhY2VcbnZhciBtYWluID0gbWFpbiB8fCB7fTtcblxubWFpbi5HZW5lcmFsID0gZnVuY3Rpb24gKCkge1xufTtcblxubWFpbi5HZW5lcmFsLnByb3RvdHlwZSA9IHtcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIEdsb2JhbEVESy5pbml0KCk7XG4gICAgfVxufTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIHZhciBnID0gbmV3IG1haW4uR2VuZXJhbCgpO1xuICAgIGcuaW5pdCgpO1xufSk7XG5cbi8vU3RhcnRcbnZhciBHbG9iYWxFREs7XG5HbG9iYWxFREsgPSB7XG4gICAgLy9Jbml0XG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBHbG9iYWxFREsuRURLX2NsYXNzKCk7XG4gICAgICAgIEdsb2JhbEVESy5FREtfaW1hZ2UoKTtcbiAgICAgICAgR2xvYmFsRURLLlBvcHVwTGlzdGVuZXIoKTtcbiAgICB9LFxuICAgIEVES19jbGFzczogZnVuY3Rpb24gKCkge1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbJ2RrJ10sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZGsgPT09ICdkaXNhYmxlZCcpIHtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ0VES19fYm9keScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIEVES19pbWFnZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcuc2VhcmNoLXNlY3Rpb25fX2xvZ28nKS5hcHBlbmQoXG4gICAgICAgICAgICAnPGltZyBzcmM9XCJodHRwczovL2kuaWJiLmNvL2hkTGJjWkMvbG9nby1lY29zaWEtZGFyay1mdWxsLnBuZ1wiIGFsdD1cIkVjb3NpYVwiIGJvcmRlcj1cIjBcIj4nXG4gICAgICAgICk7XG5cbiAgICAgICAgLy90aGlzIHBlcm1pdCB0byBhZGQgYSBmaWx0ZXIgdG8gc3ZnIGltYWdlIHRoYXQgYXJlIHBsYWNlIGluIGJhY2tncm91bmQgd2l0aG91dCBhcHBseWluZyB0aGUgZmlsdGVyIG9uIHRoZSBjaGlsZCBjb250ZW50XG4gICAgICAgICQoJy5pbmZvLXNlY3Rpb24nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiYmctZmlsdGVyXCI+PC9kaXY+Jyk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgUG9wdXBMaXN0ZW5lcjogZnVuY3Rpb24gKCkge1xuICAgICAgICBjaHJvbWUuZXh0ZW5zaW9uLm9uUmVxdWVzdC5hZGRMaXN0ZW5lcihcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAocmVxdWVzdC5hY3Rpb24pIHtcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwic3dpdGNoXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ0VES19fYm9keScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtkb25lOiAnc3dpdGNoJ30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJlZGlyZWN0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbJ3VybCddLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9IHJlc3VsdC51cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe3VybDogJyd9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7ZG9uZTogJ3JlZGlyZWN0IHRvJyArIHVybH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGVzdENvbm5lY3Rpb25cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7ZG9uZTogJ0Nvbm5lY3Rpb25TdWNjZXNzJ30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7ZG9uZTogJ25vIGFjdGlvbid9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxufTtcbiJdfQ==