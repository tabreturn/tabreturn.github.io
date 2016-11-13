function categoryFilter(show_on_start) {

  // script variables:

  var category_buttons = document.querySelectorAll('#categories a');
  var posts = document.querySelectorAll('.post');
  var categories_selected = [];

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
    document.querySelectorAll('.highlighted').forEach(function(tag) {
      tag.classList.remove('highlighted')
    });

    selected_tags.forEach(function(sel) {
      document.querySelectorAll('.tag-'+sel).forEach(function(tag) {
        tag.classList.add('highlighted');
      });
    });
  }

  function postShowHide(scat) {
    var post_categories;

    posts.forEach(function(post) {
      post_categories = post.getAttribute('data-category');
      post_categories = post_categories.split(' ');
      post.classList.remove('hidden');

      if (!checkForCategory(post_categories, scat))
        post.classList.add('hidden');
    });

    tagHighlight(scat);
  }

  function categorySelect(selected, buttons) {
    buttons.forEach(function(but) {
      if (but.innerHTML === selected) {
        if (but.classList[0]==='disabled')
          but.classList.remove('disabled');
        else
          but.classList.add('disabled');
      }
    });

    categories_selected = [];

    category_buttons.forEach(function(cat) {
      if (cat.classList.value !== 'disabled')
        categories_selected.push(cat.innerHTML);
    });

    postShowHide(categories_selected);
  }

  category_buttons.forEach(function(cat_but) {
    cat_but.addEventListener('click', function(e) {
      categorySelect(e.target.innerHTML, category_buttons);
    });
  });

  show_on_start.forEach(function(show) {
    categorySelect(show, category_buttons);
  });
}
