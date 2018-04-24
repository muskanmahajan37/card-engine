import type { ListenerGroup } from "../actions/listener"
import { MetaEffect, Effect } from "./effect"
import { damage, blockable } from "../actions/damage"
import { vulnerability } from "./vulnerability"
import { BindEffect } from "../actions/bindEffect"
import { Listener, ConsumerArgs } from "../actions/listener"

export const block = Symbol('block')
export const Block: Class<Effect> = MetaEffect(block, {
    name: 'Block',
    innerColor: '#6688ee',
    outerColor: '#2233bb',
    description: '',
    sides: 5,
    rotation: 0.5,
}, {
    stacked: true,  
    delta: x => 0,
    min: 1,
    max: 999,
}, (owner, self) => new Listener(
    block,
    {
        subjects: [owner],
        tags: [blockable],
    },
    function({ data, resolver, actors, cancel }: ConsumerArgs<>): void {
        if (resolver.simulating) return
        if(typeof data.damage == 'number'){
            if(data.damage <= self.stacks){
                resolver.processAction(new BindEffect(actors, owner, {
                    Effect: Block,
                    stacks: -data.damage,
                }))
                data.damage = 0
                cancel()
            } else {
                data.damage -= self.stacks
                resolver.processAction(new BindEffect(actors, owner, {
                    Effect: Block,
                    stacks: -self.stacks,
                }))
            }
        } else {
            cancel()
        }
    },  
    false,
), [vulnerability], [damage])