import { ReactNode } from "react";
import { Agent } from "./agents";

interface ButtonProps {
    icon: ReactNode;
    action: () => void 
}

interface HeaderWithAgentProps {
    title: string;
    buttons: ButtonProps[];
    setAgentId: (id: string) => void; 
    agents:Agent[] | undefined;
  }


interface HeaderProps {
    title:string,
    buttons:ButtonProps[]
}


interface AllAgentsProps {
    setAgentId: (id: string) => void;
    agents:Agent[] | undefined
  }


  interface Flag {
    firstMessage:string,
    systemPrompt:string,
    temperature:number
}

interface InputFieldProps {
  title : string,
  desc : string,
  row : number,
  value:string,
  setValue:(firstMessage: string) => void; 
}

interface NumberInputProps {
  title : string,
  desc : string,
  row : number,
  value: number | null,
  setValue:(contactNumber: number | null) => void; 
}


interface OpenModalButtonProps{
  title:string,
  desc:string,
  button:any,
  setOpen :(isOpenKnowledgeBase: boolean) => void; 
}

interface OptionSelectorProps {
  title :string, 
  desc:string,
  options?:{ value: string, label: string }[],
  defaultValue:string
}

interface FileInputProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
}

interface TextInputProps {
  name: string;
  setName: (url: string) => void;
  content: string
  setContent: (url: string) => void;
}

interface KnowledgeBaseDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  agentId:string
}

interface TestChatProps {
  agentId: string;
}