import DS from 'ember-data';

export default DS.Model.extend({
  page_content: DS.attr('string'),
  file_name: DS.attr('string'),

  page: DS.belongsTo('page', { async: true, inverse:"pagecontent" }),

  isInternal: function() {
    var p = this.get('file_name');
    if (p.substring(0,1)==='_') {
      return true;
    }
    return false;
  }.property('file_name'),
  pageTitle: function() {
    //var p = this.get('page_content');
    // TBD
    // get fisrt line, compute title,
    // if not available/usable via index
    // set window title?
  }.property('page_content'),
});
