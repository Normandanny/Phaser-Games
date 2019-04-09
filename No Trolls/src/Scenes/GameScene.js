import "phaser";
import config from "../Config/config";

var HealthBar = require("../Extra/HealthBar");
var background;
var platforms;
var troll;
var healthbar;
var cursors;
var description;
var trolls;
var player;
var randomMovement;

var timeSinceLastMovement = 0;

let textField = document.getElementById("search");

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    // load images
    // for (var i = 1; i <= 11; i++) {
    //   this.load.image(
    //     `bg-${i}`,
    //     `../../assets/pictures/background/Layer (${i}).png`
    //   );
    // }
    this.load.image("bg", "../../assets/pictures/background/Scene.png");
    this.load.image(
      "platform",
      "../../assets/pictures/background/Platform.png"
    );

    // Load the character & troll
    // this.load.image("player", "../../assets/pictures/characters/player.png");
    this.load.spritesheet(
      "player",
      "../../assets/pictures/characters/playerIdle.png",
      {
        frameWidth: 840,
        frameHeight: 624
      }
    );
    this.load.spritesheet(
      "troll",
      "../../assets/pictures/trolls/trollIdle.png",
      {
        frameWidth: 397,
        frameHeight: 295
      }
    );

    this.load.image("health-01", "../../assets/ui/HealthBar/001.png");
    this.load.image("health-02", "../../assets/ui/HealthBar/002.png");
    this.load.image("health-03", "../../assets/ui/HealthBar/003.png");
    this.load.image("health-04", "../../assets/ui/HealthBar/004.png");
    this.load.image("health-05", "../../assets/ui/HealthBar/005.png");
  }

  create() {
    // Load background
    // background = this.physics.add.staticGroup();
    // for (var i = 11; i > 1; i--) {
    //   background.create(config.width / 2, config.height / 2, `bg-${i}`);
    // }
    background = this.physics.add.staticGroup();
    background.create(config.width / 2, config.height / 2, "bg");

    // Load ground
    platforms = this.physics.add.staticGroup();
    platforms
      .create(config.width / 2, config.height - 98, "platform")
      .refreshBody().alpha = 0;

    // The player
    player = this.physics.add.sprite(340, 200, "player").setScale(0.6);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // The troll
    troll = this.physics.add.sprite(800, 200, "troll").setScale(1.5);

    //  Troll physics properties.
    troll.setBounce(0.2);
    troll.setCollideWorldBounds(true);

    // Animations
    // this.anims.create({
    //   key: "idle",
    //   frames: this.anims.generateFrameNumbers("troll", { start: 0, end: 6 }),
    //   frameRate: 10,
    //   repeat: -1
    // });
    this.anims.create({
      key: "playerIdle",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 9 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("troll", { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "troll", frame: 7 }],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("troll", { start: 8, end: 13 }),
      frameRate: 10,
      repeat: -1
    });

    // Collision Detection
    this.physics.add.collider(troll, platforms);
    this.physics.add.collider(player, platforms);

    // HUD
    // var barConfig = { x: 200, y: 100 };
    // this.myHealthBar = new HealthBar(this.game, barConfig);
    // healthbar = this.add.image(180, 540, "health-01");

    // Text
    description = this.add.text(
      600,
      60,
      "Compliment the troll and see what happens!",
      {
        fontSize: "32px",
        fill: "#ffffff"
      }
    );

    cursors = this.input.keyboard.createCursorKeys();

    // Display text field
    // VisibilityToggle("main");

    // Add event listeners
    // document
    //   .getElementById("button-next")
    //   .addEventListener("click", function() {
    //     console.log(troll);
    //     if (document.getElementById("input-4").value === "") {
    //       textField.classList.add("input__label--error");
    //       setTimeout(function() {
    //         textField.classList.remove("input__label--error");
    //       }, 300);
    //     } else {
    //       if (positivityCheck(document.getElementById("input-4").value)) {
    //         if (healthbar.texture.key == "health-01") {
    //           healthbar.setTexture("health-02");
    //         } else if (healthbar.texture.key == "health-02") {
    //           healthbar.setTexture("health-03");
    //         } else if (healthbar.texture.key == "health-03") {
    //           healthbar.setTexture("health-04");
    //         } else if (healthbar.texture.key == "health-04") {
    //           healthbar.setTexture("health-05");
    //         }
    //         document.getElementById("input-4").value = "";
    //       } else {
    //       }
    //     }
    //   });
  }

  update() {
    // Update the variable that tracks total time elapsed
    // timeSinceLastMovement += this.time.now;
    player.anims.play("playerIdle", true);

    if (this.time.now >= timeSinceLastMovement) {
      // eg, update every 10 seconds
      timeSinceLastMovement = this.time.now + 3000;

      // Do your timed code here.
      randomMovement = getRandomInt(-200, 200);
    }

    if (randomMovement > 0) {
      troll.setVelocityX(randomMovement);
      troll.anims.play("right", true);
    } else if (randomMovement < 0) {
      troll.setVelocityX(randomMovement);
      troll.anims.play("left", true);
    } else {
      troll.setVelocityX(0);
      troll.anims.play("turn");
    }

    if (troll.body.blocked.left === true && randomMovement < 0) {
      randomMovement = -randomMovement;
    } else if (troll.body.blocked.right === true && randomMovement > 0) {
      randomMovement = -randomMovement;
    }

    // if (healthbar.texture.key == "health-05") {
    //   location.reload();
    // }
    // if (cursors.left.isDown) {
    //   troll.setVelocityX(-240);

    //   troll.anims.play("left", true);
    // } else if (cursors.right.isDown) {
    //   troll.setVelocityX(240);

    //   troll.anims.play("right", true);
    // } else {
    //   troll.setVelocityX(0);

    //   troll.anims.play("turn");
    // }

    // if (cursors.up.isDown && player.body.touching.down) {
    //   troll.setVelocityY(-330);
    // }
  }
}
