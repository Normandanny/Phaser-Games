import "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image("logo", "../../assets/pictures/logo.png");
  }

  create() {
    this.scene.start("Preloader");
  }
}
