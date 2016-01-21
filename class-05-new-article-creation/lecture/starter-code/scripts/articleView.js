// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#author-filter').append(optionTag);

      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-author="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any artcile body.

  $('#articles').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

articleView.initNewArticlePage = function() {
  // TODO: Ensure the main .tab-content area is revealed. We might add more tabs later.

  $(".icon-home:contains('Preview')").click(function(){
    articleView.create();
  });


};

articleView.create = function() {
  newArticle = {
        title : $('#article-title').val(),
        category : $('article-category').val(),
        author : $('#article-author').val(),
        authorUrl : $('#article-author-url').val(),
        publishedOn : '',
        body : $('#article-body').val(),
  };

  $('#articles').empty();

  x = new Article (newArticle);
  $('#articles').append(x.toHtml());
  exportedData = JSON.stringify(x);



  // TODO: Activate the highlighting of any code blocks:

};

$('#article-published').click(function (){

    if($(this).is(':checked')){
      x.publishedOn = new Date();
    }

    else {
      x.publishedOn = '';
    }

    $('#articles').empty();
    $('#articles').append(x.toHtml());
    exportedData = JSON.stringify(x);
    $('#article-json').val(exportedData);

    console.log(x);
});




$('#new-form').keyup(function(){
    console.log('something');
    articleView.create();
    $('#article-json').val(exportedData);
    console.log(exportedData);
});

articleView.initIndexPage = function() {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
};
