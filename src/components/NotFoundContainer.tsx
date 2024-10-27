import { Link, useNavigate } from 'react-router-dom';
import Button from './ui/button';

const NotFoundContainer = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };


    return (
        <div className='md:max-w-[50%] mx-auto flex items-center flex-col justify-center min-h-[calc(100vh-100px)] overflow-hidden'>
            <div>
                <img loading='lazy' className='  ' src={'/error.gif'} alt="" />
            </div>

            <div className='space-x-5'>
                <Button onClick={handleBack} label='Go Back' />
                <Link to={'/'} >
                    <Button label='Go Home' />
                </Link>

            </div>
        </div>
    )
}

export default NotFoundContainer