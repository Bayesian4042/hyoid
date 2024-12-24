import { Badge, Button, Flex, Space } from "antd";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineChat } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import { RiUserVoiceLine } from "react-icons/ri";
import { BiChat } from "react-icons/bi";
import { ReactNode } from "react";
import { Link } from "@remix-run/react";
export default function Sidebar() {
    return (
        <div className="px-3 py-3 border-r-[1px] h-screen flex flex-col justify-between">
            <div>
                <h1 className="text-lg font-semibold">VOICE-WORKLOW</h1>
                <div className="mt-5">
                    <NavTitle title="CREATE" />
                    <Space size={1} direction="vertical" className="w-full">
                        <Link to="/">
                            <NavButton icon={<RiUserVoiceLine size={20} />} title="Voice Agent" />
                        </Link>
                        <Link to="/chatagent">
                            <NavButton icon={<MdOutlineChat size={20} />} title="Chat Agent" />
                        </Link>
                    </Space>
                </div>
                <div className="mt-5">
                    <NavTitle title="History" />
                    <Space size={1} direction="vertical" className="w-full">
                        <Link to='/conversations'>
                            <NavButton icon={<BiChat size={20} />} title="Conversations" />
                        </Link>
                    </Space>
                </div>
            </div>
            <div>
                <div className="flex justify-center mb-8">
                    <FaChevronDown size={10} />
                </div>

                <NavButton icon={
                    <Badge dot>
                        <IoNotificationsOutline size={20} />
                    </Badge>
                } title="Notifications" />
                <UserCard />
            </div>
        </div>
    )
}

const NavTitle = ({ title }: { title: string }) => {
    return (
        <h6 className="text-xs font-semibold text-gray-500 my-2">{title}</h6>
    )
}


const NavButton = ({ icon, title }: { icon: ReactNode, title: string }) => {

    return (
        <Button icon={icon} type="text" className="w-full flex items-center justify-start gap-2.5">
            <span className="text-base">{title}</span>
        </Button>
    )
}

const UserCard = () => {
    return (
        <Flex justify="space-between" align="center" className="px-4 cursor-pointer hover:bg-gray-100 rounded-md mt-0.5 py-2">
            <Flex gap='small'>
                <div className="rounded-full border-2 w-10 h-10 p-1 bg-red-200">
                    <div className="rounded-full bg-yellow-200 w-full h-full"></div>
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