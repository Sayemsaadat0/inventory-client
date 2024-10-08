import { useState } from "react";
import Button from "../../../ui/button";
import SharedTable from "../../../shared/table/SharedTable";
import { chalanDataFake } from "../../../../data/dummy.data";
import { Link } from "react-router-dom";

const Chalan = () => {
    const [expandedInvoices, setExpandedInvoices] = useState<string[]>([]);

    const toggleExpandInvoice = (invoiceId: string) => {
        setExpandedInvoices((prev) =>
            prev.includes(invoiceId)
                ? prev.filter((id) => id !== invoiceId)
                : [...prev, invoiceId]
        );
    };

    // Filtered data based on isIssedChalan
    const filteredData = chalanDataFake.filter((invoice) => !invoice.isIssedChalan);

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
                    <p>{data.customer_name}</p>
                    {/* Adjusted for your data structure */}
                    <p className="text-sm text-gray-500">{data.customer_id}</p>
                </div>
            ),
        },
        {
            title: "Date",
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
                const productsToShow = expandedInvoices.includes(data.invoice_id)
                    ? data.products
                    : data.products.slice(0, 2);

                return (
                    <div>
                        {productsToShow.map((product: any, index: number) => (
                            <div key={index} className="mb-2">
                                <p className="font-semibold">{product.product_name}</p>
                                <p className="text-sm text-gray-500">
                                    Quantity: {product.quantity}, Price: ${product.unit_price}
                                </p>
                            </div>
                        ))}
                        {data.products.length > 2 && (
                            <button
                                onClick={() => toggleExpandInvoice(data.invoice_id)}
                                className="text-blue-500 underline"
                            >
                                {expandedInvoices.includes(data.invoice_id) ? "Show Less" : "See More"}
                            </button>
                        )}
                    </div>
                );
            },
        },
        {
            title: "Total Price",
            dataKey: "total_price",
            row: (data: any) => <div>${data.total_price}</div>,
        },
        {
            title: "Action",
            dataKey: "action",
            row: (data: any) => <div>
                <Link to={`/order/chalan/download/${data?.invoice_id}`}>
                    PDF
                </Link>
            </div>,
        },
    ];

    return (
        <div className="space-y-5">
            <div className="flex justify-between">
                {/* <Button label="Add Invoice" /> */}
            </div>
            <div>
                <SharedTable
                    columns={columns}
                    isLoading={false}
                    data={filteredData || []}
                />
            </div>
            <div className="flex justify-end">
                <Button label="Confirm" />
            </div>
        </div>
    );
};

export default Chalan;
