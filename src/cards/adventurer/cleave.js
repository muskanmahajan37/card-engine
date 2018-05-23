import { defineCard, Card, PlayArgs } from './../card'
import { Damage, targeted } from './../../events/damage'
import { blockable } from '../../events/damage'
import { Creature } from '../../creatures/creature'
import { queryEnemy } from './../utils'

type CleaveData = { damage: number, energy: number }

export const Cleave: () => Card<CleaveData> = defineCard('Cleave', playCleave, {
    energy: 1,
    damage: 7,
}, {
    energyTemplate: '#{energy}',
    color: '#ee5511',
    titleTemplate: 'Cleave',
    textTemplate: 'Deal #{damage} damage to each enemy.',
})

function* playCleave(self: Card<CleaveData>, { resolver, game, actors }: PlayArgs){
    // TODO: get nested simulations up so that aoe can list damages correctly
    for(let promise of [...game.enemies].map(enemy =>
        resolver.processEvent(
            new Damage(
                actors,
                enemy,
                {
                    damage: self.data.damage,
                }, 
                blockable,
            ),
        )
    )){
        yield promise
    }
    return self.data
}