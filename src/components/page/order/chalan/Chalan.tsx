import { useState } from "react";
import SharedTable from "../../../shared/table/SharedTable";
import { chalanDataFake } from "../../../../data/dummy.data";
import { Link } from "react-router-dom";
import SearchSelectInput from "../../../shared/inputs/SearchSelectInput";
import { FaSearch } from "react-icons/fa";
import { FaCheck, FaRegFilePdf } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const Chalan = () => {
    const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

    // Filtered data based on isIssedChalan
    const filteredData = chalanDataFake.filter((invoice) => !invoice.isIssedChalan);

    // Transform data for SearchSelectInput
    const invoiceOptions = filteredData.map((invoice) => ({
        label: invoice.invoice_id,
        value: invoice.invoice_id,
    }));

    // Handle selection from SearchSelectInput
    const handleInvoiceSelect = (selectedItem: { label: string; value: string }) => {
        setSelectedInvoice(selectedItem.value);
    };

    // Filter data based on selected invoice
    const filteredBySelectedInvoice = selectedInvoice
        ? filteredData.filter((invoice) => invoice.invoice_id === selectedInvoice)
        : filteredData;

    const columns = [
        {
            title: "Invoice No",
            dataKey: "invoice_id",
            row: (data: any) => <div className="font-semibold text-lg text-gray-300">{data.invoice_id}</div>,
        },
        {
            title: "Customer Info",
            dataKey: "customer",
            row: (data: any) => (
                <div>
                    <p className="">{data.customer_name}</p>
                    <p className="text-sm text-gray-200 italic">Id: {data.customer_id}</p>
                </div>
            ),
        },
        {
            title: "Order Date",
            dataKey: "date",
            row: (data: any) => <div>{data.issued_date}</div>,
        },
        {
            title: "Warehouse",
            dataKey: "warehouse",
            row: (data: any) => <div>{data.warehouse_name}</div>,
        },
        {
            title: "Products",
            dataKey: "products",
            row: (data: any) => {
                const productsToShow = data.products.slice(0, 2);
                const remainingProducts = data.products.length - productsToShow.length;
                return (
                    <div className=" w-fit  max-w-[400px] ">
                        {productsToShow.map((product: any, index: number) => (
                            <div key={index} className="mb-1 ">
                                <p className="text-sm   w-fit px-1 rounded-full bg-amber-50 text-black">{product.product_name}</p>

                                {/* <p className="text-sm text-gray-500">
                                    Quantity: {product.quantity}, Price: ${product.unit_price}
                                </p> */}
                            </div>

                        ))}
                        {remainingProducts > 0 && (
                            <span className="text-[12px] text-gray-200">
                                {remainingProducts}+ more
                            </span>
                        )}
                    </div>
                );
            },
        },
        // {
        //     title: "Grand Total",
        //     dataKey: "total_price",
        //     row: (data: any) => <div>${data.total_price}</div>,
        // },
        {
            title: "Action",
            dataKey: "action",
            row: (data: any) => (
                <div className="flex justify-end gap-2">
                    <div className=" "><FaCheck className="bg-green-100 text-green-800 text-3xl w-fit  rounded-[5px] cursor-pointer p-2" /></div>
                    <div className=" "><MdDelete className="bg-red-100 text-red-800 text-3xl w-fit  rounded-[5px] cursor-pointer p-2" /></div>
                    <div>
                        <Link className="" to={`/order/chalan/download/${data?.invoice_id}`}>
                            <FaRegFilePdf className="text-3xl p-1 bg-white text-black rounded-[5px] border" />
                        </Link>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-5 bg-black/20 backdrop-blur-sm p-5  rounded-[10px]">
            <div className="flex gap-2 justify-end items-center">
                <FaSearch />
                <SearchSelectInput
                    inputClassName="placeholder:text-white bg-white/40 border-0  py-1 w-full rounded-[10px]"
                    // title="Select Invoice"
                    data={invoiceOptions} // Pass transformed invoice data
                    onSelect={handleInvoiceSelect} // Handle invoice selection
                    placeholder="Search Invoice by ID"
                />
            </div>
            <div className="rounded-[10px] overflow-hidden">
                <SharedTable
                    columns={columns}
                    isLoading={false}
                    data={filteredBySelectedInvoice || []}
                />
            </div>
        </div>
    );
};

export default Chalan;
