export const supportTransition = (function() {
	var doc = window.document;
	// https://developer.mozilla.org/en-US/docs/Web/Events/transitionend#Browser_compatibility
	var transitionEnd = (function() {
		var element = doc.body || doc.documentElement;
		var transEndEventNames = {
			WebkitTransition: 'webkitTransitionEnd',
			MozTransition: 'transitionend',
			transition: 'transitionend'
		};
		for (var name in transEndEventNames) {
			if (element.style[name] !== undefined) {
				return transEndEventNames[name];
			}
		}
	})();

	return transitionEnd && {end: transitionEnd};
})();

// 获取参数
export function parseOptions (string) {
	if ($.isPlainObject(string)) {
		return string;
	}
	var start = (string ? string.indexOf('{') : -1);
	var options = {};

	if (start != -1) {
		try {
			options = (new Function('',
				'var json = ' + string.substr(start) +
				'; return JSON.parse(JSON.stringify(json));'))();
			} 
		catch (e) {
		}
	}
	return options;
};

// 生成唯一标识符
export function generateGUID (namespace) {
	var uid = namespace + '-' || 'f-';

	do {
		uid += Math.random().toString(36).substring(2, 7);
	} while (document.getElementById(uid));

	return uid;
};

// 获取滚动条宽度
export function measureScrollbar () {
	if (document.body.clientWidth >= window.innerWidth) {
		return 0;
	}

	// if ($html.width() >= window.innerWidth) return;
	// var scrollbarWidth = window.innerWidth - $html.width();
	var $measure = $('<div ' +
	'style="width: 100px;height: 100px;overflow: scroll;' +
	'position: absolute;top: -9999px;"></div>');

	$(document.body).append($measure);

	var scrollbarWidth = $measure[0].offsetWidth - $measure[0].clientWidth;

	$measure.remove();

	return scrollbarWidth;
};

// 重绘
$.fn.redraw = function() {
	return this.each(function() {
		var redraw = this.offsetHeight;
	});
};

// 动画结束
$.fn.transitionEnd = function(callback) {
	var endEvent = supportTransition;
	var dom = this;

	function fireCallBack(e) {
		callback.call(this, e);
		endEvent && dom.off(endEvent, fireCallBack);
	}

	if (callback && endEvent) {
		dom.on(endEvent, fireCallBack);
	}

	return this;
};

// http://blog.alexmaccaw.com/css-transitions
// 模拟动画结束
$.fn.emulateTransitionEnd = function(duration) {
	var called = false;
	var $el = this;

	$(this).one(supportTransition.end, function() {
		called = true;
	});

	var callback = function() {
		if (!called) {
			$($el).trigger(supportTransition.end);
		}
		$el.transitionEndTimmer = undefined;
	};
	this.transitionEndTimmer = setTimeout(callback, duration);
	return this;
};