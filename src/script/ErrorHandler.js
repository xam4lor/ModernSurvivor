class GameError extends Error {
    constructor(... args) {
        super(... args);

        console.log(this);
    }
}
