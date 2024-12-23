import type { MetaFunction } from "@remix-run/node";
import { Flex } from "antd";
import SelectAgent from "~/components/SelectAgent";
import HeaderWithAgent from "~/components/HeaderWithAgent";
import { useState } from "react";
import AddAgentDrawer from "~/components/AddAgentDrawer";

export const meta: MetaFunction = () => {
  return [
    { title: "Voice-Workflow" },
    { name: "description", content: "Welcome to Voice-Workflow" },
  ];
};

export default function Index() {
  const[open,setOpen] = useState<boolean>(false)
  return (
    <Flex >
      <div className="flex-[0.35]">
        <HeaderWithAgent title='Voice Agent' buttons={["add", 'playground']} />
      </div>
      <div className="flex-[0.65]">
        <SelectAgent setOpen={setOpen}/>
      </div>
      <AddAgentDrawer setOpen={setOpen} open={open} title="Voice"/>
    </Flex>
  );
}
