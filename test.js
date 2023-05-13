class Room1 extends AdventureScene {
    constructor() {
        super("room1", "First Room");
        
    }

    onEnter() {
        this.basicroom();
        this.audioon();
        let door = this.add.text(this.w * 0.28, this.w * 0.38, "🚪 door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .setStyle({color: '#000' })
            .on('pointerover', () => this.showMessage("Just about the only thing in the room"))
            .on('pointerdown', () => {
                    this.showMessage("*squeak*");
                    door.setText("🚪 opened door");
                    this.gotoScene('hallway1');    
            })
    }
   
}

class Hallway1 extends AdventureScene {
    constructor() {
        super("hallway1", "There seems to be a hallway");
    }
    onEnter() {
        this.game.sound.stopAll();
        this.basichall();
        this.add.text(this.w * 0.33, this.w * 0.51, "Go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("To the sanctuary of the white room");
            })
            .on('pointerdown', () => {
                this.resetmain();
            });
        let door = this.add.text(this.w * 0.36, this.w * 0.34, "🚪 door")
            .setFontSize(this.s * 1)
            .setInteractive()
            .setStyle({color: '#000' })
            .on('pointerover', () => this.showMessage("Not much else here..."))
            .on('pointerdown', () => {
                    this.showMessage("*squeak*");
                    door.setText("🚪 opened door");
                    this.gotoScene('room2');    
            })
    }
}

class Room2 extends AdventureScene {
    constructor() {
        super("room2", "A Familiar Location");
    }
    onEnter() {

        this.audioon();
        this.basicroom();
        let key = this.add.text(this.w * 0.57, this.w * 0.47, this.keyrandomiser())
            .setFontSize(this.s * 2)
            .setInteractive()
            .setStyle({color: '#000' })
            .on('pointerover', () => {
                this.showMessage("The first of many? Or one of a kind?")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('Key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })
            this.keytoparadise()
        let door = this.add.text(this.w * 0.28, this.w * 0.38, "🔐 door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .setStyle({color: '#000' })
            .on('pointerover', () => {
                if (this.hasItem("Key")) {
                    this.showMessage("Open Sesame?");
                } else {
                    this.showMessage("Familiar, but locked this time");
                }
            })
            .on('pointerdown', () => {
                    this.loseItem("Key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 opened door");
                    if(this.keytoparadise()){
                        this.gotoScene('paradise');
                    }
                    else{
                    this.gotoScene('hallway1');    
                    }
            })
    }
    
}

class Paradise extends AdventureScene {
    constructor() {
        super("paradise", "The end of your troubles");
    }
    onEnter() {
        this.paradiselight();
        this.basicroom();
        this.background.setPipeline("Light2D"); 

        // this.time.delayedCall(1000, () => this.music.stop());
        
        let door = this.add.text(this.w * 0.28, this.w * 0.38, "🚪 door?")
            .setFontSize(this.s * 2)
            .setInteractive()
            .setStyle({color: '#000' })
            .on('pointerover', () => this.showMessage("A warm light shines through it, it feels... Peaceful"))
            .on('pointerdown', () => {
                    this.showMessage("*squeak*");
                    door.setText("🚪 opened door");
                    this.gotoScene('hallway1');    
            })
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    // scene: [Paradise],
    scene: [Room1,Room2,Hallway1, Paradise],
    title: "The Room",
});
