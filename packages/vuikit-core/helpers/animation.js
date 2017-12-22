import css from '@vuikit/core/utils/css';
import { one } from '@vuikit/core/utils/event';
import { attr as attr$1 } from '@vuikit/core/helpers/attr';
import toArray from '@vuikit/core/utils/to-array';
import Promise from '@vuikit/core/helpers/promise';
import { trigger } from '@vuikit/core/helpers/event';
import startsWith from '@vuikit/core/utils/starts-with';
import { animationend, requestAnimationFrame } from '@vuikit/core/helpers/env';
import { addClass, hasClass, removeClass } from '@vuikit/core/utils/class';

var animationcancel = 'animationcancel';
var animationPrefix = 'uk-animation-';
var clsCancelAnimation = 'uk-cancel-animation';

function animate (ref) {
  var element = ref.element;
  var animation = ref.animation;
  var origin = ref.origin;
  var duration = ref.duration; if ( duration === void 0 ) duration = 200;
  var out = ref.out; if ( out === void 0 ) out = false;


  return Promise.all(toArray(element).map(animate))

  function animate (element) {
    var arguments$1 = arguments;

    return new Promise(function (resolve, reject) {

      if (hasClass(element, clsCancelAnimation)) {
        requestAnimationFrame(function () { return Promise.resolve().then(function () { return animate.apply(null, arguments$1).then(resolve, reject); }
          ); }
        );
        return
      }

      var cls = animation + " " + animationPrefix + (out ? 'leave' : 'enter');

      if (startsWith(animation, animationPrefix)) {

        if (origin) {
          cls += " " + animationPrefix + origin;
        }

        if (out) {
          cls += " " + animationPrefix + "reverse";
        }

      }

      resetAnimation(element);

      one(element, ((animationend || 'animationend') + " " + animationcancel), function (ref) {
        var type = ref.type;


        var hasReset = false;

        if (type === animationcancel) {
          reject(new Error('UIkit animation canceled')); // eslint-disable-line
          resetAnimation(element);
        } else {
          resolve();
          Promise.resolve().then(function () {
            hasReset = true;
            resetAnimation(element);
          });
        }

        requestAnimationFrame(function () {
          if (!hasReset) {
            addClass(element, clsCancelAnimation);

            requestAnimationFrame(function () { return removeClass(element, clsCancelAnimation); });
          }
        });

      }, function (e) { return element === e.target; });

      css(element, 'animationDuration', (duration + "ms"));
      addClass(element, cls);

      if (!animationend) {
        requestAnimationFrame(function () { return Animation.cancel(element); });
      }
    })
  }
}

function resetAnimation (element) {
  css(element, 'animationDuration', '');

  // remove animation classes
  var classesRE = new RegExp((animationPrefix + "\\S*"), 'g');
  element.className = element.className.replace(classesRE, '');
}

var inProgress = new RegExp((animationPrefix + "(enter|leave)"));

var Animation = {

  in: function in$1 (ref) {
    var element = ref.element;
    var animation = ref.animation;
    var duration = ref.duration;
    var origin = ref.origin;

    try {
      return animate({ element: element, animation: animation, duration: duration, origin: origin, out: false })
    } catch (e) {
      console.log(e);
    }
  },

  out: function out (ref) {
    var element = ref.element;
    var animation = ref.animation;
    var duration = ref.duration;
    var origin = ref.origin;

    try {
      return animate({ element: element, animation: animation, duration: duration, origin: origin, out: true })
    } catch (e) {
      console.log(e);
    }
  },

  inProgress: function inProgress$1 (element) {
    return inProgress.test(attr$1(element, 'class'))
  },

  cancel: function cancel (element) {
    trigger(element, animationcancel);
  }

};

export { animate, Animation };
