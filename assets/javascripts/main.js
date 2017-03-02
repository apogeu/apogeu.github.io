;(function (window, document, $, undefined) {

  'use strict';

  var $window = $(window);
  var $document = $(document);

  // init foundation
  $document.foundation();

  // init highlight
  hljs.initHighlightingOnLoad();

  // container height
  function resizeContainerHeight() {
    var $footer = $('footer');
    var $container = $('.container');

    var windowHeight = $(window).outerHeight();
    var footerHeight = $footer.outerHeight();
    var menuHeight = $('.menu').outerHeight();
    var containerHeight = $container.outerHeight();
    var marginTop = windowHeight - footerHeight - menuHeight - containerHeight;

    if (footerHeight < marginTop) {
      $container.height(marginTop);
    }
  }

  resizeContainerHeight();
  $window.resize(resizeContainerHeight);

})(window, document, jQuery);
