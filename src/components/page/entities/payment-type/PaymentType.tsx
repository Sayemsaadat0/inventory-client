// import PaymentTypeForm from "./PaymentTypeForm"

import { format } from "date-fns";
import { useDeletePaymentType, useGetPaymentTypeData, usePostPaymentTypeData } from "../../../hooks/entities/payment-type.hook";
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
          <p>{format(new Date(data.createdAt), "MM-dd-yyyy")}</p>
        </div>
      ),
    },
    {
      title: "Action",
      dataKey: "action",
      row: (data: any) => <div className="flex justify-end">
        <TableAction data={data} />
      </div>,
    },
  ];

  const TableAction = ({ data }: { data: any }) => {
    const { mutateAsync, isLoading } = useDeletePaymentType(data?.id)
    return <div>
      <DeleteAction handleDeleteSubmit={mutateAsync} isLoading={isLoading} />
    </div>
  }



  const { mutateAsync: formSubmitFn } = usePostPaymentTypeData()
  const { data: paymentTypeData } = useGetPaymentTypeData()
  return (
    <div className="  p-3">
      <div className="flex  gap-10 ">
        <div className="bg-black/40 backdrop-blur-sm p-5 h-fit">
          <PaymentTypeForm handleFormSubmit={formSubmitFn} />
        </div>
        <div className="flex-1">
          <SharedTable
            columns={columns}
            isLoading={false}
            data={paymentTypeData || []}
          />
        </div>
      </div>
    </div>
  );
}

export default PaymentType