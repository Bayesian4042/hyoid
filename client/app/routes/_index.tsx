import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import { IoMdAdd } from "react-icons/io";
import { Flex } from "antd";
import SelectAgent from "~/components/SelectAgent";
import HeaderWithAgent from "~/components/HeaderWithAgent";

export const meta: MetaFunction = () => {
  return [
    { title: "Voice-Workflow" },
    { name: "description", content: "Welcome to Voice-Workflow" },
  ];
};

export default function Index() {
  return (
    <Flex >
      <div className="flex-[0.35]">
        <HeaderWithAgent title='Voice Agent' buttons={["add", 'playground']} />
      </div>
      <div className="flex-[0.65]">
        <SelectAgent />
      </div>

    </Flex>
  );
}
