import { Col, Row } from "../utility"
import { Switch, Route } from "react-router-dom"
import { Main } from "./main"
import { CreateGame } from "./createGame"

export const Menu = ({ match, state }: *) => <Switch>
    <Route path={`${match.path}/main`} component={ Main }/>
    <Route path={`${match.path}/createGame`} component={ CreateGame }/>
    <Route render={() => { throw new Error('WTF') }}/>
</Switch>


