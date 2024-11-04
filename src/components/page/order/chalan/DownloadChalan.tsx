import { useRef } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import useDynamicData from "../../../hooks/useDynamicData";

const DownloadChalan = () => {
  const { id } = useParams();
  const { data } = useDynamicData({
    queryKey: "api_order_list",
    url: `/orders/${id}`,
    callback: (responseData) => {
      console.log(responseData);
    },
  });

  const contentRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleDownload = async () => {
    const pdf = new jsPDF();

    if (contentRef.current && contentRef.current.length > 0) {
      for (let i = 0; i < contentRef.current.length; i++) {
        const content = contentRef.current[i];

        // Ensure `content` is not null before calling `html2canvas`
        if (content instanceof HTMLElement) {
          const canvas = await html2canvas(content, {
            scale: 3,
            useCORS: true,
          });

          const imgData = canvas.toDataURL("image/png");
          const imgWidth = 210; // A4 width in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          if (i > 0) {
            pdf.addPage();
          }
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, "FAST");
        }
      }
      pdf.save("invoice.pdf");
    } else {
      console.warn("No content available to download.");
    }
  };

  // Ensure data is ready before rendering
  if (!data || !data[0]) {
    return <div>Loading...</div>;
  }

  const chalanData = data[0];

  return (
    <div className="relative">
      <div className="fixed border  p-1 bg-black/40">
        <button onClick={handleDownload}>Download</button>
      </div>

      {chalanData && (
        <div
          ref={(el) => (contentRef.current[0] = el)} 
          style={{
            height: "297mm",
            width: "210mm",
            margin: "0 auto",
            pageBreakAfter: "always",
            backgroundImage: "url(/chalan.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto px-5 pt-48 text-black">
            <div className="flex justify-between">
              <p>
                <span>Customers Name : </span> <br />
                <span>Address : </span> <br />
                <span>Email : </span> <br />
                <span>Phone no : </span> <br />
              </p>
              <p className="">Invoice : {data[0]?.invoice_id}</p>
            </div>

            {/* Product Table */}
            <div className="min-h-[400px]">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-b-black">
                    <th className="py-2 px-4 text-left">Description of Goods</th>
                    <th className="py-2 px-4 text-left">Quantity</th>
                    <th className="py-2 px-4 text-left">Per</th>
                    <th className="py-2 px-4 text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {chalanData.products.length ? (
                    chalanData.products.map((p: any, idx: number) => (
                      <tr className="border-b border-b-black" key={idx}>
                        <td className="py-2 px-4">{p.product_name}</td>
                        <td className="py-2 px-4 ">{p.quantity}</td>
                        <td className="py-2 px-4 ">{p.unit_price}</td>
                        <td className="py-2 px-4 ">{(p.quantity * p.unit_price).toFixed(2)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-2">No products available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadChalan;
