import { withState } from "../state";
import { Row } from "../utility";
import { Card } from "../cards/component";

export const CardPanel = withState(({ state, cards }) => <Row style={{ 
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    overflowY: 'scroll',
    borderTop: 'solid #eeeeee 4px',
    borderBottom: 'solid #eeeeee 4px',
    margin: '25px',
    padding: '15px',
    maxHeight: '100%',
    maxWidth: '100%',
}}>
    {cards.map(card => 
        <div style={{ flex: '0 0 18%', padding: '15px' }}>
            <Card card={ card } glow={ true }/>
        </div>
    )}
    <div style={{ flex: '0 0 95%', height: '32vh' }}/>
</Row>)