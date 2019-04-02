import "phaser";

export default {
  type: Phaser.AUTO,
  parent: "phaser-example",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  width: 1440,
  height: 900
};
