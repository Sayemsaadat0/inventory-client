import { useParams } from "react-router-dom";
import useDynamicData from "../../../hooks/useDynamicData";

const StockOverviewDetails = () => {
    const { id } = useParams();

    const { data } = useDynamicData({
        queryKey: "api_stocks",
        url: `/stocks/${id}`,
        callback: (responseData) => {
            console.log(responseData);
        },
    });
    console.log(data)

    return (
        <div className="space-y-5 bg-black/40 backdrop-blur-sm  p-3">StockOverviewDetails</div>
    )
}

export default StockOverviewDetails