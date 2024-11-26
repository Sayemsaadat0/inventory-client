

import { useDeleteCustomer, useGetCustomersData, usePostCustomersData, useUpdateCustomer } from "../../../hooks/entities/customer.hook";
import DeleteAction from "../../../shared/DeleteAction";
import SharedTable from "../../../shared/table/SharedTable";
import CustomerForm from "./CustomerForm";

const Customers = () => {
  const { mutateAsync: handleAddData } = usePostCustomersData();

  const { data: customersData, isLoading: iscustomersDataLoading } =
    useGetCustomersData();

  const columns = [
    {
      title: "Name",
      dataKey: "customer_name",
      row: (data: any) => <div>{data.customer_name}</div>,
    },

    {
      title: "Phone No",
      dataKey: "phone_no",
      row: (data: any) => (
        <div>
          <p>{data?.phone_no}</p>{" "}
        </div>
      ),
    },

    {
      title: "Location",
      dataKey: "location",
      row: (data: any) => (
        <div>
          <p>{data.location}</p>
        </div>
      ),
    },
    {
      title: "Action",
      dataKey: "action",
      row: (data: any) => (
        <div className="flex justify-end">
          <TableAction data={data} />
        </div>
      ),
    },
  ];

  const TableAction = ({ data }: { data: any }) => {
    const { mutateAsync: handleUpdateData } =
      useUpdateCustomer(data?.id);

    const { mutateAsync, isLoading } = useDeleteCustomer(data?.id)

    return (
      <div className="flex gap-2">
        <CustomerForm
          instance={data}
          handleFormSubmit={handleUpdateData}
        />
        <DeleteAction handleDeleteSubmit={mutateAsync} isLoading={isLoading} />
      </div>
    );
  };

  return (
    <div className="space-y-5 bg-black/40 backdrop-blur-sm  p-3">
      <div className="flex justify-end">
        {/* <Title title="List of Customers" /> */}
        <CustomerForm handleFormSubmit={handleAddData} />
      </div>
      <div>
        <SharedTable
          columns={columns}
          isLoading={iscustomersDataLoading}
          data={customersData || []}
        />
      </div>
    </div>
  );
};

export default Customers;
