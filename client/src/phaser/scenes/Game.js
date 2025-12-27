import Phaser from "phaser";
import MAinCharAnim from "../resources/MAinChar/MaincharAnim";
import socket from "../network/socket";
import Chicken from "../resources/animal/Chicken/Chicken";
import BoyAnim from "../BoyAnim/BoyAnim";
import Cow from "../resources/animal/cow/Cow";
const asset = (path) => new URL(path, import.meta.url).href;


export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
    this.players = {};
    this.player = null;
    this.lastPosition = { x: 0, y: 0 };
    this.id=0;
    this.map=null;
    this.char="boy"
    this.chickenspwaned=false;
  }


  create() {
// this.audio=this.sound.add('bgmusic',{
//   loop:true,
//   volume:0.4
// })
// this.audio.play();


    

    this.cursor = this.input.keyboard.createCursorKeys();
    const id=this.id++;
    socket.emit('createnewpal',({id:socket.id,x:100,y:100}))
    // Map setup
    this.createmap()
    //layers setup
    this.createlayer();
//      this.chickenspwaned=true;
//       this.chick= this.physics.add.sprite(1200,700,'chicken','frame-1.png');
//         this.anims.create({
//         key:'chick-walk',
//         frames:this.anims.generateFrameNames('chicken',{start:1,end:3,prefix:'frame-',suffix:'.png'}),
//         frameRate:8,
//         repeat:-1
//        })

//        this.chicken=this.add.group();
//        const chick1=new Chicken(this,1200,700,'chicken','left');
//         const chick2=new Chicken(this,1300,720,'chicken','right');

//        this.chicken.add(chick1);
//             this.chicken.add(chick2);



//   // Load the atlas
  
//   this.anims.create({
//   key: 'cow-walk',
//   frames: this.anims.generateFrameNames('cow', {
//     start: 1,
//     end: 6,
//     prefix: 'walk-',
//     suffix: '.png'
//   }),
//   frameRate: 10,
//   repeat: -1
// });
// this.cow=this.physics.add.group();
// const cow1=new Cow(this,900,900,"cow","left");
// const cow2=new Cow(this,1500,800,"cow","right");
// this.cow.add(cow1)
// this.cow.add(cow2)
  console.log(this.map)

this.createAnimalAnimations();
  
  // 3. NOW create the animals (they can safely play animations)
  this.createChickens();
  this.createCows();







 



      

     

     this.setupCollisions();
       
 


 

  

    // Socket event listeners - ONLY set up once
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id);
    });


    this.setupsocket();
    
  }






  
  //create player
  createLocalPlayer(playerData) {
    console.log("Creating local player at", playerData.x, playerData.y);
    
    // Create local player with physics
    this.player = this.physics.add.sprite(playerData.x, playerData.y, this.char||'boy', "walk-down-3.png");
    this.player.setCollideWorldBounds(true);
    
    // Add collision with walls
    this.physics.add.collider(this.player, this.forest);
    this.physics.add.collider(this.player, this.house);
      this.physics.add.collider(this.player, this.grass);
    
     
        this.physics.add.collider(this.player,this.newset,(player,tile)=>{
          console.log("t")
          if(tile.properties.message==true){
            console.log("message")
          
            alert("🐔welcome to Happy town")


          }

        })
    
       const mapWidth = this.map.widthInPixels;
        const mapHeight = this.map.heightInPixels;
    // Camera follows local player
    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
   this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    
    // Store in players object
    this.players[playerData.id] = this.player;
    
    // Initialize last position
    this.lastPosition = { x: playerData.x, y: playerData.y };
  }

  //create other player

  createOtherPlayer(playerData) {
    console.log("Creating other player at", playerData.x, playerData.y, "with ID:", playerData.id);
    
    // Don't create if already exists
    if (this.players[playerData.id]) {
      console.log("Player already exists:", playerData.id);
      return;
    }
    
    // Create other player (no physics needed for remote players)
    const other = this.add.sprite(playerData.x, playerData.y, `${this.char||"boy"}`, "walk-down-3.png");
    
    // Store in players object
    this.players[playerData.id] = other;
    
    console.log("Total players now:", Object.keys(this.players).length);
  }


  //movements

  update() {
    if (!this.cursor || !this.player) return;

    const speed = 120;
    let currentAnimation = `${this.char||'boy'}-idle-down`;
    let flipX = false;

    // Reset velocity every frame
    this.player.setVelocity(0);

    if (this.cursor.left.isDown) {
      this.player.setVelocityX(-speed);
      currentAnimation = `${this.char||'boy'}-runside`;
      flipX = true;
    } else if (this.cursor.right.isDown) {
      this.player.setVelocityX(speed);
      currentAnimation = `${this.char||'boy'}-runside`;
      flipX = false;
    } else if (this.cursor.up.isDown) {
      this.player.setVelocityY(-speed);
      currentAnimation = `${this.char||'boy'}-runup`
    } else if (this.cursor.down.isDown) {
      this.player.setVelocityY(speed);
      currentAnimation =`${this.char||'boy'}-rundown`;
    }

    // Play animation locally
    this.player.anims.play(currentAnimation, true);
    this.player.setFlipX(flipX);

    // Only send update if position changed significantly (reduce network traffic)
    const posChanged = Math.abs(this.player.x - this.lastPosition.x) > 1 || 
                       Math.abs(this.player.y - this.lastPosition.y) > 1;

    if (posChanged) {
      // Send local player position AND animation state to server
      socket.emit("playermove", {
        x: this.player.x,
        y: this.player.y,
        animation: currentAnimation,
        flipX: flipX
      });

      this.lastPosition.x = this.player.x;
      this.lastPosition.y = this.player.y;
    }
  }



createmap(){
      this.map = this.make.tilemap({ key: "bd" })
    this.tileset = this.map.addTilesetImage("tileset1", 'tile2')
    this.tileset2=this.map.addTilesetImage("tilset2",'tile3')
}

createlayer(){
   
      this.water=this.map.createLayer("water",this.tileset)
       this.grass= this.map.createLayer('ground', this.tileset)
       this.walllayer = this.map.createLayer('flower', this.tileset)
       this.house=this.map.createLayer('house', this.tileset)
              
       this.forest= this.map.createLayer('forest', this.tileset)
        this.newset= this.map.createLayer('newset',this.tileset2)

}

setupCollisions() {
  [this.forest, this.house, this.grass, this.newset]
    .forEach(layer => layer.setCollisionByProperty({ collide: true }));
}



setupsocket(){
  if(this.issocketinialized)return
  this.issocketinialized=true;

socket.emit("newpal",({id:socket.id,x:1000,y:900}))

    // When we receive ALL current players (including ourselves)
    socket.on('currentplayers', (players) => {
      console.log("Received all players:", players);
      Object.values(players).forEach((playerData) => {
        console.log("Processing player:", playerData.id);
        if (playerData.id === socket.id) {
          // This is us - create local player
          this.createLocalPlayer(playerData);

                 
  this.maincharandlizzrad=(obj1,obj2)=>{
        console.log("collieded")
        console.log(obj1,"obj10")
        console.log(obj2,"obj20")
       const dx = this.player.x-this.chicken.y
const dy = this.player.y - this.chicken.y;
const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Prevent division by zero
    if (distance === 0) return;
console.log(dx,dy);
        const dir=new Phaser.Math.Vector2(dx,dy).normalize().scale(350)
      console.log(dir.x,dir.y)
        this.player.setVelocity(dir.x * 200, dir.y * 200);
  obj2.setVelocity(-dir.x * 200, -dir.y * 200);
       
        
   
        }

        this.physics.add.collider(this.player, this.chicken, this.maincharandlizzrad, undefined, this);
           this.physics.add.collider(this.player, this.cow, this.maincharandlizzrad, undefined, this);

        

        } else {
          // This is someone else - create other player
          this.createOtherPlayer(playerData);
        }
      })
    });

    // When a NEW player joins after us
    socket.on('newplayer', (playerData) => {
      console.log("New player joined:", playerData);
      this.createOtherPlayer(playerData).setScale(2);
    });
    
    // When another player moves
    socket.on("playerMoved", (playerData) => {
      console.log("Player moved:", playerData.id, playerData.x, playerData.y);
      const sprite = this.players[playerData.id];
      if (sprite && playerData.id !== socket.id) {
        sprite.setPosition(playerData.x, playerData.y);
        sprite.anims.play(playerData.animation, true);
        

        
        // Play animations for other players based on their movement
        if (playerData.animation) {
          sprite.anims.play(playerData.animation, true);
          if (playerData.flipX !== undefined) {
            sprite.setFlipX(playerData.flipX);
          }
        }
      }
    });

    // When a player disconnects
    socket.on("playerDisconnected", (id) => {
      console.log("Player disconnected:", id);
      if (this.players[id]) {
        this.players[id].destroy();
        delete this.players[id];
      }
    });





}


//chicken spawn

    //  chickenspwan(){
   
    //   this.chickenspwaned=true;
    //   this.chick= this.physics.add.sprite(1200,700,'chicken','frame-1.png');
    //     this.anims.create({
    //     key:'chick-walk',
    //     frames:this.anims.generateFrameNames('chicken',{start:1,end:3,prefix:'frame-',suffix:'.png'}),
    //     frameRate:8,
    //     repeat:-1
    //    })

    //    this.chicken=this.add.group();
    //    const chick1=new Chicken(this,1200,700,'chicken','left');
    //     const chick2=new Chicken(this,1300,720,'chicken','right');

    //    this.chicken.add(chick1);
    //         this.chicken.add(chick2);
    //  }



    
createAnimalAnimations() {
  // Chicken animation
  if (!this.anims.exists('chick-walk')) {
    this.anims.create({
      key: 'chick-walk',
      frames: this.anims.generateFrameNames('chicken', {
        start: 1,
        end: 3,
        prefix: 'frame-',
        suffix: '.png'
      }),
      frameRate: 8,
      repeat: -1
    });
  }
  
  // Cow animation
  if (!this.anims.exists('cow-walk')) {
    this.anims.create({
      key: 'cow-walk',
      frames: this.anims.generateFrameNames('cow', {
        start: 1,
        end: 6,
        prefix: 'walk-',
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    });
  }
}

// NEW METHOD: Create chickens
createChickens() {
  this.chicken = this.add.group();
  const chick1 = new Chicken(this, 1200, 700, 'chicken', 'left');
  const chick2 = new Chicken(this, 1300, 720, 'chicken', 'right');
  this.chicken.add(chick1);
  this.chicken.add(chick2);
}

// NEW METHOD: Create cows
createCows() {
  this.cow = this.physics.add.group();
  const cow1 = new Cow(this, 900, 900, "cow", "left");
  const cow2 = new Cow(this, 1500, 800, "cow", "right");
  this.cow.add(cow1);
  this.cow.add(cow2);
}


}

  