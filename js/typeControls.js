function typeControls() {

  // local storage:

  console.log(localStorage);

  function getLSValue(value) {
    if (localStorage[value])
      return parseInt(localStorage[value]);
    else
      return 4;
  }

  // reader popup:

  var reader_popup_visible = false;
  var reader_popup = document.getElementById('reader-popup');

  document.querySelector('.dropdown-toggle').addEventListener('click', function(){
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

  // font family:

  function fontFamilySelect(selected, font) {
    document.querySelector('#font-type-buttons .sans-serif-button').classList.remove('selected');
    document.querySelector('#font-type-buttons .serif-button').classList.remove('selected');
    var body = document.getElementsByTagName('body')[0].classList;
    body.remove('sans-serif');
    body.remove('serif');
    body.add(font);
    selected.classList.add('selected');
  }

  document.querySelector('#font-type-buttons .sans-serif-button').addEventListener('click', function(){
    fontFamilySelect(this, 'sans-serif');
  });
  document.querySelector('#font-type-buttons .serif-button').addEventListener('click', function(){
    fontFamilySelect(this, 'serif');
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
  fclSelect(0, 'container', 'line-height', 'current_line_height');

  document.querySelector('#font-size-buttons .minus-button').addEventListener('click', function(){
    fclSelect(-1, 'container', 'font-size', 'current_font_size');
  });
  document.querySelector('#font-size-buttons .plus-button').addEventListener('click', function(){
    fclSelect(+1, 'container', 'font-size', 'current_font_size');
  });
  document.querySelector('#content-width-buttons .content-width-minus-button').addEventListener('click', function(){
    fclSelect(-1, 'container', 'content-width', 'current_content_width');
  });
  document.querySelector('#content-width-buttons .content-width-plus-button').addEventListener('click', function(){
    fclSelect(+1, 'container', 'content-width', 'current_content_width');
  });
  document.querySelector('#line-height-buttons .line-height-minus-button').addEventListener('click', function(){
    fclSelect(-1, 'moz-reader-content', 'line-height', 'current_line_height');
  });
  document.querySelector('#line-height-buttons .line-height-plus-button').addEventListener('click', function(){
    fclSelect(+1, 'moz-reader-content', 'line-height', 'current_line_height');
  });

  // color schemes:

  function colorSchemeSelect(selected, scheme) {
    document.querySelector('#color-scheme-buttons .light-button').classList.remove('selected');
    document.querySelector('#color-scheme-buttons .dark-button').classList.remove('selected');
    document.querySelector('#color-scheme-buttons .sepia-button').classList.remove('selected');
    var body = document.getElementsByTagName('body')[0].classList;
    body.remove('light');
    body.remove('dark');
    body.remove('sepia');
    body.add(scheme);
    selected.classList.add('selected');
  }

  document.querySelector('#color-scheme-buttons .light-button').addEventListener('click', function(){
    colorSchemeSelect(this, 'light');
  });
  document.querySelector('#color-scheme-buttons .dark-button').addEventListener('click', function(){
    colorSchemeSelect(this, 'dark');
  });
  document.querySelector('#color-scheme-buttons .sepia-button').addEventListener('click', function(){
    colorSchemeSelect(this, 'sepia');
  });

}

typeControls();
