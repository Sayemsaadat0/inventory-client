import { useGetproductsData, usePostproductsData } from "../../../hooks/entities/product.hook";
import SharedTable from "../../../shared/table/SharedTable";
import Title from "../../../shared/Title";
import ProductForm from "./ProductForm";

const Products = () => {

  const columns = [
    {
      title: "Image",
      dataKey: "product_image",
      row: (data: any) => <div className="flex items-center gap-5">
        <img className="w-12 rounded-full inset-0 shrink-0 aspect-square object-cover " src={data?.product_image ? data?.product_image : '/Logo.png'} alt={'Img'} /></div>,
    },
    {
      title: "Name",
      dataKey: "product_name",
      row: (data: any) => <div className="flex items-center gap-5">
        {data.product_name}
      </div>,
    },
    // {
    //   title: "Added Date",
    //   dataKey: "Added Date",
    //   row: (data: any) => (
    //     <div>
    //       <p>{data.created_at}</p>
    //     </div>
    //   ),
    // },
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
      <ProductForm instance={data} handleFormSubmit={() => undefined}  />
    </div>
  }


  const { data: ItemsData, isLoading: isItemsLoading } = useGetproductsData()

  const { mutateAsync: formSubmitFn } = usePostproductsData()

  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <Title title={`All Items (${ItemsData?.length})`} />
        <ProductForm handleFormSubmit={formSubmitFn}  />
      </div>
      <div>
        <SharedTable
          columns={columns}
          isLoading={isItemsLoading}
          data={ItemsData || []}
        />
      </div>
    </div>
  );
};

export default Products;
