import { useUser } from "../../../context/UserProvider";
import useDynamicData from "../../../hooks/useDynamicData";
import SharedTable from "../../../shared/table/SharedTable";
import CompanyForm from "./CompanyForm";

const Company = () => {
  const { user } = useUser();
  const { data: companyData, isLoading } = useDynamicData({
    queryKey: "myQueryKey",
    url: `/companies/all/${user?.workspace_id}`,
    callback: (responseData) => {
      console.log("Data received later:", responseData);
      // Perform additional operations with the data
    },
  });

  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }
  console.log(companyData);
  const columns = [
    {
      title: "Name",
      dataKey: "company_name",
      row: (data: any) => <div>{data?.company_name}</div>,
    },

    {
      title: "Location",
      dataKey: "location",
      row: (data: any) => (
        <div>
          <p>{data?.company_address}</p>
        </div>
      ),
    },
    {
      title: "Total Price",
      dataKey: "total_price",
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
        <CompanyForm
          //   refetch={refetch}
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
        <CompanyForm handleFormSubmit={() => undefined} isLoading={false} />
      </div>
      <div>
        <SharedTable
          columns={columns}
          isLoading={isLoading}
          data={companyData || []}
        />
      </div>
    </div>
  );
};

export default Company;
