import { FC } from 'react'

type TitleProps = {
  title?: string
}

const Title: FC<TitleProps> = ({ title }) => {
  return (
    <div className="text-xl leckerli-one-regular bg-white  p-2 text-black">
      {title}
    </div>
  )
}

export default Title;
