// import PaymentTypeForm from "./PaymentTypeForm"

import DeleteAction from "../../../shared/DeleteAction";
import SharedTable from "../../../shared/table/SharedTable";
import PaymentTypeForm from "./PaymentTypeForm";


const PaymentType = () => {


  const columns = [
    {
      title: "Name",
      dataKey: "payment_type",
      row: (data: any) => <div>{data?.payment_type}</div>,
    },
    {
      title: "Added Date",
      dataKey: "Added Date",
      row: (data: any) => (
        <div>
          <p>{data.createdAt}</p>
        </div>
      ),
    },
    {
      title: "Action",
      dataKey: "action",
      row: () => <div className="flex justify-end">
        <TableAction />
      </div>,
    },
  ];

  const TableAction = () => {
    return <div>
      <DeleteAction handleDeleteSubmit={() => undefined} isLoading={false} />
    </div>
  }

  const paymentType = [
    {
      payment_type: 'Bank',
      createdAt: '10-20-40'
    },
    {
      payment_type: 'Bank',
      createdAt: '10-20-40'
    },
    {
      payment_type: 'Bank',
      createdAt: '10-20-40'
    },
    {
      payment_type: 'Bank',
      createdAt: '10-20-40'
    }
  ]
  return (
    <div className="  p-3">
      <div className="flex  gap-10 ">
        <div className="bg-black/40 backdrop-blur-sm p-5 h-fit">
          <PaymentTypeForm handleFormSubmit={() => undefined} />
        </div>
        <div className="flex-1">
          <SharedTable
            columns={columns}
            isLoading={false}
            data={paymentType || []}
          />
        </div>
      </div>
    </div>
  );
}

export default PaymentType