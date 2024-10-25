// import { inventoryFakeData } from "../../../../data/dummy.data";
import { useGetstocksData, usePoststocksData } from "../../../hooks/inventory/stock.hooks";
import DeleteAction from "../../../shared/DeleteAction";
import SharedTable from "../../../shared/table/SharedTable";
import AddToStockForm from "./AddToStockForm";


const StockOverview = () => {


    const columns = [
        {
            title: "Info",
            dataKey: "product_name",
            row: (data: any) => <div className="flex gap-5 items-center">
                <img
                    className="w-12 rounded-[10px] overflow-hidden object-cover shrink-0 inset-0 inline-block aspect-square"
                    src={data?.product_image || ''}
                    alt={data?.product_name}
                />
                <p> {data.product_name}</p>
            </div>,
        },
        {
            title: "Product ID",
            dataKey: "product_id",
            row: (data: any) => (
                <div>
                    {data.product_id}
                </div>
            ),
        },
        {
            title: "Warehouse",
            dataKey: "warehouse_name",
            row: (data: any) => (
                <div>
                    {data.warehouse_name}
                </div>
            ),
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
            dataKey: "unit_name",
            row: (data: any) => (
                <div>
                    {data.unit_name}
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
            <AddToStockForm instance={data} handleFormSubmit={() => undefined} />
            <DeleteAction handleDeleteSubmit={() => undefined} isLoading={false} />
        </div>
    }




    const { mutateAsync } = usePoststocksData()

    const { data: stockData, isLoading: isDataLoading } = useGetstocksData()
    return (
        <div className="space-y-5">
            <div className="flex justify-end">
                <AddToStockForm handleFormSubmit={mutateAsync} />
            </div>
            <div>
                <SharedTable
                    columns={columns}
                    isLoading={isDataLoading}
                    data={stockData || []}
                />
            </div>
        </div>
    );
};

export default StockOverview;
