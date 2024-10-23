
import { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../../../ui/button';
import TextInput from '../../../shared/inputs/TextInput';


// Validation schema
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirm_password: Yup.string().required('Password is required'),
});


type PaymentTypeFormType = {
    handleFormSubmit: Function,
}



const PaymentTypeForm: FC<PaymentTypeFormType> = ({ handleFormSubmit }) => {
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
        },
        validationSchema,
        onSubmit: async (data) => {
            try {
                await handleFormSubmit(data)
                console.log(data)
            } catch (err) {
                console.log(err)
            }
        },
    });

    console.log(values)

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
                        label={isSubmitting ? 'Saving..' : 'Saving'}
                    />
                </div>
            </form>

        </div>
    );
};

export default PaymentTypeForm;
