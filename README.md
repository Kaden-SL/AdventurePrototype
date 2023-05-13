A simple adventure game by Kaden Sedmak-Locke based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: Room1,Hallway1 Room2,Paradise,WhiteRoom,Hallway2 and Room3 are based on AdventureScene.
- **2+ scenes *not* based on `AdventureScene`**: userinput,intro,Hell,Neutral and Peace are based on Phaser.Scene.
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - basicroom(), set the scene for a basic room as the game primarily takes place in one of 3 rooms. All of the subsequent room or hall methods are placed here so as to avoid having to preload image/audio assets in each scene and specificy a path each time. 
    - basichall() same as basicroom, except it displays the basic hall.
    - corruptroom(), same as basicroom, except it displays the corrupted room's background instead for the loop.
    - dong(),audioon(),angery(),hellish(),dooropen() are all methods in the adventure game engine that control specific background music starting. They are placed in the adventure engine so as to cut down own preloads per scene, as well as to provide repeatable triggers for different audio tracks,
    - keyrandomiser() is a method to chose between one of three different keys, used primarily to determine whether the player gets the good ending. Also created so I can add key objects to scenes and always have the emoji look different.
    -  keytoparadise() runs the logic to determine if the player gets into the paradise ending using a randomizer, and checking if it is equal to keyrandomiser.
    - paradiselight() and whiteroomlight() Are light controllers for the two scenes that use them. 
Experience requirements:
- **4+ locations in the game world**: Room1,Hallway1 Room2,Paradise,WhiteRoom,Hallway2 and Room3 are all distinct locations.
- **2+ interactive objects in most scenes**: This one is a bit rough, most scenes have a ever present go back, and door options for players to chose, as well as a couple scenes give players keys to pick up, that play a big part in the ending that they get. 
- **Many objects have `pointerover` messages**: Every single door, key and go back option have pointerover options.
- **Many objects have `pointerdown` effects**: Every single door, go back and go forward will go on to another scene or trigger something else upon click usually an audio queue. Additionally the key objects will be added to the inventory. 
- **Some objects are themselves animated**: The introductory logo for the game is flashing in tune to the audio playing in the background. As well as every interactible in the corrupted endings flies away on click.

Asset sources:
- (For each image/audio/video asset used, describe how it was created. What tool did you use to create it? Was it based on another work? If so, how did you change it, and where can we learn more about the original work for comparison? Use [Markdown link syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#links).)
- ['A Fluorescent Bulb II' sound effects library by A Sound Effect](https://www.youtube.com/watch?v=baUq5va4w3U) , This base effect was taken, put through an echo and enhancement filter, as well as recut to have the beginning portion repeat, and the middle portion have a more jarring transition.
- ['Hum SOUND EFFECT - Fluorescent Humming Lampen Brummen SOUNDS Neon Light SOUND FX by BerlinAtmospheres'](https://www.youtube.com/watch?v=BL8B_yh2iJs) , This effect was downloaded, put into a video editing software and recut to be longer and more sustained through the equalization effect. It was also put through the chorus, amplify, distort and echo effects to produce the background sound for various scenes.
- Any other sounds and art was made by me, either recorded via my phone as a voice memo mp3 or created on https://www.piskelapp.com/, a free open source pixel editor for creating sprites. I used this to make the background for the hallway as well as the rooms.

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.
Notes by me:
- Sorry this took so long, I was having days worth of trouble with very specific stuff like switching the audio on and off between scenes, using math.random to determine keys between methods, that I got caught up and often burnt out. I had a much grander original vision for what this would look like, where the rooms would gradually corrupt, and the game wouldn't be so abrupt, but sadly I overreached between my work schedule and the rest of my schoolwork. 