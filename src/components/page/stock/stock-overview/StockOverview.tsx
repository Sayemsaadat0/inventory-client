import { inventoryFakeData } from "../../../../data/dummy.data";
import SharedTable from "../../../shared/table/SharedTable";
import Title from "../../../shared/Title";
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
            title: "Warehouse",
            dataKey: "warehouse",
            row: (data: any) => (
                <div>
                    <p><span className="opacity-70 italic">Unit : </span>{data.unit}</p>
                    <p><span className="opacity-70 italic">Warehouse : </span> {data.warehouse}</p>
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
        return <div>
            <AddToStockForm instance={data} handleFormSubmit={() => undefined} isLoading={false} />
        </div>
    }

    return (
        <div className="space-y-5">
            <div className="flex justify-between">
                <Title title="Sotck Overview" />
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
