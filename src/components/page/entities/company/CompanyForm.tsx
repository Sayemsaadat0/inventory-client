
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


type CompanyFormType = {
    handleFormSubmit: Function,
    isLoading?: boolean,
}



const CompanyForm: FC<CompanyFormType> = ({ isLoading, handleFormSubmit }) => {
    const {
        handleChange,
        values,
        touched,
        errors,
        handleSubmit,
        isSubmitting,
    } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
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
        <div className=' rounded-[12px] p-5 md:p-10 space-y-5'>
            <h3 className='text-xl font-semibold text-center'>Sign up to Account</h3>
            <p className='text-center'>Please enter your details to continue</p>
            <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
                <TextInput
                    className="w-full"
                    id="name"
                    label="Enter your full name"
                    value={values.name}
                    onChange={handleChange}
                    type="text"
                    error={
                        Boolean(errors.name) &&
                        touched.name &&
                        errors.name
                    }
                />
                <TextInput
                    className="w-full"
                    id="email"
                    label="Enter Your Email"
                    value={values.email}
                    onChange={handleChange}
                    type="text"
                    error={
                        Boolean(errors.email) &&
                        touched.email &&
                        errors.email
                    }
                />


                <TextInput
                    className="w-full "
                    id="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    type="password"
                    error={
                        Boolean(errors.password) &&
                        touched.password &&
                        errors.password
                    }
                />
                <TextInput
                    className="w-full "
                    id="confirm_password"
                    label="Confirm Password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    type="password"
                    error={
                        Boolean(errors.confirm_password) &&
                        touched.confirm_password &&
                        errors.confirm_password
                    }
                />


                <div className='w-full flex justify-center'>
                    <Button
                        type='submit'
                        disabled={isSubmitting}
                        className="w-full"
                        variant={'regulerBtn'}
                        label={isLoading ? 'Publishing..' : 'Publish'}
                    />
                </div>
            </form>

        </div>
    );
};

export default CompanyForm;
