import { fakeUnits, fakeWarehouses } from "../../../../data/dummy.data";
import SharedTable, { SharedTableColumn } from "../../../shared/table/SharedTable";





// warehouse
const WarehouseComponent = () => {
    const warehouseColumn: SharedTableColumn[] = [
        {
            title: "Unit",
            dataKey: "events",
            row: (data: any) => (
                <div className="">
                    {data?.name}
                </div>
            ),
        },
        {
            title: "Action",
            dataKey: "Action",
            row: () => (
                <div className="flex justify-end">
                    <span className="px-2 bg-red-100 text-red-500  border rounded-full ">X</span>
                </div>
            ),
        },
    ];
    return <div>
        <SharedTable
            columns={warehouseColumn}
            isLoading={false}
            data={fakeWarehouses || []}
        />
    </div>
}





// units
const UnitComponent = () => {
    const unitColumnr: SharedTableColumn[] = [
        {
            title: "Unit",
            dataKey: "events",
            row: (data: any) => (
                <div className="">
                    {data?.name}
                </div>
            ),
        },
        {
            title: "Action",
            dataKey: "Action",
            row: () => (
                <div className="flex justify-end">
                    <span className="px-2 bg-red-100 text-red-500  border rounded-full ">X</span>
                </div>
            ),
        },
    ];
    return <div>
        <SharedTable
            columns={unitColumnr}
            isLoading={false}
            data={fakeUnits || []}
        />
    </div>
}




// Default Component
const UnitsWarehouses = () => {
    return (
        <div className="space-y-5">
            <p className="text-3xl rounded-[20px]  w-fit p-2 ">Units & Warehouses</p>
            <div className="grid grid-cols-1 lg:grid-cols-2   gap-5  overflow-hidden ">
                <div className="space-y-5 bg-black/50 p-2  rounded-[20px]">
                    <p className="text-xl font-semibold">Units</p>
                    <UnitComponent />
                </div>
                <div className="space-y-5 bg-black/50 p-2  rounded-[20px]">
                    <p className="text-xl font-semibold">Warehouses</p>
                    <WarehouseComponent />
                </div>
            </div>
        </div>
    )
}

export default UnitsWarehouses