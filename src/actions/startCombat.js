import type { CustomAction } from "./action"
import type { ConsumerArgs } from "./listener"
import type { NPC } from "../creatures/npc"

import { MetaAction, startCombat, startTurn } from "./action"
import { StartTurn } from "./turnActions"

export { startCombat }
export const StartCombat: CustomAction<> = MetaAction(startCombat, function({ game, resolver }: ConsumerArgs<>): void { 
    
    game.drawPile.add(...game.deck.clone())
    game.drawPile.shuffle()
    resolver.enqueueActions(new StartTurn({}, game.player, {}, startCombat))

})