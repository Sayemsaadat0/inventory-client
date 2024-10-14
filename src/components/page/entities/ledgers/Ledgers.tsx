import { useUser } from "../../../context/UserProvider";
import useDynamicData from "../../../hooks/useDynamicData";
import SharedTable from "../../../shared/table/SharedTable";
import LedgersForm from "./LedgersForm";

const Ledgers = () => {
  const { user } = useUser();
  const { data: ledgersData, isLoading } = useDynamicData({
    queryKey: "myQueryKey",
    url: `/ledgers/all/${user?.workspace_id}`,
    callback: (responseData) => {
      console.log("Data received later:", responseData);
      // Perform additional operations with the data
    },
  });

  const columns = [
    {
      title: "Name",
      dataKey: "ledger_name",
      row: (data: any) => <div>{data.ledger_name}</div>,
    },

    {
      title: "Note",
      dataKey: "note",
      row: (data: any) => (
        <div>
          <p>{data.note}</p>
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
        <LedgersForm
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
        <LedgersForm handleFormSubmit={() => undefined} isLoading={false} />
      </div>
      <div>
        <SharedTable
          columns={columns}
          isLoading={isLoading}
          data={ledgersData || []}
        />
      </div>
    </div>
  );
};

export default Ledgers;
