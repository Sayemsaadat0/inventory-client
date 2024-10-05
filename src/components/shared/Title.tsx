import { FC } from 'react'

type TitleProps = {
  title: string
}

const Title: FC<TitleProps> = ({ title }) => {
  return (
    <div className='text-xl w-fit p-2 text-black bg-white'>
      {title}
    </div>
  )
}

export default Title;