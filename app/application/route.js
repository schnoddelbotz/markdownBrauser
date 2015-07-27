import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {

    var numExistingRecords = this.store.peekAll('page').get("length");

    // add two "internal pages", but only for yet-empty store
    if (numExistingRecords === 0) {
      this.store.push({
       data: [{
          type: "page",
          id: "_about",
          attributes: {
            page_title: "About markdownBrauser",
            file_name: "_about",
            is_internal: true,
            git_modified: "2015-07-19T20:53:20+02:00",
            git_message: "n/a - markdownBrauser internal page",
            style: "mdb-internal"
          }
        },{
          type: "page",
          id: "_syntax",
          attributes: {
            page_title: "Syntax documentation",
            file_name: "_syntax",
            is_internal: true,
            git_modified: "2015-07-19T20:53:20+02:00",
            git_message: "n/a - markdownBrauser internal page",
            style: "mdb-internal"
          }
        }]
      });
    }

    // little work-around for non-existant pageindex.json:
    // only really try _once_ to fetch pageindex.json.
    return numExistingRecords === 0 ?
            this.store.findAll('page') :
            this.store.peekAll('page');
  },

  actions: {
    error: function() { // reason, transition
      return this.transitionTo('indexerror');
    },
  },

});
