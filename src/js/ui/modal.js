// https://github.com/amazeui/amazeui/blob/master/js/ui.modal.js

import { parseOptions, supportTransition, measureScrollbar } from './core.js';
import mask from './mask.js';

var $doc = $(document);

var Modal = function(element, options) {
	this.options = $.extend({}, Modal.DEFAULTS, options || {});
	this.$element = $(element);
	this.$dialog = this.$element.find('.modal-dialog'); //对话框

	this.isPopup = this.$element.hasClass('popup'); // 是否弹出
	this.isActions = this.$element.hasClass('modal-actions'); // 类似 iOS 的操作列表
	this.isPrompt = this.$element.hasClass('modal-prompt'); // 提示框
	this.isLoading = this.$element.hasClass('modal-loading');  // loading
	this.active = this.transitioning = this.relatedTarget = null;

	this.mask = this.options.mask ? mask : {
		open: function() {
		},
		close: function() {
		}
	};

	this.events();
}

// 默认参数
Modal.DEFAULTS = {
	className: {
		active: 'modal-active',
		out: 'modal-out'
	},
	selector: {
		modal: '.modal',
		active: '.modal-active'
	},
	closeViamask: true,
	cancelable: true,
	onConfirm: function() {
	},
	onCancel: function() {
	},
	closeOnCancel: true,
	closeOnConfirm: true,
	mask: true,
	height: undefined,
	width: undefined,
	duration: 300, // must equal the CSS transition duration
	transitionEnd: supportTransition && supportTransition.end + '.modal'
};

Modal.prototype.toggle = function (relatedTarget) {
	return this.active ? this.close() : this.open(relatedTarget);
}

// 显示
Modal.prototype.open = function(relatedTarget) {
	var $element = this.$element;
	var options = this.options;
	var isPopup = this.isPopup;
	var width = options.width;
	var height = options.height;
	var style = {};

	if (this.active) {
		return;
	}
	if (!this.$element.length) {
		return;
	}

	relatedTarget && (this.relatedTarget = relatedTarget); // ???

	// 判断如果还在动画，就先触发之前的closed事件
	if (this.transitioning) {
		clearTimeout($element.transitionEndTimmer);
		$element.transitionEndTimmer = null;
		$element.trigger(options.transitionEnd)
		        .off(options.transitionEnd);
	}

	isPopup && this.$element.show();  // ???

	this.active = true;

	// Event: open 方法被调用时触发 open.modal 事件
	$element.trigger($.Event('open.modal', {relatedTarget: relatedTarget}));

	this.mask.open($element)  // 显示蒙板

	$element.show().redraw(); // 显示并重绘

	// 设置宽高
	if (!isPopup && !this.isActions) {
		if (width) {
			style.width = parseInt(width, 10) + 'px';
		}

		if (height) {
			style.height = parseInt(height, 10) + 'px';
		}

		this.$dialog.css(style);
	}

	$element
		.removeClass(options.className.out)
		.addClass(options.className.active);

	this.transitioning = 1;

	var complete = function() {
		// Event: open 方法被调用后，CSS 动画执行时触发 opened.modal 事件
		$element.trigger($.Event('opened.modal', {
			relatedTarget: relatedTarget
		}));
		this.transitioning = 0;

		// 提示框自动获得焦点
		if (this.isPrompt) {
			this.$dialog.find('input').eq(0).focus();
		}
	};

	if (!supportTransition) {
		return complete.call(this);
	}

	$element
		.one(options.transitionEnd, $.proxy(complete, this))
		.emulateTransitionEnd(options.duration); //??
}

// 关闭
Modal.prototype.close = function(relatedTarget) {
	if (!this.active) {
		return;
	}

	var $element = this.$element;
	var options = this.options;
	var isPopup = this.isPopup;


	 // 判断如果还在动画，就先触发之前的opened事件
	if (this.transitioning) {
		clearTimeout($element.transitionEndTimmer);
		$element.transitionEndTimmer = null;
		$element.trigger(options.transitionEnd).off(options.transitionEnd);
		this.mask.close($element, true);
	}

	// Event: close 方法被调用时触发 close.modal 事件
	this.$element.trigger($.Event('close.modal', {
		relatedTarget: relatedTarget
	}));

	this.transitioning = 1;

	var complete = function() {
		// Event: close 方法被调用后，CSS 动画执行时触发 closed.modal 事件
		$element.trigger('closed.modal');
		isPopup && $element.removeClass(options.className.out);
		$element.hide();
		this.transitioning = 0;
		// 不强制关闭 mask，以便多个 Modal 可以共享 mask
		this.mask.close($element, false);
		this.active = false;
	};
	$element
		.removeClass(options.className.active)
		.addClass(options.className.out);

	if (!supportTransition) {
		return complete.call(this);
	}

	$element
		.one(options.transitionEnd, $.proxy(complete, this))
		.emulateTransitionEnd(options.duration);
}

Modal.prototype.events = function () {
	var _this = this;
	var options = this.options;
	var $element = this.$element;
	var $mask = this.mask.$element;
	var $input = $element.find('.modal-prompt-input');
	var $confirm = $element.find('[data-modal-confirm]');
	var $cancel = $element.find('[data-modal-cancel]');

	// 获取input val合集
	var getData = function() {
		var data = [];
		$input.each(function() {
			data.push($(this).val());
		});

		return (data.length === 0) ? undefined :
		((data.length === 1) ? data[0] : data);
	};

	// 按ESC关闭
	if (this.options.cancelable) {
		$element.on('keyup', function(e) {
			if (_this.active && e.which === 27) {
				$element.trigger('cancel.modal');
				_this.close();
			}
		});
	}

	// Close Modal when mask clicked
	if (this.options.mask && this.options.closeViamask && !this.isLoading) {
		$mask.on('click.mask.modal', function() {
			_this.close();
		});
	}

	// 点击按钮关闭
	$element.on(
		'click',
		'[data-modal-close], .modal-btn',
		function(e) {
			e.preventDefault();
			var $this = $(this);
			// 完成按钮
			if ($this.is($confirm)) {
				options.closeOnConfirm && _this.close();
			// 取消按钮
			} else if ($this.is($cancel)) {
				options.closeOnCancel && _this.close();
			} else {
				_this.close();
			}
		}
  	).on('click', function(e) {
  		e.stopPropagation();
  		$(e.target).is($element) && $mask.trigger('click.mask.modal');
	});

	// Event: confirm事件
	$confirm.on('click', function() {
		$element.trigger($.Event('confirm.modal', {
			trigger: this
		}));
	});

	// Event: cancel事件
	$cancel.on('click', function() {
		$element.trigger($.Event('cancel.modal', {
			trigger: this
		}));
	});

	$element
		.on('confirm.modal', function(e) {
			e.data = getData();
			_this.options.onConfirm.call(_this, e);
		})
		.on('cancel.modal', function(e) {
			e.data = getData();
			_this.options.onCancel.call(_this, e);
		});

}

function Plugin(option, relatedTarget) {
	return this.each(function() {
		var $this = $(this);
		var data = $this.data('modal');
		var options = typeof option == 'object' && option;

		if (!data) {
			$this.data('modal', (data = new Modal(this, options)));
		}

		if (typeof option == 'string') {
			data[option] && data[option](relatedTarget);
		} else {
			data.toggle(option && option.relatedTarget || undefined);
		}
	});
}

$.fn.modal = Plugin;

$doc.on('click', '[data-modal]', function() {
	var $this = $(this);
	// 获取参数
	var options = parseOptions($this.attr('data-modal'));
	// 优先获取参数里的targer,没有就获取href里的
	var $target = $(options.target ||
	($this.attr('href') && $this.attr('href').replace(/.*(?=#[^\s]+$)/, '')));

	var option = $target.data('modal') ? 'toggle' : options;

	// 把Plugin的this绑定到$target
	Plugin.call($target, option, this);
});

export default Modal;