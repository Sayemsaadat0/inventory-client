import { useState } from "react";
import SharedTable from "../../../shared/table/SharedTable";
import { Link } from "react-router-dom";
import SearchSelectInput from "../../../shared/inputs/SearchSelectInput";
import { FaSearch } from "react-icons/fa";
import {  FaRegFilePdf } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Title from "../../../shared/Title";
import { useConfirmChalan, useGetOrdersData } from "../../../hooks/order/order.hook";
import { formatTimestamp } from "../../../../lib/timeStamp";
import ChalanAction from "../../../shared/ChalanAction";

const Chalan = () => {
    const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);


    const { data, isLoading } = useGetOrdersData()






    const filteredData = !isLoading && data && data.filter((i: any) => i.isChalan === 0);

    const invoiceOptions = filteredData && filteredData.map((i: any) => ({
        label: i.invoice_id,
        value: i.invoice_id,
    }));

    const handleInvoiceSelect = (selectedItem: { label: string; value: string }) => {
        setSelectedInvoice(selectedItem.value);
    };

    const filteredBySelectedInvoice = selectedInvoice
        ? filteredData.filter((i: any) => i.invoice_id === selectedInvoice)
        : filteredData;






    const columns = [
        {
            title: "Invoice No",
            dataKey: "invoice_id",
            row: (data: any) => <div className="font-semibold text-lg text-gray-300">{data.invoice_id}</div>,
        },
        {
            title: "Customer",
            dataKey: "customer",
            row: (data: any) => (
                <div>
                    <p className="">{data?.customer.customer_name}</p>
                    {/* <p className="text-sm text-gray-200 italic">Id: {data.customer_id}</p> */}
                </div>
            ),
        },
        {
            title: "Order Date",
            dataKey: "date",
            row: (data: any) => <div>{formatTimestamp(data.issue_date)}</div>,
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
        {
            title: "Order Created",
            dataKey: "date",
            row: (data: any) => <div>{formatTimestamp(data.created_at)}</div>,
        },
        {
            title: "Action",
            dataKey: "action",
            row: (data: any) => (
                <div> <TableAction data={data} /></div>

            ),
        },
    ];



    const TableAction = ({ data }: { data: any }) => {

        const { mutateAsync , isLoading } = useConfirmChalan(data?.id)
        return (
            <div className="flex justify-end gap-2">
                <ChalanAction handleConfirmChalan={mutateAsync} isLoading={isLoading}/>
                {/* <div onClick={() => mutateAsync()} className=" "><FaCheck className="bg-green-100 text-green-800 text-3xl w-fit  rounded-[5px] cursor-pointer p-2" /></div> */}
                <div className=" "><MdDelete className="bg-red-100 text-red-800 text-3xl w-fit  rounded-[5px] cursor-pointer p-2" /></div>
                <div>
                    <Link className="" to={`/order/chalan/download/${data?.invoice_id}`}>
                        <FaRegFilePdf className="text-3xl p-1 bg-white text-black rounded-[5px] border" />
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-5  p-5 bg-black/40 rounded-[10px]">
            <div className="flex justify-between">
                <Title className="rounded-[10px]" title="Chalan" />
                <div className="flex gap-2 justify-end items-center">
                    <FaSearch />
                    <SearchSelectInput
                        inputClassName="placeholder:text-white bg-white/40 border-0  py-1 w-full rounded-[10px]"
                        data={invoiceOptions}
                        onSelect={handleInvoiceSelect}
                        placeholder="Search Invoice by ID"
                    />
                </div>
            </div>
            <div className="rounded-[10px] overflow-hidden">
                <SharedTable
                    columns={columns}
                    isLoading={isLoading}
                    data={filteredBySelectedInvoice || []}
                />
            </div>
        </div>
    );
};

export default Chalan;
