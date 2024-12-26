import Header from './Header'
import AllAgents from '../agent/AllAgents'
import {Fragment} from 'react';
import { HeaderWithAgentProps } from '~/types/common';



const HeaderWithAgent:React.FC<HeaderWithAgentProps> = ({ title, buttons,setAgentId,agents }) => {
    return (
        <Fragment>
            <Header title={title} buttons={buttons} />
            <AllAgents setAgentId={setAgentId} agents={agents} />
        </Fragment>
    )
}

export default HeaderWithAgent