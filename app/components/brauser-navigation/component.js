import Ember from 'ember';

//export default Ember.Component.extend({
export default Ember.Component.extend({
// http://stackoverflow.com/questions/26479763/sorting-an-array-in-a-component
  sortedPages: function() {
    var pages = this.get('attrs.items');
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      sortProperties: ['style','is_directory','page_title'],
      sortAscending: true,
      content: Ember.A(pages.value)
    });
  }.property('attrs.items'),


  actions: {
    toggleExpanded: function() {
      this.toggleProperty('node.isExpanded');
    },
    toggleSelected: function() {
      this.toggleProperty('node.isSelected');
    },
    selectNode: function(node) {
      // FIXME WHY AGAIN HERE?
      this.sendAction('action', node);
    },
  },

});
