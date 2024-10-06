

import React, { useRef, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import { InvoiceType } from '../../../../lib/type';
import { chalanDataFake } from '../../../../data/dummy.data';

// Define type for Select options
interface OptionType {
    value: string;
    label: string;
}

const Chalan: React.FC = () => {


    const [selectedInvoice, setSelectedInvoice] = useState<OptionType | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const invoiceOptions: OptionType[] = chalanDataFake.map((i) => ({
        value: i.invoice_id,
        label: i.invoice_id,
    }));

    const handleInvoiceChange = (selectedOption: SingleValue<OptionType>) => {
        setSelectedInvoice(selectedOption);
    };

    const handleDownload = async () => {
        const content = contentRef.current;

        if (content) {
            const canvas = await html2canvas(content);
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save("chalan.pdf");
        } else {
            console.error("Content is null. Make sure the ref is assigned to a valid DOM element.");
        }
    };

    return (
        <div>
            <Select
                name="invoices"
                menuPlacement="top"
                options={invoiceOptions}
                className="text-black  "
                classNamePrefix="select"
                onChange={handleInvoiceChange}
            />
            {selectedInvoice && (
                <section>
                    <div ref={contentRef} id="pdf-content" className=' text-black py-10 border'>
                        <h3>Selected Invoice Details</h3>
                        <p>Invoice ID: {selectedInvoice.value}</p>
                        <p>Customer Name: {chalanDataFake.find(i => i.invoice_id === selectedInvoice.value)?.customer.customer_name}</p>
                        <p>Warehouse: {chalanDataFake.find(i => i.invoice_id === selectedInvoice.value)?.warehouse}</p>
                        <p>Total Price: ${chalanDataFake.find(i => i.invoice_id === selectedInvoice.value)?.total_price}</p>
                        <h4>Products:</h4>
                        <ul>
                            {chalanDataFake.find(i => i.invoice_id === selectedInvoice.value)?.products.map((product, index) => (
                                <li key={index}>
                                    {product.product_name} - Quantity: {product.quantity}, Price: ${product.price}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={handleDownload} style={{ marginTop: '20px' }}>
                        Download PDF
                    </button>
                </section>
            )}
        </div>
    );
};

export default Chalan;
