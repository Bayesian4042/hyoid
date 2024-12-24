import React from 'react'
import OptionSelector from '~/components/ui/OptionSelector'

const VoiceOptions = () => {
  return (
    <div className='px-1'>
      <div className='mt-5'>
        <OptionSelector title="Language" desc="Choose the language the agent will communicate in. " options={[
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' }
        ]} defaultValue='lucy'/>
      </div>
    </div>
  )
}

export default VoiceOptions