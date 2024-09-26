import Marquee from "react-fast-marquee";

const Dashboard = () => {
    return (
        <div>
            <Marquee>
                {[...new Array(10)].map((_, i) => (
                    <div key={i} className="marquee-item">
                        <img
                            className="h-20 object-cover"
                            src="https://i.pinimg.com/564x/e7/e9/9d/e7e99de3fcbf96d1dfda430102ceb662.jpg"
                            alt=""
                        />
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default Dashboard;
