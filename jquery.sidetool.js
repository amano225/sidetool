// サイドから通知を表示するjQueryプラグイン
(function($) {
	$.fn.sidetool = function(opt) {
		var def = {
			'side': 'right',
			'firstView': false
		}
		var set = $.extend(def, opt);
		var side = set['side'];
		var $toolMain = this.find('.toolMain');
		var $this = this;

		if(!(side == "left" || side == "top" || side == "bottom")) {
			side = "right";
		}
		var contraSide = "left";
		if(side == "left") {
			contraSide = "right";
		} else if(side == "top") {
			contraSide = "bottom";
		} else if(side == "bottom") {
			contraSide = "top";
		}

		var fullWidth = $.fn.outerWidth;
		if(side == "top" || side == "bottom") {
			fullWidth = $.fn.outerHeight;
		}

		var containWidth = $.fn.width;
		if(side == "top" || side == "bottom") {
			containWidth = $.fn.height;
		}

		var wideProp = "width";
		if(side == "top" || side == "bottom") {
			wideProp = "height";
		}

		this.css('position', 'fixed');

		var $viewBtn = null;
		if(this.find('.toolBtn').length) {
			$viewBtn = $this.find('.toolBtn');
		}

		var toolMainPos = 0;

		if($viewBtn) {
			$viewBtn.css('position', 'absolute')
					.css(contraSide, '0px')
					.css('width', $viewBtn.width());
			toolMainPos = $viewBtn.outerWidth() + 1;
		}
		$toolMain.css('position', 'absolute')
				.css(contraSide, toolMainPos + 'px')
				.css('width', $toolMain.width() + 'px');


		if(set['firstView']) {
			$this.addClass('toolShow');
			$this.css(side, '0px');
		} else {
			$this.addClass('toolHide');
			$this.css(side, -1 * ($toolMain.outerWidth()) + 'px');
		}

		var anim = {};
		$this.bind('onNotify', function() {
			if($this.hasClass('toolShow')) {
				anim[side] = -1 * ($toolMain.outerWidth()) + 'px';
				$this.animate(anim, function() {
					$this.addClass('toolHide');
					$this.removeClass('toolShow');
				})
			} else if($this.hasClass('toolHide')) {
				anim[side] = '0px';
				$this.animate(anim, function() {
					$this.addClass('toolShow');
					$this.removeClass('toolHide');
				})
			} else {

			}
		});

		$viewBtn.click(function() {
			$this.trigger('onNotify');
		});

		var thisWidth;
		thisWidth = $toolMain.outerWidth();
		if($viewBtn) {
			thisWidth = thisWidth + $viewBtn.outerWidth();
		}
		$this.css('width', thisWidth + 'px');

		return (this);
	}
})(jQuery);