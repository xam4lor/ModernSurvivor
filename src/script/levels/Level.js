class Level {
    constructor(game) {
        this.game = game;

        this.width = 0;
        this.height = 0;
        this.TILE_SIZE = this.game.TILE_SIZE;
        this.entities = {};
    }


    addEntity(entity, x = 0, y = 0) {
        entity.x = x;
        entity.y = y;
        this.entities[entity.entityName] = entity;
    }

    getEntity(entityName) {
        return this.entities[entityName];
    }

    getEntityAt(x, y) {
        for(let index in this.entities) {
            if(this.entities[index].x === x && this.entities[index].y === y)
                return this.entities[index];
        }

        return null;
    }




    instantiateLevel() {
        this.instanciateEntities();

        for(let index in this.entities) {
            this.entities[index].moveEntityAt(this.entities[index].x, this.entities[index].y, false, true);
        }
    }

    instanciateEntities() {
        this.addEntity(new Player(this.game));
    }



    setupTiles(tiles) {
        this.levelArray = tiles;

        this.width = tiles.length;
        this.height = tiles[0].length;
    }


    updateEntities() {
        for (let index in this.entities) {
            this.entities[index].update();
        }
    }




    getTileAt(x, y, throwError = true) {
        let tile;

        try {
            tile = this.levelArray[x][y];
        }
        catch(e) {
            if(throwError)
                new GameError(this.game.errors.TILE_UNDEFINED_X_Y["0"] + x + this.game.errors.TILE_UNDEFINED_X_Y["1"] + y + this.game.errors.TILE_UNDEFINED_X_Y["2"]);

            return null;
        }

        return tile;
    }




    show() {
        document.getElementById("tiles").innerHTML = "";

        for (var i = 0; i < this.levelArray.length; i++) {
            for (var j = 0; j < this.levelArray[i].length; j++) {
                this.addSprite(this.levelArray[i][j].sprite, this.levelArray[i][j].zIndex, i, j);
            }
        }
    }

    addSprite(sprite, zIndex, i, j) {
        let tile = document.createElement("div");
        tile.style.width = this.TILE_SIZE;
        tile.style.height = this.TILE_SIZE;
        tile.style.left = (window.innerWidth / 2 - (this.levelArray.length * this.TILE_SIZE) / 2) + (i * this.TILE_SIZE);
        tile.style.top = (window.innerHeight / 2 - (this.levelArray[i].length * this.TILE_SIZE) / 2) + (j * this.TILE_SIZE);
        tile.style.zIndex = zIndex;
        tile.style.backgroundImage = "url(" + sprite + ")";
        tile.className += "tile tile_" + i + "_" + j;

        document.getElementById("tiles").appendChild(tile);
    }
}
