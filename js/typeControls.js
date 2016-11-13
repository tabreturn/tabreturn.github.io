function typeControls() {

  // reader popup:

  var reader_popup_visible = false;
  var reader_popup = document.getElementById('reader-popup');

  document.querySelector('.dropdown-toggle').addEventListener('click', function() {
    if (!reader_popup_visible)
      reader_popup.style.visibility = 'visible';
    else
      reader_popup.style.visibility = 'hidden';
    reader_popup_visible = !reader_popup_visible;
  });

  window.addEventListener('click', function(e) {
    parent_parent_id = null;

    try {
      parent_parent_id = e.target.parentElement.parentElement.id;
    } catch (e) {

    } finally {
      if (parent_parent_id!=='reader-popup' && parent_parent_id!=='style-dropdown' && reader_popup_visible) {
        reader_popup.style.visibility = 'hidden';
        reader_popup_visible = !reader_popup_visible;
      }
    }
  });

  // local storage:

  function getFCValue(value) {
    if (localStorage[value]) {
      return localStorage[value];
    }
    else {
      switch (value) {
        case 'current_font_family':
          return 'serif';
          break;
        case 'current_color_scheme':
          return 'light';
          break;
      }
    }
  }

  function getLSValue(value) {
    if (localStorage[value])
      return parseInt(localStorage[value]);
    else
      return 4;
  }

  // font family:

  var current_font_family = getFCValue('current_font_family');
  fontFamilySelect(current_font_family);

  function fontFamilySelect(font) {
    var body = document.getElementsByTagName('body')[0].classList;
    var button_sans_serif = document.querySelector('#font-type-buttons .sans-serif-button');
    var button_serif = document.querySelector('#font-type-buttons .serif-button');

    body.remove('sans-serif');
    body.remove('serif');
    localStorage.current_font_family = font;
    body.add(font);
    button_sans_serif.classList.remove('selected');
    button_serif.classList.remove('selected');

    if (font === 'sans-serif')
      button_sans_serif.classList.add('selected');
    else if (font === 'serif')
      button_serif.classList.add('selected');
  }

  document.querySelector('#font-type-buttons .sans-serif-button').addEventListener('click', function() {
    fontFamilySelect('sans-serif');
  });
  document.querySelector('#font-type-buttons .serif-button').addEventListener('click', function() {
    fontFamilySelect('serif');
  });

  // font size & content width & line height:

  fcl = {
    current_font_size: getLSValue('current_font_size'),
    current_content_width: getLSValue('current_content_width'),
    current_line_height: getLSValue('current_line_height')
  }

  function fclAdjust(increment, container_id, class_name, value_holder) {
    var container = document.getElementById(container_id);
    for (var i=1; i<=9; i++) {
      container.classList.remove(class_name+i);
    }
    fcl[value_holder] += increment;
    localStorage[value_holder] = fcl[value_holder];
    container.classList.add(class_name+fcl[value_holder]);
  }

  function fclSelect(increment, container_id, class_name, value_holder) {
    if (increment === 0)
      fclAdjust(increment, container_id, class_name, value_holder);
    else if (fcl[value_holder]>1 && fcl[value_holder]<9)
      fclAdjust(increment, container_id, class_name, value_holder);
    else if (fcl[value_holder]===9 && increment<0)
      fclAdjust(increment, container_id, class_name, value_holder);
    else if (fcl[value_holder]===1 && increment>0)
      fclAdjust(increment, container_id, class_name, value_holder);
  }

  fclSelect(0, 'container', 'font-size', 'current_font_size');
  fclSelect(0, 'container', 'content-width', 'current_content_width');
  fclSelect(0, 'moz-reader-content', 'line-height', 'current_line_height');

  document.querySelector('#font-size-buttons .minus-button').addEventListener('click', function() {
    fclSelect(-1, 'container', 'font-size', 'current_font_size');
  });
  document.querySelector('#font-size-buttons .plus-button').addEventListener('click', function() {
    fclSelect(+1, 'container', 'font-size', 'current_font_size');
  });
  document.querySelector('#content-width-buttons .content-width-minus-button').addEventListener('click', function() {
    fclSelect(-1, 'container', 'content-width', 'current_content_width');
  });
  document.querySelector('#content-width-buttons .content-width-plus-button').addEventListener('click', function() {
    fclSelect(+1, 'container', 'content-width', 'current_content_width');
  });
  document.querySelector('#line-height-buttons .line-height-minus-button').addEventListener('click', function() {
    fclSelect(-1, 'moz-reader-content', 'line-height', 'current_line_height');
  });
  document.querySelector('#line-height-buttons .line-height-plus-button').addEventListener('click', function() {
    fclSelect(+1, 'moz-reader-content', 'line-height', 'current_line_height');
  });

  // color schemes:

  var current_color_scheme = getFCValue('current_color_scheme');
  colorSchemeSelect(current_color_scheme);

  function colorSchemeSelect(scheme) {
    var body = document.getElementsByTagName('body')[0].classList;
    var button_light = document.querySelector('#color-scheme-buttons .light-button');
    var button_dark = document.querySelector('#color-scheme-buttons .dark-button');
    var button_sepia = document.querySelector('#color-scheme-buttons .sepia-button');

    body.remove('light');
    body.remove('dark');
    body.remove('sepia');
    localStorage.current_color_scheme = scheme;
    body.add(scheme);
    button_light.classList.remove('selected');
    button_dark.classList.remove('selected');
    button_sepia.classList.remove('selected');

    if (scheme === 'light')
      button_light.classList.add('selected');
    else if (scheme === 'dark')
      button_dark.classList.add('selected');
    else if (scheme === 'sepia')
      button_sepia.classList.add('selected');
  }

  document.querySelector('#color-scheme-buttons .light-button').addEventListener('click', function() {
    colorSchemeSelect('light');
  });
  document.querySelector('#color-scheme-buttons .dark-button').addEventListener('click', function() {
    colorSchemeSelect('dark');
  });
  document.querySelector('#color-scheme-buttons .sepia-button').addEventListener('click', function() {
    colorSchemeSelect('sepia');
  });

}
