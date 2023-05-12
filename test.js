class Room1 extends AdventureScene {
    constructor() {
        super("room1", "First Room");
    }
    onEnter() {
        this.basicroom();
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
        this.basicroom();
        let key = this.add.text(this.w * 0.57, this.w * 0.47, this.keyrandomiser())
            .setFontSize(this.s * 2)
            .setInteractive()
            .setStyle({color: '#000' })
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })
        let door = this.add.text(this.w * 0.28, this.w * 0.38, "🔐 door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .setStyle({color: '#000' })
            .on('pointerover', () => this.showMessage("Familiar, but locked this time"))
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
    scene: [Room2],
    // scene: [Room1,Room2,Hallway1],
    title: "The Room",
});
