;(function (window, document, $, undefined) {

  'use strict';

  $('.vertical.menu').find('a').on('click', function (e) {
    e.preventDefault();
    var href = this.getAttribute('href');
    if (href !== '#') {
      location.hash = href;
      $('.tabs-panel').hide();
      $(href).show();
    }
  });

  var hash = location.hash;
  if (hash) {
    $(hash).show();
  }

})(window, document, jQuery);
