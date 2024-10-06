import { FC, useState } from 'react';
import { useFormik } from 'formik';
import Button from '../../../ui/button';
import TextInput from '../../../shared/inputs/TextInput';
import { Dialog, DialogContent } from '../../../ui/dialog';
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { fakeProductsData } from '../../../../data/dummy.data';

type AddToStockFormType = {
    instance?: any,
    handleFormSubmit: Function,
    isLoading?: boolean,
}

const AddToStockForm: FC<AddToStockFormType> = ({ instance, isLoading, handleFormSubmit }) => {
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
            warehouse: instance?.warehouse || "",
            unit: instance?.unit || "",
            product_id: instance?.product_id || "", 
            quantity: instance?.quantity || 0,
            notes: instance?.notes || "",
            image: null, // Handle image file manually
        },

        onSubmit: async (data) => {
            try {
                await handleFormSubmit(data);
                if (!instance) {
                    resetForm();
                }
            } catch (err: any) {
                console.log(err);
            }
        },
    });

    const [open, setOpen] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setFieldValue('image', file);
    };


    console.log(values)
    // Find the selected product based on product_id to set the correct display value
    // const selectedProduct = fakeProductsData.find(
    //     (product) => product.id === values.product_id
    // );

    return (
        <div>
            <Dialog onOpenChange={() => setOpen(!open)} open={open}>
                <div className='cursor-pointer' onClick={() => setOpen(!open)}>
                    {instance ? (
                        <div>
                            <FaEdit className='text-green-500' />
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
                            <TextInput
                                className="w-full"
                                id="warehouse"
                                label="Warehouse"
                                placeholder="Enter Warehouse"
                                value={values.warehouse}
                                onChange={handleChange}
                                type="text"
                                error={Boolean(errors.warehouse) && touched.warehouse && errors.warehouse}
                            />
                            <TextInput
                                className="w-full"
                                id="unit"
                                label="Unit"
                                placeholder="Enter Unit (e.g., Pieces)"
                                value={values.unit}
                                onChange={handleChange}
                                type="text"
                                error={Boolean(errors.unit) && touched.unit && errors.unit}
                            />
                            <div className="w-full">
                                <label className="block text-white px-2 font-medium pb-2">Product</label>
                                <select
                                    id="product_name"
                                    className="py-2 w-full bg-black border"
                                    value={values.product_id}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        setFieldValue('product_id', selectedId);
                                        const selectedProduct = fakeProductsData.find(p => p.id === selectedId);
                                        setFieldValue('product_name', selectedProduct?.item); // Set product name for display if needed
                                    }}
                                >
                                    <option value="" label="Select product" />
                                    {fakeProductsData.map(option => (
                                        <option key={option.id} value={option.id}>
                                            {option.item}
                                        </option>
                                    ))}
                                </select>
                                {/* {Boolean(errors.product_id) && touched.product_id && (
                                    // <p className="mt-2 text-sm text-red-600">{errors.product_id}</p>
                                )} */}
                            </div>
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
                            <div className="w-full">
                                <label htmlFor="image" className="block text-white px-2 font-medium pb-2">Image</label>
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="py-2 w-full bg-black border"
                                />
                                {Boolean(errors.image) && touched.image && (
                                    <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                                )}
                            </div>

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
