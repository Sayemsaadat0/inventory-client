

import { useGetCustomersData, usePostCustomersData } from "../../../hooks/entities/customer.hook";
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
          <p>Phone No : {data?.phone_no}</p>{" "}
        </div>
      ),
    },

    {
      title: "Location",
      dataKey: "location",
      row: (data: any) => (
        <div>
          <p>Address : {data.location}</p>
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
    //     const { mutateAsync: handleUpdateData, isLoading: isDataUpdating } =
    // useUpdateCustomer(data?.id);

    return (
      <div>
        <CustomerForm
          instance={data}
          handleFormSubmit={() => undefined}
          // isLoading={false}
        />
      </div>
    );
  };

  return (
    <div className="space-y-5">
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
