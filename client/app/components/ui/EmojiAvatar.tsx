import { RiChatAiLine, RiVoiceAiLine } from "react-icons/ri"

import { LiaPhoneSolid } from "react-icons/lia";

const EmojiAvatar = ({pathname}:{pathname : string}) => {
  return (
    <div className='border-2 p-3  rounded-full'>
            {pathname === "/" ? <RiVoiceAiLine size={20}/> 
                             : pathname === "/chatagent" ? <RiChatAiLine size={20}/>
                             :<LiaPhoneSolid size={20}/>
                             }
          </div>
  )
}

export default EmojiAvatar