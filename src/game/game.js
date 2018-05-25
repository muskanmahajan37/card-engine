import { Col, Row, Block } from "../utility"
import { Switch, Route } from "react-router-dom"

import { Battle } from "./battle/battle"
import { Rewards } from "../paths/rewards"
import { PathSelection } from "../paths/pathSelection"
import { CardDraft } from "./cardDraft"
import { withState } from "../state"
import { CardRemove } from "./cardRemove"

export const Game = withState(({ match, state }) => <Col shim>
    <Row backgroundColor='#474441'>
        <p><b>SL4M The Adventurer</b> level: { state.path.level }</p>
        <div style={{ flex: 1 }}/>
        <p>{ state.battle.deck.length } cards</p>
        <p>Settings and Crap</p>
    </Row>
    <Row>
        { [...state.battle.pragmas].map(pragma => <Block style={{ width: '40px', height: '40px', borderRadius: '20px' }}>
            1
        </Block>) }
    </Row>    
    {/* <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(#48484f, #31313c)' }}> */}
    <Switch>
        <Route path={`${match.path}/pathSelection`} component={ PathSelection }/>
        <Route path={`${match.path}/battle`} component={ Battle }/>
        <Route path={`${match.path}/rewards`} component={ Rewards }/> 
        <Route path={`${match.path}/cardDraft`} component={ CardDraft }/>
        <Route path={`${match.path}/rewards`} component={ Rewards }/>
        <Route path={`${match.path}/cardRemove`} component={ CardRemove }/>
    </Switch>
    {/* </div> */}
    
</Col>)

