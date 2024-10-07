import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { motion } from "framer-motion";
import './TopNavbar.css';

const TopNavbar = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };
    const handleForward = () => {
        navigate(1);
    };

    const location = useLocation();

    return (
        <div className="py-3 px-4 flex items-center justify-between text-white">
            <div className="text-white flex items-center justify-center gap-5">
                <div className="space-x-2">
                    <button onClick={handleBack} className="border p-2 rounded-full text-white hover:bg-[#FFF7D1]/80 hover:text-black">
                        <IoChevronBack />
                    </button>
                    <button onClick={handleForward} className="border p-2 rounded-full text-white hover:bg-[#FFF7D1]/80 hover:text-black rotate-180">
                        <IoChevronBack />
                    </button>
                </div>

                <div className="text-2xl">

                    <motion.div
                        key={location?.pathname}
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeInOut", }}
                    // viewport={{ once: false }}  // Ensures the
                    >
                        {location?.pathname === '/' && 'Home'}
                        {location?.pathname === '/entity/companies' && 'Companies'}
                        {location?.pathname === '/entity/users' && 'Users'}
                        {location?.pathname === '/entity/customers' && 'Customers'}
                        {location?.pathname === '/entity/products' && 'Items List'}
                        {location?.pathname === '/entity/payment-type' && 'Payment Type'}
                        {location?.pathname === '/entity/ledgers' && 'Accounts Head'}
                        {location?.pathname === '/stock-overview/unit-warehouse' && 'Units & Warehouses'}
                        {location?.pathname === '/stock-overview' && 'Stock Overview'}
                        {location?.pathname === '/order/generate-order' && 'Generate Order'}
                        {location?.pathname === '/order/chalan' && 'Chalan'}
                        {location?.pathname === '/order/chalan-settlemenet' && 'Chalan Settlement'}
                        {location?.pathname === '/setting' && 'Settings'}
                    </motion.div>
                </div>
            </div>
            <div>
                <img className="h-12" src={'/LAMS_Logo.png'} alt="Logo" />
            </div>
        </div>
    );
};

export default TopNavbar;
