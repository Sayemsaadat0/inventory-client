import { chalanDataFake } from "../../../../data/dummy.data";
import SharedTable from "../../../shared/table/SharedTable";
import Button from "../../../ui/button";
import CompanyForm from "./CompanyForm";

const Company = () => {


    const columns = [
        {
            title: "Invoice No",
            dataKey: "invoice_id",
            row: (data: any) => <div>{data.invoice_id}</div>,
        },

        {
            title: "Customer Info",
            dataKey: "customer",
            row: (data: any) => (
                <div>
                    <p>{data.customer.customer_name}</p>
                    <p className="text-sm text-gray-500">{data.customer.customer_phone_no}</p>
                </div>
            ),
        },
        {
            title: "Date",
            dataKey: "date",
            row: (data: any) => <div>{data.date}</div>,
        },
        {
            title: "Warehouse",
            dataKey: "warehouse",
            row: (data: any) => <div>{data.warehouse}</div>,
        },

        {
            title: "Total Price",
            dataKey: "total_price",
            row: (data: any) => <div>${data.total_price}</div>,
        },
    ];

    return (
        <div className="space-y-5">
            <CompanyForm handleFormSubmit={() => undefined} isLoading={false} />
            <div className="flex justify-between">
                <p className="text-xl w-fit p-2 text-black bg-white">Accounts List</p>
                <Button label="Add Invoice" />
            </div>
            <div>
                <SharedTable
                    columns={columns}
                    isLoading={false}
                    data={chalanDataFake || []}
                />
            </div>
        </div>
    );
};

export default Company;
