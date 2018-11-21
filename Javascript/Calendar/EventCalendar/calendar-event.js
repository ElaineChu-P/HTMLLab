var data={},today=new Date,calendarSource="",selectedFullDate={actualDate:today,days:["日","一","二","三","四","五","六"],months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],day:today.getDay(),date:today.getDate(),month:today.getMonth(),year:today.getFullYear(),header:function(){return this.year-1911+"年"+this.months[this.month]},toString:function(){return this.year-1911+"年"+this.months[this.month]+this.date+"日("+this.days[this.day]+")"},setDate:function(t){this.actualDate=t,this.day=this.actualDate.getDay(),this.date=this.actualDate.getDate(),this.month=this.actualDate.getMonth(),this.year=this.actualDate.getFullYear()}};!function(t){t.calendarEvent={init:function(e){e.length&&(calendarSource=e.data("source"),e.html(this.getHtml()),this.setTable(),this.showHeader(),t(".simpleCalendarHeader .fa-chevron-left").click(function(){selectedFullDate.actualDate.setMonth(selectedFullDate.month-1),selectedFullDate.setDate(selectedFullDate.actualDate),t.calendarEvent.showHeader(),t.calendarEvent.setTable()}),t(".simpleCalendarHeader .fa-chevron-right").click(function(){selectedFullDate.actualDate.setMonth(selectedFullDate.month+1),selectedFullDate.setDate(selectedFullDate.actualDate),t.calendarEvent.showHeader(),t.calendarEvent.setTable()}))},getHtml:function(){return'<div class="simpleCalendarContainer"><div class="simpleCalendarHeader d-flex justify-content-between"><div><i class="fas fa-chevron-left"></i></div><div><span class="calendarMonthYear"></span></div><div><i class="fas fa-chevron-right"></i></div></div><div class="table-responsive"><table class="table simpleCalendarTable"><thead><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></thead><tbody></tbody></table></div></div>'},getData:function(e,a,n,l){json=JSON.stringify({year:e,month:a}),t.ajax({url:calendarSource,type:"GET",contentType:"application/json; charset=utf-8",data:json}).done(function(t){n(t)}).fail(function(){l("Bye 500.")}).always(function(){})},getMonthData:function(){this.getData(selectedFullDate.year,selectedFullDate.month,function(e){data=e,t.calendarEvent.updateCalendarWithData()},function(t){data={},console.log("Server responded with the error code: "+t)})},showHeader:function(){t(".simpleCalendarContainer .calendarMonthYear").html(selectedFullDate.header())},showEvents:function(t){t&&alert(selectedFullDate.date)},setTable:function(){var e="",a=new Date(selectedFullDate.year,selectedFullDate.month,1);a.setDate(a.getDate()-a.getDay());for(var n=0;n<6;++n){e+="<tr>";do{a.getMonth()!=selectedFullDate.month?e+='<td class="notCurrMonth"><span>'+a.getDate()+"</span></td>":e+="<td><span>"+a.getDate()+"</span></td>",a.setDate(a.getDate()+1)}while(0!==a.getDay());e+="</tr>"}t(".simpleCalendarTable tbody").html(e),selectedFullDate.month==(new Date).getMonth()&&t(".simpleCalendarTable tbody td:not(.notCurrMonth)").eq(selectedFullDate.date-1).addClass("today selected"),this.setClickHandler(),this.getMonthData()},setClickHandler:function(){t(".simpleCalendarTable tbody td:not(.notCurrMonth)").click(function(){t(".simpleCalendarTable tbody td").removeClass("selected"),t(this).addClass("selected");var e=t(this).find("span").html();selectedFullDate.actualDate.setDate(e),selectedFullDate.setDate(selectedFullDate.actualDate),0===Object.keys(data).length&&JSON.stringify(data)===JSON.stringify({})?t.calendarEvent.showEvents(!1):t.calendarEvent.hasEventsCheck(e)?t.calendarEvent.showEvents(!0):t.calendarEvent.showEvents(!1)})},updateCalendarWithData:function(){t("tbody td>span").each(function(e,a){t(this).after(t('<div class="hasEvent-box"></div>'))});var e=t("tbody td:not(.notCurrMonth)>span");data.monthEvents.forEach(function(a,n){t.calendarEvent.addEventIndicator(e[a.day-1],a.dayEvents.length)})},addEventIndicator:function(e,a){t(e).parent().find(".hasEvent-box").addClass("hasEvent").html(a)},hasEventsCheck:function(t){var e=!1;return data.monthEvents.forEach(function(a,n){if(a.day==t)return e=!0,!1}),e}}}(jQuery);
