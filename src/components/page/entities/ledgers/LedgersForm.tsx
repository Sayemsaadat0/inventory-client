import { FC } from "react";
import { useFormik } from "formik";
import Button from "../../../ui/button";
import TextInput from "../../../shared/inputs/TextInput";
// import { companyDataValidate } from '../../../../validation/CompanyValidate';
import { Dialog, DialogContent } from "../../../ui/dialog";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { useUser } from "../../../context/UserProvider";
import { toast } from "../../../../hooks/use-toast";
import { RiEditCircleLine } from "react-icons/ri";

type LedgersFormType = {
  instance?: any;
  handleFormSubmit: Function;
};

const LedgersForm: FC<LedgersFormType> = ({
  instance,
  handleFormSubmit,
}) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const {
    handleChange,
    values,
    touched,
    errors,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      ledger_name: instance?.ledger_name || "",
      note: instance?.note || "",
      workspace_id: user?.workspace_id || "no workspace id found",
    },
    // validationSchema: companyDataValidate,
    onSubmit: async (data) => {
      try {
        const modifiedData = {
          ledger_name: values.ledger_name || "",
          note: values.note || "",
          workspace_id: user?.workspace_id || "no workspace id found",
        };
        if (instance) {
          await handleFormSubmit(modifiedData);
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
        // resetForm();
        // setOpen(!open);
      } catch (err: any) {
        console.log(err);
        toast({
          variant: "destructive",
          description: err?.error,
        });
      }
    },
  });

  console.log(values);

  return (
    <div>
      <Dialog onOpenChange={() => setOpen(!open)} open={open}>
        <div className="cursor-pointer" onClick={() => setOpen(!open)}>
          {instance ? (
            <div className="bg-black p-[7px]  rounded-full ">
              <RiEditCircleLine className=" text-green-500" />
            </div>
          ) : (
            <div>
              <Button
                reverse
                icon={<IoMdAdd className="text-xl" />}
                label="Setup Ledger"
              />
            </div>
          )}
        </div>
        <DialogContent>
          <div className="p-5 md:p-10 space-y-5">
            <div className="">
              {instance ? (
                <p className="text-xl font-semibold">Edit Information</p>
              ) : (
                <p className="text-xl font-semibold">Create New Ledger</p>
              )}
            </div>
            <form
              className="space-y-6"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextInput
                className="w-full"
                id="ledger_name"
                label="Name"
                placeholder="Customer Name"
                value={values.ledger_name}
                onChange={handleChange}
                type="text"
                error={
                  Boolean(errors.ledger_name) &&
                  touched.ledger_name &&
                  errors.ledger_name
                }
              />
              <TextInput
                className="w-full"
                id="note"
                label="Note"
                placeholder="Enter Note"
                value={values.note}
                onChange={handleChange}
                type="text"
                error={Boolean(errors.note) && touched.note && errors.note}
              />

              <div className="w-full flex justify-center">
                <Button
                  onClick={() => setOpen(!open)}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  variant={"regulerOutlineBtn"}
                  label={isSubmitting ? "Saving.." : "Save"}
                />
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LedgersForm;
