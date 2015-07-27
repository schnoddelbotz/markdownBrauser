import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('tree-menu-node', 'Integration | Component | tree menu node', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tree-menu-node}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#tree-menu-node}}
      template block text
    {{/tree-menu-node}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
