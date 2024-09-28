
const Chalan = () => {
    const chalanData = [
        {
            invoice_id: 'INV001',
            customer: {
                customer_name: 'John Doe',
                customer_phone_no: '123-456-7890',
                customer_id: 'CUST001',
            },
            products: [
                { product_name: 'Product A', quantity: 2, price: 50 },
                { product_name: 'Product B', quantity: 1, price: 30 }
            ],
            warehouse: 'Warehouse 1',
            date: '2024-09-25',
            created_at: new Date().toISOString().split('T')[0],
            total_price: 130,
            isPaid: false,
        },
        {
            invoice_id: 'INV002',
            customer: {
                customer_name: 'Jane Smith',
                customer_phone_no: '987-654-3210',
                customer_id: 'CUST002',
            },
            products: [
                { product_name: 'Product C', quantity: 3, price: 40 },
                { product_name: 'Product D', quantity: 5, price: 20 }
            ],
            warehouse: 'Warehouse 2',
            date: '2024-09-26',
            created_at: new Date().toISOString().split('T')[0],
            total_price: 220,
            isPaid: false,
        },
        {
            invoice_id: 'INV003',
            customer: {
                customer_name: 'Michael Johnson',
                customer_phone_no: '555-123-4567',
                customer_id: 'CUST003',
            },
            products: [
                { product_name: 'Product E', quantity: 1, price: 100 },
                { product_name: 'Product F', quantity: 2, price: 75 }
            ],
            warehouse: 'Warehouse 3',
            date: '2024-09-27',
            created_at: new Date().toISOString().split('T')[0],
            total_price: 250,
            isPaid: false,
        }
    ];

    console.log(chalanData)

    return (
        <div>Chalan</div>
    )
}

export default Chalan