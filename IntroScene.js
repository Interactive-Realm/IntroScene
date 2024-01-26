import Phaser from 'phaser';
import Flag from './assets/flag.png';
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


        const screenCenterX = this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.height / 2;

            // Pop balloner
            const pop_tekst1 = this.add.text(screenCenterX, 100, 'POP BALLONER', {
            fontFamily: 'DIN',
            color: 'white',
            font: 'bold 88px DIN',
            backgroundColor: '#164196',
            }).setPadding({x:10}).setDepth(1).setOrigin(0.5, 0.5);

            // & vind!
            const pop_tekst2 = this.add.text(screenCenterX - pop_tekst1.width / 2, 210, '& VIND!', {
                fontFamily: 'DIN',
                color: 'white',
                font: 'bold 88px DIN',
                backgroundColor: '#e30613',
            }).setPadding({x:10}).setDepth(1).setOrigin(0, 0.5);

            // Hovedpræmie billede
            const praemietekst = this.add.image(screenCenterX, 355, 'hovedpraemie');
            praemietekst.setDepth(1).scale = 0.7;

            // Uge-præmie tekst
            const uge_praemie_tekst1 = this.add.text(screenCenterX - pop_tekst1.width / 2, 510, 'PRÆMIER HVER UGE:', {
                fontFamily: 'DIN',
                color: 'black',
                font: 'bold 40px DIN',
                }).setDepth(1).setOrigin(0, 0.5);
            const uge_praemie_tekst2 = this.add.text(screenCenterX - pop_tekst1.width / 2, 560, '1. plads - voucher på 500 kr. til intersport.dk', {
                fontFamily: 'DIN',
                color: 'black',
                font: 'normal 30px DIN',
                }).setDepth(1).setOrigin(0, 0.5);
            const uge_praemie_tekst3 = this.add.text(screenCenterX - pop_tekst1.width / 2, 610, '2. plads - voucher på 200 kr. til intersport.dk', {
                fontFamily: 'DIN',
                color: 'black',
                font: 'normal 30px DIN',
                }).setDepth(1).setOrigin(0, 0.5);
            const uge_praemie_tekst4 = this.add.text(screenCenterX - pop_tekst1.width / 2, 660, '3. plads - voucher på 100 kr. til intersport.dk', {
                fontFamily: 'DIN',
                color: 'black',
                font: 'normal 30px DIN',
                }).setDepth(1).setOrigin(0, 0.5);
            const uge_praemie_tekst5 = this.add.text(screenCenterX - pop_tekst1.width / 2, 710, 'SPRÆNG FLEST BALLONER OG VÆR MED I KONKURRENCEN OM FEDE PRÆMIER!', {
                fontFamily: 'DIN',
                color: 'black',
                font: 'bold 17px DIN',
                }).setDepth(1).setOrigin(0, 0.5);


            // Start knap
            const startButton = this.add.image(screenCenterX, 835, 'spilogvind');
            startButton.setDepth(1).setOrigin(0.5, 0.5).scale = 0.5;
    
            startButton.setInteractive();
    
            startButton.on('pointerdown', () => {
                this.scene.start('GameCountdown');
            });

            // Konkurrencebetingelser
            const konkur_beting = this.add.text(screenCenterX, 925, '* Se konkurrencebetingelser her', {
                fontFamily: 'DIN',
                color: 'gray',
                font: 'bold 17px DIN',
                }).setDepth(1).setOrigin(0.5, 0.5);

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
            -this.sys.game.config.height + 400, // spawner lige over browser vinduet
            'flag'
        ).setDepth(0).setScale(0.2);

        this.physics.add.existing(flagObject);
        flagObject.body.setVelocity(0, 100);

        
    // Set initial rotation and angular velocity
    flagObject.rotation = Phaser.Math.DegToRad(Phaser.Math.Between(0, 360)); // Random initial rotation
    const angularVelocity = Phaser.Math.FloatBetween(-90, 90); // Random angular velocity

    // Set initial horizontal velocity
    const horizontalVelocity = Phaser.Math.FloatBetween(-30, 30); // Random horizontal velocity

    this.physics.add.existing(flagObject);

    // Set angular velocity
    flagObject.body.angularVelocity = angularVelocity;

    // Set horizontal velocity
    flagObject.body.setVelocityX(horizontalVelocity);
    flagObject.body.setVelocityY(100); // Vertical velocity

    // Optional: Add damping to gradually slow down rotation and movement
    flagObject.body.angularDamping = 0.99;
    flagObject.body.linearDamping = 0.99;

    // Set opacity (e.g., 0.5 for half-transparent)
    flagObject.setAlpha(0.3);
    }

}
