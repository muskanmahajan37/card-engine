import type { Event } from "./event"
import type { ConsumerArgs } from "./listener"
import type { Monster } from "../creatures/monster"
import { defineEvent } from "./event"
import { EndTurn } from "./turnActions"
import { Sequence } from "../utils/random";
import { Player } from "../creatures/player";

interface Type {
    data: {
        enemies: Monster[],
        seed: Sequence<number>,
    },
    subject: Player,
}

export const setupCombat: Symbol = Symbol('setupCombat')
export const SetupCombat = defineEvent(setupCombat, function*({ game, resolver, data }: ConsumerArgs<Type>){ 
    

    game.drawPile.clear()
    game.hand.clear()
    game.discardPile.clear()
    game.exhaustPile.clear()
    game.activeCards.clear()
    game.player.effects.clear()
    game.player.seed = data.seed
    game.enemies = data.enemies
    game.player.seed = data.seed.fork()


})