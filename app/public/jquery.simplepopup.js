
'use strict';

(function($){

  window.simplePopup = function(type, message, defaultText) {
    var dtd = $.Deferred();
    var appendSimplePopup = function() {
      $('body').append(
        '<div id="popup-overlay">' +
          '<div class="simple-popup">' +
            '<span class="popup-icon"></span>' +
            '<p class="popup-message"></p>' +
            '<div class="popup-buttons"></div>' +
          '</div>' +
        '</div>');
    };
    var cleanupSimplePopup = function() {
      $('#popup-overlay').find('.popup-buttons').children().remove()
        .end().siblings('.popup-input').remove();
    };
    var appendPopupInput = function() {
      $('#popup-overlay').find('.popup-message')
        .after('<input type="text" class="popup-input"/>');
    };
    var appendPopupButtons = function(type) {
      var popupButtons = $('#popup-overlay').find('.popup-buttons');
      if (type === 0) {
        popupButtons.append('<button type="button" class="btn-ok">OK</button>');
      } else {
        popupButtons.append('<button type="button" class="btn-ok">OK</button>' +
          '<button type="button" class="btn-cancel">Cancel</button>');
      }
    };
    var appendDisableScrollbar = function() {
      if ($(document).height() > $(window).height()) {
        var topOffset = $(document).scrollTop();
        $('body').addClass('disable-scrollbar').css('top', -topOffset + 'px').data('scrolltop', topOffset);
      }
    };
    var recoverOriginalScrollbar = function() {
      if ($(document).height() > $(window).height()) {
        $('body').removeClass('disable-scrollbar').css('top','');
        $(document).scrollTop($('body').data('scrolltop')); // compatible wirting for Chrome and Firefox
      }
    };
    var bindButtonHandler = function(type) {
      appendDisableScrollbar();
      var overlay = $('#popup-overlay');
      var btns = overlay.find('.popup-buttons').children();
      if (type === 0) {
        btns.on('click', function() {
          recoverOriginalScrollbar();
          overlay.removeClass('show-popup')
            .find('.simple-popup').data('dtd').resolve();
        });
      } else if (type === 1) {
        btns.on('keyup', function(event) {
          if (event.which >= 37 && event.which <= 40) {
            $(event.target).siblings().focus();
          }
        })
        .filter('.btn-ok').on('click', function() {
          recoverOriginalScrollbar();
          overlay.removeClass('show-popup')
            .find('.simple-popup').data('dtd').resolve(true);
        })
        .siblings('.btn-cancel').on('click', function() {
          recoverOriginalScrollbar();
          overlay.removeClass('show-popup')
            .find('.simple-popup').data('dtd').resolve(false);
        });
      } else {
        overlay.find('.popup-input').on('keyup', function(event) {
          if (event.which === 13) {
            recoverOriginalScrollbar();
            var value = event.target.value.trim();
            overlay.removeClass('show-popup')
              .find('.popup-input').val(defaultText)
              .parent().data('dtd').resolve(value);
          }
        });
        btns.filter('.btn-ok').on('click', function() {
          recoverOriginalScrollbar();
          var value = overlay.find('.popup-input').val().trim();
          overlay.removeClass('show-popup')
            .find('.popup-input').val(defaultText)
            .parent().data('dtd').resolve(value);
        })
        .siblings('.btn-cancel').on('click', function() {
          recoverOriginalScrollbar();
          overlay.removeClass('show-popup')
            .find('.popup-input').val(defaultText)
            .parent().data('dtd').resolve('');
        });
      }
    };

    // With the help of the following function, we enfore browser to repaint in order to
    // fire up the first time transition of alert icon.
    var startIconTransition = function() {
      var overlay = $('#popup-overlay')[0];
      overlay.style.offsetWidth = overlay.offsetWidth;
      overlay.classList.add('show-popup');
    };

    if (type === 0) { // alert box
      if (!$('.simple-popup').length) {
        appendSimplePopup();
        appendPopupButtons(0);
        bindButtonHandler(0);
        startIconTransition();
      } else if (!$('.alert-box').length) {
        cleanupSimplePopup();
        appendPopupButtons(0);
        bindButtonHandler(0);
      } else {
        appendDisableScrollbar();
      }
      $('#popup-overlay').find('.simple-popup').attr('class', 'simple-popup alert-box')
        .find('.popup-icon').text('!')
        .siblings('.popup-buttons').children('.btn-ok').focus();
    } else if (type === 1) { // confirm box
      if (!$('.simple-popup').length) {
        appendSimplePopup();
        appendPopupButtons(1);
        bindButtonHandler(1);
        startIconTransition();
      } else if (!$('.confirm-box').length) {
        cleanupSimplePopup();
        appendPopupButtons(1);
        bindButtonHandler(1);
      } else {
        appendDisableScrollbar();
      }
      $('#popup-overlay').find('.simple-popup').attr('class', 'simple-popup confirm-box')
        .find('.popup-icon').text('?')
        .siblings('.popup-buttons').children('.btn-ok').focus();
    } else { // prompt box
      if (!$('.simple-popup').length) {
        appendSimplePopup();
        appendPopupInput();
        appendPopupButtons(2);
        bindButtonHandler(2);
        startIconTransition();
      } else if (!$('.prompt-box').length) {
        cleanupSimplePopup();
        appendPopupInput();
        appendPopupButtons(2);
        bindButtonHandler(2);
      } else {
        appendDisableScrollbar();
      }
      $('#popup-overlay').find('.simple-popup').attr('class', 'simple-popup prompt-box')
        .find('.popup-icon').text(':)')
        .siblings('.popup-input').val(defaultText).select();
    }

    $('#popup-overlay').addClass('show-popup')
      .find('.simple-popup').data('dtd', dtd)
      .find('.popup-message').text(message);

    return dtd;
  }

})(jQuery);