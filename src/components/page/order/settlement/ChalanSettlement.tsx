import { useState } from "react";
import { FaCheck, FaSearch } from "react-icons/fa";
import SharedTable from "../../../shared/table/SharedTable";
import SearchSelectInput from "../../../shared/inputs/SearchSelectInput";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegFilePdf } from "react-icons/fa6";
import { useGetOrdersData } from "../../../hooks/order/order.hook";
import { formatTimestamp } from "../../../../lib/timeStamp";

const ChalanSettlement = () => {
  const [searchInvoiceId, setSearchInvoiceId] = useState<string>("");


  const { data, isLoading } = useGetOrdersData()
  console.log(data)

  // Prepare invoice options, showing only invoices that are isIssedChalan === true
  const invoiceOptions = !isLoading && data && data
    .filter((i: any) => i.isChalan === 1) // Filter only issued invoices
    .map((i: any) => ({
      label: i.invoice_id,
      value: i.invoice_id,
    }));

  // Handle invoice selection
  const handleInvoiceSelect = (selectedOption: any) => {
    setSearchInvoiceId(selectedOption?.value || "");
  };

  // Filtered data based on isIssedChalan and searchInvoiceId
  const filteredData = !isLoading && data && data.filter((i: any) => {
    const matchesIssuedChalan = i.isChalan === 1;
    const matchesInvoiceId = searchInvoiceId
      ? i.invoice_id.includes(searchInvoiceId)
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
      title: "Customer",
      dataKey: "customer",
      row: (data: any) => (
        <div>
          <p>{data?.customer?.customer_name}</p>
        </div>
      ),
    },
    {
      title: "Order Date",
      dataKey: "date",
      row: (data: any) => <div>{data.issue_date ? formatTimestamp(data.issue_date) : 'Order Date'}</div>,
    },
    {
      title: "Chalan Date",
      dataKey: "date",
      row: (data: any) => <div> {formatTimestamp(data.chalan_date)}</div>,
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
      row: (data: any) => <div>{data.payment_type || 'Not Paid yet'}</div>,
    },

    {
      title: "Status",
      dataKey: "total_price",
      row: (data: any) => <div className={`px-1 ${data.isPaid === "INCOMPLETE" ? 'bg-red-300' : 'bg-green-300'} text-center text-[10px] rounded-[5px]  text-black`}>{data.isPaid == "INCOMPLETE" ? 'Incomplete' : 'Complete'}</div>,
    },
    {
      title: "Total Price",
      dataKey: "total_price",
      row: (data: any) => <div>{`${data.total_price ? data.total_price : "N/A" } $`}</div>,
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
