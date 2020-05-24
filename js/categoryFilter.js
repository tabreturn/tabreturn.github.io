function categoryFilter(show_on_start) {

  // script variables:

  var category_buttons = document.querySelectorAll('#categories a');
  var post_list = document.getElementById('post-list');
  var posts = post_list.querySelectorAll('.post');
  var categories_selected = [];
  var reverse_button = document.getElementById('reverse-filter');

  // highlighing & selection logic:

  function checkForCategory(post_cat, cat_sel) {
    var found = false;

    post_cat.forEach(function(pcat) {
      cat_sel.forEach(function(scat) {
        if (pcat === scat)
          found = true;
      });
    });

    return found;
  }

  function tagHighlight(selected_tags) {
    var tags = document.querySelectorAll('.highlighted');
    var tagsel = [];

    for (var i=0; i<tags.length; i++) {
      tags[i].classList.remove('highlighted');
    }

    for (var i=0; i<selected_tags.length; i++) {
      var sel = selected_tags[i];
      tagsel.push(document.querySelectorAll('.tag-'+sel));
    }

    tagsel.forEach(function(node) {
      for (var i=0; i<node.length; i++) {
        node[i].classList.add('highlighted');
      }
    });
  }

  function postShowHide(scat) {
    var post_categories;

    for (var i=0; i<posts.length; i++) {
      post = posts[i];
      post_categories = post.getAttribute('data-category');
      post_categories = post_categories.split(' ');
      post.classList.remove('hidden');

      if (!checkForCategory(post_categories, scat))
        post.classList.add('hidden');
    }

    tagHighlight(scat);
  }

  function applySelection() {
    categories_selected = [];

    for (var i=0; i<category_buttons.length; i++) {
      var cat = category_buttons[i];

      if (cat.classList.value !== 'disabled')
        categories_selected.push(cat.innerHTML);
    }

    postShowHide(categories_selected);
  }

  function categorySelect(selected, buttons) {

    for (var i=0; i<buttons.length; i++) {
      var but = buttons[i];

      if (but.innerHTML === selected) {
        if (but.classList[0]==='disabled')
          but.classList.remove('disabled');
        else
          but.classList.add('disabled');
      }
    }

    applySelection();
  }

  function reversePosts() {
    var parent_node = post_list.parentNode;
    var next_sibling = post_list.nextSibling;
    var frag = post_list.ownerDocument.createDocumentFragment();
    parent_node.removeChild(post_list);
    while (post_list.lastChild) {
      frag.appendChild(post_list.lastChild);
    }
    post_list.appendChild(frag);
    parent_node.insertBefore(post_list, next_sibling);
  }

  // initialize

  if (show_on_start == 'all') {
    show_on_start = [];

    category_buttons.forEach((cat) => {
      show_on_start.push(cat.innerHTML);
    });
  }

  for (var i=0; i<show_on_start.length; i++) {
    if (show_on_start[i] == 'reverse') {
      reversePosts();
    }
    var show = show_on_start[i];
    categorySelect(show, category_buttons);
  }

  // event listeners

  for (var i=0; i<category_buttons.length; i++) {
    var cat_but = category_buttons[i];
    cat_but.addEventListener('click', function(e) {
      categorySelect(e.target.innerHTML, category_buttons);
    });
  }

  reverse_button.addEventListener('click', function() {
    reversePosts();
  });

  document.getElementById('hide-all').addEventListener('click', function() {

    category_buttons.forEach((but) => {

      if (but.classList[0]!=='disabled') {
        but.classList.add('disabled');
      }

      applySelection();
    });
  });

  document.getElementById('show-all').addEventListener('click', function() {

    category_buttons.forEach((but) => {

      if (but.classList[0]==='disabled') {
       but.classList.remove('disabled');
      }

      applySelection();
    });
  });

}
