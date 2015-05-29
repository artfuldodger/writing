import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save: function(model) {
      if (model.get('hasBody')) {
        model.save();
      }
      return false;
    },
    finish: function(model) {
      var _this = this;

      if (model.get('hasBody')) {
        model.save().then(function() {
          _this.transitionTo('thoughts');
        });
      } else {
        model.destroyRecord().then(function() {
          _this.transitionTo('thoughts');
        });
      }
    }
  },
  model: function() {
    return this.store.createRecord('thought');
  }
});
