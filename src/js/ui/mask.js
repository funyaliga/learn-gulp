// https://github.com/amazeui/amazeui/blob/master/js/ui.dimmer.js
import { generateGUID, supportTransition, measureScrollbar } from './core.js';

var $doc = $(document);

var Mask = function() {
	this.id = generateGUID('mask');
	this.$element = $(Mask.DEFAULTS.tpl, {
		id: this.id
	});

	this.inited = false;
	this.$used = $([]);
};
Mask.DEFAULTS = {
	tpl: '<div class="mask" data-mask></div>'
};
Mask.prototype.init = function() {
	if (!this.inited) {
		$(document.body).append(this.$element);
		this.inited = true;
		$doc.trigger('init.mask');
		this.$element.on('touchmove.mask', function(e) {
			e.preventDefault();
		});
	}
	return this;
};
Mask.prototype.open = function(relatedElement) {
	if (!this.inited) {
		this.init();
	}

	var $element = this.$element;

	// 用于多重调用
	if (relatedElement) {
		this.$used = this.$used.add($(relatedElement));
	}

	// 获取滚动条宽度
	if(!this.scrollbarWidth){
		this.checkScrollbar()
	}
	this.setScrollbar(); // 设置滚动条宽度

	$element.show().trigger('open.mask');

	supportTransition && $element.off(supportTransition.end);

	setTimeout(function() {
		$element.addClass('active');
	}, 0);

	return this;
};

Mask.prototype.close = function(relatedElement, force) {
	this.$used = this.$used.not($(relatedElement));

	if (!force && this.$used.length) {
		return this;
	}

	var $element = this.$element;

	$element.removeClass('active').trigger('close.mask.amui');

	function complete() {
	$element.hide();
	this.resetScrollbar();
	}

	// transition ? $element.one(transition.end, $.proxy(complete, this)) :
	complete.call(this);

	return this;
};

Mask.prototype.checkScrollbar = function() {
	this.scrollbarWidth = measureScrollbar();
	return this;
};

Mask.prototype.setScrollbar = function() {
	var $body = $(document.body);
	// 获取body原来的padding-right
	var bodyPaddingRight = parseInt(($body.css('padding-right') || 0), 10);

	if (this.scrollbarWidth) {
		$body.css('padding-right', bodyPaddingRight + this.scrollbarWidth);
	}

	$body.addClass('mask-active');

	return this;
};

Mask.prototype.resetScrollbar = function() {
	$(document.body).css('padding-right', '').removeClass('mask-active');

	return this;
};
export default new Mask();