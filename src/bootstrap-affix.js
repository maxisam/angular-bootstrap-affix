'use strict';

angular.module('mgcrea.bootstrap.affix', ['mgcrea.jquery'])

  .directive('bsAffix', function($window, $location, $routeParams, debounce, dimensions) {

    var affixed;
    var unpin = null;

    var checkPosition = function(scope, el, options) {

      var scrollTop = window.pageYOffset;
      var scrollHeight = document.body.scrollHeight;
      var position = dimensions.offset.call(el[0]);
      var height = dimensions.height.call(el[0]);
      var offsetTop = options.offsetTop * 1;
      var offsetBottom = options.offsetBottom * 1;
      var reset = 'affix affix-top affix-bottom';
      var affix;

      if(unpin !== null && (scrollTop + unpin <= position.top)) {
        affix = false;
      } else if(offsetBottom && (position.top + height >= scrollHeight - offsetBottom)) {
        affix = 'bottom';
      } else if(offsetTop && scrollTop <= offsetTop) {
        affix = 'top';
      } else {
        affix = false;
      }

      if (affixed === affix) return;

      affixed = affix;
      unpin = affix === 'bottom' ? position.top - scrollTop : null;

      el.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''));

    };

    return {
      restrict: 'EAC',
      link: function postLink(scope, iElement, iAttrs) {

        angular.element($window).bind('scroll', function() {
          checkPosition(scope, iElement, iAttrs);
        });

        angular.element($window).bind('click', function() {
          setTimeout(function() {
            checkPosition(scope, iElement, iAttrs);
          }, 1);
        });

      }
    };

  });
