// import Phaser from "phaser";
// import MAinCharAnim from "../resources/MAinChar/MaincharAnim";
// import BoyAnim from "../BoyAnim/BoyAnim";

// const asset = (path) => new URL(path, import.meta.url).href;
// // import maps from "../Maps/newmap.json";

// export default class Preload extends Phaser.Scene {
//   constructor() {
//     super("Preload");
//   }

//   preload() {
  
//     // this.load.atlas(
//     //   "sam",
//     //   asset("../resources/char/fauna.png"),
//     //   asset("../resources/char/texture.json")
//     // );
//     // this.load.tilemapTiledJSON("bd",asset("../Maps/newmap2.json"));
//     // // this.load.image("tiles",asset("../resources/Tileset/bg.png"));
//     // // this.load.image("ground",asset("../resources/Tileset/newtile.png"));




//     //loading
//      this.cameras.main.setBackgroundColor("#0f172a");

//   const loadingText = this.add.text(
//     this.cameras.main.centerX,
//     this.cameras.main.centerY,
//     "Loading...",
//     { fontSize: "24px", color: "#ffffff" }
//   ).setOrigin(0.5);

//   const percentText = this.add.text(
//     this.cameras.main.centerX,
//     this.cameras.main.centerY + 40,
//     "0%",
//     { color: "#ffffff" }
//   ).setOrigin(0.5);

//   this.load.on("progress", (value) => {
//     percentText.setText(Math.floor(value * 100) + "%");
//   });

//   this.load.once("complete", () => {
//     loadingText.destroy();
//     percentText.destroy();
//   });


//       this.loadcriticalasseet();
//         // this.secondaryloadingasset();


      
//     }

//   create() {
    
//      //register animation
//         MAinCharAnim(this.anims);
//       BoyAnim(this.anims)
       

//     this.scene.start("Game");
  
//   }




// secondaryloadingasset(){
//       // this.load.atlas('chicken',asset("../resources/animal/Chicken/Chicken.png"),asset("../resources/animal/Chicken/chicktexture.json"))
//       //       this.load.atlas('cow',asset("../resources/animal/cow/Cow.png"),asset("../resources/animal/cow/Cowtexture.json"))
//       // this.load.atlas('boy',asset("../resources/char/sam.png"),asset("../resources/char/samtexture.json"))
//       // this.load.once("complete",()=>{
//       //   this.game.events.emit('seconadryasset')
//       // })
//       // this.load.start();

// }





  // loadcriticalasseet(){
  //   // this.load.audio("bgmusic",asset("../resources/Audio/19-Town.mp3"))

  //    this.load.atlas(
  //     'boy',
  //     asset("../resources/char/sam.png"),
  //     asset("../resources/char/samtexture.json")
  //   );

  //   // Main tilemap and tileset
  //   this.load.tilemapTiledJSON("bd", asset("../Maps/newmap2.json"));
  //   this.load.image("tile2", asset("../resources/Tileset/newtille.webp"));
  //       this.load.image("tile2",asset("../resources/Tileset/newtille.webp"));
  //   this.load.image("tile3",asset("../resources/Tileset/Props.webp"))
  //   // Secondary tileset (if needed for initial view)
  //   this.load.image("tile3", asset("../resources/Tileset/Props.webp"));

  // }



//   loadcriticalasseet(){
//     this.load.atlas(
//       'boy',
//       asset("../resources/char/sam.png"),
//       asset("../resources/char/samtexture.json")
//     );

//     this.load.tilemapTiledJSON("bd", asset("../Maps/newmap2.json"));
//     this.load.image("tile2", asset("../resources/Tileset/newtille.webp")); // Only once!
//     this.load.image("tile3", asset("../resources/Tileset/Props.webp"));
//           this.load.atlas('chicken',asset("../resources/animal/Chicken/Chicken.png"),asset("../resources/animal/Chicken/chicktexture.json"))
//             this.load.atlas('cow',asset("../resources/animal/cow/Cow.png"),asset("../resources/animal/cow/Cowtexture.json"))
//       this.load.atlas('boy',asset("../resources/char/sam.png"),asset("../resources/char/samtexture.json"))
// }
// }




import Phaser from "phaser";
import MAinCharAnim from "../resources/MAinChar/MaincharAnim";
import BoyAnim from "../BoyAnim/BoyAnim";

const asset = (path) => new URL(path, import.meta.url).href;

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    // Set background
    this.cameras.main.setBackgroundColor("#0f172a");

    // Loading UI
    const loadingText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 20,
      "Loading Assets...",
      { fontSize: "24px", color: "#ffffff", fontFamily: "Arial" }
    ).setOrigin(0.5);

    const percentText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 30,
      "0%",
      { fontSize: "18px", color: "#ffffff", fontFamily: "Arial" }
    ).setOrigin(0.5);

    const statusText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 60,
      "",
      { fontSize: "14px", color: "#aaaaaa", fontFamily: "Arial" }
    ).setOrigin(0.5);

    // Progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(
      this.cameras.main.centerX - 160,
      this.cameras.main.centerY - 10,
      320,
      30
    );

    // Loading events
    this.load.on("progress", (value) => {
      percentText.setText(Math.floor(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0x4a9eff, 1);
      progressBar.fillRect(
        this.cameras.main.centerX - 150,
        this.cameras.main.centerY,
        300 * value,
        10
      );
    });

    this.load.on("fileprogress", (file) => {
      statusText.setText("Loading: " + file.key);
    });

    // Error handling - CRITICAL for production
    this.load.on("loaderror", (file) => {
      console.error("Failed to load:", file.key, file.url);
      statusText.setText("Error loading: " + file.key);
      statusText.setColor("#ff4444");
    });

    // Success tracking
    this.load.on("filecomplete", (key, type) => {
      console.log("✓ Loaded:", key, `(${type})`);
    });

    // Cleanup on complete
    this.load.once("complete", () => {
      console.log("All assets loaded successfully!");
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      statusText.destroy();
    });

    // Load all assets
    this.loadAllAssets();
  }

  loadAllAssets() {
    // ✅ USE ABSOLUTE PATHS FROM PUBLIC FOLDER
    // Character atlas
    this.load.atlas(
      "boy",
      "/assets/char/sam.png",
      "/assets/char/samtexture.json"
    );

    // Animal atlases
    this.load.atlas(
      "chicken",
      "/assets/animal/Chicken/Chicken.png",
      "/assets/animal/Chicken/chicktexture.json"
    );

    this.load.atlas(
      "cow",
      "/assets/animal/cow/Cow.png",
      "/assets/animal/cow/Cowtexture.json"
    );

    // Map and tilesets
    this.load.tilemapTiledJSON("bd", "/assets/Maps/newmap2.json");
    this.load.image("tile2", "/assets/Tileset/newtille.webp");
    this.load.image("tile3", "/assets/Tileset/Props.webp");

    // Optional: Uncomment to add background music
    // this.load.audio("bgmusic", "/assets/audio/19-Town.mp3");
  }

  create() {
    // Verify critical assets loaded
    const requiredAssets = ["boy", "chicken", "cow", "bd", "tile2", "tile3"];
    const missingAssets = [];

    requiredAssets.forEach((key) => {
      const exists =
        this.textures.exists(key) ||
        this.cache.tilemap.exists(key) ||
        this.textures.exists(key);
      
      if (!exists) {
        missingAssets.push(key);
        console.error(`Missing asset: ${key}`);
      } else {
        console.log(`✓ Asset verified: ${key}`);
      }
    });

    // If critical assets are missing, show error
    if (missingAssets.length > 0) {
      this.showError(missingAssets);
      return;
    }

    // Register animations
    try {
      MAinCharAnim(this.anims);
      BoyAnim(this.anims);
      console.log("✓ Animations registered");
    } catch (error) {
      console.error("Error registering animations:", error);
      this.showError(["Animation registration failed"]);
      return;
    }

    // Start game scene
    console.log("Starting Game scene...");
    this.scene.start("Game");
  }

  showError(missingAssets) {
    this.cameras.main.setBackgroundColor("#1a0000");
    
    const errorTitle = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 50,
      "Failed to Load Game",
      { fontSize: "28px", color: "#ff4444", fontFamily: "Arial" }
    ).setOrigin(0.5);

    const errorText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "Missing assets:\n" + missingAssets.join("\n"),
      { 
        fontSize: "16px", 
        color: "#ffaaaa", 
        fontFamily: "Arial",
        align: "center"
      }
    ).setOrigin(0.5);

    const reloadBtn = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 80,
      "Click to Reload",
      { 
        fontSize: "18px", 
        color: "#ffffff", 
        backgroundColor: "#ff4444",
        padding: { x: 20, y: 10 },
        fontFamily: "Arial"
      }
    ).setOrigin(0.5).setInteractive({ useHandCursor: true });

    reloadBtn.on("pointerdown", () => {
      window.location.reload();
    });
  }
}