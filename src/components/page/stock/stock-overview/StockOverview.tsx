// import { inventoryFakeData } from "../../../../data/dummy.data";
import { useState } from "react";
import { useDeletestock, useGetstocksData, useIncreaseStock, usePoststocksData } from "../../../hooks/inventory/stock.hooks";
import DeleteAction from "../../../shared/DeleteAction";
import SharedTable from "../../../shared/table/SharedTable";
import AddToStockForm from "./AddToStockForm";
import IncreaseQuantity from "./IncreaseQuantity";
// import SearchSelectInput from "../../../shared/inputs/SearchSelectInput";


const StockOverview = () => {


    const Columns = [
        {
            title: "Info",
            dataKey: "product_name",
            row: (data: any) => <div className="flex gap-5 items-center">
                <img
                    className="w-12 rounded-[10px] overflow-hidden object-cover shrink-0 inset-0 inline-block aspect-square"
                    src={data?.image || '/Logo.png'}
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
            row: (data: any) => {
                const { mutateAsync: addQuantityFn } = useIncreaseStock(data?.id)
                return (
                    (
                        <div className="flex gap-5 justify-between">
                            <p className="text-2xl">{data?.quantity} </p>
                            <IncreaseQuantity handleFormSubmit={addQuantityFn} />
                        </div>
                    )
                )
            },
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

        const { mutateAsync, isLoading: isDeleting } = useDeletestock(data?.id)


        return <div className="flex gap-2 ">
            <AddToStockForm instance={data} handleFormSubmit={() => undefined} />
            <DeleteAction handleDeleteSubmit={mutateAsync} isLoading={isDeleting} />
        </div>
    }




    const { mutateAsync } = usePoststocksData()

    const { data: stockData, isLoading: isDataLoading } = useGetstocksData()



    const [searchText, setSearchText] = useState<string>("");

    const filteredData =
        !isDataLoading && stockData
            ? stockData.filter((item: any) => {
                const productName = item.product_name?.toLowerCase() || "";
                const id = item.id?.toString() || "";

                return searchText
                    ? productName.includes(searchText.toLowerCase()) || id.includes(searchText)
                    : true;
            })
            : [];
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };


    return (
        <div className="space-y-5 bg-black/40 backdrop-blur-sm p-3">

            <p className='text-xl font-semibold w-full'>Stocks</p>


            <div className="flex justify-end gap-5">
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    placeholder="Search Product.."
                    className="placeholder:text-white bg-white/40 max-w-[15%] border-0 py-1 w-full px-3 "
                />
                <AddToStockForm stockData={stockData} handleFormSubmit={mutateAsync} />
            </div>
            <div>
                <SharedTable
                    columns={Columns}
                    isLoading={isDataLoading}
                    data={filteredData || []} // Filtered data displayed in the table
                />
            </div>
        </div>
    );
};

export default StockOverview;
