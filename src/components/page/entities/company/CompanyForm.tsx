
import { FC } from 'react';
import { useFormik } from 'formik';
import Button from '../../../ui/button';
import TextInput from '../../../shared/inputs/TextInput';
import { companyDataValidate } from '../../../../validation/CompanyValidate';
import {
    Dialog, DialogContent
} from '../../../ui/dialog';
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useState } from 'react';


type CompanyFormType = {
    instance?: any,
    handleFormSubmit: Function,
    isLoading?: boolean,
}



const CompanyForm: FC<CompanyFormType> = ({ instance, isLoading, handleFormSubmit, }) => {
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
            company_name: instance?.company_name || "",
            location: instance?.location || "",
        },
        validationSchema: companyDataValidate,
        onSubmit: async (data) => {
            try {
                const modifiedData = {
                    company_name: values.company_name || "",
                    location: values.location || "",
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
                        <Button reverse icon={<IoMdAdd className='text-xl'/>} label='Add New' />
                    </div>}
                </div>
                <DialogContent>
                    <div className='p-5 md:p-10 space-y-5'>
                        <div className=''>
                            {instance ? <p className='text-xl font-semibold'>Edit Information</p> : <p className='text-xl font-semibold'>Add new company</p> }
                        </div>
                        <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
                            <TextInput
                                className="w-full"
                                id="company_name"
                                label='Name'
                                placeholder="Enter Company Name/Title"
                                value={values.company_name}
                                onChange={handleChange}
                                type="text"
                                error={
                                    Boolean(errors.company_name) &&
                                    touched.company_name &&
                                    errors.company_name
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

export default CompanyForm;
