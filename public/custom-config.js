//
// markdownBrauser custom configuration
//
// This file can be used to override most common
// options of markdownBrauser without re-compilation.
// To enable this file, uncomment its inclusion in index.html.

var DynamicENV = {

  // locationType (string)
  // see emberjs docs: ...
  // default: 'hash'
  locationType: 'hash',

  // markdownPath (string)
  // relative path to markdown files, as seen from the app's index.html
  // default: '../pages'
  markdownPath: '../pages',

  // pageindexPath (string)
  // relative path to pageindex.json, as seen from the app's index.html
  // default: '..'
  pageindexPath: '..',

  // showAboutPageLink
  // showSyntaxPageLink
  // appTitle = 'markdownBrauser'
  // docIndexHeader = 'markdown document index'
  // ...
}
