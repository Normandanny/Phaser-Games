import "phaser";
import config from "../Config/config";

var background;
var platforms;
var troll;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    // load images
    for (var i = 1; i <= 11; i++) {
      this.load.image(
        `bg-${i}`,
        `../../assets/pictures/background/Layer (${i}).png`
      );
    }

    // Load the character & troll
    this.load.spritesheet(
      "troll",
      "../../assets/pictures/trolls/trollIdle.png",
      {
        frameWidth: 398,
        frameHeight: 303
      }
    );
  }

  create() {
    // Load background
    background = this.physics.add.staticGroup();
    for (var i = 11; i > 1; i--) {
      background.create(config.width / 2, config.height / 2, `bg-${i}`);
    }

    // Load ground
    platforms = this.physics.add.staticGroup();
    platforms.create(config.width / 2, config.height / 2, "bg-1").refreshBody();

    // The player and its settings
    // troll = this.physics.add.sprite(0, 0, "trollIdle", "trollIdle.png");
    troll = this.physics.add.sprite(0, 0, "troll");

    //  Player physics properties.
    troll.setBounce(0.2);
    troll.setCollideWorldBounds(true);

    // Animations
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("troll", { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1
    });
    troll.anims.play("idle");

    // Collision Detection
    this.physics.add.collider(troll, platforms);

    var password = game.add.inputField(10, 90, {
      font: "18px Arial",
      fill: "#212121",
      fontWeight: "bold",
      width: 150,
      padding: 8,
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 6,
      placeHolder: "Password",
      type: PhaserInput.InputType.password
    });
  }
}
