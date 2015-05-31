import Ember from 'ember';
import Wad from 'wad';

export default Ember.Service.extend({
  typingDelays: [],
  lastTypingTime: null,
  sound: new Wad(Wad.presets.piano),

  recordTyping: function() {
    this.set('typingDelays', this.get('typingDelays').concat(this._timeSinceLastTyping()));
    this.set('lastTypingTime', Date.now());

    return null;
  },

  playSound: function() {
    this.get('sound').pitch = this.pitch();
    this.get('sound').play();
  },

  pitch: function() {
    var typingDelays = this.get('typingDelays');
    var totalTypingDelay = 0;
    var typingDelayCount = 0;

    if (!typingDelays.length) {
      return 5;
    }

    for (var i = 1; i <= 5; i++) {
      var typingDelay = typingDelays[typingDelays.length - i];

      if (!typingDelay) {
        break;
      }

      totalTypingDelay += typingDelay;
      typingDelayCount += 1;
    }

    var pitch = 1000 / (totalTypingDelay / typingDelayCount / 10);
    return pitch;
  },

  _timeSinceLastTyping: function () {
    if (!this.get('lastTypingTime')) {
      return 2000;
    }

    return Date.now() - this.get('lastTypingTime');
  },
});
