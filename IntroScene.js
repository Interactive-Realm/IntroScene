import Phaser from 'phaser';
import Flag from './assets/Bubble1.png';
import Hovedpraemie from './assets/tekst_hovedpraemie.png';
import Spilogvind from './assets/knap_spilogvind.png';

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super('Introscene');

        this.lastFlagSpawnTime = 0;
        this.flagSpawnInterval = 800;
    }

    preload() {
        this.load.image('flag', Flag);
        this.load.image('hovedpraemie', Hovedpraemie);
        this.load.image('spilogvind', Spilogvind);
        //this.load.bitmapFont('roboto', 'path/to/Roboto-Regular.png', 'path/to/Roboto-Regular.xml');
    }

    create() {


        const screenCenterX = this.game.config.width / 2;
        const screenCenterY = this.game.config.height / 2;

            // Uge-præmie tekst
            const uge_praemie_tekst1 = this.add.text(screenCenterX, 510, 'This is how you play:', {
                fontFamily: 'DIN',
                color: '#97FEED',
                font: 'bold 40px DIN',
                }).setDepth(1).setOrigin(0.5, 0.5);
            const uge_praemie_tekst2 = this.add.text(screenCenterX, 560, 'Click on the falling trash, to remove it from the ocean.', {
                fontFamily: 'DIN',
                color: '#97FEED',
                font: 'normal 30px DIN',
                }).setDepth(1).setOrigin(0.5, 0.5);

            // Start knap
            const startButton = this.add.text(screenCenterX, 835, 'Start game', {
                fontFamily: 'DIN',
                color: '#97FEED',
                font: 'bold 40px DIN',
            });
            startButton.setDepth(1).setOrigin(0.5, 0.5);
    
            startButton.setInteractive();
    
            startButton.on('pointerdown', () => {
                this.scene.start('GameScene');
            });

    }
    update(time, delta) {
        
        if (time - this.lastFlagSpawnTime > this.flagSpawnInterval) {
            this.spawnFlagObject();
            this.lastFlagSpawnTime = time;
        }
        //this.countdown.update();
    }

    spawnFlagObject() {
        const flagObject = this.add.image(
            Phaser.Math.Between(0, this.sys.game.config.width),
            +this.sys.game.config.height + 120, // spawner lige over browser vinduet
            'flag'
        ).setDepth(0).setScale(this.FloatBetween(0.05, 0.2));

        this.physics.add.existing(flagObject);
        flagObject.body.setVelocity(0, 100);

        
    // Set initial rotation and angular velocity
    //flagObject.rotation = Phaser.Math.DegToRad(Phaser.Math.Between(0, 360)); // Random initial rotation
    //const angularVelocity = Phaser.Math.FloatBetween(-180, 180); // Random angular velocity

    // Set initial horizontal velocity
    //const horizontalVelocity = Phaser.Math.FloatBetween(-50, 50); // Random horizontal velocity

    this.physics.add.existing(flagObject);

    // Set angular velocity
    //flagObject.body.angularVelocity = angularVelocity;

    // Set horizontal velocity
    //flagObject.body.setVelocityX(horizontalVelocity);
    flagObject.body.setVelocityY(Phaser.Math.Between(-50, -100)); // Vertical velocity

    // Optional: Add damping to gradually slow down rotation and movement
    flagObject.body.angularDamping = 0.95;
    flagObject.body.linearDamping = 0.95;

    // Set opacity (e.g., 0.5 for half-transparent)
    flagObject.setAlpha(0.4);
    }

    // Generate random float numbers
    FloatBetween = function (min, max)
    {
        return Math.random() * (max - min) + min;
    };
}
