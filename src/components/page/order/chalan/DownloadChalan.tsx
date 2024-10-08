import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { chalanDataFake } from "../../../../data/dummy.data";

const DownloadChalan = () => {
    const { id } = useParams();
    const chalan = chalanDataFake.find((item) => item.invoice_id === id); // Find the specific chalan by ID
    const contentRef = useRef(null);

    useEffect(() => {
        console.log("Chalan Data:", chalan); // Check if chalan data is retrieved
        console.log("Content Ref:", contentRef.current); // Check the content reference
    }, [chalan]);

    const handleDownload = async () => {
        const content = contentRef.current;

        if (content) {
            try {
                const canvas = await html2canvas(content, {
                    scale: 2, // Increase the scale for better resolution
                    useCORS: true, // Allow cross-origin images
                });
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF();
                const imgWidth = 210; // A4 width in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

                pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
                pdf.save("chalan.pdf");
            } catch (error) {
                console.error("Error generating PDF:", error);
            }
        } else {
            console.error("Content is null. Make sure the ref is assigned to a valid DOM element.");
        }
    };

    return (
        <div className="bg-white text-black">
            <div ref={contentRef}>
                <div className="mx-auto w-[80%]">
                    <p className="text-xl font-bold text-center py-5">Quotations</p>

                    {/* Info */}
                    <div className="border border-gray-400 flex justify-between">
                        <div className="w-full border border-r-gray-400 p-1 space-y-1">
                            <p>Consignee</p>
                            <p className="font-bold">{chalan ? chalan.customer_name : "N/A"}</p>
                            <p>Warehouse: {chalan ? chalan.warehouse_name : "N/A"}</p>
                            <p>Invoice No: {chalan ? chalan.invoice_id : "N/A"}</p>
                            <p>Dated: {chalan ? chalan.issued_date : "N/A"}</p>
                            <p>Note: {chalan ? chalan.note : "N/A"}</p>
                        </div>
                        <div className="w-full border grid grid-cols-2">
                            <div className="col-span-1 border p-1">
                                Suppliers Ref <br /> {/* Add supplier reference if available */}
                            </div>
                            <div className="col-span-1 border p-1">
                                Other Ref(s) <br /> {/* Add other references if available */}
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-400 min-h-[400px]">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-r text-left">Description of Goods</th>
                                    <th className="py-2 px-4 border-r text-left">Quantity</th>
                                    <th className="py-2 px-4 border-r text-left">Per</th>
                                    <th className="py-2 px-4 border-r text-left">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chalan?.products.length ? (
                                    chalan.products.map((product) => (
                                        <tr key={product.product_id}>
                                            <td className="py-2 px-4 border-r">{product.product_name}</td>
                                            <td className="py-2 px-4 border-r">{product.quantity}</td>
                                            <td className="py-2 px-4 border-r">{product.unit}</td>
                                            <td className="py-2 px-4 border-r">{(product.quantity * product.unit_price).toFixed(2)}</td>
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

                    <div className="border flex justify-between border-gray-400">
                        <p className="w-full p-1">Total:</p>
                        <div className="flex justify-between border border-gray-400 w-full">
                            <p className="w-full p-1">{chalan?.total_price.toFixed(2) || "0.00"}</p>
                            <p className="w-full p-1 text-right">{chalan?.total_price.toFixed(2) || "0.00"}</p>
                        </div>
                    </div>

                    <div className="border border-gray-400 px-2 py-5 min-h-96 flex flex-col justify-between">
                        <p>Tk.{chalan?.total_price || "0.00"}</p>
                        <div className="flex justify-between items-end">
                            <div className="">
                                <p>Company's Sales Tax No.: </p>
                                <p>Buyer's Tax No.: </p>
                            </div>
                            <div>
                                <p>Authorized Signature</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center">
                <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Download Invoice
                </button>
            </div>
        </div>
    );
};

export default DownloadChalan;
