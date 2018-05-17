import type { Event } from '../events/event'
import type { Creature } from '../creatures/creature'
import { defineEvent } from './event'
import { ConsumerArgs } from './listener'
import { RemoveCreature } from './removeCreature';

type Type = { 
    data: { 
        damage: number,
    },
    subject: Creature<>,
}

export const blockable = Symbol('blockable')
export const targeted: Symbol = Symbol('targeted')


export const damage: Symbol = Symbol('damage')
export const Damage = defineEvent(damage, function*({ resolver, actors, data, subject, cancel }: ConsumerArgs<Type>): * { 
    data.damage = Math.floor(data.damage)
    if(data.damage <= 0){
        cancel()
        return
    } else if(data.damage >= subject.health){
        data.damage = subject.health
        subject.health = 0
        yield new Promise(resolve => setTimeout(resolve, 100))
        yield resolver.processEvent(new RemoveCreature(actors, subject, {}))
    } else {
        subject.health -= data.damage
        yield new Promise(resolve => setTimeout(resolve, 100))
    }
})




