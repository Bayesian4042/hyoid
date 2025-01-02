import { RiChatAiLine, RiVoiceAiLine } from "react-icons/ri"

const EmojiAvatar = ({pathname}:{pathname : string}) => {
  return (
    <div className='border-2 p-3  rounded-full'>
            {pathname === "/" ? <RiVoiceAiLine size={20}/> 
                             : <RiChatAiLine size={20}/>
                             }
          </div>
  )
}

export default EmojiAvatar