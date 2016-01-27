(function(module) {
  function Article (opts) {
    this.author = opts.author;
    this.authorUrl = opts.authorUrl;
    this.title = opts.title;
    this.category = opts.category;
    this.body = opts.body;
    this.publishedOn = opts.publishedOn;
  }

  Article.all = [];

  Article.prototype.toHtml = function() {
    var template = Handlebars.compile($('#article-template').text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);

    return template(this);
  };

  Article.loadAll = function(rawData) {
    rawData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    Article.all = rawData.map(function(ele) {
      return new Article(ele);
    });
  };

  Article.fetchAll = function() {
      if (localStorage.rawData) {
        Article.loadAll(JSON.parse(localStorage.rawData));
      } else {
        $.getJSON('./data/hackerIpsum.json', function(rawData) {
          Article.loadAll(rawData);
          localStorage.rawData = JSON.stringify(rawData);
      });
    }
    return articleView.initIndexPage();
  };

  Article.numWordsAll = function() {
    return Article.all.map(function(article) {
      return article.body.split(' ').length;
    })
    .reduce(function(a, b) {
      return a + b;
    });
  };

  Article.allAuthors = function() {
    return Article.all.map(function(each){
      console.log(each);
      return each.author;
    }).reduce(function(array, each){
        if (array.indexOf(each) < 0){
        array.push(each);
      }
      return array;
    }, []);
  };

  Article.numWordsByAuthor = function() {
    return Article.allAuthors().map(function(author) {
      return {
        name: author,
        wordCount : Article.all.map(function(y){
            if(y.author === author){
             final = y.body.split(' ').length;
            }
            return final;
              }).reduce(function(a,b){
                return a + b;
            })
        };
      });
    };
  module.Article = Article;
})(window);
