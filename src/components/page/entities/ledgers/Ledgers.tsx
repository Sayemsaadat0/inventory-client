import { useUser } from "../../../context/UserProvider";
import { useDeleteLedger, usePostledgersData, useUpdateLedger } from "../../../hooks/entities/ledger.hook";
import useDynamicData from "../../../hooks/useDynamicData";
import DeleteAction from "../../../shared/DeleteAction";
import SharedTable from "../../../shared/table/SharedTable";
import LedgersForm from "./LedgersForm";

const Ledgers = () => {
  const { user } = useUser();
  const { data: ledgersData, isLoading } = useDynamicData({
    queryKey: "api_ledgers",
    url: `/ledgers/all/${user?.workspace_id}`,
    callback: (responseData) => {
      console.log("Data received later:", responseData);
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
    const { mutateAsync: handleUpdateData } =
      useUpdateLedger(data?.id);
    const { mutateAsync: handleDeleteFn, isLoading } =
      useDeleteLedger(data?.id);

    return (
      <div className="flex items-center gap-2">
        <div>
          <LedgersForm
            instance={data}
            handleFormSubmit={handleUpdateData}
          />
        </div>
        <div>
          <DeleteAction handleDeleteSubmit={handleDeleteFn} isLoading={isLoading} />
        </div>
      </div>
    );
  };


  const { mutateAsync: formSubmitFn } = usePostledgersData()
  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        {/* <Title title="List of Customers" /> */}
        <LedgersForm handleFormSubmit={formSubmitFn} />
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
