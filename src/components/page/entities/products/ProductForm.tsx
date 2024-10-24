
import { FC } from 'react';
import { useFormik } from 'formik';
import Button from '../../../ui/button';
import TextInput from '../../../shared/inputs/TextInput';
// import { companyDataValidate } from '../../../../validation/CompanyValidate';
import {
    Dialog, DialogContent
} from '../../../ui/dialog';
import { IoMdAdd } from "react-icons/io";
import { useState } from 'react';
import ImageUploadField from '../../../shared/inputs/ImageUploadField';
import { RiEditCircleLine } from 'react-icons/ri';
import { toast } from '../../../../hooks/use-toast';
import { useUser } from '../../../context/UserProvider';


type ProductFormType = {
    instance?: any,
    handleFormSubmit: Function,
}



const ProductForm: FC<ProductFormType> = ({ instance, handleFormSubmit, }) => {
    const [open, setOpen] = useState(false)
    const { user } = useUser();
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
            product_name: instance?.product_name || "",
            product_image: instance?.product_image || "",
            workspace_id: user?.workspace_id || "",
        },
        // validationSchema: companyDataValidate,
        onSubmit: async (data) => {
            try {
                const modifiedData = {
                    product_name: values.product_name || "",
                    product_image: values.product_image || "",
                    workspace_id: user?.workspace_id || "",
                };
                if (instance) {
                    await handleFormSubmit(modifiedData);
                    // setOpen(!open);
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
                    // setOpen(!open);
                }
                resetForm();
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
    console.log(errors)

    return (
        <div>
            <Dialog onOpenChange={() => setOpen(!open)} open={open}>
                <div className='cursor-pointer' onClick={() => setOpen(!open)}>
                    {instance ? <div className="bg-black p-[7px]  rounded-full ">
                        <RiEditCircleLine className=" text-green-500" />
                    </div> : <div>
                        <Button reverse icon={<IoMdAdd className='text-xl' />} label=' New Item' />
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
                                id="product_name"
                                label='product_name Name'
                                placeholder="product_name Name"
                                value={values.product_name}
                                onChange={handleChange}
                                type="text"
                                error={
                                    Boolean(errors.product_name) &&
                                    touched.product_name &&
                                    errors.product_name
                                }
                            />
                            <ImageUploadField
                                error={
                                    Boolean(errors.product_image) &&
                                    touched.product_image &&
                                    errors.product_image
                                }
                                setValue={(x: string) => setFieldValue("product_image", x)}
                                fieldKey={"product_image"}
                                value={values.product_image}
                            />

                            <div className='w-full flex justify-center'>
                                <Button
                                    // onClick={() => setOpen(!open)}
                                    type='submit'
                                    disabled={isSubmitting}
                                    className="w-full"
                                    variant={'regulerOutlineBtn'}
                                    label={isSubmitting ? 'Saving..' : 'Save'}
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
