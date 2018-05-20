class Entity {
    constructor(game, entityName, anims, MAIN_ANIM, handle_keyEvents = false, auto_random_move = false) {
        this.game = game;
        this.entityName = entityName;

        this.x = 0;
        this.y = 0;
        this.isMoving = false;

        this.movingFrameID = null;

        this.AUTO_MOVING_CHANCES = this.game.config.AUTO_MOVING_CHANCES;
        this.auto_random_move = auto_random_move;
        this.auto_random_move_last_moveX = 0;
        this.auto_random_move_last_moveY = 0;

        this.ANIMATIONS = anims;


        let entity_dom = document.createElement("div");
        entity_dom.style.position = "absolute";
        entity_dom.style.left = 0;
        entity_dom.style.top = 0;
        entity_dom.style.zIndex = 3;
        entity_dom.style.width = "32px";
        entity_dom.style.height = "40px";
        entity_dom.style.backgroundRepeat = "no-repeat";
        entity_dom.style.backgroundPosition = "left top";
        entity_dom.id += entityName;
        this.entity = document.getElementById("entities").appendChild(entity_dom);

        this.setAnim(MAIN_ANIM);

        this.instanciateTextures();

        if(handle_keyEvents)
            document.addEventListener('keydown', this.keyDown);
    }


    update() {
        // auto move
        if(this.game.isRunning && this.auto_random_move && !this.isMoving && Math.random() > (1 - this.AUTO_MOVING_CHANCES)) {
            if(this.auto_random_move_last_moveX != 0 || this.auto_random_move_last_moveY != 0) {
                if(this.setTargetDirection(this.x - this.auto_random_move_last_moveX, this.y - this.auto_random_move_last_moveY, false) != null) {
                    this.auto_random_move_last_moveX = 0;
                    this.auto_random_move_last_moveY = 0;
                }
            }
            else {
                let dir = Math.random() * 100;

                if(0 <= dir && dir < 25) {
                    if(this.setTargetDirection(this.x + 1, this.y    , false) != null)
                        this.auto_random_move_last_moveX = 1;
                }
                else if(25 <= dir && dir < 50) {
                    if(this.moveEntityAt(this.x - 1, this.y    , false) != null)
                        this.auto_random_move_last_moveX = -1;
                }
                else if(50 <= dir && dir < 75) {
                    if(this.moveEntityAt(this.x    , this.y + 1, false) != null)
                        this.auto_random_move_last_moveY = 1;
                }
                else if(75 <= dir && dir < 100) {
                    if(this.moveEntityAt(this.x    , this.y - 1, false) != null)
                        this.auto_random_move_last_moveY = -1;
                }
            }
        }
    }

    keyDown(event) {
        if(!game.isRunning)
            return;
    }

    onMoveAction(entity, dirX, dirY) {
        if(entity instanceof Player || this instanceof Player)
            this.onPlayerMoveAction(dirX, dirY);
    }

    onPlayerMoveAction(dirX, dirY) {}



    instanciateTextures() {
        for (let index in this.ANIMATIONS)
            if(this.ANIMATIONS[index] != null)
                this.httpGet(this.ANIMATIONS[index].split("url('")[1].split("')")[0]);
    }



    setTargetDirection(x, y) {
        if(!this.isMoving)
            return this.moveEntityAt(x, y, false);

        return null;
    }

    moveEntityAt(x, y, parseError = true, instant = false) {
        if(this.x - x < 0)
            this.setAnim("RIGHT_IDLE");
        else if(this.x - x > 0)
            this.setAnim("LEFT_IDLE");

        if(this.y - y > 0)
            this.setAnim("UP_IDLE");
        else if(this.y - y < 0)
            this.setAnim("DOWN_IDLE");


        let level = this.game.currentLevel;

        this.setZIndex(3 + y);

        if(x < 0 || x > level.width - 1) {
            if(parseError)
                new GameError(this.game.strings.errors.MOVE_ENTITY_OUTSIDE_WORLD["X"]["0"] + x + this.game.strings.errors.MOVE_ENTITY_OUTSIDE_WORLD["X"]["1"] + level.width);

            return null;
        }
        else if(y < 0 || y > level.height - 1) {
            if(parseError)
                new GameError(this.game.strings.errors.MOVE_ENTITY_OUTSIDE_WORLD["Y"]["0"] + y + this.game.strings.errors.MOVE_ENTITY_OUTSIDE_WORLD["Y"]["1"] + level.height + ".");

            return null;
        }
        else if(!instant && level.getEntityAt(x, y) != null) {
            level.getEntityAt(x, y).onMoveAction(this, Math.sign(this.x - x), Math.sign(this.y - y));
            return null;
        }
        else {
            if(instant || this.game.getTileAt(x, y).onMoveAction(this, Math.sign(this.x - x), Math.sign(this.y - y))) {
                this.moveTo(x, y, level, instant);
                return true;
            }
        }
    }

    moveTo(x, y, level, instant = false) {
        this.isMoving = true;

        let entity = this.entity;
        let finalLeft = Math.round((window.innerWidth / 2 - (level.levelArray.length * level.TILE_SIZE) / 2) + x * level.TILE_SIZE);
        let finalTop  = Math.round((window.innerHeight / 2 - (level.levelArray[0].length * level.TILE_SIZE) / 2) + y * level.TILE_SIZE);
        let initLeft = parseInt(entity.style.left);
        let initTop = parseInt(entity.style.top);
        let dirX = Math.sign(finalLeft - initLeft);
        let dirY = Math.sign(finalTop - initTop);

        if(instant) {
            this.x = x;
            this.y = y;
            entity.style.left = finalLeft;
            entity.style.top = finalTop;

            this.isMoving = false;

            return;
        }




        if(this.x - x < 0)
            this.setAnim("RIGHT_WALK");
        else if(this.x - x > 0)
            this.setAnim("LEFT_WALK");

        if(this.y - y > 0)
            this.setAnim("UP_WALK");
        else if(this.y - y < 0)
            this.setAnim("DOWN_WALK");



        let thisX = this.x;
        let thisY = this.y;

        this.x = x;
        this.y = y;

        let posX = 0;
        let posY = 0;

        let finishX = false;
        let finishY = false;
        this.movingFrameID = setInterval(frame, 5, this);

        function frame(ent) {
            if(posX === Math.abs(finalLeft - initLeft)) {
                finishX = true;
            }
            else {
                posX++;
                entity.style.left = (initLeft + posX * dirX) + 'px';
            }



            if(posY === Math.abs(finalTop - initTop)) {
                finishY = true;
            }
            else {
                posY++;
                entity.style.top = (initTop + posY * dirY) + 'px';
            }


            if (finishX && finishY) {
                ent.isMoving = false;

                if(thisX - x < 0)
                    ent.setAnim("RIGHT_IDLE");
                else if(thisX - x > 0)
                    ent.setAnim("LEFT_IDLE");

                if(thisY - y > 0)
                    ent.setAnim("UP_IDLE");
                else if(thisY - y < 0)
                    ent.setAnim("DOWN_IDLE");

                clearInterval(ent.movingFrameID);
            }
        }
    }



    setZIndex(zIndex) {
        this.entity.style.zIndex = zIndex;
        this.zIndex = zIndex;
    }

    setAnim(anim, overrideAnim = true) {
        this.entity.style.backgroundImage = this.ANIMATIONS[anim];

        if(anim === "RIGHT_IDLE" && this.ANIMATIONS[anim] == null) {
            this.entity.className = "rotateZAxis";
            this.setAnim("LEFT_IDLE", false);
        }
        else if(anim === "RIGHT_WALK" && this.ANIMATIONS[anim] == null) {
            this.entity.className = "rotateZAxis";
            this.setAnim("LEFT_WALK", false);
        }
        else if(overrideAnim)
            this.entity.className = "";
    }



    httpGet(theUrl) {
        let xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }
}
