class HerosHouseFloor0 extends Level {
    constructor(game, tilesArray) {
        super(game);

        this.setupTiles(this.getTiles(tilesArray));
    }

    instanciateEntities() {
        super.instanciateEntities();

        this.addEntity(new RoundWalker(game, "round_walker_test1"), 2, 2);
    }

    getTiles(tilesArray) {
        let tilesList = new Array(13); // width

        for (var i = 0; i < tilesList.length; i++) {
            tilesList[i] = new Array(12); // height

            for (var j = 0; j < tilesList[i].length; j++) {
                if(j > tilesList[i].length / 2 - 4 && j < tilesList[i].length / 2 + 4 && i > tilesList[i].length / 2 - 4 && i < tilesList[i].length / 2 + 4)
                    tilesList[i][j] = tilesArray.null; // null par défaut
                else
                    tilesList[i][j] = tilesArray.test; // TODO Provisoire
            }
        }

        tilesList[12][2] = tilesArray.door;

        return tilesList;
    }
}
