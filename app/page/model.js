import DS from 'ember-data';

// A record describing a markdown page -- without its page content

export default DS.Model.extend({
  page_title: DS.attr('string'), // make it Ember.SafeString to support h1...<small>?
  file_name: DS.attr('string'),
  git_modified: DS.attr('number'),
  git_username: DS.attr('string'),
  git_message: DS.attr('string'),
  style: DS.attr('string'),

  is_internal: DS.attr('boolean'),
  is_directory: DS.attr('boolean'),
  path: DS.attr('string'),
  pagecontent: DS.belongsTo('pagecontent', { async: true, inverse:"page" }),

  parent_id: DS.belongsTo('page', {inverse: 'children', async: true}),
  children: DS.hasMany('page', {inverse: 'parent_id', async: true}),

  // return ou/room path-style string of 'parent directories'
/*
  page_path: function() {
    var height = 0;
    var pathParts = [];
    var p = this.get('parent_id');
    //console.log('GOT  '+p)
    p.then(function(value) {
    // on fulfillment
      if (value) {
        console.log(value);
        while (p && height++<10) {
          pathParts.unshift(p.get('file_name'));
          p = p.get('parent_id');
        }
      }
    }, function(reason) {
    // on rejection
      alert('fail' + reason);
    });

    return pathParts.join(' :: ');
  }.property('parent_id').cacheable(),
*/

  isSelected: false,
  isExpanded: false,
  isRootLevel: function() {
    return this.get('parent_id.parent_id')==null ? true : false; /// OH SOOOO HACKISH
  }.property('children'),
  hasChildren: function() {
    return this.get('children').get('length') > 0;
  }.property('children'),
  isLeaf: function() {
    return this.get('children').get('length') === 0;
  }.property('children'),
  isExpandedObserver: function() {
    if (this.get('isExpanded')) {
      var children = this.get('children.content');
      if (children) {
        //children.sort(App.Ou.compareNodes);
      }
    }
  }.observes('isExpanded')

});

// highlight if commit is older than change!
// let em browse by last update...
