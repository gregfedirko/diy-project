$(function() {

  // Add active class to nav item if it matches the url
  $('.navbar-nav > li > a').each(function(index, item) {
    var url = ($(location).attr('href'));
    if (url.indexOf(item.text.toLowerCase()) > -1) {
      $(item).parent().addClass('active');
    }
  });

});