import { useState } from "react";
import { FaCheck, FaSearch } from "react-icons/fa";
import SharedTable from "../../../shared/table/SharedTable";
import { chalanDataFake } from "../../../../data/dummy.data";
import SearchSelectInput from "../../../shared/inputs/SearchSelectInput";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegFilePdf } from "react-icons/fa6";

const ChalanSettlement = () => {
  const [searchInvoiceId, setSearchInvoiceId] = useState<string>("");

  // Prepare invoice options, showing only invoices that are isIssedChalan === true
  const invoiceOptions = chalanDataFake
    .filter((invoice) => invoice.isIssedChalan) // Filter only issued invoices
    .map((invoice) => ({
      label: invoice.invoice_id,
      value: invoice.invoice_id,
    }));

  // Handle invoice selection
  const handleInvoiceSelect = (selectedOption: any) => {
    setSearchInvoiceId(selectedOption?.value || "");
  };

  // Filtered data based on isIssedChalan and searchInvoiceId
  const filteredData = chalanDataFake.filter((invoice) => {
    const matchesIssuedChalan = invoice.isIssedChalan;
    const matchesInvoiceId = searchInvoiceId
      ? invoice.invoice_id.includes(searchInvoiceId)
      : true;
    return matchesIssuedChalan && matchesInvoiceId;
  });

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
          <p className="text-sm text-gray-200">Id: {data.customer_id}</p>
        </div>
      ),
    },
    {
      title: "Order Date",
      dataKey: "date",
      row: (data: any) => <div>{data.issued_date ? data.issued_date : 'Order Date'}</div>,
    },
    {
      title: "Chalan Date",
      dataKey: "date",
      row: (data: any) => <div> {data.issued_date}</div>,
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
          <div>
            {productsToShow.map((product: any, index: number) => (
              <div key={index} className="mb-2">
                <p className="font-semibold">{product.product_name}</p>
                {/* <p className="text-sm text-gray-500">
                  Quantity: {product.quantity}, Price: ${product.unit_price}
                </p> */}
              </div>
            ))}
            {remainingProducts > 0 && (
              <p className="text-sm text-gray-200">
                {remainingProducts}+more
              </p>
            )}
          </div>
        );
      },
    },
    {
      title: "Payment Type",
      dataKey: "payment_type",
      row: (data: any) => <div>{data.payment_type}</div>,
    },

    {
      title: "Status",
      dataKey: "total_price",
      row: (data: any) => <div className={`${data.isPaid === false ? 'bg-red-300' : 'bg-green-300'} text-center text-[10px] rounded-[5px]  text-black`}>{data.isPaid == false ? 'Incomplete' : 'Complete'}</div>,
    },
    {
      title: "Total Price",
      dataKey: "total_price",
      row: (data: any) => <div>${data.total_price}</div>,
    },
    {
      title: "Action",
      dataKey: "action",
      row: (data: any) => (
        <div className="flex justify-end gap-2">
          <div title='Confirm Payment' className=" "><FaCheck className="bg-green-100 text-green-800 text-3xl w-fit  rounded-[5px] cursor-pointer p-2" /></div>
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


  console.log(filteredData)

  return (
    <div className="space-y-5">
      <div className="flex gap-2 justify-end items-center ">
        <FaSearch />
        <SearchSelectInput
          inputClassName="placeholder:text-white bg-white/40 border-0 py-1 w-full rounded-[10px]"
          data={invoiceOptions} // Pass only issued invoice data
          onSelect={handleInvoiceSelect} // Handle invoice selection
          placeholder="Search Invoice by ID"
        />
      </div>
      {/* Table */}
      <div>
        <SharedTable
          columns={columns}
          isLoading={false}
          data={filteredData || []} // Use the filtered data here
        />
      </div>

    </div>
  );
};

export default ChalanSettlement;
