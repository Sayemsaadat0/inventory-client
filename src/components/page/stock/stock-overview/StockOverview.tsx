import { inventoryFakeData } from "../../../../data/dummy.data";
import DeleteAction from "../../../shared/DeleteAction";
import SharedTable from "../../../shared/table/SharedTable";
import AddToStockForm from "./AddToStockForm";


const StockOverview = () => {


    const columns = [
        {
            title: "Name",
            dataKey: "product_name",
            row: (data: any) => <div>{data.product_name}</div>,
        },
        {
            title: "Quantity",
            dataKey: "quantity",
            row: (data: any) => (
                <div>
                    <p>{data?.quantity}</p>
                </div>
            ),
        },
        {
            title: "Unit",
            dataKey: "Unit",
            row: (data: any) => (
                <div>
                    <p><span className="opacity-70 italic"> </span>{data.unit}</p>

                </div>
            ),
        },

        {
            title: "Action",
            dataKey: "action",
            row: (data: any) => <div className="flex justify-end">
                <TableAction data={data} />
            </div>,
        },
    ];

    const TableAction = ({ data }: { data: any }) => {
        return <div className="flex gap-2 ">
            <AddToStockForm instance={data} handleFormSubmit={() => undefined} isLoading={false} />
                <DeleteAction handleDeleteSubmit={()=>undefined} isLoading={false}/>
        </div>
    }


    
    return (
        <div className="space-y-5">
            <div className="flex justify-end">
                {/* <Title title="Sotck Overview" /> */}
                <AddToStockForm handleFormSubmit={() => undefined} isLoading={false} />
            </div>
            <div>
                <SharedTable
                    columns={columns}
                    isLoading={false}
                    data={inventoryFakeData || []}
                />
            </div>
        </div>
    );
};

export default StockOverview;
