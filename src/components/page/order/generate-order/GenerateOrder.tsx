import { FC, useState } from "react";
import { useFormik } from "formik";
import TextInput from "../../../shared/inputs/TextInput";
import SearchSelectInput from "../../../shared/inputs/SearchSelectInput";
import Button from "../../../ui/button"; // Custom Button Component
import { MdOutlineDeleteOutline } from "react-icons/md";
import CustomerForm from "../../entities/customer/CustomerForm";

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
];

// Sample data for warehouse options
const fakeWarehouseData = [
    { id: "1", warehouse_name: "Warehouse A" },
    { id: "2", warehouse_name: "Warehouse B" },
];

// Predefined options for the customer and warehouse data
const customerOptions = fakeCustomerData.map(i => ({ label: i.customer_name, value: i.id }));
const warehouseOptions = fakeWarehouseData.map(i => ({ label: i.warehouse_name, value: i.warehouse_name }));

const productOptions: SelectOptionType[] = [
    { value: "1", label: "Product A" },
    { value: "2", label: "Product B" },
];

const GenerateOrderForm: FC<GenerateOrderFormType> = ({ isLoading, handleFormSubmit }) => {
    const [products, setProducts] = useState<Product[]>([{ product_name: "", quantity: 0, unit_price: 0, unit: "" }]);
    // const date = new Date();

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
            warehouse_name: '',
            products: products,
            date: '',
            total_price: 0,
            isPaid: false,
        },
        onSubmit: async (data) => {
            try {
                data.total_price = calculateTotalPrice(products);
                handleFormSubmit(data);
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
        const updatedProducts = products.map((product, i) => {
            if (i === index) {
                if (field === "quantity" || field === "unit_price") {
                    return { ...product, [field]: Number(value) }; // Convert value to number
                }
                return { ...product, [field]: value };
            }
            return product;
        });
        setProducts(updatedProducts);
        setFieldValue("products", updatedProducts);
        setFieldValue("total_price", calculateTotalPrice(updatedProducts));
    };

    const handleCustomerSelect = (item: { value: string; label: string }) => {
        setFieldValue("customer.customer_id", item.value);
        setFieldValue("customer.customer_name", item.label);
    };

    const handleWarehouseSelect = (item: { value: string }) => {
        setFieldValue("warehouse_name", item.value); // Set warehouse_name directly
    };

    console.log(values);
    return (
        <div className="p-5  bg-black/30 backdrop-blur-sm">
            <form autoComplete="off" className="relative" onSubmit={handleSubmit}>
                <div className="flex  justify-between gap-10">
                    <div className="w-full">
                        <TextInput
                            className="w-full  bg-black/20 border-0"
                            label="Select a date"
                            id="date"
                            placeholder="Date"
                            value={values.date}
                            onChange={handleChange}
                            type="date"
                        />
                    </div>
                    <div className="w-full">
                        <SearchSelectInput
                            inputClassName="placeholder:text-white  bg-black/20 border-0 py-2 w-full"
                            title="Select Warehouse"
                            data={warehouseOptions}
                            onSelect={handleWarehouseSelect}
                            placeholder="Search Warehouse"
                        />
                    </div>
                    <div className="flex justify-end items-end w-full ">
                        <SearchSelectInput
                            inputClassName="placeholder:text-white  border-0  bg-black/20 py-2 w-full"
                            title="Customer Information"
                            data={customerOptions}
                            onSelect={handleCustomerSelect}
                            placeholder="Search Customer"
                        />
                        <div>
                            <CustomerForm handleFormSubmit={() => undefined} isLoading={false} />
                        </div>
                    </div>
                </div>
                <div className="h-[0.1px] w-full bg-gray-500 my-5"></div>
                <div>
                    <Button
                        className="py-2 px-4"
                        onClick={handleAddProduct}
                        label="Add More"
                    />
                    <div className="min-h-[400px] max-h-[400px] overflow-y-auto">
                        <table className="w-full border text-left table-auto font-normal">
                            <thead className="bg-gradient-to-r from-amber-100 to-teal-200 text-black">
                                <tr className="font-normal">
                                    <th className="font-normal text-sm p-2 w-10">Index</th>
                                    <th className="font-normal text-sm py-2 px-4">Product Name</th>
                                    <th className="font-normal text-sm py-2 px-4">Unit</th>
                                    <th className="font-normal text-sm py-2 px-4">Quantity</th>
                                    <th className="font-normal text-sm py-2 px-4">Unit Price</th>
                                    <th className="font-normal text-sm py-2 px-4 flex justify-end">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-black/20">
                                {products.map((product, index) => (
                                    <tr key={index} className="border h-auto">
                                        <td className="text-center">{index + 1}</td>
                                        <td className="border">
                                            <SearchSelectInput
                                                inputClassName="placeholder:text-white py-2 border-none w-full bg-inherit"
                                                data={productOptions}
                                                onSelect={(item) => handleProductChange(index, "product_name", item.label)}
                                                placeholder="Search Product"
                                            />
                                        </td>
                                        <td className="border">
                                            <TextInput
                                                className="placeholder:text-white placeholder:text-[12px] py-2 border-none w-full bg-inherit"
                                                id={`unit-${index}`}
                                                placeholder="Unit"
                                                value={product.unit}
                                                onChange={(e) => handleProductChange(index, "unit", e.target.value)}
                                                type="text"
                                            />
                                        </td>
                                        <td className="border">
                                            <TextInput
                                                className="placeholder:text-white placeholder:text-[12px] py-2 border-none w-full bg-inherit"
                                                id={`quantity-${index}`}
                                                placeholder="Enter quantity"
                                                value={product.quantity}
                                                onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                                                type="number"
                                            />
                                        </td>
                                        <td className="border">
                                            <TextInput
                                                className="placeholder:text-white placeholder:text-[12px] py-2 border-none w-full bg-inherit"
                                                id={`unit_price-${index}`}
                                                placeholder="Enter unit price"
                                                value={product.unit_price}
                                                onChange={(e) => handleProductChange(index, "unit_price", e.target.value)}
                                                type="number"
                                            />
                                        </td>
                                        <td className="border flex justify-end">
                                            <button
                                                type="button"
                                                className="text-2xl text-red-500 p-2"
                                                onClick={() => handleRemoveProduct(index)}
                                            >
                                                <MdOutlineDeleteOutline />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end  mt-10">

                    <div className=" backdrop-blur-md bg-black/20 p-2 w-[20%] ">
                        <div className="border-b grid grid-cols-3 justify-items-start py-3">
                            <p>Products </p>
                            <p>:</p>
                            <p>{products?.length}</p>
                        </div>
                        <div className=" py-3  grid grid-cols-3 justify-items-start">
                            <p className="">Grand Total </p>
                            <p>:</p>
                            <p>$ {calculateTotalPrice(products)}</p>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                label={isLoading ? "Loading..." : "Generate Order"}
                                disabled={isSubmitting || isLoading}
                                className=" w-full"
                            />
                        </div>
                    </div>
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
