import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['pointer','nav'],
  tagName: 'li',
  actions: {
    toggleExpanded: function() {
      this.toggleProperty('node.isExpanded');
    },
    toggleSelected: function() {
      this.toggleProperty('node.isSelected');
    },
    selectNode: function(node) {
      //console.log('ICKE'); // FIXME 2 PLACES...
      this.sendAction('action', node);
    },
  },
  isSelected: function() {
    return this.get('selectedNode') === this.get('node.id');
  }.property('selectedNode', 'node.id')
});


