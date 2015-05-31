import Ember from 'ember';
import Wad from 'wad';

export default Ember.TextField.extend({
  complainSound: new Wad(Wad.presets.hiHatOpen),
  keyUp: function (e) {
    // Play noise on backspace
    if (e.keyCode === 8) {
      this.get('complainSound').play();
    }
  }
});
