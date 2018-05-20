class Tiles {
    constructor(game) {
        this.null = new Null(game);
        this.test = new Test(game);
        this.door = new Door(game);
    }
}
