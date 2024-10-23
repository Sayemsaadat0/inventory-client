import { FC, useState } from "react";
import { useFormik } from "formik";
import TextInput from "../../../shared/inputs/TextInput";
import SearchSelectInput from "../../../shared/inputs/SearchSelectInput";
import Button from "../../../ui/button"; // Custom Button Component
import { MdOutlineDeleteOutline } from "react-icons/md";
import CustomerForm from "../../entities/customer/CustomerForm";
import { showDatePicker } from "../../../../lib/datePicker";
import { useUser } from "../../../context/UserProvider";
// import usePostData from "../../../hooks/usePostData";
import { format } from "date-fns";
// import { usePostCustomersData } from "../../../hooks/customer.hook";
import { usePostOrdersData } from "../../../hooks/order/generate-order.hook";
import { usePostCustomersData } from "../../../hooks/entities/customer.hook";
import { fakeCustomerData, fakeWarehouses } from "../../../../data/dummy.data";

// import { usePostOrdersData } from "../../../hooks/order/generate-order.hook";

// Define types for Product and Select options

// Fake Data
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




const productOptions: SelectOptionType[] = [
  { value: "1", label: "Product A" },
  { value: "2", label: "Product B" },
];
// fake Data

type GenerateOrderFormType = {
  handleFormSubmit: Function;
  isLoading?: boolean;
};

const GenerateOrderForm: FC<GenerateOrderFormType> = ({
  isLoading,
  handleFormSubmit,
}) => {
  const { user } = useUser();
  const [products, setProducts] = useState<Product[]>([
    { product_name: "", quantity: 0, unit_price: 0, unit: "" },
  ]);

  const calculateTotalPrice = (products: Product[]) => {
    return products.reduce(
      (total, product) => total + product.quantity * product.unit_price,
      0
    );
  };

  const { handleChange, values, handleSubmit, isSubmitting, setFieldValue } =
    useFormik({
      initialValues: {
        issue_date: format(new Date(), "yyyy-MM-dd"),
        // warehouse
        warehouse_name: "",
        warehouse_id: "",

        // customre
        customer: {
          customer_name: "",
          customer_id: "",
          customer_phone: "",
          customer_address: "",
        },
        // product
        products: [
          {
            product_name: "",
            product_id: "",
            quantity: 0,
            unit_price: 0,
            unit: "",
          },
        ],
        payment_type: "",
        chalan_date: null,
        settlement_date: null,
        grand_total: 0,
        isPaid: "incomplete",
        isChalan: false,
        workspace_id: user?.workspace_id || "",
      },
      onSubmit: async (data) => {
        try {
          data.grand_total = calculateTotalPrice(products);
          handleFormSubmit(data);
          alert("Submited Successfully");
        } catch (err) {
          console.log(err);
          alert(err);
        }
      },
    });

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { product_name: "", quantity: 0, unit_price: 0, unit: "" },
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    setFieldValue("products", updatedProducts);
    setFieldValue("grand_total", calculateTotalPrice(updatedProducts));
  };

  const handleProductChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
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
    setFieldValue("grand_total", calculateTotalPrice(updatedProducts));
  };


  const warehouseOptions = fakeWarehouses.map((i) => ({
    label: i.warehouse_name,
    value: i.id,
  }));

  const handleWarehouseSelect = (item: any) => {
    setFieldValue("warehouse_id", item.value);
    setFieldValue("warehouse_name", item.label);
  };


  const customerOptions = fakeCustomerData.map((i) => ({
    label: i.customer_name,
    value: i.id,
    customer_phone: i.phone_number, 
    customer_address: i.customer_address, 
  }));

  const handleCustomerSelect = (item: any) => {
    setFieldValue("customer.customer_id", item.value);
    setFieldValue("customer.customer_name", item.label);
    setFieldValue("customer.customer_phone", item.customer_phone); 
    setFieldValue("customer.customer_address", item.customer_address); 
  };

  console.log(values)

  const { mutateAsync: addCustomerFn } = usePostCustomersData();
  return (
    <div className="p-5   backdrop-blur-sm bg-black/40">
      <form autoComplete="off" className="relative" onSubmit={handleSubmit}>
        <div className="flex  justify-between gap-10">
          <div className="w-full">
            <TextInput
              className="w-full border bg-black/20"
              label="Issue Date"
              id="issue_date"
              placeholder="issue_date"
              value={values.issue_date}
              onClick={(e) => showDatePicker(e)}
              onChange={handleChange}
              type="date"
            />
          </div>
          <div className="w-full">
            <SearchSelectInput
              inputClassName="placeholder:text-white  bg-black/20 border border-white py-2 w-full"
              title="Select Warehouse"
              data={warehouseOptions}
              onSelect={handleWarehouseSelect}
              placeholder="Search Warehouse"
            />
          </div>
          <div className="flex justify-end items-end w-full ">
            <SearchSelectInput
              inputClassName="placeholder:text-white border border-white bg-black/20 py-2 w-full"
              title="Customer Information"
              data={customerOptions}
              onSelect={handleCustomerSelect}
              placeholder="Search Customer"
            />
            <div>
              <CustomerForm isOnlyIcon handleFormSubmit={addCustomerFn} />
            </div>
          </div>
        </div>
        <div className="h-[0.1px] w-full bg-gray-500 my-5"></div>
        <div>
          <Button
            type="button"
            className="py-2 px-4"
            onClick={handleAddProduct}
            label="Add More"
          />
          <div className="min-h-[400px] max-h-[400px] overflow-y-auto">
            <table className="w-full  text-left table-auto font-normal">
              <thead className="bg-black/70 text-white ">
                <tr className="font-normal ">
                  <th className="font-normal border  text-sm p-2 w-10">Index</th>
                  <th className="font-normal border text-sm py-2 px-4">
                    Product Name
                  </th>
                  <th className="font-normal border text-sm py-2 px-4">Unit</th>
                  <th className="font-normal border text-sm py-2 px-4">Quantity</th>
                  <th className="font-normal border text-sm py-2 px-4">Unit Price</th>
                  <th className="font-normal border text-sm py-2 px-4 flex justify-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-black/40">
                {products.map((product, index) => (
                  <tr key={index} className="border h-auto">
                    <td className="text-center">{index + 1}</td>
                    <td className="border">
                      <SearchSelectInput
                        inputClassName="placeholder:text-white py-2 border-none w-full bg-inherit"
                        data={productOptions}
                        onSelect={(item: any) =>
                          handleProductChange(index, "product_name", item.label)
                        }
                        placeholder="Search Product"
                      />
                    </td>
                    <td className="border">
                      <TextInput
                        className="placeholder:text-white placeholder:text-[12px] py-2 border-none w-full bg-inherit"
                        id={`unit-${index}`}
                        placeholder="Unit"
                        value={product.unit}
                        onChange={(e) =>
                          handleProductChange(index, "unit", e.target.value)
                        }
                        type="text"
                      />
                    </td>
                    <td className="border">
                      <TextInput
                        className="placeholder:text-white placeholder:text-[12px] py-2 border-none w-full bg-inherit"
                        id={`quantity-${index}`}
                        placeholder="Enter quantity"
                        value={product.quantity}
                        onChange={(e) =>
                          handleProductChange(index, "quantity", e.target.value)
                        }
                        type="number"
                      />
                    </td>
                    <td className="border">
                      <TextInput
                        className="placeholder:text-white placeholder:text-[12px] py-2 border-none w-full bg-inherit"
                        id={`unit_price-${index}`}
                        placeholder="Enter unit price"
                        value={product.unit_price}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "unit_price",
                            e.target.value
                          )
                        }
                        type="number"
                      />
                    </td>
                    <td className="m-1.5 flex justify-end">
                      <button
                        type="button"
                        className=" text-red-500 bg-black rounded-full p-2"
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

        <div className="flex justify-end   mt-10">
          <div className=" backdrop-blur-md border bg-black/20 p-2 w-[20%] ">
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
  // const { mutateAsync } = usePostOrdersData();
  const { mutateAsync } = usePostOrdersData();

  return (
    <div className="relative">
      <GenerateOrderForm handleFormSubmit={mutateAsync} />
    </div>
  );
};

export default GenerateOrder;
