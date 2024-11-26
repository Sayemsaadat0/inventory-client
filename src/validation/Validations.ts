import * as yup from 'yup';


export const StockValidation = () =>
    yup.object().shape({
        product_name: yup.string().max(255).required("This field is required"),
        unit_name: yup.string().max(255).required("This field is required"),
        warehouse_name: yup.string().max(255).required("This field is required"),
        quantity: yup.number().max(30).required("This field is required"),
    });