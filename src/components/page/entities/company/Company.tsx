

import { useDeleteCompany, useGetCompaniesData, usePostCompaniesData, useUpdateCompany } from "../../../hooks/entities/companies.hook";
import DeleteAction from "../../../shared/DeleteAction";
import SharedTable from "../../../shared/table/SharedTable";
import CompanyForm from "./CompanyForm";

const Company = () => {
  const { data: companiesData, isLoading: iscompaniesDataLoading } =
    useGetCompaniesData();

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
    const { mutateAsync: handleUpdateData } = useUpdateCompany(data?.id);
    const { mutateAsync: handleDeleteData, isLoading } = useDeleteCompany(data?.id);
    return (
      <div className="flex gap-1 ">
        <div>
          <CompanyForm
            instance={data}
            handleFormSubmit={handleUpdateData}
          />
        </div>
        <div>
          <DeleteAction isLoading={isLoading} handleDeleteSubmit={handleDeleteData} />
        </div>
      </div>
    );
  };

  const { mutateAsync: handleAddData } = usePostCompaniesData();

  console.log(companiesData);

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <CompanyForm handleFormSubmit={handleAddData} />
      </div>
      <div>
        <SharedTable
          columns={columns}
          isLoading={iscompaniesDataLoading}
          data={companiesData || []}
        />
      </div>
    </div>
  );
};

export default Company;
