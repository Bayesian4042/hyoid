import Header from './Header'
import AllAgents from './AllAgents'

const HeaderWithAgent = ({ title, buttons }: any) => {
    return (
        <>
            <Header title={title} buttons={buttons} />
            <AllAgents />
        </>
    )
}

export default HeaderWithAgent