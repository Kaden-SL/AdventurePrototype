var counter =0;
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
                    this.dooropen();
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
        // this.game.sound.stopAll();
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
                    this.dooropen();
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
        this.time.delayedCall(10000, () => 
        this.add.text(this.w * 0.1, this.w * 0.025, "Stay?")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Remain in the room, ad infiniteum?");
            })
            .on('pointerdown', () => {
                this.gotoScene('whiteroom');
            })
        
        );
        this.add.text(this.w * 0.33, this.w * 0.51, "Go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("To the last tunnel");
            })
            .on('pointerdown', () => {
                this.gotoScene('hallway1');
            });
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
                    this.dooropen();
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

        // this.time.delayedCall(3000, () => this.lightflicker(light));
        
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

class WhiteRoom extends AdventureScene {
    constructor() {
        super("whiteroom", "Void?");
    }
    onEnter() {
        this.game.sound.stopAll();
        var light = this.whiteroomlight();
        this.basicroom();
        this.background.setPipeline("Light2D"); 

        this.time.delayedCall(12000, () => 
        this.add.text(this.w * 0.33, this.w * 0.51, "Remain?")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("-------------");
            })
            .on('pointerdown', () => {
                light.setRadius(10000);
                this.add.text(this.w * 0.1, this.w * 0.025, "The light o v e r t a k e s   y o u")
                .setFontSize(this.s * 2)
                .setInteractive()
                this.time.delayedCall(4000, () =>this.gotoScene('neutral'));
  
            })
        );
        
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
class Neutral extends Phaser.Scene {
    constructor() {
        super('neutral')
    }
    create() {

        this.cameras.main.setBackgroundColor('#ffffff')
        this.add.text(800,500, "The void welcomes you, stay awhile...").setFontSize(20).setStyle({color: '#000' })
        this.input.on('pointerdown', () => this.scene.start('intro'))
        this.add.text(850,1000, "(click anywhere to restart)").setFontSize(13).setStyle({color: '#000' })


    }
}
class Hallway2 extends AdventureScene {
    constructor() {
        super("hallway2", "Here again?");
    }
    onEnter() {
        counter+=1;
        if (counter==20){
            this.gotoScene('hell');
        }
        this.game.sound.stopAll();
        this.angery();
        this.basichall();
        let door = this.add.text(this.w * 0.36, this.w * 0.34, "🚪 door")
            .setFontSize(this.s * 1)
            .setInteractive()
            .setStyle({color: '#000' })
            .on('pointerover', () => this.showMessage("Haven't I done this before?"))
            .on('pointerdown', () => {
                    this.dooropen();
                    this.showMessage("*squeak*");
                    door.setText("🚪 opened door");
                    this.gotoScene('room3');    
            })
    }
}
class Room3 extends AdventureScene {
    constructor() {
        super("room3", "Familiar, but patches seem to be... missing?");
    }
    onEnter() {
        this.corruptroom();
        this.add.text(this.w * 0.33, this.w * 0.51, "Go back?")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("To the last tunnel");
            })
            .on('pointerdown', () => {
                this.gotoScene('hallway2');
            });
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
    
        let door = this.add.text(this.w * 0.28, this.w * 0.38, "🔐 door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .setStyle({color: '#000' })
            .on('pointerover', () => {
                if (this.hasItem("Key")) {
                    this.showMessage("Maybe something different this time?");
                } else {
                    this.showMessage("Familiar, and locked again?");
                }
            })
            .on('pointerdown', () => {
                    this.loseItem("Key");
                    this.dooropen();
                    this.showMessage("*squeak*");
                    door.setText("🚪 opened door");
                    this.gotoScene('hallway2');      
            })
    }
    
}
class Hell extends Phaser.Scene {
    constructor() {
        super('hell')
    }
    preload(){
        this.load.path = './assets/';
        this.load.audio('hell',['hellsound.wav']);
    }
    create() {
        this.game.sound.stopAll();
        this.hell= this.sound.add('hell',{ loop: true, volume:.2 });
        this.hell.play();
        this.cameras.main.setBackgroundColor('#F11514')
        this.add.text(800,500, "Y̴͓̼̎o̷͕̳͑̀u̴͍̼͎͘ ̶͉͗ȟ̸̛̪̥̩a̴̬͋̿͘v̶̱̞͑̉e̷̖̥͊͆͠ͅ ̸̨̃f̸͎̚a̵̙̦͋͋l̸̤̮̰͒͗͝l̷̲̝̩͗̀̉e̵̬̱͛͒n̶̡̺̮͋͌ ̷̞͝c̸̪͊͝h̵̛̘̒ĭ̵͍͋l̷̢͚͔̉̋d̵̬͂").setFontSize(20).setStyle({color: '#000' })
        this.time.addEvent({
            delay:7000,
        callback: () => {
            this.add.text(850,1000, "(click anywhere to restart)").setFontSize(13).setStyle({color: '#000' });
            this.input.on('pointerdown', () => this.scene.start('intro'));

            }
            
        })
        t


    }
}
const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Hell],
    // scene: [userinput, Intro,Room1,Room2,Hallway1, Paradise,WhiteRoom,Neutral,Hallway2,Hell],
    title: "The Room",
});
