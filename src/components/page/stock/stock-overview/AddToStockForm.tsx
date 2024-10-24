import { FC, useState } from 'react';
import { useFormik } from 'formik';
import Button from '../../../ui/button';
import TextInput from '../../../shared/inputs/TextInput';
import { Dialog, DialogContent } from '../../../ui/dialog';
import { IoMdAdd } from "react-icons/io";
import { fakeProductsData, fakeUnits } from '../../../../data/dummy.data';
import { toast } from '../../../../hooks/use-toast';
import SearchSelectInput from '../../../shared/inputs/SearchSelectInput';
import { useUser } from '../../../context/UserProvider';
import { RiEditCircleLine } from 'react-icons/ri';

type AddToStockFormType = {
    instance?: any,
    handleFormSubmit: Function,
    isLoading?: boolean,
}

const AddToStockForm: FC<AddToStockFormType> = ({ instance, isLoading, handleFormSubmit }) => {
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
            product_id: instance?.product_id || "",
            product_image: instance?.product_image || "",
            unit_name: instance?.unit_name || "",
            quantity: instance?.quantity || 0,
            notes: instance?.notes || "",
            workspace_id: user?.workspace_id || "no workspace id found",
        },

        onSubmit: async (data: any) => {
            try {
                let form_data = new FormData();
                form_data.append("product_name ", data.product_name);
                form_data.append("product_id", data.product_id);
                form_data.append("product_image", data.product_image);
                form_data.append("unit_name", data.unit_name);
                form_data.append("quantity", data.quantity);
                form_data.append("notes", data.notes);
                form_data.append("workspace_id", data.workspace_id);

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
                    console.log(key);
                    toast({
                        variant: 'destructive',
                        description: `${key?.attr} - ${key?.detail}`,
                    });
                }
            }
        },
    });

    const [open, setOpen] = useState(false);

    const productOptions = fakeProductsData.map((i) => ({
        label: i.item,
        value: i.id,
        image: i?.image

    }));

    const unitOptions = fakeUnits.map((i) => ({
        label: i.name,
        value: i.id,
    }));

    const handleUnitSelect = (item: any) => {
        setFieldValue("unit_name", item.label);
    };

    const handleProductSelect = (item: any) => {
        setFieldValue("product_id", item.value);
        setFieldValue("product_name", item.label || "");
        setFieldValue("product_image", item.image || "");
    };

    return (
        <div>
            <Dialog onOpenChange={() => setOpen(!open)} open={open}>
                <div className='cursor-pointer' onClick={() => setOpen(!open)}>
                    {instance ? (
                        <div className="bg-black p-[7px]  rounded-full ">
                            <RiEditCircleLine className=" text-green-500" />
                        </div>
                    ) : (
                        <div>
                            <Button reverse icon={<IoMdAdd className='text-xl' />} label='Add New' />
                        </div>
                    )}
                </div>
                <DialogContent className='max-h-[80%] overflow-y-auto'>
                    <div className='p-5 md:p-10 space-y-5'>
                        <div>
                            {instance ? (
                                <p className='text-xl font-semibold'>Edit Information</p>
                            ) : (
                                <p className='text-xl font-semibold'>Add new stock</p>
                            )}
                        </div>
                        <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>


                            <SearchSelectInput
                                inputClassName="placeholder:text-white  bg-black/20 border border-white py-2 w-full"
                                title="Select Product"
                                data={productOptions}
                                onSelect={handleProductSelect}
                                placeholder="Search Product"
                            />

                            <SearchSelectInput
                                inputClassName="placeholder:text-white  bg-black/20 border border-white py-2 w-full"
                                title="Select Unit"
                                data={unitOptions}
                                onSelect={handleUnitSelect}
                                placeholder="Search Product"
                            />


                            <TextInput
                                className="w-full"
                                id="quantity"
                                label="Quantity"
                                placeholder="Enter Quantity"
                                value={values.quantity}
                                onChange={handleChange}
                                type="number"
                                error={Boolean(errors.quantity) && touched.quantity && errors.quantity}
                            />

                            <TextInput
                                className="w-full"
                                id="notes"
                                label="Notes"
                                placeholder="Enter Notes"
                                value={values.notes}
                                onChange={handleChange}
                                type="text"
                                error={Boolean(errors.notes) && touched.notes && errors.notes}
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

export default AddToStockForm;
