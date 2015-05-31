import Ember from 'ember';

export default Ember.Component.extend({
  thought: null,
  classNames: ['thought-form'],
  noisyTyping: Ember.inject.service(),

  actions: {
    finish: function() {
      this.sendAction('finish', this.get('thought'));
    },
    typed: function() {
      var tracker = this.get('noisyTyping');

      tracker.recordTyping();
      tracker.playSound();
    }
  },

  didInsertElement: function() {
    Ember.$('input').focus();
  },

  autoSave: function() {
    var thought = this.get('thought');

    this.sendAction('save', thought);
  },

  stateChanged: function() {
    var thought = this.get('thought');
    if (thought.get('isDirty') && !thought.get('isSaving')) {
      Ember.run.once(this, this.autoSave);
    }
  }.on('init').observes('thought.body')
});
