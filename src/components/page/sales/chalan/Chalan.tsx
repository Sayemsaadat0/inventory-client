

import React, { useRef, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Define types for customer and product
interface Customer {
    customer_name: string;
    customer_phone_no: string;
    customer_id: string;
}

interface Product {
    product_name: string;
    quantity: number;
    price: number;
}

// Define type for invoice data
interface Invoice {
    invoice_id: string;
    customer: Customer;
    products: Product[];
    warehouse: string;
    date: string;
    created_at: string;
    total_price: number;
    isPaid: boolean;
}

// Define type for Select options
interface OptionType {
    value: string;
    label: string;
}

const Chalan: React.FC = () => {
    const chalanData: Invoice[] = [
        {
            invoice_id: 'INV001',
            customer: {
                customer_name: 'John Doe',
                customer_phone_no: '123-456-7890',
                customer_id: 'CUST001',
            },
            products: [
                { product_name: 'Product A', quantity: 2, price: 50 },
                { product_name: 'Product B', quantity: 1, price: 30 },
            ],
            warehouse: 'Warehouse 1',
            date: '2024-09-25',
            created_at: new Date().toISOString().split('T')[0],
            
            total_price: 130,
            isPaid: false,
        },
        // Add more invoices as needed...
    ];

    const [selectedInvoice, setSelectedInvoice] = useState<OptionType | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const invoiceOptions: OptionType[] = chalanData.map((i) => ({
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
                className="text-black"
                classNamePrefix="select"
                onChange={handleInvoiceChange}
            />
            {selectedInvoice && (
                <section>
                    <div ref={contentRef} id="pdf-content" className='bg- text-black py-10 border'>
                        <h3>Selected Invoice Details</h3>
                        <p>Invoice ID: {selectedInvoice.value}</p>
                        <p>Customer Name: {chalanData.find(i => i.invoice_id === selectedInvoice.value)?.customer.customer_name}</p>
                        <p>Warehouse: {chalanData.find(i => i.invoice_id === selectedInvoice.value)?.warehouse}</p>
                        <p>Total Price: ${chalanData.find(i => i.invoice_id === selectedInvoice.value)?.total_price}</p>
                        <h4>Products:</h4>
                        <ul>
                            {chalanData.find(i => i.invoice_id === selectedInvoice.value)?.products.map((product, index) => (
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
