
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


type LedgersFormType = {
    instance?: any,
    handleFormSubmit: Function,
    isLoading?: boolean,
}



const LedgersForm: FC<LedgersFormType> = ({ instance, isLoading, handleFormSubmit, }) => {
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
            ledger_name: instance?.ledger_name || "",
            note: instance?.note || "",
        },
        // validationSchema: companyDataValidate,
        onSubmit: async (data) => {
            try {
                const modifiedData = {
                    ledger_name: values.ledger_name || "",
                    note: values.note || "",
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
                        <Button reverse icon={<IoMdAdd className='text-xl' />} label='Create New Ledger' />
                    </div>}
                </div>
                <DialogContent>
                    <div className='p-5 md:p-10 space-y-5'>
                        <div className=''>
                            {instance ? <p className='text-xl font-semibold'>Edit Information</p> : <p className='text-xl font-semibold'>Create New Ledger</p>}
                        </div>
                        <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
                            <TextInput
                                className="w-full"
                                id="ledger_name"
                                label='Name'
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
                                label='Note'
                                placeholder="Enter Note"
                                value={values.note}
                                onChange={handleChange}
                                type="text"
                                error={
                                    Boolean(errors.note) &&
                                    touched.note &&
                                    errors.note
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

export default LedgersForm;
