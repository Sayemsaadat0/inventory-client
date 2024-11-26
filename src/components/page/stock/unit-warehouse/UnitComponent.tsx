import SharedTable, {
  SharedTableColumn,
} from "../../../shared/table/SharedTable";

import { FC } from "react";
import { useFormik } from "formik";
import TextInput from "../../../shared/inputs/TextInput";
import Button from "../../../ui/button";
import useDynamicData from "../../../hooks/useDynamicData";
import { useDeleteUnit, usePostUnitsData } from "../../../hooks/inventory/units.hooks";
import DeleteAction from "../../../shared/DeleteAction";
import { toast } from "../../../../hooks/use-toast";
import { useUser } from "../../../context/UserProvider";
type CompanyFormType = {
  instance?: any;
  handleFormSubmit: Function;
};
const UnitForm: FC<CompanyFormType> = ({
  instance,
  handleFormSubmit,
}) => {
  const { user } = useUser();
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
      name: instance?.name || "",
      workspace_id: user?.workspace_id || "no workspace id found",
    },
    // validationSchema: companyDataValidate,
    onSubmit: async (data: any) => {
      try {
        let form_data = new FormData();
        form_data.append("name", data.name);
        form_data.append("workspace_id", data.workspace_id);

        // console.log(form_data)

        if (instance) {
          await handleFormSubmit(form_data);
          toast({
            variant: "default",
            description: "Edited Successfully",
          });
        } else {
          await handleFormSubmit(data);
          toast({
            variant: "default",
            description: "Added Successfully",
          });
        }
        resetForm()
      } catch (err: any) {
        for (const key of err.errors) {
          // console.log(key);
          toast({
            variant: 'destructive',
            description: `${key?.attr} - ${key?.detail}`,
          });
        }
      }
    },
  });

  // console.log(values);
  // console.log(errors)
  return (
    <div>
      <form className=" space-y-5" autoComplete="off" onSubmit={handleSubmit}>
        <TextInput
          className="w-full rounded-[10px]"
          id="name"
          label="Add New Unit"
          placeholder="Enter Unit"
          value={values.name}
          onChange={handleChange}
          type="text"
          error={
            Boolean(errors.name) && touched.name && errors.name
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
const UnitComponent = () => {
  const { user } = useUser();


  const { data: unitsData, isLoading } = useDynamicData({
    queryKey: "api_unit_lists",
    url: `/units/all/${user?.workspace_id}`,
    callback: (responseData) => {
      console.log("Data received later:", responseData);
    },
  });

  const unitColumnr: SharedTableColumn[] = [
    {
      title: "Unit",
      dataKey: "events",
      row: (data: any) => <div className="">{data?.name}</div>,
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
  
    const { mutateAsync: handleDeleteData, isLoading } = useDeleteUnit(data?.id);
    return (
      <div className="flex gap-1 ">
        <div>
          <DeleteAction isLoading={isLoading} handleDeleteSubmit={handleDeleteData} />
        </div>
      </div>
    );
  };

  const { mutateAsync } = usePostUnitsData()

  return (
    <div className="flex gap-5">
      <div className="p-5 bg-black/50 h-fit rounded-[10px] backdrop-blur-sm">
        <UnitForm handleFormSubmit={mutateAsync} />
      </div>
      <div className="w-full rounded-[10px] overflow-hidden ">
        <SharedTable
          columns={unitColumnr}
          isLoading={isLoading}
          data={unitsData || []}
        />
      </div>
    </div>
  );
};

export default UnitComponent;
