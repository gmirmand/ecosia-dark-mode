var PopupEDK,main=main||{};main.General=function(){},main.General.prototype={init:function(){PopupEDK.init(),PopupEDK.googleSearch(),PopupEDK.closeAlert(),PopupEDK.getTabDomain()}},$(document).ready(function(){(new main.General).init()}),PopupEDK={init:function(){PopupEDK.switch(),PopupEDK.onPopupOpen()},switch:function(){$(".switch-onoff__slide").on("click",function(e){e.preventDefault(),chrome.tabs.query({active:!0,currentWindow:!0},function(e){chrome.tabs.sendRequest(e[0].id,{action:"switch"},function(e){e&&("switch"===e.done?PopupEDK.switchBtn():console.log(e))})})})},logStorage:function(){chrome.storage.sync.get(["dk"],function(e){console.log(e.dk)})},switchBtn:function(){var o=$(".switch-onoff__slide");chrome.storage.sync.get(["dk"],function(e){"disabled"===e.dk?(chrome.storage.sync.set({dk:"enabled"}),o.removeClass("open")):(chrome.storage.sync.set({dk:"disabled"}),o.addClass("open"))}),PopupEDK.logStorage()},onPopupOpen:function(){var o=$(".switch-onoff__slide");void 0!==chrome.storage&&chrome.storage.sync.get(["dk"],function(e){"disabled"===e.dk?o.addClass("open"):("undefined"===e.dk&&chrome.storage.sync.set({dk:"disabled"}),o.removeClass("open"))})},googleSearch:function(){$("#google-search").on("submit",function(){var e=$(this).attr("action");$input=$(this).find(".search__input");var o=e+"?"+$input.attr("name")+"="+$input.val();chrome.storage.sync.set({url:o}),chrome.tabs.query({active:!0,currentWindow:!0},function(e){chrome.tabs.sendRequest(e[0].id,{action:"redirect"},function(e){e&&("redirect"===e.done?console.log("Redirected"):console.log(e))})})})},closeAlert:function(){var e=$(".alert"),o=[];void 0!==chrome.storage&&chrome.storage.sync.get(["alerts"],function(e){void 0!==e.alerts&&(o=e.alerts),void 0!==o&&$.each(o,function(e,o){$("#"+o).addClass("d-none")})}),setTimeout(function(){e.length!==o.length&&$(".warning__container").removeClass("d-none")},250),e.on("closed.bs.alert",function(){void 0!==chrome.storage&&(o.push(this.id),chrome.storage.sync.set({alerts:o}))})},checkDomain:function(e){-1===e.indexOf("ecosia.org")&&$(".popup__disabled, .popup__container").toggleClass("d-none")},getTabDomain:function(){var o=this;chrome.tabs.query({active:!0,currentWindow:!0},function(e){url=e[0].url,o.checkDomain(url)})}};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvcHVwLmpzIl0sIm5hbWVzIjpbIlBvcHVwRURLIiwibWFpbiIsIkdlbmVyYWwiLCJwcm90b3R5cGUiLCJpbml0IiwiZ29vZ2xlU2VhcmNoIiwiY2xvc2VBbGVydCIsImdldFRhYkRvbWFpbiIsIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwic3dpdGNoIiwib25Qb3B1cE9wZW4iLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImNocm9tZSIsInRhYnMiLCJxdWVyeSIsImFjdGl2ZSIsImN1cnJlbnRXaW5kb3ciLCJzZW5kUmVxdWVzdCIsImlkIiwiYWN0aW9uIiwicmVzcCIsImRvbmUiLCJzd2l0Y2hCdG4iLCJjb25zb2xlIiwibG9nIiwibG9nU3RvcmFnZSIsInN0b3JhZ2UiLCJzeW5jIiwiZ2V0IiwicmVzdWx0IiwiZGsiLCJidXR0b24iLCJzZXQiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwidGhpcyIsImF0dHIiLCIkaW5wdXQiLCJmaW5kIiwidXJsIiwidmFsIiwiJGFsbEFsZXJ0cyIsImNocm9tZVN0b3JhZ2VBbGVydHMiLCJhbGVydHMiLCJlYWNoIiwiaSIsInZhbHVlIiwic2V0VGltZW91dCIsImxlbmd0aCIsInB1c2giLCJjaGVja0RvbWFpbiIsImluZGV4T2YiLCJ0b2dnbGVDbGFzcyIsInNlbGYiXSwibWFwcGluZ3MiOiJBQUNBLElBb0JBQSxTQXBCQUMsS0FBQUEsTUFBQSxHQUVBQSxLQUFBQyxRQUFBLGFBR0FELEtBQUFDLFFBQUFDLFVBQUEsQ0FDQUMsS0FBQSxXQUNBSixTQUFBSSxPQUNBSixTQUFBSyxlQUNBTCxTQUFBTSxhQUNBTixTQUFBTyxpQkFJQUMsRUFBQUMsVUFBQUMsTUFBQSxZQUNBLElBQUFULEtBQUFDLFNBQ0FFLFNBS0FKLFNBQUEsQ0FFQUksS0FBQSxXQUNBSixTQUFBVyxTQUNBWCxTQUFBWSxlQUVBRCxPQUFBLFdBQ0FILEVBQUEsd0JBQ0FLLEdBQUEsUUFBQSxTQUFBQyxHQUNBQSxFQUFBQyxpQkFDQUMsT0FBQUMsS0FBQUMsTUFBQSxDQUFBQyxRQUFBLEVBQUFDLGVBQUEsR0FBQSxTQUFBSCxHQUNBRCxPQUFBQyxLQUFBSSxZQUFBSixFQUFBLEdBQUFLLEdBQUEsQ0FBQUMsT0FBQSxVQUFBLFNBQUFDLEdBQ0FBLElBQ0EsV0FBQUEsRUFBQUMsS0FDQXpCLFNBQUEwQixZQUVBQyxRQUFBQyxJQUFBSixXQU9BSyxXQUFBLFdBQ0FiLE9BQUFjLFFBQUFDLEtBQUFDLElBQUEsQ0FBQSxNQUFBLFNBQUFDLEdBQ0FOLFFBQUFDLElBQUFLLEVBQUFDLE9BR0FSLFVBQUEsV0FDQSxJQUFBUyxFQUFBM0IsRUFBQSx3QkFDQVEsT0FBQWMsUUFBQUMsS0FBQUMsSUFBQSxDQUFBLE1BQUEsU0FBQUMsR0FDQSxhQUFBQSxFQUFBQyxJQUNBbEIsT0FBQWMsUUFBQUMsS0FBQUssSUFBQSxDQUFBRixHQUFBLFlBQ0FDLEVBQUFFLFlBQUEsVUFFQXJCLE9BQUFjLFFBQUFDLEtBQUFLLElBQUEsQ0FBQUYsR0FBQSxhQUNBQyxFQUFBRyxTQUFBLFdBR0F0QyxTQUFBNkIsY0FFQWpCLFlBQUEsV0FDQSxJQUFBdUIsRUFBQTNCLEVBQUEsNkJBQ0ErQixJQUFBdkIsT0FBQWMsU0FDQWQsT0FBQWMsUUFBQUMsS0FBQUMsSUFBQSxDQUFBLE1BQUEsU0FBQUMsR0FDQSxhQUFBQSxFQUFBQyxHQUNBQyxFQUFBRyxTQUFBLFNBQ0EsY0FBQUwsRUFBQUMsSUFDQWxCLE9BQUFjLFFBQUFDLEtBQUFLLElBQUEsQ0FBQUYsR0FBQSxhQUNBQyxFQUFBRSxZQUFBLFlBT0FoQyxhQUFBLFdBQ0FHLEVBQUEsa0JBQUFLLEdBQUEsU0FBQSxXQUNBLElBQUFVLEVBQUFmLEVBQUFnQyxNQUFBQyxLQUFBLFVBQ0FDLE9BQUFsQyxFQUFBZ0MsTUFBQUcsS0FBQSxrQkFDQSxJQUVBQyxFQUFBckIsRUFBQSxJQUZBbUIsT0FBQUQsS0FBQSxRQUVBLElBREFDLE9BQUFHLE1BRUE3QixPQUFBYyxRQUFBQyxLQUFBSyxJQUFBLENBQUFRLElBQUFBLElBRUE1QixPQUFBQyxLQUFBQyxNQUFBLENBQUFDLFFBQUEsRUFBQUMsZUFBQSxHQUFBLFNBQUFILEdBQ0FELE9BQUFDLEtBQUFJLFlBQUFKLEVBQUEsR0FBQUssR0FBQSxDQUFBQyxPQUFBLFlBQUEsU0FBQUMsR0FDQUEsSUFDQSxhQUFBQSxFQUFBQyxLQUNBRSxRQUFBQyxJQUFBLGNBRUFELFFBQUFDLElBQUFKLFdBT0FsQixXQUFBLFdBQ0EsSUFBQXdDLEVBQUF0QyxFQUFBLFVBQ0F1QyxFQUFBLFFBQ0FSLElBQUF2QixPQUFBYyxTQUNBZCxPQUFBYyxRQUFBQyxLQUFBQyxJQUFBLENBQUEsVUFBQSxTQUFBQyxRQUNBTSxJQUFBTixFQUFBZSxTQUNBRCxFQUFBZCxFQUFBZSxhQUNBVCxJQUFBUSxHQUNBdkMsRUFBQXlDLEtBQUFGLEVBQUEsU0FBQUcsRUFBQUMsR0FDQTNDLEVBQUEsSUFBQTJDLEdBQUFiLFNBQUEsY0FNQWMsV0FBQSxXQUNBTixFQUFBTyxTQUFBTixFQUFBTSxRQUNBN0MsRUFBQSx1QkFBQTZCLFlBQUEsV0FFQSxLQUVBUyxFQUFBakMsR0FBQSxrQkFBQSxnQkFDQTBCLElBQUF2QixPQUFBYyxVQUNBaUIsRUFBQU8sS0FBQWQsS0FBQWxCLElBQ0FOLE9BQUFjLFFBQUFDLEtBQUFLLElBQUEsQ0FBQVksT0FBQUQsUUFJQVEsWUFBQSxTQUFBWCxJQUNBLElBQUFBLEVBQUFZLFFBQUEsZUFDQWhELEVBQUEsdUNBQUFpRCxZQUFBLFdBR0FsRCxhQUFBLFdBQ0EsSUFBQW1ELEVBQUFsQixLQU9BeEIsT0FBQUMsS0FBQUMsTUFQQSxDQUFBQyxRQUFBLEVBQUFDLGVBQUEsR0FFQSxTQUFBSCxHQUNBMkIsSUFBQTNCLEVBQUEsR0FBQTJCLElBQ0FjLEVBQUFILFlBQUFYIiwiZmlsZSI6InBvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVjbGFyZSBuYW1lc3BhY2VcclxudmFyIG1haW4gPSBtYWluIHx8IHt9O1xyXG5cclxubWFpbi5HZW5lcmFsID0gZnVuY3Rpb24gKCkge1xyXG59O1xyXG5cclxubWFpbi5HZW5lcmFsLnByb3RvdHlwZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBQb3B1cEVESy5pbml0KCk7XHJcbiAgICAgICAgUG9wdXBFREsuZ29vZ2xlU2VhcmNoKCk7XHJcbiAgICAgICAgUG9wdXBFREsuY2xvc2VBbGVydCgpO1xyXG4gICAgICAgIFBvcHVwRURLLmdldFRhYkRvbWFpbigpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGcgPSBuZXcgbWFpbi5HZW5lcmFsKCk7XHJcbiAgICBnLmluaXQoKTtcclxufSk7XHJcblxyXG4vL1N0YXJ0XHJcbnZhciBQb3B1cEVESztcclxuUG9wdXBFREsgPSB7XHJcbiAgICAvL0luaXRcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBQb3B1cEVESy5zd2l0Y2goKTtcclxuICAgICAgICBQb3B1cEVESy5vblBvcHVwT3BlbigpO1xyXG4gICAgfSxcclxuICAgIHN3aXRjaDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBidXR0b24gPSAkKCcuc3dpdGNoLW9ub2ZmX19zbGlkZScpO1xyXG4gICAgICAgIGJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHthY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWV9LCBmdW5jdGlvbiAodGFicykge1xyXG4gICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZFJlcXVlc3QodGFic1swXS5pZCwge2FjdGlvbjogXCJzd2l0Y2hcIn0sIGZ1bmN0aW9uIChyZXNwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3AuZG9uZSA9PT0gXCJzd2l0Y2hcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUG9wdXBFREsuc3dpdGNoQnRuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBsb2dTdG9yYWdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoWydkayddLCBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kayk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc3dpdGNoQnRuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGJ1dHRvbiA9ICQoJy5zd2l0Y2gtb25vZmZfX3NsaWRlJyk7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoWydkayddLCBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZGsgPT09ICdkaXNhYmxlZCcpIHtcclxuICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtkazogJ2VuYWJsZWQnfSk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24ucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtkazogJ2Rpc2FibGVkJ30pO1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLmFkZENsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBQb3B1cEVESy5sb2dTdG9yYWdlKCk7XHJcbiAgICB9LFxyXG4gICAgb25Qb3B1cE9wZW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYnV0dG9uID0gJCgnLnN3aXRjaC1vbm9mZl9fc2xpZGUnKTtcclxuICAgICAgICBpZiAoY2hyb21lLnN0b3JhZ2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbJ2RrJ10sIGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGsgPT09ICdkaXNhYmxlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uYWRkQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LmRrID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtkazogJ2Rpc2FibGVkJ30pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24ucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdvb2dsZVNlYXJjaDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJyNnb29nbGUtc2VhcmNoJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9ICQodGhpcykuYXR0cignYWN0aW9uJyk7XHJcbiAgICAgICAgICAgICRpbnB1dCA9ICQodGhpcykuZmluZCgnLnNlYXJjaF9faW5wdXQnKTtcclxuICAgICAgICAgICAgdmFyIG5hbWUgPSAkaW5wdXQuYXR0cignbmFtZScpO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAkaW5wdXQudmFsKCk7XHJcbiAgICAgICAgICAgIHZhciB1cmwgPSBhY3Rpb24gKyAnPycgKyBuYW1lICsgJz0nICsgdmFsdWU7XHJcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHt1cmw6IHVybH0pO1xyXG5cclxuICAgICAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoe2FjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZX0sIGZ1bmN0aW9uICh0YWJzKSB7XHJcbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kUmVxdWVzdCh0YWJzWzBdLmlkLCB7YWN0aW9uOiBcInJlZGlyZWN0XCJ9LCBmdW5jdGlvbiAocmVzcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwLmRvbmUgPT09IFwicmVkaXJlY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlZGlyZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGNsb3NlQWxlcnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgJGFsbEFsZXJ0cyA9ICQoJy5hbGVydCcpLFxyXG4gICAgICAgICAgICBjaHJvbWVTdG9yYWdlQWxlcnRzID0gW107XHJcbiAgICAgICAgaWYgKGNocm9tZS5zdG9yYWdlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoWydhbGVydHMnXSwgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5hbGVydHMgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICBjaHJvbWVTdG9yYWdlQWxlcnRzID0gcmVzdWx0LmFsZXJ0cztcclxuICAgICAgICAgICAgICAgIGlmIChjaHJvbWVTdG9yYWdlQWxlcnRzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goY2hyb21lU3RvcmFnZUFsZXJ0cywgZnVuY3Rpb24oaSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnIycgKyB2YWx1ZSkuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYoJGFsbEFsZXJ0cy5sZW5ndGggIT09IGNocm9tZVN0b3JhZ2VBbGVydHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICQoJy53YXJuaW5nX19jb250YWluZXInKS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyNTApO1xyXG5cclxuICAgICAgICAkYWxsQWxlcnRzLm9uKCdjbG9zZWQuYnMuYWxlcnQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChjaHJvbWUuc3RvcmFnZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjaHJvbWVTdG9yYWdlQWxlcnRzLnB1c2godGhpcy5pZCk7XHJcbiAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7YWxlcnRzOiBjaHJvbWVTdG9yYWdlQWxlcnRzfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBjaGVja0RvbWFpbjogZnVuY3Rpb24odXJsKXtcclxuICAgICAgICBpZih1cmwuaW5kZXhPZignZWNvc2lhLm9yZycpID09PSAtMSl7XHJcbiAgICAgICAgICAkKCcucG9wdXBfX2Rpc2FibGVkLCAucG9wdXBfX2NvbnRhaW5lcicpLnRvZ2dsZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldFRhYkRvbWFpbjogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgcXVlcnkgPSB7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2FsbGJhY2sodGFicykge1xyXG4gICAgICAgICAgICB1cmwgPSB0YWJzWzBdLnVybDsgLy8gdGhlcmUgd2lsbCBiZSBvbmx5IG9uZSBpbiB0aGlzIGFycmF5XHJcbiAgICAgICAgICAgIHNlbGYuY2hlY2tEb21haW4odXJsKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkocXVlcnksIGNhbGxiYWNrKTtcclxuICAgIH1cclxufTsiXX0=
