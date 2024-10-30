
import { FC, useState } from 'react';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import Button from '../../../ui/button';
import TextInput from '../../../shared/inputs/TextInput';
import { toast } from '../../../../hooks/use-toast';
import ImageUploadField from '../../../shared/inputs/ImageUploadField';
import { useUser } from '../../../context/UserProvider';
import { Dialog, DialogContent, DialogTitle } from "../../../ui/dialog";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdAdd } from 'react-icons/io';

// Validation schema
// const validationSchema = Yup.object({
//     name: Yup.string().required('Name is required'),
//     email: Yup.string().required('Email is required'),
//     password: Yup.string().required('Password is required'),
//     confirm_password: Yup.string().required('Password is required'),
// });


type UsersFormType = {
    handleFormSubmit: Function,
    instance?: any
}



const UsersForm: FC<UsersFormType> = ({ instance, handleFormSubmit }) => {
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const {
        handleChange,
        values,
        touched,
        errors,
        handleSubmit,
        resetForm,
        setFieldValue,
        isSubmitting,
    } = useFormik({
        initialValues: {
            email: instance?.email || '',
            password: '',
            username: instance?.username || '',
            phone_number: instance?.phone_number || '',
            image: instance?.workspace_id || "",
            company_name: user?.company_name || "",
            company_logo: user?.company_logo || "",
            user_image: instance?.user_image || '',
            workspace_id: user?.workspace_id || "no workspace id found",
            role: instance?.role || '',
        },
        // validationSchema,
        onSubmit: async (data: any) => {
            try {
                let form_data = new FormData();
                form_data.append("email", data.email);
                form_data.append("username", data.username);
                form_data.append("phone_number", data.phone_number);
                form_data.append("user_image", data.user_image);
                form_data.append("role", data.role);
                form_data.append("image", data.image);
                form_data.append("company_name", data.company_name);
                form_data.append("company_logo", data.company_logo);
                form_data.append("workspace_id", data.workspace_id);
                form_data.append("password", data.password);
            
                if (instance) {
                    await handleFormSubmit(form_data);
                    toast({
                        variant: "default",
                        description: "Edited Successfully",
                    });

                    resetForm();
                } else {
                    await handleFormSubmit(data);
                    toast({
                        variant: "default",
                        description: "Added Successfully",
                    });

                    resetForm();
                }
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

    console.log(values)
    console.log(errors)

    return (
        <Dialog onOpenChange={() => setOpen(!open)} open={open}>
            <div className="cursor-pointer" onClick={() => setOpen(!open)}>
                {instance ? (
                    <div className="bg-black p-[7px]  rounded-full ">
                        <RiEditCircleLine className=" text-green-500" />
                    </div>
                ) : (
                    <div>
                        <Button
                            type='button'
                            reverse
                            icon={<IoMdAdd className="text-xl" />}
                            label="Add User"
                        />
                    </div>
                )}
            </div>
            <DialogContent>
                <DialogTitle></DialogTitle>
                <div className=' rounded-[12px] p-5 md:p-10 space-y-5'>
                    <h3 className='text-xl font-semibold text-center'>Please enter User's details to continue</h3>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6 mb-4" >
                            <TextInput
                                className="w-full"
                                id="username"
                                label="Enter User's name"
                                value={values.username}
                                onChange={handleChange}
                                type="text"
                                error={
                                    Boolean(errors.username) &&
                                    touched.username &&
                                    errors.username
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
                            {
                                !instance && <TextInput
                                    className="w-full"
                                    id="password"
                                    label="Enter Your password"
                                    value={values.password}
                                    onChange={handleChange}
                                    type="password"
                                    error={
                                        Boolean(errors.password) &&
                                        touched.password &&
                                        errors.password
                                    }
                                />
                            }


                            <TextInput
                                className="w-full "
                                id="phone_number"
                                label="phone number"
                                value={values.phone_number}
                                onChange={handleChange}
                                type="phone_number"
                                error={
                                    Boolean(errors.phone_number) &&
                                    touched.phone_number &&
                                    errors.phone_number
                                }
                            />
                            <TextInput
                                className="w-full "
                                id="role"
                                label="Role"
                                value={values.role}
                                onChange={handleChange}
                                type="role"
                                error={
                                    Boolean(errors.role) &&
                                    touched.role &&
                                    errors.role
                                }
                            />
                            <TextInput
                                className="w-full "
                                id="company_name"
                                label="Company Name"
                                value={values.company_name}
                                onChange={handleChange}
                                type="company_name"
                                error={
                                    Boolean(errors.company_name) &&
                                    touched.company_name &&
                                    errors.company_name
                                }
                            />
                        </div>


                        <ImageUploadField
                            error={
                                Boolean(errors.user_image) &&
                                touched.user_image &&
                                errors.user_image
                            }
                            setValue={(x: any) => setFieldValue("user_image", x)}
                            fieldKey={"user_image"}
                            value={values.user_image}
                        />

                        <div className='w-full flex justify-center mt-4'>
                            <Button
                                onClick={() =>
                                    setOpen(!open)}
                                type='submit'
                                disabled={isSubmitting}
                                className="w-full border"
                                // variant={'regulerBtn'}
                                label={isSubmitting ? 'Adding User..' : 'Add User'}
                            />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>



    );
};

export default UsersForm;
