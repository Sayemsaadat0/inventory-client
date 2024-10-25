
import { FC } from 'react';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import Button from '../../../ui/button';
import TextInput from '../../../shared/inputs/TextInput';
import { useUser } from '../../../context/UserProvider';
import { toast } from '../../../../hooks/use-toast';


// Validation schema



type PaymentTypeFormType = {
    handleFormSubmit: Function,
}



const PaymentTypeForm: FC<PaymentTypeFormType> = ({ handleFormSubmit }) => {
    const { user } = useUser()
    const {
        handleChange,
        values,
        touched,
        errors,
        handleSubmit,
        isSubmitting,
    } = useFormik({
        initialValues: {
            payment_type: '',
            workspace_id: user?.workspace_id || ""
        },
        onSubmit: async (data) => {
            try {
                await handleFormSubmit(data)
                toast({
                    variant: 'default',
                    description: 'Payment-Type Created!'
                })
            } catch (err: any) {
                toast({
                    variant: 'destructive',
                    description: `${err?.error}`
                })
            }
        },
    });


    return (
        <div className=''>
            <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
                <TextInput
                    className="w-full"
                    id="payment_type"
                    label="Payment Type"
                    value={values.payment_type}
                    onChange={handleChange}
                    type="text"
                    error={
                        Boolean(errors.payment_type) &&
                        touched.payment_type &&
                        errors.payment_type
                    }
                />


                <div className='w-full flex justify-center'>
                    <Button
                        type='submit'
                        disabled={isSubmitting}
                        className="w-full"
                        label={isSubmitting ? 'Saving..' : 'Save'}
                    />
                </div>
            </form>
        </div>
    );
};

export default PaymentTypeForm;
