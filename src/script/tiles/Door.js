class Door extends Tile {
    constructor(game) {
        super(game, "door", 200);

        this.setSolid();
    }

    onMoveActionByPlayer(dirX, dirY) {
        game.setCurrentLevel("TEST_CITY");
    }
}
