var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

new Phaser.Game(config);

function preload() {
    //loading assets
    this.load.image('floor', 'World/floor.png');
    this.load.spritesheet('player', 'Player/idle.png', {
        frameWidth: 48,
        frameHeight: 48
    });
    this.load.spritesheet('run', 'Player/run.png', {
        frameWidth: 48,
        frameHeight: 48
    });

}

function create() {
    //creating platform
    platform = this.physics.add.staticGroup();
    platform.create(270, 580, 'floor').setScale(1.35).refreshBody();
    //add player
    player = this.physics.add.sprite(100, 400, 'player');
    player.setSize(30, 48, true);
    //player bouncing
    player.setBounce(0.2);
    //keep the player in the game scene
    player.setCollideWorldBounds(true);
    //player collides with platform
    this.physics.add.collider(player, platform);
    //add controllers
    cursors = this.input.keyboard.createCursorKeys();

    //player animations
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player', {
            start: 0,
            end: 11
        }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('run', {
            start: 0,
            end: 11
        }),
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('run', {
            start: 13,
            end: 24
        }),
        frameRate: 20
    });

}

function update() {

    //move the player
    if (cursors.left.isDown) {
        player.setVelocityX(-130);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(130);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('idle', true);
    }

}