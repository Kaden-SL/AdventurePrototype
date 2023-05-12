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
    preload(){
        this.load.path = './assets/';
        this.load.image('hallway', 'hallway.png');
        // this.load.audio('only',['only.mp3']);
    }
    onEnter() {
        this.background = this.add.image(
            720,
            535,
            'hallway',//imagename
        )
        this.background.setScale(0.75) 
        this.add.text(this.w * 0.33, this.w * 0.51, "Go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.resetmain();
            });
    }
}
const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Room1,Hallway1],
    title: "The Room",
});
