class TestCity extends Level {
    constructor(game, tilesArray) {
        super(game);

        this.setupTiles(this.getTiles(tilesArray));
    }

    getTiles(tilesArray) {
        let tilesList = new Array(13); // width

        for (var i = 0; i < tilesList.length; i++) {
            tilesList[i] = new Array(12); // height

            for (var j = 0; j < tilesList[i].length; j++) {
                if(j > tilesList[i].length / 2 && j < tilesList[i].length / 2)
                    tilesList[i][j] = tilesArray.test; // null par défaut
                else
                    tilesList[i][j] = tilesArray.null; // TODO Provisoire
            }
        }

        return tilesList;
    }
}
