class LevelContainer {
    constructor(game) {
        this.tiles = new Tiles(game);
        this.levels = {
            "HEROS_HOUSE_FLOOR_0" : new HerosHouseFloor0(game, this.tiles),
            "TEST_CITY" : new TestCity(game, this.tiles)
        };
    }

    instanciateLevels() {
        for (var i = 0; i < this.levels.length; i++) {
            this.levels[i].instanciate();
        }
    }

    getLevelByName(levelName) {
        return this.levels[levelName];
    }
}
