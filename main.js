var GlobalEDK,main=main||{};main.General=function(){},main.General.prototype={init:function(){GlobalEDK.init()}},$(document).ready(function(){(new main.General).init()}),GlobalEDK={init:function(){GlobalEDK.EDK_class(),GlobalEDK.EDK_image(),GlobalEDK.PopupListener()},EDK_class:function(){chrome.storage.sync.get(["dk"],function(n){"disabled"===n.dk&&$("body").addClass("EDK__body")})},EDK_image:function(){$(".logos-container a").append('<img src="https://i.ibb.co/hdLbcZC/logo-ecosia-dark-full.png" alt="Ecosia" border="0">'),$(".info-section").each(function(){$(this).append('<div class="bg-filter"></div>')})},PopupListener:function(){chrome.extension.onRequest.addListener(function(n,o,e){switch(console.log(n.action),n.action){case"switch":$("body").toggleClass("EDK__body"),e({done:"switch"});break;case"redirect":chrome.storage.sync.get(["url"],function(n){var o=n.url;chrome.storage.sync.set({url:""}),window.location.href=o,e({done:"redirect to"+o})});break;default:e({done:"no action"})}})}};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiR2xvYmFsRURLIiwibWFpbiIsIkdlbmVyYWwiLCJwcm90b3R5cGUiLCJpbml0IiwiJCIsImRvY3VtZW50IiwicmVhZHkiLCJFREtfY2xhc3MiLCJFREtfaW1hZ2UiLCJQb3B1cExpc3RlbmVyIiwiY2hyb21lIiwic3RvcmFnZSIsInN5bmMiLCJnZXQiLCJyZXN1bHQiLCJkayIsImFkZENsYXNzIiwiYXBwZW5kIiwiZWFjaCIsInRoaXMiLCJleHRlbnNpb24iLCJvblJlcXVlc3QiLCJhZGRMaXN0ZW5lciIsInJlcXVlc3QiLCJzZW5kZXIiLCJzZW5kUmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwiYWN0aW9uIiwidG9nZ2xlQ2xhc3MiLCJkb25lIiwidXJsIiwic2V0Iiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIl0sIm1hcHBpbmdzIjoiQUFDQSxJQWlCQUEsVUFqQkFDLEtBQUFBLE1BQUEsR0FFQUEsS0FBQUMsUUFBQSxhQUdBRCxLQUFBQyxRQUFBQyxVQUFBLENBQ0FDLEtBQUEsV0FDQUosVUFBQUksU0FJQUMsRUFBQUMsVUFBQUMsTUFBQSxZQUNBLElBQUFOLEtBQUFDLFNBQ0FFLFNBS0FKLFVBQUEsQ0FFQUksS0FBQSxXQUNBSixVQUFBUSxZQUNBUixVQUFBUyxZQUNBVCxVQUFBVSxpQkFFQUYsVUFBQSxXQUNBRyxPQUFBQyxRQUFBQyxLQUFBQyxJQUFBLENBQUEsTUFBQSxTQUFBQyxHQUNBLGFBQUFBLEVBQUFDLElBQ0FYLEVBQUEsUUFBQVksU0FBQSxnQkFJQVIsVUFBQSxXQUVBSixFQUFBLHNCQUFBYSxPQUNBLDBGQUlBYixFQUFBLGlCQUFBYyxLQUFBLFdBQ0FkLEVBQUFlLE1BQUFGLE9BQUEsb0NBR0FSLGNBQUEsV0FDQUMsT0FBQVUsVUFBQUMsVUFBQUMsWUFDQSxTQUFBQyxFQUFBQyxFQUFBQyxHQUVBLE9BREFDLFFBQUFDLElBQUFKLEVBQUFLLFFBQ0FMLEVBQUFLLFFBQ0EsSUFBQSxTQUNBeEIsRUFBQSxRQUFBeUIsWUFBQSxhQUNBSixFQUFBLENBQUFLLEtBQUEsV0FDQSxNQUNBLElBQUEsV0FDQXBCLE9BQUFDLFFBQUFDLEtBQUFDLElBQUEsQ0FBQSxPQUFBLFNBQUFDLEdBQ0EsSUFBQWlCLEVBQUFqQixFQUFBaUIsSUFDQXJCLE9BQUFDLFFBQUFDLEtBQUFvQixJQUFBLENBQUFELElBQUEsS0FFQUUsT0FBQUMsU0FBQUMsS0FBQUosRUFDQU4sRUFBQSxDQUFBSyxLQUFBLGNBQUFDLE1BRUEsTUFDQSxRQUNBTixFQUFBLENBQUFLLEtBQUEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlY2xhcmUgbmFtZXNwYWNlXHJcbnZhciBtYWluID0gbWFpbiB8fCB7fTtcclxuXHJcbm1haW4uR2VuZXJhbCA9IGZ1bmN0aW9uICgpIHtcclxufTtcclxuXHJcbm1haW4uR2VuZXJhbC5wcm90b3R5cGUgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgR2xvYmFsRURLLmluaXQoKTtcclxuICAgIH1cclxufTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBnID0gbmV3IG1haW4uR2VuZXJhbCgpO1xyXG4gICAgZy5pbml0KCk7XHJcbn0pO1xyXG5cclxuLy9TdGFydFxyXG52YXIgR2xvYmFsRURLO1xyXG5HbG9iYWxFREsgPSB7XHJcbiAgICAvL0luaXRcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBHbG9iYWxFREsuRURLX2NsYXNzKCk7XHJcbiAgICAgICAgR2xvYmFsRURLLkVES19pbWFnZSgpO1xyXG4gICAgICAgIEdsb2JhbEVESy5Qb3B1cExpc3RlbmVyKCk7XHJcbiAgICB9LFxyXG4gICAgRURLX2NsYXNzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoWydkayddLCBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZGsgPT09ICdkaXNhYmxlZCcpIHtcclxuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnRURLX19ib2R5Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBFREtfaW1hZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL0xvZ28gb24gbWFpbiBwYWdlXHJcbiAgICAgICAgJCgnLmxvZ29zLWNvbnRhaW5lciBhJykuYXBwZW5kKFxyXG4gICAgICAgICAgICAnPGltZyBzcmM9XCJodHRwczovL2kuaWJiLmNvL2hkTGJjWkMvbG9nby1lY29zaWEtZGFyay1mdWxsLnBuZ1wiIGFsdD1cIkVjb3NpYVwiIGJvcmRlcj1cIjBcIj4nXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy90aGlzIHBlcm1pdCB0byBhZGQgYSBmaWx0ZXIgdG8gc3ZnIGltYWdlIHRoYXQgYXJlIHBsYWNlIGluIGJhY2tncm91bmQgd2l0aG91dCBhcHBseWluZyB0aGUgZmlsdGVyIG9uIHRoZSBjaGlsZCBjb250ZW50XHJcbiAgICAgICAgJCgnLmluZm8tc2VjdGlvbicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImJnLWZpbHRlclwiPjwvZGl2PicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFBvcHVwTGlzdGVuZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjaHJvbWUuZXh0ZW5zaW9uLm9uUmVxdWVzdC5hZGRMaXN0ZW5lcihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0LmFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlcXVlc3QuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInN3aXRjaFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ0VES19fYm9keScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZW5kUmVzcG9uc2Uoe2RvbmU6ICdzd2l0Y2gnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyZWRpcmVjdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbJ3VybCddLCBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gcmVzdWx0LnVybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHt1cmw6ICcnfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kUmVzcG9uc2Uoe2RvbmU6ICdyZWRpcmVjdCB0bycgKyB1cmx9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7ZG9uZTogJ25vIGFjdGlvbid9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07Il19
