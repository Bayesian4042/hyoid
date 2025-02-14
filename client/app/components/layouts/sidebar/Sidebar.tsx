import { Button, Flex, Space } from "antd";
import { FaChevronDown } from "react-icons/fa6";
import { BiChat } from "react-icons/bi";
import React, { ReactElement, ReactNode } from "react";
import { Link, useLocation } from "@remix-run/react";
import { RiChatAiLine, RiVoiceAiLine } from "react-icons/ri";
import { LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";
import toggleStore from "~/lib/zustand/toggleStore";
import { LiaPhoneSolid } from "react-icons/lia";

export default function Sidebar() {
  const { showSidebar, toggleShowSidebar } = toggleStore();

  return (
    <div className="px-3 py-3 border-r-2 h-screen flex flex-col justify-between">
      <Flex vertical justify="center">
        <Space direction="vertical" size={30} className={`w-full ${showSidebar ? "border-b-2 pb-4" :""}`}>
          <div className="flex items-center justify-between">
            {showSidebar && (
              <div className="flex items-center gap-2.5">
                <RiVoiceAiLine size={25} />
                <h1 className="text-base font-bold">HYOID</h1>
              </div>
            )}
            <button
              aria-label={showSidebar ? "Collapse Sidebar" : "Expand Sidebar"}
              onClick={toggleShowSidebar}
              className="cursor-pointer"
            >
              {showSidebar ? (
                <LuPanelRightOpen size={20} />
              ) : (
                <LuPanelLeftOpen size={20}  className="ml-2"/>
              )}
            </button>
          </div>
          <UserCard showSidebar={showSidebar} />
        </Space>
        <div className="mt-7">
          <NavTitle title="CREATE" showSidebar={showSidebar} />
          <Space size={2} direction="vertical" className="w-full">
            <Link to="/">
              <NavButton
                icon={<RiVoiceAiLine size={20} />}
                title="Voice Agent"
                selected="/"
                showSidebar={showSidebar}
              />
            </Link>
            <Link to="/chatagent">
              <NavButton
                icon={<RiChatAiLine size={20} />}
                title="Chat Agent"
                selected="/chatagent"
                showSidebar={showSidebar}
              />
            </Link>
            <Link to="/phonenumber">
              <NavButton
                icon={<LiaPhoneSolid size={20} />}
                title="Phone Numbers"
                selected="/phonenumber"
                showSidebar={showSidebar}
              />
            </Link>
          </Space>
        </div>
        <div className="mt-5">
          <NavTitle title="HISTORY" showSidebar={showSidebar} />
          <Space size={1} direction="vertical" className="w-full">
            <Link to="/conversations">
              <NavButton
                icon={<BiChat size={20} />}
                title="Conversations"
                selected="/conversations"
                showSidebar={showSidebar}
              />
            </Link>
          </Space>
        </div>
      </Flex>
    </div>
  );
}

const NavTitle = ({ title, showSidebar }: { title: string; showSidebar: boolean }) => {
  return showSidebar ? (
    <h6 className="text-xs font-semibold text-gray-500 my-2">{title}</h6>
  ) : null;
};

const NavButton = ({
  icon,
  title,
  selected,
  showSidebar,
}: {
  icon: ReactNode;
  title: string;
  selected: string;
  showSidebar: boolean;
}) => {
  const { pathname } = useLocation();
  const active = pathname === selected;

  return (
    <Button
    icon={React.cloneElement(icon as ReactElement, { style: { marginLeft: showSidebar ? "0px" : "4px" } })}
    type="text"
      className={`py-4 w-full flex items-center justify-start gap-2.5 ${showSidebar ? "" : "ml-1"} ${
        active ? "bg-gray-100" : ""
      }`}
    >
      {showSidebar && <span className="font-semibold mb-1">{title}</span>}
    </Button>
  );
};

const UserCard = ({ showSidebar }: { showSidebar: boolean }) => {
  return (
    <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 rounded-xl mt-0.5 py-2">
      <div className="flex gap-2 items-center">
        <div className="rounded-full border-2 w-10 h-10 p-1">
          <div className="rounded-full bg-yellow-200 w-full h-full text-center font-semibold text-cyan-700 pt-0.5">
            V
          </div>
        </div>
        {showSidebar && (
          <div>
            <h1 className="text-sm">Username</h1>
            <h6 className="text-xs">My Workspace</h6>
          </div>
        )}
      </div>
      {showSidebar && <FaChevronDown />}
    </div>
  );
};
