export const fakeCompanyData = [
    {
        id: 1,
        company_name: "AlphaTech Innovations",
        location: "San Francisco, USA",
        created_at: "2022-05-20"
    },
    {
        id: 2,
        company_name: "GlobalSoft Solutions",
        location: "London, UK",
        created_at: "2021-09-15"
    }
];



export const fakeCustomerData = [
    {
        id: "lamsCust260924aa", // Static date (26/09/24) with 'aa' suffix
        customer_name: "John Doe",
        phone_no: "+1-202-555-0143",
        address: "1234 Elm Street, San Francisco, USA"
    },
    {
        id: "lamsCust260924ab", // Static date (26/09/24) with 'ab' suffix
        customer_name: "Jane Smith",
        phone_no: "+44-20-7946-0958",
        address: "456 Oak Avenue, London, UK"
    },
    {
        id: "lamsCust260924ac", // Static date (26/09/24) with 'ac' suffix
        customer_name: "Alice Johnson",
        phone_no: "+91-98765-43210",
        address: "789 Pine Road, Mumbai, India"
    },
    {
        id: "lamsCust260924ad", // Static date (26/09/24) with 'ad' suffix
        customer_name: "Bob Brown",
        phone_no: "+61-412-345-678",
        address: "321 Maple Street, Sydney, Australia"
    },
    {
        id: "lamsCust260924ae", // Static date (26/09/24) with 'ae' suffix
        customer_name: "Charlie Davis",
        phone_no: "+49-30-12345678",
        address: "654 Birch Lane, Berlin, Germany"
    }
];


export const fakeProductsData = [
    {
        id: "item260924aa01", // Static date (26/09/24) with 'aa01' suffix
        item: "Wireless Headphones",
        image: "https://example.com/image1.jpg",
        created_at: "2024-09-26",
        history: [
            {
                date: "2024-09-26",
                customer: "John Doe",
                quantity: 2,
                unit: "piece",
                unitPrice: 49.99,
                totalPrice: 99.98,
                invoiceId: "inv26092024aa01" // Invoice ID format
            },
            {
                date: "2024-09-25",
                customer: "Jane Smith",
                quantity: 6,
                unit: "piece",
                unitPrice: 29.99,
                totalPrice: 179.94, // Updated total price
                invoiceId: "inv26092024aa02" // Invoice ID format
            }
        ]
    },
    {
        id: "item260924aa02", // Static date (26/09/24) with 'aa02' suffix
        item: "Bluetooth Speaker",
        image: "https://example.com/image2.jpg",
        created_at: "2024-09-26",
        history: [] // No history for this product
    },
    {
        id: "item260924aa03", // Static date (26/09/24) with 'aa03' suffix
        item: "Smartwatch",
        image: "https://example.com/image3.jpg",
        created_at: "2024-09-26",
        history: [
            {
                date: "2024-09-26",
                customer: "Alice Johnson",
                quantity: 3,
                unit: "piece",
                unitPrice: 199.99,
                totalPrice: 599.97,
                invoiceId: "inv26092024aa03" // Invoice ID format
            }
        ]
    },
    {
        id: "item260924aa04", // Static date (26/09/24) with 'aa04' suffix
        item: "Laptop Stand",
        image: "https://example.com/image4.jpg",
        created_at: "2024-09-26",
        history: [
            {
                date: "2024-09-26",
                customer: "Bob Brown",
                quantity: 5,
                unit: "piece",
                unitPrice: 24.99,
                totalPrice: 124.95,
                invoiceId: "inv26092024aa04" // Invoice ID format
            }
        ]
    },
    {
        id: "item260924aa05", // Static date (26/09/24) with 'aa05' suffix
        item: "Portable Charger",
        image: "https://example.com/image5.jpg",
        created_at: "2024-09-26",
        history: [
            {
                date: "2024-09-26",
                customer: "Charlie Davis",
                quantity: 10,
                unit: "piece",
                unitPrice: 19.99,
                totalPrice: 199.90,
                invoiceId: "inv26092024aa05" // Invoice ID format
            }
        ]
    }
];





export const fakeAccountHeadData = [
    {
        id: "acchead260924aa01", // Static date (26/09/24) with 'aa01' suffix
        account_head: "Cash",
        created_at: "2024-09-26",
        history: [
            {
                date: "2024-09-26",
                price: 1000.00,
                user_id: "user01",
                note: "Initial cash deposit"
            },
            {
                date: "2024-09-27",
                price: -150.00,
                user_id: "user02",
                note: "Office supplies purchase"
            }
        ]
    },
    {
        id: "acchead260924aa02", // Static date (26/09/24) with 'aa02' suffix
        account_head: "Accounts Receivable",
        created_at: "2024-09-26",
        history: [
            {
                date: "2024-09-26",
                price: 500.00,
                user_id: "user03",
                note: "Invoice #001 payment received"
            }
        ]
    },
    {
        id: "acchead260924aa03", // Static date (26/09/24) with 'aa03' suffix
        account_head: "Inventory",
        created_at: "2024-09-26",
        history: [
            {
                date: "2024-09-26",
                price: 1500.00,
                user_id: "user04",
                note: "Inventory stock purchase"
            },
            {
                date: "2024-09-27",
                price: -200.00,
                user_id: "user05",
                note: "Returned defective items"
            }
        ]
    },
    {
        id: "acchead260924aa04", // Static date (26/09/24) with 'aa04' suffix
        account_head: "Accounts Payable",
        created_at: "2024-09-26",
        history: [
            {
                date: "2024-09-26",
                price: -300.00,
                user_id: "user06",
                note: "Payment to supplier for invoice #002"
            }
        ]
    },
    {
        id: "acchead260924aa05", // Static date (26/09/24) with 'aa05' suffix
        account_head: "Equity",
        created_at: "2024-09-26",
        history: [
            {
                date: "2024-09-26",
                price: 2000.00,
                user_id: "user01",
                note: "Owner's equity contribution"
            }
        ]
    }
];



export const fakeBankData = [
    {
        bank_name: "First National Bank",
        branch: "Downtown Branch",
        account_name: "Business Checking Account",
        balance: 15000.75
    },
    {
        bank_name: "Global Savings Bank",
        branch: "Uptown Branch",
        account_name: "Personal Savings Account",
        balance: 7520.30
    }
];




export const fakeWarehouses = [
    {
        name: "Warehouse Alpha",
        createdAt: "2024-01-15T08:30:00Z",
    },
    {
        name: "Central Warehouse",
        createdAt: "2024-02-10T12:45:00Z",
    },
    {
        name: "East Coast Storage",
        createdAt: "2024-03-22T09:15:00Z",
    },
    {
        name: "West Regional Depot",
        createdAt: "2024-04-18T14:30:00Z",
    },
    {
        name: "South Distribution Hub",
        createdAt: "2024-05-05T10:20:00Z",
    },
    {
        name: "Northern Logistics Center",
        createdAt: "2024-06-01T16:50:00Z",
    },
];


export const fakeUnits = [
    {
        name: "Kilograms",
        createdAt: "2023-12-01T09:10:00Z",
    },
    {
        name: "Liters",
        createdAt: "2023-11-20T14:00:00Z",
    },
    {
        name: "Pallets",
        createdAt: "2023-10-15T11:30:00Z",
    },
    {
        name: "Boxes",
        createdAt: "2023-09-12T13:40:00Z",
    },
    {
        name: "Units",
        createdAt: "2023-08-10T07:25:00Z",
    },
    {
        name: "Crates",
        createdAt: "2023-07-08T18:05:00Z",
    },
];

export const inventoryFakeData = [
    {
        id: 1,
        warehouse: "Main Warehouse",
        unit: "Pieces",
        product_name: "Desk Lamp",
        product_id: "lampsSep24aa01",
        quantity: 150,
        notes: "New arrival, good for study rooms",
        image: "https://example.com/images/desk-lamp.jpg", // Replace with the actual image URL
        history: [
            {
                customer: "John Doe",
                date: "2024-09-20",
                invoice_id: 'sdssdsd',
                quantity: 5,
                unit_price: 25.00,
                created_at: "2024-09-20T14:30:00Z",
                total_price: 125.00
            },
            {
                customer: "Jane Smith",
                invoice_id: 'sdssdsdsd554654',
                date: "2024-09-21",
                quantity: 3,
                unit_price: 25.00,
                created_at: "2024-09-21T10:15:00Z",
                total_price: 75.00
            }
        ]
    },
    {
        id: 2,
        warehouse: "Secondary Warehouse",
        unit: "Pieces",
        product_name: "Floor Lamp",
        product_id: "lampsSep24bb02",
        quantity: 80,
        notes: "Suitable for living rooms",
        image: "https://example.com/images/floor-lamp.jpg", // Replace with the actual image URL
        history: [
            {
                customer: "Alice Brown",
                date: "2024-09-22",
                quantity: 2,
                unit_price: 45.00,
                invoice_id: 'sfd545',
                created_at: "2024-09-22T09:00:00Z",
                total_price: 90.00
            },
            {
                customer: "Bob Johnson",
                date: "2024-09-23",
                quantity: 1,
                invoice_id: '654sdf',
                unit_price: 45.00,
                created_at: "2024-09-23T12:00:00Z",
                total_price: 45.00
            }
        ]
    },
    {
        id: 3,
        warehouse: "Main Warehouse",
        unit: "Pieces",
        product_name: "Table Lamp",
        product_id: "lampsSep24cc03",
        quantity: 200,
        notes: "Energy efficient and stylish",
        image: "https://example.com/images/table-lamp.jpg", // Replace with the actual image URL
        history: [
            {
                customer: "Charlie Green",
                date: "2024-09-25",
                quantity: 10,
                unit_price: 30.00,
                invoice_id: 'sdssdsdsdf54721',
                created_at: "2024-09-25T15:45:00Z",
                total_price: 300.00
            }
        ]
    }
];



export const salesData = [
    {
        id: "lampsSales26092024aa01",
        customer: {
            name: "John Doe",
            id: "cust2024092601",
            phone_no: "+1-555-1234-567"
        },
        date: "2024-09-26",
        product: [
            {
                product_name: "Desk Lamp",
                product_id: "lampsSep24aa01",
                quantity: 5,
                unit_price: 25.00,
                note: "For office use"
            },
            {
                product_name: "Table Lamp",
                product_id: "lampsSep24cc03",
                quantity: 2,
                unit_price: 30.00,
                note: "For reading purposes"
            }
        ],
        warehouse: "Main Warehouse",
        sales_note: "Customer requested for express delivery.",
        created_at: "2024-09-26T14:00:00Z",
        isPaid: false
    },
    {
        id: "lampsSales26092024aa02",
        customer: {
            name: "Jane Smith",
            id: "cust2024092602",
            phone_no: "+1-555-9876-543"
        },
        date: "2024-09-26",
        product: [
            {
                product_name: "Floor Lamp",
                product_id: "lampsSep24bb02",
                quantity: 1,
                unit_price: 45.00,
                note: "Living room lighting"
            }
        ],
        warehouse: "Secondary Warehouse",
        sales_note: "Requested gift wrapping.",
        created_at: "2024-09-26T16:00:00Z",
        isPaid: false
    },
    {
        id: "lampsSales26092024aa03",
        customer: {
            name: "Alice Brown",
            id: "cust2024092603",
            phone_no: "+1-555-2468-135"
        },
        date: "2024-09-25",
        product: [
            {
                product_name: "Desk Lamp",
                product_id: "lampsSep24aa01",
                quantity: 3,
                unit_price: 25.00,
                note: "For kids' study desk"
            }
        ],
        warehouse: "Main Warehouse",
        sales_note: "Delivery to be scheduled next week.",
        created_at: "2024-09-25T10:30:00Z",
        isPaid: false
    }
];


export  const chalanDataFake = [
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
            { product_name: 'Product A', quantity: 2, price: 50 },
            { product_name: 'Product B', quantity: 1, price: 30 },
            { product_name: 'Product A', quantity: 2, price: 50 },
            { product_name: 'Product B', quantity: 1, price: 30 },
            { product_name: 'Product A', quantity: 2, price: 50 },
            { product_name: 'Product B', quantity: 1, price: 30 },
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
            customer_name: 'No Name',
            customer_phone_no: '123-456-7890',
            customer_id: 'CUST0002',
        },
        products: [
            { product_name: 'Product A', quantity: 2, price: 50 },
            { product_name: 'Product B', quantity: 1, price: 30 },
        ],
        warehouse: 'Warehouse 2',
        date: '2024-09-25',
        created_at: new Date().toISOString().split('T')[0],

     
        total_price: 130,
        isPaid: false,
    },
];