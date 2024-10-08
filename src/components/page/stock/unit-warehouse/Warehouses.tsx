import SharedTable, { SharedTableColumn } from '../../../shared/table/SharedTable';
import { fakeUnits } from '../../../../data/dummy.data';
import { FC } from 'react';
import { useFormik } from 'formik';
import TextInput from '../../../shared/inputs/TextInput';
import Button from '../../../ui/button';
type WarehousesType = {
    handleFormSubmit: Function,
    isLoading?: boolean,
}
const WarehousesForm: FC<WarehousesType> = ({ isLoading, handleFormSubmit, }) => {
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
            unit_name: "",
        },
        // validationSchema: companyDataValidate,
        onSubmit: async (data) => {
            try {
                await handleFormSubmit(data);
                resetForm()
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
    return <div>
        <form className=" space-y-5" autoComplete="off" onSubmit={handleSubmit}>
            <TextInput
                className="w-full rounded-[10px]"
                id="unit_name"
                label='Add New Warehouse'
                placeholder="Enter Warehouse"
                value={values.unit_name}
                onChange={handleChange}
                type="text"
                error={
                    Boolean(errors.unit_name) &&
                    touched.unit_name &&
                    errors.unit_name
                }
            />
            <div >
                <Button
                    type='submit'
                    disabled={isSubmitting}
                    className="w-full rounded-[10px]"
                    label={isLoading ? 'Saving..' : 'Save'}
                />
            </div>
        </form>
    </div>
}




// 
const Warehouses = () => {
    const unitColumnr: SharedTableColumn[] = [
        {
            title: "Unit",
            dataKey: "events",
            row: (data: any) => (
                <div className="">
                    {data?.name}
                </div>
            ),
        },
        {
            title: "Action",
            dataKey: "Action",
            row: () => (
                <div className="flex justify-end">
                    <span className="px-2 bg-red-100 text-red-500  border rounded-full ">X</span>
                </div>
            ),
        },
    ];
    return <div className='flex gap-5' >
        <div className='p-5 h-fit bg-black/50 rounded-[10px] backdrop-blur-sm'>
            <WarehousesForm handleFormSubmit={() => undefined} isLoading={false} />
        </div>
        <div className='w-full rounded-[10px] overflow-hidden '>
            <SharedTable
                columns={unitColumnr}
                isLoading={false}
                data={fakeUnits || []}
            />
        </div>
    </div>
}



export default Warehouses