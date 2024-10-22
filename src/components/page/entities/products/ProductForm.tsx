
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
import ImageUploadField from '../../../shared/inputs/ImageUploadField';


type ProductFormType = {
    instance?: any,
    handleFormSubmit: Function,
    isLoading?: boolean,
}



const ProductForm: FC<ProductFormType> = ({ instance, isLoading, handleFormSubmit, }) => {
    const {
        handleChange,
        values,
        touched,
        errors,
        handleSubmit,
        isSubmitting,
        resetForm,
        setFieldValue
    } = useFormik({
        initialValues: {
            item: instance?.ledger_name || "",
            image: instance?.image || "",
        },
        // validationSchema: companyDataValidate,
        onSubmit: async (data) => {
            try {
                const modifiedData = {
                    item: values.item || "",
                    image: values.image || "",
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
                        <Button reverse icon={<IoMdAdd className='text-xl' />} label='Add New Product' />
                    </div>}
                </div>
                <DialogContent>
                    <div className='p-5 md:p-10 space-y-5'>
                        <div className=''>
                            {instance ? <p className='text-xl font-semibold'>Edit Information</p> : <p className='text-xl font-semibold'>Add New Product</p>}
                        </div>
                        <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
                            <TextInput
                                className="w-full"
                                id="item"
                                label='Item Name'
                                placeholder="Item Name"
                                value={values.item}
                                onChange={handleChange}
                                type="text"
                                error={
                                    Boolean(errors.item) &&
                                    touched.item &&
                                    errors.item
                                }
                            />
                            <ImageUploadField
                                error={
                                    Boolean(errors.image) &&
                                    touched.image &&
                                    errors.image
                                }
                                setValue={(x: string) => setFieldValue("image", x)}
                                fieldKey={"image"}
                                value={values.image}
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

export default ProductForm;
