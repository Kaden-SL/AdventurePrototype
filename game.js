class Room1 extends AdventureScene {
    constructor() {
        super("room1", "First Room");
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('mainroom', 'mainroom.png');
        // this.load.audio('only',['only.mp3']);
    }
    onEnter() {
        this.background = this.add.image(
            720,
            535,
            'mainroom',//imagename
        )
        this.background.setScale(0.75) 
        let clip = this.add.text(this.w * 0.28, this.w * 0.38, "🚪 door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .setStyle({color: '#000' })
            .on('pointerover', () => this.showMessage("Just about the only thing in the room"))
            .on('pointerdown', () => {
                    this.showMessage("*squeak*");
                    door.setText("🚪 opened door");
                    this.gotoScene('demo2');    
            })
    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('room3');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}
class room3 extends AdventureScene {
    constructor() {
        super("room3", "This is my test room");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class userinput extends Phaser.Scene {
    constructor() {
        super('userinput')
    }
    create() {

        
        this.add.text(800,500, "Click anywhere to play intro").setFontSize(20)
        
        // .setPipeline("Light2D"); I'll figure out lights later
        this.lights.enable();
        this.lights.setAmbientColor("#0x999999");
        this.lights.addLight(200, 300, 1000, undefined, 2)
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('intro'));
        });
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    preload(){
        this.load.path = './assets/';
        this.load.audio('bulb',['lightbulb.mp3']);
    }
    create() {
        
        this.audio1= this.sound.add('bulb',{ loop: false });
        this.audio1.play()
        this.title= this.add.text(50,50, "The Room").setFontSize(50);
        this.tweens.add({
            targets: this.title,
            alpha:0,
            duration: 500,
            repeat:10,
            yoyo:true,
        });
        this.time.addEvent({
            delay:36000,
        callback: () => {
            this.add.text(800,500, "Click anywhere to begin.").setFontSize(20);
            this.input.on('pointerdown', () => {
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => this.scene.start('demo1'));
            });
            }
            
        })
       
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [userinput,Intro, Room1, Demo2, Outro,room3],
    title: "The Room",
});

