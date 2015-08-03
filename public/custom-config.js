//
// markdownBrauser custom configuration
//
// This file can be used to override most common
// options of markdownBrauser without re-compilation.
// To enable this file, uncomment its inclusion in index.html.

// unfortunately, dunno how to easily exclude this from minification:
// https://github.com/ember-cli/ember-cli/issues/4055

var DynamicENV = {

  // locationType (string)
  // see emberjs docs: ... 'history' may work if serving / + rewriteRules?
  // default: 'hash'
  locationType: 'hash',

  // markdownPath (string)
  // relative path to markdown files, as seen from markdownBrauser's index.html
  // default: '../pages'
  markdownPath: '../pages',

  // pageindexPath (string)
  // relative path to pageindex.json, as seen from markdownBrausers's index.html
  // default: '..'
  pageindexPath: '..',

  // documentIndexHeader (string)
  // header text to be displayed on "/" index page
  // default: 'markdown document index'
  documentIndexHeader: 'markdown document index',

  // showAboutPageLink
  // showSyntaxPageLink
  // appTitle = 'markdownBrauser'
  // docIndexHeader = 'markdown document index'
  // ...
}
