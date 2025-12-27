const BoyAnim = (anims) => {
    // IDLE ANIMATIONS
    anims.create({
        key: "boy-idle-down",
        frames: [{ key: "boy", frame: "idle-down.png" }]
    });

    anims.create({
        key: "boy-idle-up",
        frames: [{ key: "boy", frame: "idle-up.png" }]
    });

    anims.create({
        key: "boy-idle-left",
        frames: [{ key: "boy", frame: "idle-left.png" }]
    });

    anims.create({
        key: "boy-idle-right",
        frames: [{ key: "boy", frame: "idle-right.png" }]
    });

    // WALKING ANIMATIONS
    anims.create({
        key: "boy-rundown",
        frames: anims.generateFrameNames('boy', {
            start: 1,
            end: 5,
            prefix: "walk-down-",
            suffix: ".png"
        }),
        repeat: -1,
        frameRate: 6
    });

    anims.create({
        key: "boy-runup",
        frames: anims.generateFrameNames('boy', {
            start: 1,
            end: 4,
            prefix: "emote-",
            suffix: ".png"
        }),
        repeat: -1,
        frameRate: 6
    });

    anims.create({
        key: "boy-runside",
        frames: anims.generateFrameNames('boy', {
            start: 1,
            end: 5,
            prefix: "walk-left-",
            suffix: ".png"
        }),
        repeat: -1,
        frameRate: 6
    });

    anims.create({
        key: "boy-walk-right",
        frames: anims.generateFrameNames('boy', {
            start: 1,
            end: 5,
            prefix: "walk-right-",
            suffix: ".png"
        }),
        repeat: -1,
        frameRate: 6
    });

    // SITTING ANIMATIONS
    anims.create({
        key: "boy-sit-down",
        frames: anims.generateFrameNames('boy', {
            start: 1,
            end: 2,
            prefix: "sit-down-",
            suffix: ".png"
        }),
        repeat: -1,
        frameRate: 2
    });

    anims.create({
        key: "boy-sit-up",
        frames: anims.generateFrameNames('boy', {
            start: 1,
            end: 2,
            prefix: "sit-up-",
            suffix: ".png"
        }),
        repeat: -1,
        frameRate: 2
    });

    anims.create({
        key: "boy-sit-left",
        frames: anims.generateFrameNames('boy', {
            start: 1,
            end: 2,
            prefix: "sit-left-",
            suffix: ".png"
        }),
        repeat: -1,
        frameRate: 2
    });

    anims.create({
        key: "boy-sit-right",
        frames: anims.generateFrameNames('boy', {
            start: 1,
            end: 2,
            prefix: "sit-right-",
            suffix: ".png"
        }),
        repeat: -1,
        frameRate: 2
    });

    // EMOTE ANIMATIONS
    anims.create({
        key: "boy-emote",
        frames: anims.generateFrameNames('boy', {
            start: 1,
            end: 4,
            prefix: "emote-",
            suffix: ".png"
        }),
        repeat: 0,
        frameRate: 6
    });

    // ACTION ANIMATIONS
    anims.create({
        key: "boy-action",
        frames: anims.generateFrameNames('boy', {
            start: 1,
            end: 4,
            prefix: "action-",
            suffix: ".png"
        }),
        repeat: 0,
        frameRate: 6
    });

    // SPECIAL ANIMATIONS
    anims.create({
        key: "boy-special",
        frames: anims.generateFrameNames('boy', {
            start: 1,
            end: 2,
            prefix: "special-",
            suffix: ".png"
        }),
        repeat: 0,
        frameRate: 6
    });

    // DANCE ANIMATION
    anims.create({
        key: "boy-dance",
        frames: anims.generateFrameNames('boy', {
            start: 1,
            end: 4,
            prefix: "dance-",
            suffix: ".png"
        }),
        repeat: -1,
        frameRate: 6
    });

    // WAVE ANIMATION
    anims.create({
        key: "boy-wave",
        frames: anims.generateFrameNames('boy', {
            start: 1,
            end: 2,
            prefix: "wave-",
            suffix: ".png"
        }),
        repeat: 2,
        frameRate: 6
    });

    // JUMP ANIMATION
    anims.create({
        key: "boy-jump",
        frames: anims.generateFrameNames('boy', {
            start: 1,
            end: 2,
            prefix: "jump-",
            suffix: ".png"
        }),
        repeat: 0,
        frameRate: 10
    });

    // EXTRA ANIMATIONS
    anims.create({
        key: "boy-extra",
        frames: anims.generateFrameNames('boy', {
            start: 1,
            end: 6,
            prefix: "extra-",
            suffix: ".png"
        }),
        repeat: 0,
        frameRate: 12
    });
};

export default BoyAnim;