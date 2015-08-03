import { formatMarkdown } from '../../../helpers/format-markdown';
import { module, test } from 'qunit';

module('Unit | Helper | format markdown');

test('markdown to html works', function(assert) {
  var result = formatMarkdown(['# Hello World']).toHTML();
  assert.equal(result, "<h1 class=\"page-header\" id=\"helloworld\">Hello World</h1>");
});
