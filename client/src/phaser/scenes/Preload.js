import Phaser from "phaser";
import MAinCharAnim from "../resources/MAinChar/MaincharAnim";
import BoyAnim from "../BoyAnim/BoyAnim";

const asset = (path) => new URL(path, import.meta.url).href;
// import maps from "../Maps/newmap.json";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
  
    // this.load.atlas(
    //   "sam",
    //   asset("../resources/char/fauna.png"),
    //   asset("../resources/char/texture.json")
    // );
    // this.load.tilemapTiledJSON("bd",asset("../Maps/newmap2.json"));
    // // this.load.image("tiles",asset("../resources/Tileset/bg.png"));
    // // this.load.image("ground",asset("../resources/Tileset/newtile.png"));




    //loading
     this.cameras.main.setBackgroundColor("#0f172a");

  const loadingText = this.add.text(
    this.cameras.main.centerX,
    this.cameras.main.centerY,
    "Loading...",
    { fontSize: "24px", color: "#ffffff" }
  ).setOrigin(0.5);

  const percentText = this.add.text(
    this.cameras.main.centerX,
    this.cameras.main.centerY + 40,
    "0%",
    { color: "#ffffff" }
  ).setOrigin(0.5);

  this.load.on("progress", (value) => {
    percentText.setText(Math.floor(value * 100) + "%");
  });

  this.load.once("complete", () => {
    loadingText.destroy();
    percentText.destroy();
  });


      this.loadcriticalasseet();
        this.secondaryloadingasset();


      
    }

  create() {
    
     //register animation
        MAinCharAnim(this.anims);
      BoyAnim(this.anims)
       

    this.scene.start("Game");
  
  }




secondaryloadingasset(){
      this.load.atlas('chicken',asset("../resources/animal/Chicken/Chicken.png"),asset("../resources/animal/Chicken/chicktexture.json"))
            this.load.atlas('cow',asset("../resources/animal/cow/Cow.png"),asset("../resources/animal/cow/Cowtexture.json"))
      this.load.atlas('boy',asset("../resources/char/sam.png"),asset("../resources/char/samtexture.json"))
      // this.load.once("complete",()=>{
      //   this.game.events.emit('seconadryasset')
      // })
      // this.load.start();

}





  loadcriticalasseet(){
    this.load.audio("bgmusic",asset("../resources/Audio/19-Town.mp3"))

     this.load.atlas(
      'boy',
      asset("../resources/char/sam.png"),
      asset("../resources/char/samtexture.json")
    );

    // Main tilemap and tileset
    this.load.tilemapTiledJSON("bd", asset("../Maps/newmap2.json"));
    this.load.image("tile2", asset("../resources/Tileset/newtille.webp"));
        this.load.image("tile2",asset("../resources/Tileset/newtille.webp"));
    this.load.image("tile3",asset("../resources/Tileset/Props.webp"))
    // Secondary tileset (if needed for initial view)
    this.load.image("tile3", asset("../resources/Tileset/Props.webp"));

  }
}
