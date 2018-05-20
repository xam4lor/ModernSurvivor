class Game {
    constructor(config, strings) {
        this.config = config;
        this.strings = strings;

        this.TILE_SIZE = this.config.TILE_SIZE;
        this.TEXT_SPEED_DISPLAY = this.config.TEXT_SPEED_DISPLAY;
        this.setFPS(this.FPS);

        this.currentLevel = null;
        this.timeSinceLastLoop = 0;
        this.lastTimestamp = 0;
        this.isRunning = false;

        this.displayingText = [];
        this.displayingTextID = 0;
        this.isDisplayingText = false;

        this.levelContainer = new LevelContainer(this);

        document.addEventListener('keydown', this.keyDown);
    }




    run() {
        this.setCurrentLevel("HEROS_HOUSE_FLOOR_0", true);
        this.levelContainer.instanciateLevels();

        window.requestAnimationFrame(this.loop);
        this.isRunning = true;
    }

    loop(timestamp) {
        let now = Date.now();

        game.timeSinceLastLoop += (now - game.lastTimestamp);

        if(game.timeSinceLastLoop >= game.FPS) {
            game.timeSinceLastLoop = 0;

            game.update();
            game.show();
        }

        game.lastTimestamp = now;
        window.requestAnimationFrame(game.loop);
    }




    update() {
        if(this.isRunning)
            this.currentLevel.updateEntities();
    }

    show() {}

    keyDown(event) {
        if(game.isDisplayingText && event.keyCode === game.config.INTERRACT_CODE) {
            game.displayingTextID++;

            if(game.displayingText[game.displayingTextID] != null) {
                game.displayText(game.displayingText[game.displayingTextID]);
            }
            else {
                game.displayingText = [];
                game.displayingTextID = 0;
                game.isDisplayingText = false;
                game.isRunning = true;
                document.getElementById("text-area").style.display = "none";
            }
        }
    }



    displayTexts(texts) {
        if(texts.length <= 0)
            return new GameError(this.strings.errors.DISPLAY_EMPTY_ARRAY);

        this.isRunning = false;

        this.displayingText = texts;
        this.displayingTextID = 0;
        this.displayText(this.displayingText[this.displayingTextID]);
    }



    setCurrentLevel(levelName, instant = false) {
        document.getElementById("loading").style.display = "";
        document.getElementById("text-area").style.display = "none";
        document.getElementById("tiles").style.display = "none";
        document.getElementById("entities").style.display = "none";

        this.currentLevel = this.levelContainer.getLevelByName(levelName);
        this.currentLevel.instantiateLevel();
        this.currentLevel.show();

        document.getElementById("loading").style.display = "none";
        document.getElementById("tiles").style.display = "";
        document.getElementById("entities").style.display = "";
    }

    setFPS(FPS) {
        this.FPS = 1/FPS * 1000;
    }

    getTileAt(x, y, throwError) {
        return this.currentLevel.getTileAt(x, y, throwError);
    }




    sleep(milliseconds) {
        var start = new Date().getTime();

        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    displayText(textToDp) {
        let id;
        let textPart = "";
        let j = 0;

        function text(text) {
            document.getElementById("text-area").style.display = "";
            document.getElementById("text-box").innerHTML += text[j];
            j++;

            if(document.getElementById("text-box").innerHTML.length === text.length) {
                game.isDisplayingText = true;
                clearInterval(id);
            }
        }

        document.getElementById("text-box").innerHTML = "";
        id = setInterval(text, this.TEXT_SPEED_DISPLAY * 10, textToDp);
    }
}



// lancement du jeu
var game;

function launchGame() {
    let config = new XMLHttpRequest();
    config.open("GET", "/conf/config/config.json", false);
    config.send(null);
    let config_JSON = JSON.parse(config.responseText);


    let strings = new XMLHttpRequest();
    strings.open("GET", "/conf/strings/" + config_JSON.LANGUAGE + "/strings.json", false);
    strings.send(null);

    game = new Game(config_JSON, JSON.parse(strings.responseText));
    game.run();
}
