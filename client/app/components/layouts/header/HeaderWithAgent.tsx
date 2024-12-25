import Header from './Header'
import AllAgents from '../agent/AllAgents'
import {Fragment} from 'react';

interface HeaderWithAgentProps {
    title: string;
    buttons: { title: string; action: () => void }[];
    setAgentId: (id: string) => void; 
    agents:any
  }

const HeaderWithAgent = ({ title, buttons,setAgentId,agents }: HeaderWithAgentProps) => {
    return (
        <Fragment>
            <Header title={title} buttons={buttons} />
            <AllAgents setAgentId={setAgentId} agents={agents} />
        </Fragment>
    )
}

export default HeaderWithAgent