import { FaSpinner } from 'react-icons/fa6'
import './Loader.css'

const Loader = () => {
    return (
        <div className="text-lg flex items-center gap-4">
            <FaSpinner />  Loading......
        </div>
    )
}

export default Loader