import { fakeProductsData } from "../../../../data/dummy.data";
import SharedTable from "../../../shared/table/SharedTable";
import Title from "../../../shared/Title";
import ProductForm from "./ProductForm";

const Products = () => {

  const columns = [
    {
      title: "Items",
      dataKey: "item",
      row: (data: any) => <div className="flex items-center gap-5">
        <img className="w-12 rounded-full inset-0 shrink-0 aspect-square object-cover " src={data?.image ? data?.image : '/Logo.png'} alt={'Img'} />
        {data.item}</div>,
    },
    {
      title: "Added Date",
      dataKey: "Added Date",
      row: (data: any) => (
        <div>
          <p>{data.created_at}</p>
        </div>
      ),
    },
    {
      title: "Action",
      dataKey: "action",
      row: (data: any) => <div className="flex justify-end">
        <TableAction data={data} />
      </div>,
    },
  ];

  const TableAction = ({ data }: { data: any }) => {
    return <div>
      <ProductForm instance={data} handleFormSubmit={() => undefined} isLoading={false} />
    </div>
  }
  console.log(fakeProductsData)
  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <Title title={`All Products (${fakeProductsData?.length})`} />
        <ProductForm handleFormSubmit={() => undefined} isLoading={false} />
      </div>
      <div>
        <SharedTable
          columns={columns}
          isLoading={false}
          data={fakeProductsData || []}
        />
      </div>
    </div>
  );
};

export default Products;
