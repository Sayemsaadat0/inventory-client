import { FC } from "react";
import { useFormik } from "formik";
import Button from "../../../ui/button";
import TextInput from "../../../shared/inputs/TextInput";
import { Dialog, DialogContent } from "../../../ui/dialog";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { useUser } from "../../../context/UserProvider";

import { toast } from "../../../../hooks/use-toast";

type CustomerFormType = {
  instance?: any;
  handleFormSubmit: Function;
  isOnlyIcon?: boolean
  // isLoading?: boolean;
};

const CustomerForm: FC<CustomerFormType> = ({
  instance,
  // isLoading,
  isOnlyIcon,
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
      customer_name: instance?.customer_name || "",
      location: instance?.location || "",
      phone_no: instance?.phone_no || "",
      workspace_id: user?.workspace_id || "no workspace id found",
    },
    // validationSchema: companyDataValidate,
    onSubmit: async (data) => {
      try {
        const modifiedData = {
          customer_name: values.customer_name || "",
          location: values.location || "",
          phone_no: values.phone_no || "",
          workspace_id: user?.workspace_id || "no workspace id found",
        };
        if (instance) {
          await handleFormSubmit(modifiedData);
          toast({
            variant: "default",
            description: "Customer Data Edited Successfully",
          });
        } else {
          await handleFormSubmit(data);
          toast({
            variant: "default",
            description: "New Customer Added Successfully",
          });
          resetForm();
        }
      } catch (err) {
        console.log(err)
        toast({
          variant: "destructive",
          description: '',
        });
      }
    },
  });

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog onOpenChange={() => setOpen(!open)} open={open}>
        <div className="cursor-pointer" onClick={() => setOpen(!open)}>
          {instance ? (
            <div>
              <FaEdit className="text-green-500" />
            </div>
          ) : (
            <div>
              <Button
                className={isOnlyIcon ? 'border' : ''}
                reverse
                icon={<IoMdAdd className="text-xl" />}
                label={isOnlyIcon? "" : "New Customer"}
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
                <p className="text-xl font-semibold">Register New Customer</p>
              )}
            </div>
            <form
              className="space-y-6"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextInput
                className="w-full"
                id="customer_name"
                label="Name"
                placeholder="Customer Name"
                value={values.customer_name}
                onChange={handleChange}
                type="text"
                error={
                  Boolean(errors.customer_name) &&
                  touched.customer_name &&
                  errors.customer_name
                }
              />
              <TextInput
                className="w-full"
                id="phone_no"
                label="Phone Number"
                placeholder="Enter Phone No"
                value={values.phone_no}
                onChange={handleChange}
                type="text"
                error={
                  Boolean(errors.phone_no) &&
                  touched.phone_no &&
                  errors.phone_no
                }
              />
              <TextInput
                className="w-full"
                id="location"
                label="Address"
                placeholder="Enter Address of the Company"
                value={values.location}
                onChange={handleChange}
                type="text"
                error={
                  Boolean(errors.location) &&
                  touched.location &&
                  errors.location
                }
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

export default CustomerForm;
