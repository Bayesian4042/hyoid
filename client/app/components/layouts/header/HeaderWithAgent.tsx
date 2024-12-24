import Header from './Header'
import AllAgents from '../agent/AllAgents'

const HeaderWithAgent = ({ title, buttons }: any) => {
    return (
        <>
            <Header title={title} buttons={buttons} />
            <AllAgents />
        </>
    )
}

export default HeaderWithAgent