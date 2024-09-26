import { inventoryFakeData } from "../../../data/dummy.data";
import SharedTable from "../../shared/table/SharedTable";
import Button from "../../ui/button";

const Inventory = () => {
  const unitColumns = [
    {
      title: "Products",
      dataKey: "product_name",
      row: (data: any) => (
        <div>
          <p className="font-semibold">{data.product_name}</p>
          <p className="text-xs font-light">{data.product_id}</p>
        </div>
      ),
    },
    {
      title: "Warehouse",
      dataKey: "warehouse",
      row: (data: any) => (
        <div>{data.warehouse}</div>
      ),
    },
    {
      title: "Unit & Quantity",
      dataKey: "unit",
      row: (data: any) => (
        <div>{data.quantity} {' '}
          <span className="text-sm font-light">{data.unit}</span>
        </div>
      ),
    },
    {
      title: "Notes",
      dataKey: "notes",
      row: (data: any) => (
        <div>{data.notes}</div>
      ),
    },
    {
      title: "Action",
      dataKey: "action",
      row: () => (
        <div className="flex justify-end">
          <span className="px-2 bg-red-100 text-red-500 border rounded-full cursor-pointer">X</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <p className="text-3xl rounded-[20px] w-fit p-2 bg-black/40">Product Inventory</p>
        <div>
          <Button label="Add Inventory" />
        </div>
      </div>
      <div>
        <SharedTable
          columns={unitColumns}
          isLoading={false}
          data={inventoryFakeData || []} // Bind your fake inventory data
        />
      </div>
    </div>
  );
}

export default Inventory;
