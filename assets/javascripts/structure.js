!function(t,e,n,i){"use strict";n(".vertical.menu").find("a").on("click",function(t){t.preventDefault();var e=this.getAttribute("href");"#"!==e&&(location.hash=e,n(".tabs-panel").hide(),n(e).show())});var a=location.hash;a&&n(a).show()}(window,document,jQuery);