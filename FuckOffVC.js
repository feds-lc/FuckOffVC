export default {
  start() {
    const SoundModule = bunny.metro.findByProps("playSound");
    const VC_SOUNDS = [
      "user_join", "user_leave", "user_moved",
      "disconnect", "reconnect", "deafen",
      "undeafen", "mute", "unmute",
      "ptt_start", "ptt_stop"
    ];
    const original = SoundModule.playSound.bind(SoundModule);
    this._unpatch = () => { SoundModule.playSound = original; };
    SoundModule.playSound = function(sound, ...args) {
      if (VC_SOUNDS.includes(sound)) return;
      return original(sound, ...args);
    };
  },

  stop() {
    this._unpatch?.();
  }
};
