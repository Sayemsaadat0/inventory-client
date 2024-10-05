
import { FC } from 'react';
import { useFormik } from 'formik';
import Button from '../../../ui/button';
import TextInput from '../../../shared/inputs/TextInput';
// import { companyDataValidate } from '../../../../validation/CompanyValidate';
import {
    Dialog, DialogContent
} from '../../../ui/dialog';
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useState } from 'react';


type CustomerFormType = {
    instance?: any,
    handleFormSubmit: Function,
    isLoading?: boolean,
}



const CustomerForm: FC<CustomerFormType> = ({ instance, isLoading, handleFormSubmit, }) => {
    const {
        handleChange,
        values,
        touched,
        errors,
        handleSubmit,
        isSubmitting,
        resetForm
    } = useFormik({
        initialValues: {
            customer_name: instance?.customer_name || "",
            location: instance?.location || "",
            phone_no: instance?.phone_no || "",
        },
        // validationSchema: companyDataValidate,
        onSubmit: async (data) => {
            try {
                const modifiedData = {
                    customer_name: values.customer_name || "",
                    location: values.location || "",
                    phone_no: values.phone_no || "",
                };
                if (instance) {
                    await handleFormSubmit(modifiedData);
                    // setOpen(!open);
                    // toast({
                    //     variant: "success",
                    //     description: "Edited Successfully",
                    // });
                } else {
                    await handleFormSubmit(data);
                    // toast({
                    //     variant: "success",
                    //     description: "Added Successfully",
                    // });
                    resetForm();
                    // setOpen(!open);
                }
            } catch (err: any) {
                console.log(err)
                // toast({
                //     variant: "destructive",
                //     description: err,
                // });
            }
        },
    });

    console.log(values)
    const [open, setOpen] = useState(false)


    return (
        <div>
            <Dialog onOpenChange={() => setOpen(!open)} open={open}>
                <div className='cursor-pointer' onClick={() => setOpen(!open)}>
                    {instance ? <div><FaEdit className='text-green-500' /></div> : <div>
                        <Button reverse icon={<IoMdAdd className='text-xl' />} label='New Customer' />
                    </div>}
                </div>
                <DialogContent>
                    <div className='p-5 md:p-10 space-y-5'>
                        <div className=''>
                            {instance ? <p className='text-xl font-semibold'>Edit Information</p> : <p className='text-xl font-semibold'>Register New Customer</p>}
                        </div>
                        <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
                            <TextInput
                                className="w-full"
                                id="customer_name"
                                label='Name'
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
                                label='Address'
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
                                label='Address'
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

                            <div className='w-full flex justify-center'>
                                <Button
                                    onClick={() => setOpen(!open)}
                                    type='submit'
                                    disabled={isSubmitting}
                                    className="w-full"
                                    variant={'regulerOutlineBtn'}
                                    label={isLoading ? 'Saving..' : 'Save'}
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
