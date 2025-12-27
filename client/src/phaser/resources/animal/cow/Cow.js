// import Phaser from "phaser";

// export default class Cow extends Phaser.Physics.Arcade.Sprite{
  

//     constructor(scene,x,y,texture,direction){
        

//         super(scene,x,y,texture,direction)
//                 scene.add.existing(this);
//         scene.physics.add.existing(this);
//            this.direction=direction||"right"
        
//     this.anims.play("cow-walk", true);
//     scene.time.addEvent({
//         delay: 3000,
//         callback: () => {  
//             if(this.direction==="right"){
//                 this.direction="left"
//             }else if(this.direction==="left"){
//                 this.direction="right"
//             } },
//         loop: true  
        
//     });
// }
//    preUpdate(time, delta) {
//         super.preUpdate(time, delta);

//         if (this.body.blocked.right) {
//       this.direction = "left";
//       this.setFlipX(true);
//     } 
//     else if (this.body.blocked.left) {
//       this.direction = "right";
//       this.setFlipX(false);
//     }
//         if(this.direction==="right"){
//             this.setVelocityX(-50)
//               this.setFlipX(false);
//         }else if(this.direction==="left"){
         
//             this.setVelocityX(50)
//             this.setFlipX(true)
//         }

//     }
// }


import Phaser from "phaser";

export default class Cow extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, direction) {
    super(scene, x, y, texture);
    
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    this.direction = direction || "right";
    
    // Safety check
    if (scene.anims.exists("cow-walk")) {
      this.anims.play("cow-walk", true);
    } else {
      console.error("cow-walk animation not found!");
    }
    
    scene.time.addEvent({
      delay: 3000,
      callback: () => {
        this.direction = this.direction === "right" ? "left" : "right";
      },
      loop: true
    });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.body.blocked.right) {
      this.direction = "left";
      this.setFlipX(true);
    } else if (this.body.blocked.left) {
      this.direction = "right";
      this.setFlipX(false);
    }

    if (this.direction === "right") {
      this.setVelocityX(-30); // Cows move slower
      this.setFlipX(false);
    } else if (this.direction === "left") {
      this.setVelocityX(30);
      this.setFlipX(true);
    }
  }
}