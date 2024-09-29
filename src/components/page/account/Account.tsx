import React, { useState } from "react";
import { chalanDataFake } from "../../../data/dummy.data";
import SharedTable from "../../shared/table/SharedTable";
import Button from "../../ui/button";

const Account = () => {
  // To track which invoices are expanded to show all products
  const [expandedInvoices, setExpandedInvoices] = useState<string[]>([]);

  // Handle expanding/collapsing product list for a specific invoice
  const toggleExpandInvoice = (invoiceId: string) => {
    setExpandedInvoices((prev) =>
      prev.includes(invoiceId)
        ? prev.filter((id) => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

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
      title: "Products",
      dataKey: "products",
      row: (data: any) => {
        const productsToShow = expandedInvoices.includes(data.invoice_id)
          ? data.products
          : data.products.slice(0, 2); // Show only 2 products by default

        return (
          <div>
            {productsToShow.map((product: any, index: number) => (
              <div key={index} className="mb-2">
                <p className="font-semibold">{product.product_name}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {product.quantity}, Price: ${product.price}
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
  ];

  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <p className="text-3xl rounded-[20px] w-fit p-2 bg-black/40">Chalan Data</p>
        <Button label="Add Invoice" />
      </div>
      <div>
        <SharedTable
          columns={columns}
          isLoading={false}
          data={chalanDataFake || []} // Bind your fake invoice data
        />
      </div>
    </div>
  );
};

export default Account;
