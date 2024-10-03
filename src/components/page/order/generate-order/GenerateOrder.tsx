import { FC, useState } from "react";
import TextInput from "../../../shared/inputs/TextInput"; 
import Button from "../../../ui/button";
import { useFormik } from "formik";

type Product = {
    product_name: string;
    quantity: number;
    unit_price: number;
};

type GenerateOrderFormType = {
    handleFormSubmit: (values: any) => undefined;
    isLoading?: boolean;
};

const GenerateOrderForm: FC<GenerateOrderFormType> = ({ isLoading, handleFormSubmit }) => {
    const [products, setProducts] = useState<Product[]>([{ product_name: "", quantity: 0, unit_price: 0 }]);

    const calculateTotalPrice = (products: Product[]) => {
        return products.reduce((total, product) => total + product.quantity * product.unit_price, 0);
    };

    const {
        handleChange,
        values,
        touched,
        errors,
        handleSubmit,
        isSubmitting,
        setFieldValue,
    } = useFormik({
        initialValues: {
            invoice_id: '',
            customer: {
                customer_name: '',
                customer_phone_no: '',
                customer_id: '',
            },
            products: products,
            warehouse: '',
            date: '',
            created_at: new Date().toISOString().split('T')[0], // Current date
            total_price: 0,
            isPaid: false,
        },
        onSubmit: async (data) => {
            try {
                await handleFormSubmit(data);
                console.log("Form Data:", data);
            } catch (err) {
                console.log(err);
            }
        },
    });

    const handleAddProduct = () => {
        setProducts([...products, { product_name: "", quantity: 0, unit_price: 0 }]);
    };

    const handleRemoveProduct = (index: number) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        setFieldValue("products", updatedProducts);
        setFieldValue("total_price", calculateTotalPrice(updatedProducts)); // Update total price after product removal
    };

    const handleProductChange = (index: number, field: string, value: string | number) => {
        const updatedProducts = products.map((product, i) =>
            i === index ? { ...product, [field]: value } : product
        );
        setProducts(updatedProducts);
        setFieldValue("products", updatedProducts);
        setFieldValue("total_price", calculateTotalPrice(updatedProducts)); // Update total price after quantity/unit price change
    };


    return (
        <div className="rounded-[12px] space-y-5">
            <form autoComplete="off" onSubmit={handleSubmit}>
                {/* Invoice ID */}
                <div className="grid grid-cols-10 items-center bg-white/20 py-5 px-2 gap-10">
                    <div className="col-span-1">
                        <span>Invoice ID</span>
                    </div>
                    <div className="col-span-2">
                        <TextInput
                            className="w-full"
                            id="invoice_id"
                            value={values.invoice_id}
                            onChange={handleChange}
                            type="text"
                            error={Boolean(errors.invoice_id) && touched.invoice_id && errors.invoice_id}
                        />
                    </div>
                </div>

                {/* Customer Information */}
                <div className="py-5">
                    <h3>Customer Information</h3>
                    <div className="grid grid-cols-10 gap-5">
                        <div className="col-span-3">
                            <TextInput
                                className="w-full"
                                id="customer.customer_name"
                                value={values.customer.customer_name}
                                onChange={handleChange}
                                type="text"
                                label="Customer Name"
                                error={Boolean(errors.customer?.customer_name) && touched.customer?.customer_name && errors.customer?.customer_name}
                            />
                        </div>
                    </div>
                </div>

                {/* Product Table */}
                <div className="py-5">
                    <div className="mt-4">
                        <Button
                            type="button"
                            className="bg-green-500 text-white py-2"
                            onClick={handleAddProduct}
                            label="Add Product"
                        />
                    </div>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-900">
                                <th className="py-2 px-4">Product Name</th>
                                <th className="py-2 px-4">Quantity</th>
                                <th className="py-2 px-4">Unit Price</th>
                                <th className="py-2 px-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4">
                                        <TextInput
                                            className="w-full"
                                            id="product_name"
                                            value={product.product_name}
                                            onChange={(e) => handleProductChange(index, "product_name", e.target.value)}
                                            type="text"
                                            error={Boolean(errors.products) && touched.products && errors.products}
                                        />
                                    </td>
                                    <td className="py-2 px-4">
                                        <TextInput
                                            className="w-full"
                                            id="quantity"
                                            value={product.quantity}
                                            onChange={(e) => handleProductChange(index, "quantity", Number(e.target.value))}
                                            type="number"
                                        />
                                    </td>
                                    <td className="py-2 px-4">
                                        <TextInput
                                            className="w-full"
                                            id="unit_price"
                                            value={product.unit_price}
                                            onChange={(e) => handleProductChange(index, "unit_price", Number(e.target.value))}
                                            type="number"
                                        />
                                    </td>
                                    <td className="py-2 px-4">
                                        <button
                                            type="button"
                                            className="text-red-600"
                                            onClick={() => handleRemoveProduct(index)}
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Warehouse, Date, Created At, and Total Price */}
                <div className="grid grid-cols-2 gap-5">
                    <TextInput
                        className="w-full"
                        id="warehouse"
                        value={values.warehouse}
                        onChange={handleChange}
                        type="text"
                        label="Warehouse"
                        error={Boolean(errors.warehouse) && touched.warehouse && errors.warehouse}
                    />
                    <TextInput
                        className="w-full"
                        id="date"
                        value={values.date}
                        onChange={handleChange}
                        type="date"
                        label="Date"
                        error={Boolean(errors.date) && touched.date && errors.date}
                    />
                </div>

                <div className="grid grid-cols-2 gap-5 py-5">
                    <TextInput
                        className="w-full bg"
                        id="created_at"
                        value={values.created_at}
                        onChange={handleChange}
                        type="text"
                    // disabled
                    />
                    <TextInput
                        className="w-full"
                        id="total_price"
                        value={values.total_price}
                        onChange={handleChange}
                        type="number"

                        error={Boolean(errors.total_price) && touched.total_price && errors.total_price}
                    // disabled
                    />
                </div>

                {/* Submit Button */}
                <div className="w-full flex justify-center">
                    <Button
                        disabled={isSubmitting}
                        className="w-full"
                        variant={"regulerBtn"}
                        label={isLoading ? "Publishing.." : "Publish"}
                    />
                </div>
            </form>
        </div>
    );
};

const GenerateOrder = () => {
    return (
        <div className="relative">
            <div>
                <GenerateOrderForm isLoading={false} handleFormSubmit={() => undefined} />
            </div>
        </div>
    );
};

export default GenerateOrder;
