class Player extends Entity {
    constructor(game) {
        super(
            game,
            'player',
            {
                "DOWN_IDLE" : "url('/img/sprite/player/down.gif')",
                "UP_IDLE" : "url('/img/sprite/player/up.gif')",
                "LEFT_IDLE" : "url('/img/sprite/player/left.gif')",
                "RIGHT_IDLE" : null,

                "DOWN_WALK" : "url('/img/sprite/player/down_walk.gif')",
                "UP_WALK" : "url('/img/sprite/player/up_walk.gif')",
                "LEFT_WALK" : "url('/img/sprite/player/left_walk.gif')",
                "RIGHT_WALK" : null
            },
            "DOWN_IDLE",
            true
        );
    }



    keyDown(event) {
        if(!game.isRunning)
            return;

        let pl = game.currentLevel.getEntity('player');

        switch(event.keyCode) {
            case 37:
                pl.setTargetDirection(pl.x - 1, pl.y    );
                break;

            case 38:
                pl.setTargetDirection(pl.x    , pl.y - 1);
                break;

            case 39:
                pl.setTargetDirection(pl.x + 1, pl.y    );
                break;

            case 40:
                pl.setTargetDirection(pl.x    , pl.y + 1);
                break;
        }
    }
}
