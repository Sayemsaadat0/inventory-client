import { FC, useState } from "react";
import { useFormik } from "formik";
import TextInput from "../../../shared/inputs/TextInput";
import SearchSelectInput from "../../../shared/inputs/SearchSelectInput";
import Title from "../../../shared/Title";
import Button from "../../../ui/button";
import CloseIcon from "../../../shared/icons/CloseIcon";

// Define types for Product and Select options
type Product = {
    product_name: string;
    quantity: number;
    unit_price: number;
    unit: string;
};

interface SelectOptionType {
    value: string;
    label: string;
}

type GenerateOrderFormType = {
    handleFormSubmit: (values: any) => undefined;
    isLoading?: boolean;
};

// Sample data for customer options
const fakeCustomerData = [
    { id: "1", customer_name: "John Doe" },
    { id: "2", customer_name: "Jane Smith" },
    { id: "2", customer_name: "Jane Smith" },
];

// Predefined options for the customer data
const customerOptions = fakeCustomerData.map(i => ({ label: i.customer_name, value: i.id }));

const productOptions: SelectOptionType[] = [
    { value: "1", label: "Product A" },
    { value: "2", label: "Product B" },
];

const warehouseOptions: SelectOptionType[] = [
    { value: "1", label: "Warehouse 1" },
    { value: "2", label: "Warehouse 2" },
];

// Sample data for unit options
const unitOptions: SelectOptionType[] = [
    { value: "kg", label: "Kilogram" },
    { value: "pcs", label: "Pieces" },
];

const GenerateOrderForm: FC<GenerateOrderFormType> = ({ isLoading, handleFormSubmit }) => {
    const [products, setProducts] = useState<Product[]>([{ product_name: "", quantity: 0, unit_price: 0, unit: "" }]);

    const calculateTotalPrice = (products: Product[]) => {
        return products.reduce((total, product) => total + product.quantity * product.unit_price, 0);
    };

    const {
        handleChange,
        values,
        handleSubmit,
        isSubmitting,
        setFieldValue,
    } = useFormik({
        initialValues: {
            customer: {
                customer_name: '',
                customer_id: '',
            },
            products: products,
            warehouse: '',
            date: '',
            created_at: new Date().toISOString().split('T')[0],
            total_price: 0,
            isPaid: false,
        },
        onSubmit: async (data) => {
            try {
                handleFormSubmit(data);
                console.log("Form Data:", data);
            } catch (err) {
                console.log(err);
            }
        },
    });

    const handleAddProduct = () => {
        setProducts([...products, { product_name: "", quantity: 0, unit_price: 0, unit: "" }]);
    };

    const handleRemoveProduct = (index: number) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        setFieldValue("products", updatedProducts);
        setFieldValue("total_price", calculateTotalPrice(updatedProducts));
    };

    const handleProductChange = (index: number, field: string, value: string | number) => {
        const updatedProducts = products.map((product, i) =>
            i === index ? { ...product, [field]: value } : product
        );
        setProducts(updatedProducts);
        setFieldValue("products", updatedProducts);
        setFieldValue("total_price", calculateTotalPrice(updatedProducts));
    };

    const handleCustomerSelect = (item: { value: string; label: string }) => {
        setFieldValue("customer.customer_id", item.value);
        setFieldValue("customer.customer_name", item.label);
    };

    const handleWarehouseSelect = (item: { value: string; label: string }) => {
        setFieldValue("warehouse", item.value);
    };

    const handleUnitSelect = (index: number, item: { value: string; label: string }) => {
        handleProductChange(index, "unit", item.value);
    };

    // console.log(values);
    return (
        <div className="">
            <Title title="Generate Order" />
            <form autoComplete="off" className="bg-black/40 backdrop-blur-sm p-5" onSubmit={handleSubmit}>
                <div className="w-[20%] ">
                    <SearchSelectInput
                        title="Customer Information"
                        data={customerOptions} // Using the predefined options directly
                        onSelect={handleCustomerSelect}
                        placeholder="Search Customer"
                    />
                </div>
                <hr className="my-10" />

                {/* Product Table */}
                <div className="">
                    {/* onClick={handleAddProduct} */}
                    <Button
                        className="py-1 "
                        onClick={handleAddProduct}
                        label="Add Product" />

                    <table className="w-full text-left table-auto font-normal mt-4 ">
                        <thead className="bg-black">
                            <tr className=" font-normal ">
                                <th className="font-normal text-sm py-2 px-4 ">Product Name</th>
                                <th className="font-normal text-sm py-2 px-4 ">Quantity</th>
                                <th className="font-normal text-sm py-2 px-4 ">Unit Price</th>
                                <th className="font-normal text-sm py-2 px-4 ">Unit</th>
                                <th className="font-normal text-sm py-2 px-4"></th>
                            </tr>
                        </thead>
                        <tbody >
                            {products.map((product, index) => (
                                <tr key={index} >
                                    <td>
                                        <SearchSelectInput
                                            data={productOptions}
                                            onSelect={(item) => handleProductChange(index, "product_name", item.label)}
                                            placeholder="Search Product"
                                        />
                                    </td>
                                    <td >
                                        <TextInput
                                            className="w-full py-0.5 "
                                            id={`quantity-${index}`}
                                            placeholder="Enter quantity"
                                            value={product.quantity}
                                            onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                                            type="number"
                                        />
                                    </td>
                                    <td className="">
                                        <TextInput
                                            className="w-full py-0.5"
                                            id={`unit_price-${index}`}
                                            placeholder="Enter unit price"
                                            value={product.unit_price}
                                            onChange={(e) => handleProductChange(index, "unit_price", e.target.value)}
                                            type="number"
                                        />
                                    </td>
                                    <td className="">
                                        <SearchSelectInput
                                            data={unitOptions}
                                            onSelect={(item) => handleUnitSelect(index, item)}
                                            placeholder="Search Unit"
                                        />
                                    </td>
                                    <td className=" flex items-center justify-center mt-1.5">
                                        <button
                                            type="button"
                                            className="text-red-600"
                                            onClick={() => handleRemoveProduct(index)}
                                        >
                                            <CloseIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Warehouse and Date */}
                <div className="py-5">
                    <h3>Warehouse</h3>
                    <SearchSelectInput
                        data={warehouseOptions}
                        onSelect={handleWarehouseSelect}
                        placeholder="Search Warehouse"
                    />
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <input
                        className="w-full"
                        value={values.date}
                        onChange={handleChange}
                        type="date"
                        placeholder="Date"
                    />
                </div>

                <div className="grid grid-cols-2 gap-5 py-5">
                    <input
                        className="w-full"
                        value={calculateTotalPrice(products)}
                        onChange={handleChange}
                        type="number"
                        disabled
                    />
                </div>

                {/* Submit Button */}
                <div className="w-full flex justify-center">
                    <button
                        disabled={isSubmitting}
                        className="w-full bg-blue-500 text-white py-2"
                        type="submit"
                    >
                        {isLoading ? "Publishing.." : "Publish"}
                    </button>
                </div>
            </form>
        </div>
    );
};

const GenerateOrder = () => {
    return (
        <div className="relative">
            <GenerateOrderForm isLoading={false} handleFormSubmit={() => undefined} />
        </div>
    );
};

export default GenerateOrder;
