
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

// Define type for invoice datae
export interface InvoiceType {
    invoice_id: string;
    customer: Customer;
    products: Product[];
    warehouse: string;
    date: string;
    created_at: string;
    total_price: number;
    isPaid: boolean;
}
