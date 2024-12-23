import { LuBot } from "react-icons/lu"

const AgentLogo = ({size}:{size:number}) => {
  return (
    <div className="border-[1px] rounded-lg p-2">
    <LuBot size={size}/>
</div>
  )
}

export default AgentLogo