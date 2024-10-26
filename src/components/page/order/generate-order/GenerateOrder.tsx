import { FC, useState } from "react";
import { useFormik } from "formik";
import TextInput from "../../../shared/inputs/TextInput";
import SearchSelectInput from "../../../shared/inputs/SearchSelectInput";
import Button from "../../../ui/button";
import { MdOutlineDeleteOutline } from "react-icons/md";
import CustomerForm from "../../entities/customer/CustomerForm";
import { showDatePicker } from "../../../../lib/datePicker";
import { useUser } from "../../../context/UserProvider";

import { format } from "date-fns";

import { useCreateOrdersData } from "../../../hooks/order/order.hook";
import { useGetCustomersData, usePostCustomersData } from "../../../hooks/entities/customer.hook";

import { useGetledgersData, usePostledgersData } from "../../../hooks/entities/ledger.hook";
import LedgersForm from "../../entities/ledgers/LedgersForm";
import { toast } from "../../../../hooks/use-toast";
import { useGetstocksData } from "../../../hooks/inventory/stock.hooks";






type GenerateOrderFormType = {
  handleFormSubmit: Function;
  isLoading?: boolean;
};

const GenerateOrderForm: FC<GenerateOrderFormType> = ({
  isLoading,
  handleFormSubmit,
}) => {
  const { user } = useUser();
  const { data: ledgersData, isLoading: isLedgersLoading } = useGetledgersData()
  const { data: customerData, isLoading: isCustomerLoading } = useGetCustomersData()
  const { data: stockData, isLoading: isStockLoading } = useGetstocksData()

  const { mutateAsync: ledgerCreateFn } = usePostledgersData()
  const { mutateAsync: addCustomerFn } = usePostCustomersData();

  const [products, setProducts] = useState([
    { product_name: "", product_id: "", quantity: 0, unit_price: 0, unit_name: "", warehouse_name: "" },
  ]);

  const calculateTotalPrice = (products: any) => {
    return products.reduce(
      (total: number, product: any) => total + product.quantity * product.unit_price,
      0
    );
  };

  // errors 
  const { handleChange, values, handleSubmit, isSubmitting, setFieldValue, resetForm } =
    useFormik({
      initialValues: {
        issue_date: format(new Date(), "yyyy-MM-dd"),
        ledger_name: "",
        ledger_id: "",

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
            unit_name: "",
            Warehouses_name: ""
          },
        ],
        payment_type: null,
        chalan_date: null,
        settlement_date: null,
        grand_total: 0,
        isPaid: "INCOMPLETE",
        isChalan: false,
        workspace_id: user?.workspace_id || "",
      },
      onSubmit: async (data) => {
        try {
          const total = calculateTotalPrice(products.map(product => ({
            ...product,
            quantity: Number(product.quantity),
            unit_price: Number(product.unit_price),
          })));

          data.grand_total = total;

          await handleFormSubmit(data);
          resetForm()
          setProducts([ ])
          toast({
            variant: "default",
            description: "Order Created",
          });
        } catch (err: any) {
          toast({
            variant: "destructive",
            description: `${err.error}`,
          });
        }
      },

    });


  const handleAddProduct = () => {
    const newProduct = { product_name: "", product_id: "", quantity: 0, unit_price: 0, unit_name: "", warehouse_name: "" };
    setProducts([...products, newProduct]);
    setFieldValue("products", [...products, newProduct]);
  };
  const handleRemoveProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    setFieldValue("products", updatedProducts);
  };


  const handleProductChange = (index: number, selectedProduct: any) => {
    const { value: productId, label: productName, unit_name, warehouse_name } = selectedProduct;


    const updatedProducts = products.map((product, i) => {
      if (i === index) {
        return {
          ...product,
          product_id: productId,
          unit_name: unit_name,
          warehouse_name: warehouse_name,
          product_name: productName,
          quantity: 0,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
    setFieldValue("products", updatedProducts);
  };

  const handleQuantityChange = (index: number, value: number) => {
    const updatedProducts = products.map((product, i) => {
      if (i === index) {
        return {
          ...product,
          quantity: value,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
    setFieldValue("products", updatedProducts);
  };

  const handleUnitPriceChange = (index: number, value: number) => {
    const updatedProducts = products.map((product, i) => {
      if (i === index) {
        return {
          ...product,
          unit_price: value,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
    setFieldValue("products", updatedProducts);
  };

  // do not repeat if selected 
  const getFilteredProductOptions = () => {
    const selectedProductIds = products.map(product => product.product_id);
    return !isStockLoading && stockData && stockData
      .filter((product: any) => !selectedProductIds.includes(product.product_id))
      .map((product: any) => ({
        value: product.product_id,
        label: product.product_name,
        unit_name: product.unit_name,
        warehouse_name: product.warehouse_name,
      }));
  };


  // ledgers
  const ledgersOption = !isLedgersLoading && ledgersData && ledgersData.map((i: any) => ({
    label: i.ledger_name,
    value: i.id,
  }));

  const handleLedgerSelect = (item: any) => {
    setFieldValue("ledger_name", item.label);
    setFieldValue("ledger_id", item.value);
  };


  // customer
  const customerOptions = !isCustomerLoading && customerData
    ? customerData.map((i: any) => ({
      label: i.customer_name,
      value: i.id,
      customer_phone: i.phone_no,
      customer_address: i.location,
    }))
    : [];
  const handleCustomerSelect = (item: any) => {
    setFieldValue("customer.customer_id", item.value);
    setFieldValue("customer.customer_name", item.label);
    setFieldValue("customer.customer_phone", item.customer_phone);
    setFieldValue("customer.customer_address", item.customer_address);
  };





  return (
    <div className="p-5 backdrop-blur-sm bg-black/40">
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
          <div className="flex justify-end items-end w-full ">
            <SearchSelectInput
              inputClassName="placeholder:text-white border border-white bg-black/20 py-2 w-full"
              title="Ledgers"
              data={ledgersOption}
              onSelect={handleLedgerSelect}
              placeholder="Select Ledger"
            />
            <div>
              <LedgersForm isOnlyIcon handleFormSubmit={ledgerCreateFn} />
            </div>
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
                  <th className="font-normal border text-sm py-2 px-4">Warehouse</th>
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
                        data={getFilteredProductOptions()}
                        onSelect={handleProductChange.bind(null, index)}
                        placeholder="Search Product"
                      />
                    </td>
                    <td className="border">
                      <TextInput
                        className="placeholder:text-white placeholder:text-[12px] py-2 border-none w-full bg-inherit"
                        id={`warehouse-${index}`}
                        placeholder="Warehouse"
                        value={product.warehouse_name}
                        disabled
                      />
                    </td>
                    <td className="border">
                      <TextInput
                        className="placeholder:text-white placeholder:text-[12px] py-2 border-none w-full bg-inherit"
                        id={`unit-${index}`}
                        placeholder="Unit"
                        value={product.unit_name}
                        disabled // Disable input
                      />
                    </td>
                    <td className="border">
                      <TextInput
                        className="placeholder:text-white placeholder:text-[12px] py-2 border-none w-full bg-inherit"
                        id={`quantity-${index}`}
                        placeholder="Enter quantity"
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(index, Number(e.target.value))} // Use Number to convert to a number
                        type="number"
                      />
                    </td>
                    <td className="border">
                      <TextInput
                        className="placeholder:text-white placeholder:text-[12px] py-2 border-none w-full bg-inherit"
                        id={`unit_price-${index}`}
                        placeholder="Enter unit price"
                        value={product.unit_price}
                        onChange={(e) => handleUnitPriceChange(index, Number(e.target.value))} // Use Number to convert to a number
                        type="number"
                      />
                    </td>

                    <td className="m-1.5 flex justify-end">
                      <button
                        type="button"
                        className="text-red-500 bg-black rounded-full p-2"
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
  // const { mutateAsync } = useCreateOrdersData();
  const { mutateAsync } = useCreateOrdersData();

  return (
    <div className="relative">
      <GenerateOrderForm handleFormSubmit={mutateAsync} />
    </div>
  );
};

export default GenerateOrder;
