import { fakeCompanyData } from "../../../../data/dummy.data";
import SharedTable from "../../../shared/table/SharedTable";
import Title from "../../../shared/Title";
import CompanyForm from "./CompanyForm";

const Company = () => {


    const columns = [
        {
            title: "Name",
            dataKey: "company_name",
            row: (data: any) => <div>{data.company_name}</div>,
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
            title: "Total Price",
            dataKey: "total_price",
            row: (data: any) => <div className="flex justify-end">
                <TableAction data={data} />
            </div>,
        },
    ];

    const TableAction = ({ data }: { data: any }) => {
        return <div>
            <CompanyForm instance={data} handleFormSubmit={() => undefined} isLoading={false} />
        </div>
    }

    return (
        <div className="space-y-5">
            <div className="flex justify-between">
                <Title title="List of Companies" />
                <CompanyForm handleFormSubmit={() => undefined} isLoading={false} />
            </div>
            <div>
                <SharedTable
                    columns={columns}
                    isLoading={false}
                    data={fakeCompanyData || []}
                />
            </div>
        </div>
    );
};

export default Company;
