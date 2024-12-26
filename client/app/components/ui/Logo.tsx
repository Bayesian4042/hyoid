import { ReactNode } from "react"

const Logo = ({logo}:{logo : ReactNode}) => {
  return (
    <div className="border-[1px] rounded-lg p-2">
    {logo}
</div>
  )
}

export default Logo