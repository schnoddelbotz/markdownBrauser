import Ember from 'ember';
import { highlightBlock } from 'highlight.js';
import config from 'markdown-brauser/config/environment';

export default Ember.Route.extend({
  model: function(params) {
    var store = this.store;

    // use static markdown file
    var url = config.markdownPath + '/'+ params.id;
    if (params.id.substring(0,1) === '_') {
      // markdownBrauser "internal" page
      url = params.id+'.md';
    }

    // get related page record
    var pageRecord = this.store.find('page', params.id);

    // uuuh ... e-d should catch this if it wasn't a hack here...
    var existantRecord = null;
    var test = store.peekAll('pagecontent');
    test.forEach(function(item) {
      if (item.id === params.id) {
        existantRecord = item;
      }
    });

    if (existantRecord) {
      return existantRecord;
    }
    else {
      return Ember.$.get(url).then(function(data) {
        var page = {
          'id': params.id, // FIXME .hashcode()?!
          'page_content': data,
          'page': pageRecord,
          'file_name': params.id+'.md'
        };
        // create a real e-d record to enjoy computed propoerties
        var record = store.createRecord('pagecontent', page);
        return record;
      });
    }
  },
  afterModel: function() {
    window.setTimeout( function(){
      Ember.$('pre code').each(function(i, block) {
        if ( ! Ember.$(block).hasClass("none")) {
          highlightBlock(block);
        }
      });
    }, 50); //// HACKHACKHACK
  },
  actions: {
    error: function(reason/*, transition*/) {
      return this.transitionTo('pagecontenterror', reason.status);
    },
    zapMeta: function() {
      Ember.$('p.docmeta').hide();
    }
  },
});
