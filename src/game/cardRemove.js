import type { Component } from "../component"
import type { Card } from '../cards/card'
import type { State } from '../state'
import { Modal, Row, Col, Block, Frame, Button } from '../utility'
import { Route } from 'react-router-dom'
import { resolver } from '../actions/actionResolver'
import { Card as CardComponent } from '../cards/component'
import { queryEntity } from '../components/entityState'
import { navigateTo } from '../utils/navigation'
import { CardLibrary } from '../cards/cardLibrary'
import { dispatch, withState } from '../state'
import { RemoveCard } from '../actions/removeCard';
import { collectReward, deactivateReward } from '../paths/pathState';

type Props = { state: State }

export const CardRemove: Component<any> = withState(({ state }: Props) => {

    let reward = state.path.rewards.filter(reward => reward.active)[0]

    return <Modal>
        <h1>Remove Card</h1>
        <div class='row' style={{ 
            flexWrap: 'wrap', 
            width: '72vw', 
            height: '64vh', 
            justifyContent: 'space-evenly',
            overflowY: 'scroll',
            borderTop: 'solid white 2px',
            borderBottom: 'solid white 2px',
            margin: '11px',
        }}>{
            [...state.battle.deck].map(card => 
                <div style={{ flex: '0 0 18%', display: 'border-block' }}>
                    <Button onClick={ click => {
                        collectReward(dispatch, reward)
                        deactivateReward(dispatch, reward)
                        resolver.processAction(new RemoveCard({}, card, {}))
                        navigateTo('/game/rewards')
                    }}>
                        <CardComponent card={ card }/>
                    </Button>
                </div>
            )
        }
            <div style={{ flex: '0 0 95%', height: '32vh' }}></div>
        </div>
        <Button onClick={() => {
            navigateTo(`/game/rewards`)
        }}>Skip</Button>
    </Modal>

})