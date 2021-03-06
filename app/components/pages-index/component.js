import Ember from 'ember';
import computedFilterByQuery from 'ember-cli-filter-by-query';

var SCROLL_TO_POSITION = 200;

export default Ember.Component.extend({
  queryParams: ['query', 'page'],
  tagName: '',

  query: '',
  page: 1,
  limit: 20,

  didInsertElement: function() {
    // autofocus somehow only works in chrome (?), sometimes...
    Ember.$('#md-query').focus();
  },

  filteredPages: computedFilterByQuery('model',
    ['page_title', 'file_name', 'git_message'], 'query', { conjunction: 'and' }
  ).readOnly(),

  sortAscending: true, // huh??? does the inverse?
  sortProperty: 'git_modified',

  sortedPages: Ember.computed('filteredPages', 'sortProperty', 'sortAscending', function() {
    if (!this.get('filteredPages')) {
      console.log('HACK NO PAGES');
      return [];
    }
    var sorted = this.get('filteredPages').sortBy(this.get('sortProperty'));

    if (this.get('sortAscending')) {
      sorted.reverse();
    }
    return sorted;
  }).readOnly(),

  currentPageContent: Ember.computed('page', 'sortedPages', 'query', function() {
    var page = this.get('page');
    var limit = this.get('limit');
    return this.get('sortedPages').slice((page - 1) * limit, page * limit);
  }).readOnly(),

  nothingFound: Ember.computed.equal('sortedPages.length', 0),

  numFound: Ember.computed('sortedPages', function() {
    return this.get('sortedPages').length;
  }).readOnly(),

  actions: {
    resetPage: function() {
      this.set('page', 1);
    },

    gotoFirstHit: function() {
      var results = this.get('currentPageContent');
      if (results.length===1) {
        var desired_page = results[0].get('id');
        console.log(desired_page);
        // deprecated...
        //this.controller.transitionTo('pagecontent', desired_page);
        // even more ugly, but works(tm) ... for now, FIXME.
        window.document.location = '#/' + desired_page;
      }
      // else, do nothing for now ... but later?:
      // gotoOtherHit by key up down, hilight it, enter = go?
    },
    sortBy: function(propertyKey) {
      if (propertyKey === this.get('sortProperty')) {
        this.toggleProperty('sortAscending');
      }
      this.set('sortProperty', propertyKey);
    },
    nextPage: function() {
      this.incrementProperty('page');
      window.scrollTo(0, SCROLL_TO_POSITION);
    },
    previousPage: function() {
      this.decrementProperty('page');
      window.scrollTo(0, SCROLL_TO_POSITION);
    }
  }
});
