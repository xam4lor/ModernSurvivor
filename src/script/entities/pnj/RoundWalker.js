class RoundWalker extends Entity {
    constructor(game, entityName) {
        super(
            game,
            entityName,
            {
                "DOWN_IDLE" : "url('/img/sprite/walker/down.gif')",
                "UP_IDLE" : "url('/img/sprite/walker/up.gif')",
                "LEFT_IDLE" : "url('/img/sprite/walker/left.gif')",
                "RIGHT_IDLE" : null,

                "DOWN_WALK" : "url('/img/sprite/walker/down_walk.gif')",
                "UP_WALK" : "url('/img/sprite/walker/up_walk.gif')",
                "LEFT_WALK" : "url('/img/sprite/walker/left_walk.gif')",
                "RIGHT_WALK" : null
            },
            "DOWN_IDLE",
            false,
            true
        );
    }

    onPlayerMoveAction(dirX, dirY) {
        this.setTargetDirection(this.x + 1 * dirX, this.y + 1 * dirY);
        this.game.displayTexts(["Ceci est un test"]);
    }
}
