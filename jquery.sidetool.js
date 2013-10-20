// サイドからの通知用jQueryプラグイン
// jQuery.sidetool.js
(function($) {
	$.fn.sidetool = function(opt) {
		var def = {
			'side': 'bottom',
			'viewBtn': null
		}
		var set = $.extend(def, opt);
		return (this);
	}
} (jQuery));