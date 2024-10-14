import { useUser } from "../../../context/UserProvider";
import useDynamicData from "../../../hooks/useDynamicData";
import SharedTable from "../../../shared/table/SharedTable";
import CustomerForm from "./CustomerForm";

const Customers = () => {
  const { user } = useUser();

  const { data: customersData, isLoading } = useDynamicData({
    queryKey: "myQueryKey",
    url: `/customers/all/${user?.workspace_id}`,
    callback: (responseData) => {
      console.log("Data received later:", responseData);
      // Perform additional operations with the data
    },
  });

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
    return (
      <div>
        <CustomerForm
          instance={data}
          handleFormSubmit={() => undefined}
          isLoading={false}
        />
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        {/* <Title title="List of Customers" /> */}
        <CustomerForm handleFormSubmit={() => undefined} isLoading={false} />
      </div>
      <div>
        <SharedTable
          columns={columns}
          isLoading={isLoading}
          data={customersData || []}
        />
      </div>
    </div>
  );
};

export default Customers;
