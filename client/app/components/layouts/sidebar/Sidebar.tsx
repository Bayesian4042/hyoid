import { Button, Flex,  Space } from "antd";
import { FaChevronDown } from "react-icons/fa6";
import { BiChat } from "react-icons/bi";
import { ReactNode } from "react";
import { Link } from "@remix-run/react";
import { useLocation } from "@remix-run/react";
import { RiChatAiLine, RiVoiceAiLine } from 'react-icons/ri'




export default function Sidebar() {
    return (
        <div className="px-3 py-3 border-r-2 h-screen flex flex-col justify-between">
            <div>
                <Space direction="vertical" size={30} className="w-full border-b-2 pb-4">
                        <Flex align="center" gap={5}>
                        <RiVoiceAiLine size={25}/>
                    <h1 className="text-xs font-semibold">VOICE-WORKLOW</h1>
                        </Flex>
                <UserCard />
                </Space>
                <div className="mt-7">
                    <NavTitle title="CREATE" />
                    <Space size={2} direction="vertical" className="w-full">
                        <Link to="/">
                            <NavButton icon={<RiVoiceAiLine size={20} />} title="Voice Agent" selected="/" />
                        </Link>
                        <Link to="/chatagent">
                            <NavButton icon={<RiChatAiLine size={20} />} title="Chat Agent" selected="/chatagent" />
                        </Link>
                    </Space>
                </div>
                <div className="mt-5">
                    <NavTitle title="HISTORY" />
                    <Space size={1} direction="vertical" className="w-full">
                        <Link to='/conversations'>
                            <NavButton icon={<BiChat size={20} />} title="Conversations" selected="/conversations" />
                        </Link>
                    </Space>
                </div>
            </div>
        </div>
    )
}

const NavTitle = ({ title }: { title: string }) => {
    return (
        <h6 className="text-xs font-semibold text-gray-500 my-2">{title}</h6>
    )
}


const NavButton = ({ icon, title,selected }: { icon: ReactNode, title: string,selected:string }) => {

    const {pathname} = useLocation()

    const active = pathname === selected ? true : false


    return (
        <Button icon={icon} type="text" className={`py-4 w-full flex items-center justify-start gap-2.5 ${active ? "bg-gray-100":""}`}>
            <span className="font-semibold mb-1">{title}</span>
        </Button>
    )
}

const UserCard = () => {
    return (
        <Flex justify="space-between" align="center" className="px-4 cursor-pointer hover:bg-gray-50 rounded-xl mt-0.5 py-2">
            <Flex gap='small'>
                <div className="rounded-full border-2 w-10 h-10 p-1">
                    <div className="rounded-full bg-yellow-200 w-full h-full text-center font-semibold text-cyan-700 pt-0.5">V</div>
                </div>
                <div>
                    <h1 className="text-sm">Username</h1>
                    <h6 className="text-xs">My Workspace</h6>
                </div>
            </Flex>
            <FaChevronDown />
        </Flex>
    )

}