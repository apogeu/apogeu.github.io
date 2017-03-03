;(function (window, document, $, undefined) {

  'use strict';

  $('.vertical.menu').find('a').on('click', function (e) {
    e.preventDefault();
    var href = this.getAttribute('href');
    if (href !== '#') {
      $('.tabs-panel').hide();
      $(href).show();
    }
  });

})(window, document, jQuery);
