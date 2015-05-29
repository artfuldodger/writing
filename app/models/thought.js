import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr('string'),
  createdAt: DS.attr('date', {
    defaultValue: function() {
      return new Date();
    }
  }),
  hasBody: function() {
    return this.get('body');
  }.property('body')
});
