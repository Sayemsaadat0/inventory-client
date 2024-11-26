import { FC, useState } from 'react';
import { useFormik } from 'formik';
import Button from '../../../ui/button';
import TextInput from '../../../shared/inputs/TextInput';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../../../ui/dialog';
import { IoMdAdd } from "react-icons/io";
import { toast } from '../../../../hooks/use-toast';
// import SearchSelectInput from '../../../shared/inputs/SearchSelectInput';
import { useUser } from '../../../context/UserProvider';
import { RiEditCircleLine } from 'react-icons/ri';
import { useGetproductsData } from '../../../hooks/entities/product.hook';
import { useGetUnitsData } from '../../../hooks/inventory/units.hooks';
import { useGetWarehouseData } from '../../../hooks/inventory/warehouse.hooks';
import Select from "react-dropdown-select";
import { StockValidation } from '../../../../validation/Validations';

type AddToStockFormType = {
    instance?: any,
    handleFormSubmit: Function,
    stockData?: any
}



const AddToStockForm: FC<AddToStockFormType> = ({ instance, handleFormSubmit, stockData }) => {

    if (!stockData) return null;


    // This will skip hooks
    const { user } = useUser();
    const [open, setOpen] = useState(false);

    const { data: productData, isLoading: isProductLoading } = useGetproductsData()
    const { data: unitData } = useGetUnitsData()
    const { data: warehouseData } = useGetWarehouseData()

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
            warehouse_name: instance?.warehouse_name || "",
            quantity: instance?.quantity || 0,
            notes: instance?.notes || "",
            workspace_id: user?.workspace_id || "no workspace id found",
        },
        validationSchema: StockValidation,
        onSubmit: async (data: any) => {
            try {
                let form_data = new FormData();
                form_data.append("product_name ", data.product_name);
                form_data.append("product_id", data.product_id);
                form_data.append("product_image", data.product_image);

                form_data.append("unit_name", data.unit_name);
                form_data.append("warehouse_name", data.warehouse_name);
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
                    toast({
                        variant: "destructive",
                        description: `${key?.attr}- ${key?.detail}`,
                    });
                }
            }
        },
    });




    const stockProductIds = stockData?.map((item: any) => item.product_id) || [];

    const productOptions = !isProductLoading && productData && productData
        .filter((product: any) => !stockProductIds.includes(product.id));



    const handleProductSelect = (selected: any) => {
        if (selected && selected.length > 0) {
            const selectedProduct = selected[0];
            setFieldValue("product_id", selectedProduct.id);
            setFieldValue("product_name", selectedProduct.product_name || "");
            setFieldValue("product_image", selectedProduct.product_image || "");
        }
    };


    const handleWarehouseSelect = (selected: any) => {
        setFieldValue('warehouse_name', selected[0]?.warehouse_name || '');
    };

    const handleUnitSelect = (selected: any) => {
        setFieldValue('unit_name', selected[0]?.name || '');
    };


    return (
        <div>
            <Dialog onOpenChange={() => setOpen(!open)} open={open}>
                <div className='cursor-pointer' onClick={() => setOpen(!open)}>
                    {instance ? (
                        <div className="bg-black p-[7px] rounded-full">
                            <RiEditCircleLine className="text-green-500" />
                        </div>
                    ) : (
                        <div>
                            <Button reverse icon={<IoMdAdd className='text-xl' />} label='Add New' />
                        </div>
                    )}
                </div>

                <DialogContent className='max-h-[80%] overflow-y-auto'>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                    <div className='p-5 md:p-10 space-y-5'>
                        <div>
                            {instance ? (
                                <p className='text-xl font-semibold'>Edit Information</p>
                            ) : (
                                <p className='text-xl font-semibold'>Add new stock</p>
                            )}
                        </div>
                        <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
                            <div className="relative  w-full space-y-2">
                                <label htmlFor="products">Select Unit</label>
                                <Select
                                    className="products"
                                    values={[]}
                                    labelField="product_name"
                                    valueField="product_name"
                                    placeholder="Select Products"
                                    options={productOptions}
                                    onChange={handleProductSelect}
                                />
                                {touched.product_name && errors.product_name && (
                                    <div className="text-red-500 text-[12px]">{String(errors.product_name)}</div>
                                )}
                            </div>

                            <div className='flex gap-4 '>
                                <div className="relative  w-full space-y-2">
                                    <label htmlFor="unit_name">Select Unit</label>
                                    <Select
                                        className="unit_name"
                                        values={values?.unit_name ? [{ unit_name: values.unit_name }] : []}
                                        labelField="name"
                                        valueField="name"
                                        placeholder="Select Unit"
                                        options={unitData}
                                        onChange={handleUnitSelect}
                                    />
                                    {touched.unit_name && errors.unit_name && (
                                        <div className="text-red-500 text-[12px]">{String(errors.unit_name)}</div>
                                    )}
                                </div>
                                <div className="relative  w-full space-y-2">
                                    <label htmlFor="warehouse_name">Select Warehouse</label>
                                    <Select
                                        className="!w-full"
                                        values={values?.warehouse_name ? [{ warehouse_name: values.warehouse_name }] : []}
                                        labelField="warehouse_name"
                                        valueField="warehouse_name"
                                        placeholder="Select Warehouse"
                                        options={warehouseData}
                                        onChange={handleWarehouseSelect}
                                    />
                                    {touched.product_name && errors.product_name && (
                                        <div className="text-red-500 text-[12px]">{String(errors.product_name)}</div>
                                    )}
                                </div>
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

export default AddToStockForm;

