import SharedTable, {
  SharedTableColumn,
} from "../../../shared/table/SharedTable";
import { FC } from "react";
import { useFormik } from "formik";
import TextInput from "../../../shared/inputs/TextInput";
import Button from "../../../ui/button";
import useDynamicData from "../../../hooks/useDynamicData";
import { useUser } from "../../../context/UserProvider";
import { useDeleteWarehouse, usePostWarehousesData } from "../../../hooks/inventory/warehouse.hooks";
import DeleteAction from "../../../shared/DeleteAction";
// import usePostData from "../../../hooks/usePostData";
type WarehousesType = {
  handleFormSubmit: Function;
  isLoading?: boolean;
};
const WarehousesForm: FC<WarehousesType> = ({
  handleFormSubmit,
}) => {
  const { user } = useUser();
  // const postData = usePostData();
  const {
    handleChange,
    values,
    touched,
    errors,
    handleSubmit,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      warehouse_name: "",
    },
    // validationSchema: companyDataValidate,
    onSubmit: async (data) => {
      const modifiedData = {
        warehouse_name: values.warehouse_name || "",
        workspace_id: user?.workspace_id || "no workspace id found",
      };
      try {
        if (modifiedData) {
          await handleFormSubmit(modifiedData);
        } else {
          await handleFormSubmit(data)
        }
        resetForm();
      } catch (err: any) {
        console.log(err);
      }
    },
  });

  console.log(values);
  return (
    <div>
      <form className="space-y-5" autoComplete="off" onSubmit={handleSubmit}>
        <TextInput
          className="w-full rounded-[10px]"
          id="warehouse_name"
          label="Add New Warehouse"
          placeholder="Enter Warehouse"
          value={values.warehouse_name}
          onChange={handleChange}
          type="text"
          error={
            Boolean(errors.warehouse_name) && touched.warehouse_name && errors.warehouse_name
          }
        />
        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-[10px]"
            label={isSubmitting ? "Saving.." : "Save"}
          />
        </div>
      </form>
    </div>
  );
};

//
const Warehouses = () => {
  const { user } = useUser();
  const { data: warehouseData, isLoading } = useDynamicData({
    queryKey: "api_warehouse",
    url: `/warehouses/all/${user?.workspace_id}`,
    callback: (responseData) => {
      console.log("Data received later:", responseData);
    },
  });
  const unitColumnr: SharedTableColumn[] = [
    {
      title: "Warehouse",
      dataKey: "warehouse_name",
      row: (data: any) => <div className="">{data?.warehouse_name}</div>,
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

    const { mutateAsync: handleDeleteData, isLoading } = useDeleteWarehouse(data?.id);
    return (
      <div className="flex gap-1 ">
        <div>
          <DeleteAction isLoading={isLoading} handleDeleteSubmit={handleDeleteData} />
        </div>
      </div>
    );
  };
  const { mutateAsync: addFormFn } = usePostWarehousesData()

  return (
    <div className="flex gap-5">
      <div className="p-5 h-fit bg-black/50 rounded-[10px] backdrop-blur-sm">
        <WarehousesForm handleFormSubmit={addFormFn} isLoading={false} />
      </div>
      <div className="w-full rounded-[10px] overflow-hidden ">
        <SharedTable
          columns={unitColumnr}
          isLoading={isLoading}
          data={warehouseData || []}
        />
      </div>
    </div>
  );
};

export default Warehouses;
