!function(e,n){"use strict";"function"==typeof define&&define.amd?define(["jquery"],function(o){return n(o,e,e.document,e.Math)}):"undefined"!=typeof exports?module.exports=n(require("jquery"),e,e.document,e.Math):n(jQuery,e,e.document,e.Math)}("undefined"!=typeof window?window:this,function(e,n,o,t,i){"use strict";var l,r="fullpage-wrapper",a="."+r,s="fp-scrollable",c="."+s,d=".slimScrollBar",f=".slimScrollRail",u="fp-responsive",h="fp-notransition",p="fp-destroyed",v="fp-enabled",g="fp-viewing",m="active",S="."+m,w="fp-completely",y="."+w,b=".section",x="fp-section",T="."+x,C=T+S,k=T+":first",A=T+":last",L="fp-tableCell",B="."+L,E="fp-auto-height",M="fp-normal-scroll",H="fp-nav",R="#"+H,O="fp-tooltip",z="."+O,D="fp-show-active",P=".slide",I="fp-slide",F="."+I,V=F+S,q="fp-slides",W="."+q,Y="fp-slidesContainer",U="."+Y,X="fp-table",N="fp-slidesNav",K="."+N,j=K+" a",Q="fp-controlArrow",G="."+Q,J="fp-prev",Z="."+J,$=Q+" "+J,_=G+Z,ee="fp-next",ne="."+ee,oe=Q+" "+ee,te=G+ne,ie=e(n),le=e(o);e.fn.fullpage=function(s){function c(){s.css3&&(s.css3=Sn()),s.scrollBar=s.scrollBar||s.hybrid,f(),Q(),In.setAllowScrolling(!0),In.setAutoScrolling(s.autoScrolling,"internal");var n=e(C).find(V);n.length&&(0!==e(C).index(T)||0===e(C).index(T)&&0!==n.index())&&Ln(n),Ge(),mn(),ie.on("load",function(){ze()})}function d(){ie.on("scroll",fe).on("hashchange",De).blur(Ye).resize(Qe),le.keydown(Pe).keyup(Fe).on("click touchstart",R+" a",Ue).on("click touchstart",j,Xe).on("click",z,Ie),e(T).on("click touchstart",G,We),s.normalScrollElements&&(le.on("mouseenter",s.normalScrollElements,function(){In.setMouseWheelScrolling(!1)}),le.on("mouseleave",s.normalScrollElements,function(){In.setMouseWheelScrolling(!0)}))}function f(){s.anchors.length||(s.anchors=e(s.sectionSelector+"[data-anchor]").map(function(){return e(this).data("anchor").toString()}).get()),s.navigationTooltips.length||(s.navigationTooltips=e(s.sectionSelector+"[data-tooltip]").map(function(){return e(this).data("tooltip").toString()}).get())}function Q(){Xn.css({height:"100%",position:"relative"}),Xn.addClass(r),e("html").addClass(v),Nn=ie.height(),Xn.removeClass(p),re(),e(T).each(function(n){var o=e(this),t=o.find(F),i=t.length;ee(o,n),ne(o,n),i>0?Z(o,t,i):s.verticalCentered&&rn(o)}),s.fixedElements&&s.css3&&e(s.fixedElements).appendTo(Pn),s.navigation&&se(),s.scrollOverflow?("complete"===o.readyState&&ce(),ie.on("load",ce)):de()}function Z(n,o,t){var i=100*t,l=100/t;o.wrapAll('<div class="'+Y+'" />'),o.parent().wrap('<div class="'+q+'" />'),n.find(U).css("width",i+"%"),t>1&&(s.controlArrows&&ae(n),s.slidesNavigation&&hn(n,t)),o.each(function(n){e(this).css("width",l+"%"),s.verticalCentered&&rn(e(this))});var r=n.find(V);r.length&&(0!==e(C).index(T)||0===e(C).index(T)&&0!==r.index())?Ln(r):o.eq(0).addClass(m)}function ee(n,o){o||0!==e(C).length||n.addClass(m),n.css("height",Nn+"px"),s.paddingTop&&n.css("padding-top",s.paddingTop),s.paddingBottom&&n.css("padding-bottom",s.paddingBottom),"undefined"!=typeof s.sectionsColor[o]&&n.css("background-color",s.sectionsColor[o]),"undefined"!=typeof s.anchors[o]&&n.attr("data-anchor",s.anchors[o])}function ne(n,o){"undefined"!=typeof s.anchors[o]&&n.hasClass(m)&&nn(s.anchors[o],o),s.menu&&s.css3&&e(s.menu).closest(a).length&&e(s.menu).appendTo(Pn)}function re(){e(s.sectionSelector).each(function(){e(this).addClass(x)}),e(s.slideSelector).each(function(){e(this).addClass(I)})}function ae(e){e.find(W).after('<div class="'+$+'"></div><div class="'+oe+'"></div>'),"#fff"!=s.controlArrowColor&&(e.find(te).css("border-color","transparent transparent transparent "+s.controlArrowColor),e.find(_).css("border-color","transparent "+s.controlArrowColor+" transparent transparent")),s.loopHorizontal||e.find(_).hide()}function se(){Pn.append('<div id="'+H+'"><ul></ul></div>');var n=e(R);n.addClass(function(){return s.showActiveTooltip?D+" "+s.navigationPosition:s.navigationPosition});for(var o=0;o<e(T).length;o++){var t="";s.anchors.length&&(t=s.anchors[o]);var i='<li><a href="#'+t+'"><span></span></a>',l=s.navigationTooltips[o];"undefined"!=typeof l&&""!==l&&(i+='<div class="'+O+" "+s.navigationPosition+'">'+l+"</div>"),i+="</li>",n.find("ul").append(i)}e(R).css("margin-top","-"+e(R).height()/2+"px"),e(R).find("li").eq(e(C).index(T)).find("a").addClass(m)}function ce(){e(T).each(function(){var n=e(this).find(F);n.length?n.each(function(){ln(e(this))}):ln(e(this))}),de()}function de(){var n=e(C);n.addClass(w),s.scrollOverflowHandler.afterRender&&s.scrollOverflowHandler.afterRender(n),Me(n),He(n),e.isFunction(s.afterLoad)&&s.afterLoad.call(n,n.data("anchor"),n.index(T)+1),e.isFunction(s.afterRender)&&s.afterRender.call(Xn)}function fe(){var n;if(!s.autoScrolling||s.scrollBar){for(var t=ie.scrollTop(),i=he(t),l=0,r=t+ie.height()/2,a=o.querySelectorAll(T),c=0;c<a.length;++c){var d=a[c];d.offsetTop<=r&&(l=c)}if(ue(i)&&(e(C).hasClass(w)||e(C).addClass(w).siblings().removeClass(w)),n=e(a).eq(l),!n.hasClass(m)){io=!0;var f=e(C),u=f.index(T)+1,h=on(n),p=n.data("anchor"),v=n.index(T)+1,g=n.find(V);if(g.length)var S=g.data("anchor"),y=g.index();Qn&&(n.addClass(m).siblings().removeClass(m),e.isFunction(s.onLeave)&&s.onLeave.call(f,u,v,h),e.isFunction(s.afterLoad)&&s.afterLoad.call(n,p,v),Me(n),nn(p,v-1),s.anchors.length&&(Fn=p,pn(y,S,p,v))),clearTimeout(eo),eo=setTimeout(function(){io=!1},100)}s.fitToSection&&(clearTimeout(no),no=setTimeout(function(){Qn&&s.fitToSection&&(e(C).is(n)&&(Kn=!0),Ce(e(C)),Kn=!1)},s.fitToSectionDelay))}}function ue(n){var o=e(C).position().top,t=o+ie.height();return"up"==n?t>=ie.scrollTop()+ie.height():o<=ie.scrollTop()}function he(e){var n=e>lo?"down":"up";return lo=e,n}function pe(e,n){if(Jn.m[e]){var o,t;if("down"==e?(o="bottom",t=In.moveSectionDown):(o="top",t=In.moveSectionUp),n.length>0){if(!s.scrollOverflowHandler.isScrolled(o,n))return!0;t()}else t()}}function ve(n){var o=n.originalEvent;if(!ge(n.target)&&me(o)){s.autoScrolling&&n.preventDefault();var i=e(C),l=s.scrollOverflowHandler.scrollable(i);if(Qn&&!Wn){var r=An(o);so=r.y,co=r.x,i.find(W).length&&t.abs(ao-co)>t.abs(ro-so)?t.abs(ao-co)>ie.outerWidth()/100*s.touchSensitivity&&(ao>co?Jn.m.right&&In.moveSlideRight():Jn.m.left&&In.moveSlideLeft()):s.autoScrolling&&t.abs(ro-so)>ie.height()/100*s.touchSensitivity&&(ro>so?pe("down",l):so>ro&&pe("up",l))}}}function ge(n,o){o=o||0;var t=e(n).parent();return o<s.normalScrollElementTouchThreshold&&t.is(s.normalScrollElements)?!0:o==s.normalScrollElementTouchThreshold?!1:ge(t,++o)}function me(e){return"undefined"==typeof e.pointerType||"mouse"!=e.pointerType}function Se(e){var n=e.originalEvent;if(s.fitToSection&&Dn.stop(),me(n)){var o=An(n);ro=o.y,ao=o.x}}function we(e,n){for(var o=0,i=e.slice(t.max(e.length-n,1)),l=0;l<i.length;l++)o+=i[l];return t.ceil(o/n)}function ye(o){var i=(new Date).getTime(),l=e(y).hasClass(M);if(s.autoScrolling&&!qn&&!l){o=o||n.event;var r=o.wheelDelta||-o.deltaY||-o.detail,a=t.max(-1,t.min(1,r)),c="undefined"!=typeof o.wheelDeltaX||"undefined"!=typeof o.deltaX,d=t.abs(o.wheelDeltaX)<t.abs(o.wheelDelta)||t.abs(o.deltaX)<t.abs(o.deltaY)||!c;Gn.length>149&&Gn.shift(),Gn.push(t.abs(r)),s.scrollBar&&(o.preventDefault?o.preventDefault():o.returnValue=!1);var f=e(C),u=s.scrollOverflowHandler.scrollable(f),h=i-fo;if(fo=i,h>200&&(Gn=[]),Qn){var p=we(Gn,10),v=we(Gn,70),g=p>=v;g&&d&&(0>a?pe("down",u):pe("up",u))}return!1}s.fitToSection&&Dn.stop()}function be(n,o){var t="undefined"==typeof o?e(C):o,i=t.find(W),l=i.find(F).length;if(!(!i.length||Wn||2>l)){var r=i.find(V),a=null;if(a="prev"===n?r.prev(F):r.next(F),!a.length){if(!s.loopHorizontal)return;a="prev"===n?r.siblings(":last"):r.siblings(":first")}Wn=!0,je(i,a)}}function xe(){e(V).each(function(){Ln(e(this),"internal")})}function Te(e){var n=e.position(),o=n.top,t=n.top>uo,i=o-Nn+e.outerHeight();return e.outerHeight()>Nn?t||(o=i):(t||Kn&&e.is(":last-child"))&&(o=i),uo=o,o}function Ce(n,o,t){if("undefined"!=typeof n){var i=Te(n),l={element:n,callback:o,isMovementUp:t,dtop:i,yMovement:on(n),anchorLink:n.data("anchor"),sectionIndex:n.index(T),activeSlide:n.find(V),activeSection:e(C),leavingSection:e(C).index(T)+1,localIsResizing:Kn};if(!(l.activeSection.is(n)&&!Kn||s.scrollBar&&ie.scrollTop()===l.dtop&&!n.hasClass(E))){if(l.activeSlide.length)var r=l.activeSlide.data("anchor"),a=l.activeSlide.index();s.autoScrolling&&s.continuousVertical&&"undefined"!=typeof l.isMovementUp&&(!l.isMovementUp&&"up"==l.yMovement||l.isMovementUp&&"down"==l.yMovement)&&(l=Le(l)),(!e.isFunction(s.onLeave)||l.localIsResizing||s.onLeave.call(l.activeSection,l.leavingSection,l.sectionIndex+1,l.yMovement)!==!1)&&(Re(l.activeSection),n.addClass(m).siblings().removeClass(m),Me(n),Qn=!1,pn(a,r,l.anchorLink,l.sectionIndex),ke(l),Fn=l.anchorLink,nn(l.anchorLink,l.sectionIndex))}}}function ke(n){if(s.css3&&s.autoScrolling&&!s.scrollBar){var o="translate3d(0px, -"+n.dtop+"px, 0px)";sn(o,!0),s.scrollingSpeed?$n=setTimeout(function(){Ee(n)},s.scrollingSpeed):Ee(n)}else{var t=Ae(n);e(t.element).animate(t.options,s.scrollingSpeed,s.easing).promise().done(function(){s.scrollBar?setTimeout(function(){Ee(n)},30):Ee(n)})}}function Ae(e){var n={};return s.autoScrolling&&!s.scrollBar?(n.options={top:-e.dtop},n.element=a):(n.options={scrollTop:e.dtop},n.element="html, body"),n}function Le(n){return n.isMovementUp?e(C).before(n.activeSection.nextAll(T)):e(C).after(n.activeSection.prevAll(T).get().reverse()),Bn(e(C).position().top),xe(),n.wrapAroundElements=n.activeSection,n.dtop=n.element.position().top,n.yMovement=on(n.element),n}function Be(n){n.wrapAroundElements&&n.wrapAroundElements.length&&(n.isMovementUp?e(k).before(n.wrapAroundElements):e(A).after(n.wrapAroundElements),Bn(e(C).position().top),xe())}function Ee(n){Be(n),n.element.find(".fp-scrollable").mouseover(),e.isFunction(s.afterLoad)&&!n.localIsResizing&&s.afterLoad.call(n.element,n.anchorLink,n.sectionIndex+1),He(n.element),n.element.addClass(w).siblings().removeClass(w),Qn=!0,e.isFunction(n.callback)&&n.callback.call(this)}function Me(n){var n=Oe(n);n.find("img[data-src], source[data-src], audio[data-src]").each(function(){e(this).attr("src",e(this).data("src")),e(this).removeAttr("data-src"),e(this).is("source")&&e(this).closest("video").get(0).load()})}function He(n){var n=Oe(n);n.find("video, audio").each(function(){var n=e(this).get(0);n.hasAttribute("autoplay")&&"function"==typeof n.play&&n.play()})}function Re(n){var n=Oe(n);n.find("video, audio").each(function(){var n=e(this).get(0);n.hasAttribute("data-ignore")||"function"!=typeof n.pause||n.pause()})}function Oe(n){var o=n.find(V);return o.length&&(n=e(o)),n}function ze(){var e=n.location.hash.replace("#","").split("/"),o=e[0],t=e[1];o&&(s.animateAnchor?fn(o,t):In.silentMoveTo(o,t))}function De(){if(!io&&!s.lockAnchors){var e=n.location.hash.replace("#","").split("/"),o=e[0],t=e[1],i="undefined"==typeof Fn,l="undefined"==typeof Fn&&"undefined"==typeof t&&!Wn;o.length&&(o&&o!==Fn&&!i||l||!Wn&&Vn!=t)&&fn(o,t)}}function Pe(n){clearTimeout(oo);var o=e(":focus");if(!o.is("textarea")&&!o.is("input")&&!o.is("select")&&"true"!==o.attr("contentEditable")&&""!==o.attr("contentEditable")&&s.keyboardScrolling&&s.autoScrolling){var t=n.which,i=[40,38,32,33,34];e.inArray(t,i)>-1&&n.preventDefault(),qn=n.ctrlKey,oo=setTimeout(function(){Ne(n)},150)}}function Ie(){e(this).prev().trigger("click")}function Fe(e){jn&&(qn=e.ctrlKey)}function Ve(e){2==e.which&&(ho=e.pageY,Xn.on("mousemove",Ke))}function qe(e){2==e.which&&Xn.off("mousemove")}function We(){var n=e(this).closest(T);e(this).hasClass(J)?Jn.m.left&&In.moveSlideLeft(n):Jn.m.right&&In.moveSlideRight(n)}function Ye(){jn=!1,qn=!1}function Ue(n){n.preventDefault();var o=e(this).parent().index();Ce(e(T).eq(o))}function Xe(n){n.preventDefault();var o=e(this).closest(T).find(W),t=o.find(F).eq(e(this).closest("li").index());je(o,t)}function Ne(n){var o=n.shiftKey;switch(n.which){case 38:case 33:Jn.k.up&&In.moveSectionUp();break;case 32:if(o&&Jn.k.up){In.moveSectionUp();break}case 40:case 34:Jn.k.down&&In.moveSectionDown();break;case 36:Jn.k.up&&In.moveTo(1);break;case 35:Jn.k.down&&In.moveTo(e(T).length);break;case 37:Jn.k.left&&In.moveSlideLeft();break;case 39:Jn.k.right&&In.moveSlideRight();break;default:return}}function Ke(e){Qn&&(e.pageY<ho&&Jn.m.up?In.moveSectionUp():e.pageY>ho&&Jn.m.down&&In.moveSectionDown()),ho=e.pageY}function je(n,o){var i=o.position(),l=o.index(),r=n.closest(T),a=r.index(T),c=r.data("anchor"),d=r.find(K),f=gn(o),u=r.find(V),h=Kn;if(s.onSlideLeave){var p=u.index(),v=tn(p,l);if(!h&&"none"!==v&&e.isFunction(s.onSlideLeave)&&s.onSlideLeave.call(u,c,a+1,p,v,l)===!1)return void(Wn=!1)}Re(u),o.addClass(m).siblings().removeClass(m),h||Me(o),!s.loopHorizontal&&s.controlArrows&&(r.find(_).toggle(0!==l),r.find(te).toggle(!o.is(":last-child"))),r.hasClass(m)&&pn(l,f,c,a);var g=function(){h||e.isFunction(s.afterSlideLoad)&&s.afterSlideLoad.call(o,c,a+1,f,l),He(o),Wn=!1};if(s.css3){var w="translate3d(-"+t.round(i.left)+"px, 0px, 0px)";Je(n.find(U),s.scrollingSpeed>0).css(En(w)),_n=setTimeout(function(){g()},s.scrollingSpeed,s.easing)}else n.animate({scrollLeft:t.round(i.left)},s.scrollingSpeed,s.easing,function(){g()});d.find(S).removeClass(m),d.find("li").eq(l).find("a").addClass(m)}function Qe(){if(Ge(),Yn){var n=e(o.activeElement);if(!n.is("textarea")&&!n.is("input")&&!n.is("select")){var i=ie.height();t.abs(i-po)>20*t.max(po,i)/100&&(In.reBuild(!0),po=i)}}else clearTimeout(Zn),Zn=setTimeout(function(){In.reBuild(!0)},350)}function Ge(){var e=s.responsive||s.responsiveWidth,n=s.responsiveHeight,o=e&&ie.outerWidth()<e,t=n&&ie.height()<n;e&&n?In.setResponsive(o||t):e?In.setResponsive(o):n&&In.setResponsive(t)}function Je(e){var n="all "+s.scrollingSpeed+"ms "+s.easingcss3;return e.removeClass(h),e.css({"-webkit-transition":n,transition:n})}function Ze(e){return e.addClass(h)}function $e(e,n){var o=825,i=900;if(o>e||i>n){var l=100*e/o,r=100*n/i,a=t.min(l,r),s=a.toFixed(2);Pn.css("font-size",s+"%")}else Pn.css("font-size","100%")}function _e(n,o){s.navigation&&(e(R).find(S).removeClass(m),n?e(R).find('a[href="#'+n+'"]').addClass(m):e(R).find("li").eq(o).find("a").addClass(m))}function en(n){s.menu&&(e(s.menu).find(S).removeClass(m),e(s.menu).find('[data-menuanchor="'+n+'"]').addClass(m))}function nn(e,n){en(e),_e(e,n)}function on(n){var o=e(C).index(T),t=n.index(T);return o==t?"none":o>t?"up":"down"}function tn(e,n){return e==n?"none":e>n?"left":"right"}function ln(e){e.css("overflow","hidden");var n,o=s.scrollOverflowHandler,t=o.wrapContent(),i=e.closest(T),l=o.scrollable(e);l.length?n=o.scrollHeight(e):(n=e.get(0).scrollHeight,s.verticalCentered&&(n=e.find(B).get(0).scrollHeight));var r=Nn-parseInt(i.css("padding-bottom"))-parseInt(i.css("padding-top"));n>r?l.length?o.update(e,r):(s.verticalCentered?e.find(B).wrapInner(t):e.wrapInner(t),o.create(e,r)):o.remove(e),e.css("overflow","")}function rn(e){e.addClass(X).wrapInner('<div class="'+L+'" style="height:'+an(e)+'px;" />')}function an(e){var n=Nn;if(s.paddingTop||s.paddingBottom){var o=e;o.hasClass(x)||(o=e.closest(T));var t=parseInt(o.css("padding-top"))+parseInt(o.css("padding-bottom"));n=Nn-t}return n}function sn(e,n){n?Je(Xn):Ze(Xn),Xn.css(En(e)),setTimeout(function(){Xn.removeClass(h)},10)}function cn(n){var o=Xn.find(T+'[data-anchor="'+n+'"]');return o.length||(o=e(T).eq(n-1)),o}function dn(e,n){var o=n.find(W),t=o.find(F+'[data-anchor="'+e+'"]');return t.length||(t=o.find(F).eq(e)),t}function fn(e,n){var o=cn(e);"undefined"==typeof n&&(n=0),e===Fn||o.hasClass(m)?un(o,n):Ce(o,function(){un(o,n)})}function un(e,n){if("undefined"!=typeof n){var o=e.find(W),t=dn(n,e);t.length&&je(o,t)}}function hn(e,n){e.append('<div class="'+N+'"><ul></ul></div>');var o=e.find(K);o.addClass(s.slidesNavPosition);for(var t=0;n>t;t++)o.find("ul").append('<li><a href="#"><span></span></a></li>');o.css("margin-left","-"+o.width()/2+"px"),o.find("li").first().find("a").addClass(m)}function pn(e,n,o,t){var i="";s.anchors.length&&!s.lockAnchors&&(e?("undefined"!=typeof o&&(i=o),"undefined"==typeof n&&(n=e),Vn=n,vn(i+"/"+n)):"undefined"!=typeof e?(Vn=n,vn(o)):vn(o)),mn()}function vn(e){if(s.recordHistory)location.hash=e;else if(Yn||Un)n.history.replaceState(i,i,"#"+e);else{var o=n.location.href.split("#")[0];n.location.replace(o+"#"+e)}}function gn(e){var n=e.data("anchor"),o=e.index();return"undefined"==typeof n&&(n=o),n}function mn(){var n=e(C),o=n.find(V),t=gn(n),i=gn(o),l=(n.index(T),String(t));o.length&&(l=l+"-"+i),l=l.replace("/","-").replace("#","");var r=new RegExp("\\b\\s?"+g+"-[^\\s]+\\b","g");Pn[0].className=Pn[0].className.replace(r,""),Pn.addClass(g+"-"+l)}function Sn(){var e,t=o.createElement("p"),l={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};o.body.insertBefore(t,null);for(var r in l)t.style[r]!==i&&(t.style[r]="translate3d(1px,1px,1px)",e=n.getComputedStyle(t).getPropertyValue(l[r]));return o.body.removeChild(t),e!==i&&e.length>0&&"none"!==e}function wn(){o.addEventListener?(o.removeEventListener("mousewheel",ye,!1),o.removeEventListener("wheel",ye,!1),o.removeEventListener("MozMousePixelScroll",ye,!1)):o.detachEvent("onmousewheel",ye)}function yn(){var e,t="";n.addEventListener?e="addEventListener":(e="attachEvent",t="on");var l="onwheel"in o.createElement("div")?"wheel":o.onmousewheel!==i?"mousewheel":"DOMMouseScroll";"DOMMouseScroll"==l?o[e](t+"MozMousePixelScroll",ye,!1):o[e](t+l,ye,!1)}function bn(){Xn.on("mousedown",Ve).on("mouseup",qe)}function xn(){Xn.off("mousedown",Ve).off("mouseup",qe)}function Tn(){if(Yn||Un){var n=kn();e(a).off("touchstart "+n.down).on("touchstart "+n.down,Se),e(a).off("touchmove "+n.move).on("touchmove "+n.move,ve)}}function Cn(){if(Yn||Un){var n=kn();e(a).off("touchstart "+n.down),e(a).off("touchmove "+n.move)}}function kn(){var e;return e=n.PointerEvent?{down:"pointerdown",move:"pointermove"}:{down:"MSPointerDown",move:"MSPointerMove"}}function An(e){var n=[];return n.y="undefined"!=typeof e.pageY&&(e.pageY||e.pageX)?e.pageY:e.touches[0].pageY,n.x="undefined"!=typeof e.pageX&&(e.pageY||e.pageX)?e.pageX:e.touches[0].pageX,Un&&me(e)&&s.scrollBar&&(n.y=e.touches[0].pageY,n.x=e.touches[0].pageX),n}function Ln(e,n){In.setScrollingSpeed(0,"internal"),"undefined"!=typeof n&&(Kn=!0),je(e.closest(W),e),"undefined"!=typeof n&&(Kn=!1),In.setScrollingSpeed(to.scrollingSpeed,"internal")}function Bn(e){if(s.scrollBar)Xn.scrollTop(e);else if(s.css3){var n="translate3d(0px, -"+e+"px, 0px)";sn(n,!1)}else Xn.css("top",-e)}function En(e){return{"-webkit-transform":e,"-moz-transform":e,"-ms-transform":e,transform:e}}function Mn(e,n,o){switch(n){case"up":Jn[o].up=e;break;case"down":Jn[o].down=e;break;case"left":Jn[o].left=e;break;case"right":Jn[o].right=e;break;case"all":"m"==o?In.setAllowScrolling(e):In.setKeyboardScrolling(e)}}function Hn(){Bn(0),e(R+", "+K+", "+G).remove(),e(T).css({height:"","background-color":"",padding:""}),e(F).css({width:""}),Xn.css({height:"",position:"","-ms-touch-action":"","touch-action":""}),Dn.css({overflow:"",height:""}),e("html").removeClass(v),e.each(Pn.get(0).className.split(/\s+/),function(e,n){0===n.indexOf(g)&&Pn.removeClass(n)}),e(T+", "+F).each(function(){s.scrollOverflowHandler.remove(e(this)),e(this).removeClass(X+" "+m)}),Ze(Xn),Xn.find(B+", "+U+", "+W).each(function(){e(this).replaceWith(this.childNodes)}),Dn.scrollTop(0);var n=[x,I,Y];e.each(n,function(n,o){e("."+o).removeClass(o)})}function Rn(e,n,o){s[e]=n,"internal"!==o&&(to[e]=n)}function On(){return e("html").hasClass(v)?void zn("error","Fullpage.js can only be initialized once and you are doing it multiple times!"):(s.continuousVertical&&(s.loopTop||s.loopBottom)&&(s.continuousVertical=!1,zn("warn","Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),s.scrollBar&&s.scrollOverflow&&zn("warn","Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox"),s.continuousVertical&&s.scrollBar&&(s.continuousVertical=!1,zn("warn","Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),void e.each(s.anchors,function(n,o){var t=le.find("[name]").filter(function(){return e(this).attr("name")&&e(this).attr("name").toLowerCase()==o.toLowerCase()}),i=le.find("[id]").filter(function(){return e(this).attr("id")&&e(this).attr("id").toLowerCase()==o.toLowerCase()});(i.length||t.length)&&(zn("error","data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."),i.length&&zn("error",'"'+o+'" is is being used by another element `id` property'),t.length&&zn("error",'"'+o+'" is is being used by another element `name` property'))}))}function zn(e,n){console&&console[e]&&console[e]("fullPage: "+n)}if(e("html").hasClass(v))return void On();var Dn=e("html, body"),Pn=e("body"),In=e.fn.fullpage;s=e.extend({menu:!1,anchors:[],lockAnchors:!1,navigation:!1,navigationPosition:"right",navigationTooltips:[],showActiveTooltip:!1,slidesNavigation:!1,slidesNavPosition:"bottom",scrollBar:!1,hybrid:!1,css3:!0,scrollingSpeed:700,autoScrolling:!0,fitToSection:!0,fitToSectionDelay:1e3,easing:"easeInOutCubic",easingcss3:"ease",loopBottom:!1,loopTop:!1,loopHorizontal:!0,continuousVertical:!1,normalScrollElements:null,scrollOverflow:!1,scrollOverflowHandler:l,touchSensitivity:5,normalScrollElementTouchThreshold:5,keyboardScrolling:!0,animateAnchor:!0,recordHistory:!0,controlArrows:!0,controlArrowColor:"#fff",verticalCentered:!0,resize:!1,sectionsColor:[],paddingTop:0,paddingBottom:0,fixedElements:null,responsive:0,responsiveWidth:0,responsiveHeight:0,sectionSelector:b,slideSelector:P,afterLoad:null,onLeave:null,afterRender:null,afterResize:null,afterReBuild:null,afterSlideLoad:null,onSlideLeave:null},s),On(),e.extend(e.easing,{easeInOutCubic:function(e,n,o,t,i){return(n/=i/2)<1?t/2*n*n*n+o:t/2*((n-=2)*n*n+2)+o}}),In.setAutoScrolling=function(n,o){Rn("autoScrolling",n,o);var t=e(C);s.autoScrolling&&!s.scrollBar?(Dn.css({overflow:"hidden",height:"100%"}),In.setRecordHistory(to.recordHistory,"internal"),Xn.css({"-ms-touch-action":"none","touch-action":"none"}),t.length&&Bn(t.position().top)):(Dn.css({overflow:"visible",height:"initial"}),In.setRecordHistory(!1,"internal"),Xn.css({"-ms-touch-action":"","touch-action":""}),Bn(0),t.length&&Dn.scrollTop(t.position().top))},In.setRecordHistory=function(e,n){Rn("recordHistory",e,n)},In.setScrollingSpeed=function(e,n){Rn("scrollingSpeed",e,n)},In.setFitToSection=function(e,n){Rn("fitToSection",e,n)},In.setLockAnchors=function(e){s.lockAnchors=e},In.setMouseWheelScrolling=function(e){e?(yn(),bn()):(wn(),xn())},In.setAllowScrolling=function(n,o){"undefined"!=typeof o?(o=o.replace(/ /g,"").split(","),e.each(o,function(e,o){Mn(n,o,"m")})):n?(In.setMouseWheelScrolling(!0),Tn()):(In.setMouseWheelScrolling(!1),Cn())},In.setKeyboardScrolling=function(n,o){"undefined"!=typeof o?(o=o.replace(/ /g,"").split(","),e.each(o,function(e,o){Mn(n,o,"k")})):s.keyboardScrolling=n},In.moveSectionUp=function(){var n=e(C).prev(T);n.length||!s.loopTop&&!s.continuousVertical||(n=e(T).last()),n.length&&Ce(n,null,!0)},In.moveSectionDown=function(){var n=e(C).next(T);n.length||!s.loopBottom&&!s.continuousVertical||(n=e(T).first()),n.length&&Ce(n,null,!1)},In.silentMoveTo=function(e,n){In.setScrollingSpeed(0,"internal"),In.moveTo(e,n),In.setScrollingSpeed(to.scrollingSpeed,"internal")},In.moveTo=function(e,n){var o=cn(e);"undefined"!=typeof n?fn(e,n):o.length>0&&Ce(o)},In.moveSlideRight=function(e){be("next",e)},In.moveSlideLeft=function(e){be("prev",e)},In.reBuild=function(n){if(!Xn.hasClass(p)){Kn=!0;var o=ie.outerWidth();Nn=ie.height(),s.resize&&$e(Nn,o),e(T).each(function(){var n=e(this).find(W),o=e(this).find(F);s.verticalCentered&&e(this).find(B).css("height",an(e(this))+"px"),e(this).css("height",Nn+"px"),s.scrollOverflow&&(o.length?o.each(function(){ln(e(this))}):ln(e(this))),o.length>1&&je(n,n.find(V))});var t=e(C),i=t.index(T);i&&In.silentMoveTo(i+1),Kn=!1,e.isFunction(s.afterResize)&&n&&s.afterResize.call(Xn),e.isFunction(s.afterReBuild)&&!n&&s.afterReBuild.call(Xn)}},In.setResponsive=function(n){var o=Pn.hasClass(u);n?o||(In.setAutoScrolling(!1,"internal"),In.setFitToSection(!1,"internal"),e(R).hide(),Pn.addClass(u)):o&&(In.setAutoScrolling(to.autoScrolling,"internal"),In.setFitToSection(to.autoScrolling,"internal"),e(R).show(),Pn.removeClass(u))};var Fn,Vn,qn,Wn=!1,Yn=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),Un="ontouchstart"in n||navigator.msMaxTouchPoints>0||navigator.maxTouchPoints,Xn=e(this),Nn=ie.height(),Kn=!1,jn=!0,Qn=!0,Gn=[],Jn={};Jn.m={up:!0,down:!0,left:!0,right:!0},Jn.k=e.extend(!0,{},Jn.m);var Zn,$n,_n,eo,no,oo,to=e.extend(!0,{},s);e(this).length&&(c(),d());var io=!1,lo=0,ro=0,ao=0,so=0,co=0,fo=(new Date).getTime(),uo=0,ho=0,po=Nn;In.destroy=function(n){In.setAutoScrolling(!1,"internal"),In.setAllowScrolling(!1),In.setKeyboardScrolling(!1),Xn.addClass(p),clearTimeout(_n),clearTimeout($n),clearTimeout(Zn),clearTimeout(eo),clearTimeout(no),ie.off("scroll",fe).off("hashchange",De).off("resize",Qe),le.off("click",R+" a").off("mouseenter",R+" li").off("mouseleave",R+" li").off("click",j).off("mouseover",s.normalScrollElements).off("mouseout",s.normalScrollElements),e(T).off("click",G),clearTimeout(_n),clearTimeout($n),n&&Hn()}};var re={afterRender:function(e){var n=e.find(q),o=e.find(c);n.length&&(o=n.find(V)),o.mouseover()},create:function(e,n){e.find(c).slimScroll({allowPageScroll:!0,height:n+"px",size:"10px",alwaysVisible:!0})},isScrolled:function(e,n){return"top"===e?!n.scrollTop():"bottom"===e?n.scrollTop()+1+n.innerHeight()>=n[0].scrollHeight:void 0},scrollable:function(e){return e.find(W).length?e.find(V).find(c):e.find(c)},scrollHeight:function(e){return e.find(c).get(0).scrollHeight},remove:function(e){e.find(c).children().first().unwrap().unwrap(),e.find(d).remove(),e.find(f).remove()},update:function(e,n){e.find(c).css("height",n+"px").parent().css("height",n+"px")},wrapContent:function(){return'<div class="'+s+'"></div>'}};l=re});


var 
Q=function(W,D,M,html,laHash,lash,L,LL,index,popstate,VS,Regex,key,Q){
	html=D.getElementsByTagName('html')[0];
	laHash='`';
	Regex=[];
	key='!';
	popstate=function(){
		if(laHash==location.hash)
			return;

		Q.lash=lash=location.hash.substring(key.length+1);

		L=lash.split('/');

		var 
		i=Regex.length;
		while(i--)if(LL=lash.match(Regex[i][0])){
			LL[0]=Regex[i][1];
			L=LL;
			break;
		}
		
		if(!Q[L[0]]){
			location.hash='#'+key+index;
			Q.lash=index;
			return;
		}

		if(Q.pop)
			Q.pop.apply(W,L);

		laHash=location.hash;

		Q[L.shift()].apply(W,L);
	};
	Q={
		lash:'',
		init:function(o){

			if(o.key!==undefined)
				key=o.key;

			index=o.index||'V';

			if(o.pop&&typeof o.pop=='function')
				Q.pop=o.pop;

			popstate();

			'onhashchange' in W?W.onhashchange=popstate:setInterval(function(){
				if(laHash!=location.hash){
					popstate();
					laHash=location.hash;
				}
			},100);

			return this
		},
		pop:function(L){
			html.setAttribute('view',L[0]);
		},
		reg:function(r,u){
			//稍微修改了下函数，现在能使用数组来注册了
			if(!r)
				return;

			if(u == undefined)
				u=function(){};

			if(r instanceof RegExp){
				if(typeof u=='function'){
					var fn='A'+(('8'+Math.random()).substring(3)*1).toString(16);
					Q[fn]=u;
					u=fn;
				}
				Regex.push([r,u]);
			}else if(r instanceof Array){
				for(var i in r){
					L=[].concat(r[i]).concat(u);
					this.reg.apply(this,L);
				}
			}else if (typeof r == 'string') {
				if(typeof u=='function'){
					Q[r]=u;
				}else if(typeof u=='string' && Q[u]){
					Q[r]=Q[u];
				}
			};
			return this
		},
		V:function(){
			console.log('Q.js <https://github.com/itorr/q.js> 2014/12/28');
			return this
		},
		go:function(u){
			location.hash='#'+key+u;
			return this
		}
	};
	return Q;
}(this,document);

var baidumapshow = function () {
	// 百度地图API功能
	var map = new BMap.Map('allmap');
	var poi = new BMap.Point(113.326455,  23.042834);
	map.centerAndZoom(poi, 19);
	map.enableScrollWheelZoom();

	var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
	                '地址：广州市番禺区信基沙溪酒店用品博览城厦滘馆东门二楼。' +
	              '</div>';

	//创建检索信息窗口对象
	var searchInfoWindow = null;
	searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
			title  : "信基蜂巢",      //标题
			width  : 160,             //宽度
			height : 60,              //高度
			panel  : "panel",         //检索结果面板
			enableAutoPan : true,     //自动平移
			searchTypes   :[
				BMAPLIB_TAB_SEARCH,   //周边检索
				BMAPLIB_TAB_TO_HERE,  //到这里去
				BMAPLIB_TAB_FROM_HERE //从这里出发
			]
		});
	var marker = new BMap.Marker(poi); //创建marker对象
	marker.enableDragging(); //marker可拖拽
	searchInfoWindow.open(marker);
	map.addOverlay(marker); //在地图中添加marker

	map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
	map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));  //右上角，仅包含平移和缩放按钮
	map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT, type: BMAP_NAVIGATION_CONTROL_PAN}));  //左下角，仅包含平移按钮
	map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM}));  //右下角，仅包含缩放按钮
}

$(function () {
	var isMapShow = false;
	var isFullpage = false;
	var Qshow = function (t) {
		$('#'+ t).addClass('q').siblings('.g-main').removeClass('q');
		$('.menu-list').find('a[href="#!'+t+'"]').parent('li').addClass('active').siblings().removeClass('active');
	}
	Q.reg('home',function(){
		Qshow('home');
		if(!isFullpage){
			 $('#home').fullpage({
				scrollingSpeed: 1000,
				sectionSelector: '#home .m-section',
				normalScrollElements: '#contact'
			});
			isFullpage = true;
		}
	}).reg('about',function(){
		Qshow('about')
	}).reg('contact',function(){
		Qshow('contact');
		if(!isMapShow){
			baidumapshow();
			isMapShow = true;
		}
	});
	Q.init({
	    index:'home'
	});

	$('.section-about .section-box').css( "background-size", "cover" );


	// var setSectionH = function () {
	// 	var $w = $('.g-main');
	// 	var ww = $w.width();
	// 	var wh = $w.height();
	// 	var gap = 30 / 960 * $w.height();
	// 	$('.m-section').css({
	// 		'height': wh - gap - gap,
	// 		'margin-top': gap,
	// 		'margin-right': gap,
	// 	})
	// }
	// setSectionH();
	// 
	
})