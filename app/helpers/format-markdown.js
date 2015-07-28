import Ember from 'ember';

export function formatMarkdown(params) {
  var markdownContent = params[0];
  if (markdownContent) {
    var showdown = new window.showdown.Converter({
      strikethrough: true,
      tables: true,
      tasklists: true
    });

    // in plain .md source doc, replace $$latex formulas$$ by
    // KaTeX HTML, that showdown will/should left untouched
    markdownContent = markdownContent.replace(
        /(\$\$)(?=\S)([^\r]*?\S[\$]*)\1/g,
        function(line, dollars, formula){
          // FIXME inline vs block?
          var content = '\n\n<div class="bg-danger parser-error">\n <h4>Error</h4>';
          try {
            content = window.katex.renderToString(formula);
          } catch(err) {
            content = content + '\n' + err + '</div>\n\n';
          }
          return content;
        }
    );

    var html = showdown.makeHtml(markdownContent);

    // post-apply correct bootstrap class to first header in generated html
    html = html.replace('<h1 id=','<h1 class="page-header" id=');

    // post-apply bootstrap css to tables
    html = html.replace(/<table>/g,'<table class="table">');

    var safehtml = new Ember.Handlebars.SafeString(html);
    return safehtml;
  } else {
    console.log("Warning: empty input on showdown call.");
    return markdownContent;
  }
}

export default Ember.Helper.helper(formatMarkdown);
