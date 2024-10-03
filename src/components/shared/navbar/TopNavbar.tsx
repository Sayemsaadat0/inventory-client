
const TopNavbar = () => {
    return (
        <div className="py-3 px-4 flex items-center justify-between">
            <div>
                <span className="opacity-80 text-sm">Welcome</span> <span className="font-semibold italic">John Snow !</span>
            </div>
            <div>
                <img className="h-12" src={'/LAMS_Logo.png'} alt="Logo" />
            </div>
        </div>
    )
}

export default TopNavbar