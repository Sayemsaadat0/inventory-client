import * as yup from 'yup';


export const companyDataValidate = () =>
    yup.object().shape({
        company_name: yup.string().max(255).required("This field is required"),
        location: yup.string().max(255).required("This field is required"),
    });