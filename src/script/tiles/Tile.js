class Tile {
    constructor(game, resourceName, zIndex = undefined) {
        this.sprite = "/img/sprite/" + resourceName + ".png";
        this.solid = false;

        if(zIndex === undefined || (zIndex != 0 && zIndex != 1 && zIndex != 200)) {
            new GameError(game.strings.errors.ZINDEX_TILE_ERROR["0"] + resourceName + game.strings.errors.ZINDEX_TILE_ERROR["1"] + zIndex);
            this.zIndex = 0;
        }
        else {
            this.zIndex = zIndex;
        }
    }

    onMoveAction(entity, dirX, dirY) { // (entity /// true : entité autorisée à y bouger / false : entité non-autorisée
        if(entity instanceof Player) {
            let response = this.onMoveActionByPlayer(dirX, dirY);

            if(response != null)
                return response;
        }

        if(this.solid)
            return false;

        return true;
    }

    onMoveActionByPlayer(dirX, dirY) { // true : joueur autorisé à bouger / false : joueur non-autorisé / null : 'pas d'avis'
        return null;
    }

    setSolid() {
        this.solid = true;
    }

    isSolid() {
        return this.solid;
    }
}
