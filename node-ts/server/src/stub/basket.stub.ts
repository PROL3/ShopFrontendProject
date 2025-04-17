
export type TechItem = {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: number;
    quantity: number;
};
export type Rating ={
    rate: number;
    count: number;
}
  
export type Product ={
    id: number;
    title: string;
    price: number;
    image: string;
    rating: Rating;
    quantity: number;
    quantityDelta: number;
}
export const basket: TechItem[] = [
    {
        id: 1,
        name: "MacBook Pro 16",
        category: "Laptops",
        brand: "Apple",
        price: 2499,
        quantity: 1,
    },
    {
        id: 2,
        name: "Dell XPS 15",
        category: "Laptops",
        brand: "Dell",
        price: 1999,
        quantity: 1,
    },
    {
        id: 3,
        name: "iPhone 15 Pro Max",
        category: "Smartphones",
        brand: "Apple",
        price: 1299,
        quantity: 2
    },
    {
        id: 4,
        name: "Samsung Galaxy S23 Ultra",
        category: "Smartphones",
        brand: "Samsung",
        price: 1199,
        quantity: 1,
    },
    {
        id: 5,
        name: "Sony WH-1000XM5",
        category: "Headphones",
        brand: "Sony",
        price: 399,
        quantity: 1,
    },
    {
        id: 6,
        name: "Bose QuietComfort 45",
        category: "Headphones",
        brand: "Bose",
        price: 329,
        quantity: 1,
    },
    {
        id: 7,
        name: "Logitech MX Master 3S",
        category: "Peripherals",
        brand: "Logitech",
        price: 99,
        quantity: 2,
    },
    {
        id: 8,
        name: "Razer DeathAdder V2",
        category: "Peripherals",
        brand: "Razer",
        price: 69,
        quantity: 1,
    },
    {
        id: 9,
        name: "ASUS ROG Strix RTX 4090",
        category: "Graphics Cards",
        brand: "ASUS",
        price: 1799,
        quantity: 1,
    },
    {
        id: 10,
        name: "MSI GeForce RTX 4080",
        category: "Graphics Cards",
        brand: "MSI",
        price: 1399,
        quantity: 1,
    },
    {
        id: 11,
        name: "Samsung 980 Pro SSD",
        category: "Storage",
        brand: "Samsung",
        price: 229,
        quantity: 3,
    },
    {
        id: 12,
        name: "Seagate 8TB External HDD",
        category: "Storage",
        brand: "Seagate",
        price: 179,
        quantity: 2,
    },
    {
        id: 13,
        name: "Corsair Vengeance RGB 32GB",
        category: "Memory",
        brand: "Corsair",
        price: 169,
        quantity: 2,
    },
    {
        id: 14,
        name: "ASUS ROG Strix X670E",
        category: "Motherboards",
        brand: "ASUS",
        price: 499,
        quantity: 1
    },
    {
        id: 15,
        name: "Razer BlackWidow V4",
        category: "Keyboards",
        brand: "Razer",
        price: 159,
        quantity: 2
    },
    {
        id: 16,
        name: "LG UltraGear 32-inch",
        category: "Monitors",
        brand: "LG",
        price: 699,
        quantity: 1,
    },
    {
        id: 17,
        name: "Apple iPad Pro 12.9",
        category: "Tablets",
        brand: "Apple",
        price: 1099,
        quantity: 1,
    },
    {
        id: 18,
        name: "Samsung Galaxy Tab S9",
        category: "Tablets",
        brand: "Samsung",
        price: 999,
        quantity: 1,
    },
    {
        id: 19,
        name: "PlayStation 5",
        category: "Gaming Consoles",
        brand: "Sony",
        price: 499,
        quantity: 1,
    },
    {
        id: 20,
        name: "Xbox Series X",
        category: "Gaming Consoles",
        brand: "Microsoft",
        price: 499,
        quantity: 1,
    }
];