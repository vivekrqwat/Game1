
const MAinCharAnim=(anims)=>{
        anims.create({
        key:"sam-idle-down",
        frames:[{key:"sam",frame:"walk-down-3.png"}]
    })

    anims.create({
        key:"sam-idle-up",
        frames:[{key:"sam",frame:"walk-up-3.png"}]
    })

     anims.create({
        key:"sam-idle-side",
        frames:[{key:"sam",frame:"walk-side-3.png"}]
    })




    anims.create({
        key:"sam-rundown",
        frames:anims.generateFrameNames('sam',{start:1,end:8,prefix:"run-down-",suffix:".png"}),
        repeat:-1,
        frameRate:15
    })

     anims.create({
        key:"sam-runside",
        frames:anims.generateFrameNames('sam',{start:1,end:8,prefix:"run-side-",suffix:".png"}),
        repeat:-1,
        frameRate:15
    })

     anims.create({
        key:"sam-runup",
        frames:anims.generateFrameNames('sam',{start:1,end:8,prefix:"run-up-",suffix:".png"}),
        repeat:-1,
        frameRate:15
    })
    anims.create({
        key:"sam-faint",
        frames:anims.generateFrameNames('sam',{start:1,end:8,prefix:"faint-",suffix:".png"}),
    })


}
export default MAinCharAnim