  import Phaser from "phaser";
  import Preload from "./scenes/Preload";
  import Game from "./scenes/Game";

  const config = {
    type: Phaser.AUTO,
    width: 1060,
    height: 1040,
    parent: "phaser-container",
    physics: {
      default: "arcade",
      arcade: {
        gravity: {y:0},
        debug: false,
      },
    },
    scene: [Preload,Game],
  };

  // new Phaser.Game(config);
  export default config;