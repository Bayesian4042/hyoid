import Header from './Header'
import AllAgents from '../agent/AllAgents'

interface HeaderWithAgentProps {
    title: string;
    buttons: { title: string; action: () => void }[];
    setAgentId: (id: string) => void; 
  }

const HeaderWithAgent = ({ title, buttons,setAgentId }: HeaderWithAgentProps) => {
    return (
        <>
            <Header title={title} buttons={buttons} />
            <AllAgents setAgentId={setAgentId} />
        </>
    )
}

export default HeaderWithAgent