import { Flex } from "antd";
import HeaderWithAgent from "~/components/HeaderWithAgent";
import SelectAgent from "~/components/SelectAgent";


export default function ChatAgent() {
  return (
    <Flex>
      <div className="flex-[0.35]">
        <HeaderWithAgent title='Chat Agents' buttons={["Playground", "+"]} />
      </div>
      <div className="flex-[0.65]">
        <SelectAgent />
      </div>

    </Flex>
  );
}
