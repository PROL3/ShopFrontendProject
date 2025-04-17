import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/HomePage.css';
import { useLocalStorage } from '../../hooks/useLocalStorage'; // ודא שהנתיב נכון

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: Rating;
  quantity: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [basket, setBasket, deleteBasket] = useLocalStorage<Product[]>('basket', []);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    axios.get<Product[]>('https://fakestoreapi.com/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: newQuantity
    }));
  };

  const addToBasket = (product: Product) => {
    const quantity = quantities[product.id] || 1; // ברירת מחדל היא 1 אם לא בחרו כמות
    if (!basket.find(item => item.id === product.id)) {
      const newProduct = { ...product, quantity };
      axios.post('http://localhost:8080/basket', newProduct)
        .then(() => {
          setBasket([...basket, newProduct]);
          console.log('נוסף לשרת בהצלחה');
        })
        .catch(err => console.error('שגיאה בשליחת המוצר לשרת', err));
    } else {
      const updatedBasket = basket.map(item => 
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity } // עדכון כמות אם המוצר כבר קיים
          : item
      );
      axios.put(`http://localhost:8080/basket/${product.id}`, updatedBasket)
        .then(() => {
          setBasket(updatedBasket);
          console.log('הכמות עודכנה בהצלחה');
        })
        .catch(err => console.error('שגיאה בעדכון המוצר בשרת', err));
    }
  };

  const removeFromBasket = (productId: number) => {
    setBasket(basket.filter(product => product.id !== productId));

    axios.delete(`http://localhost:8080/basket/${productId}`)
      .then(() => console.log('נמחק מהשרת בהצלחה'))
      .catch(err => console.error('שגיאה בשליחת המוצר לשרת', err));
  };

  return (
    <div className="homepage-container">
      <h1 className="title">כל המוצרים</h1>
      <div className="products-grid">
        {products.map(product => {
          const inBasket = basket.some(item => item.id === product.id);
          const quantity = quantities[product.id] || 1;

          return (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} className="product-image" />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price}</p>
              <p className="product-rating">⭐ {product.rating.rate} ({product.rating.count} דירוגים)</p>
              {!inBasket && (
                <div>
                  <input
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                    className="quantity-input border border-gray-300 rounded-md p-2"
                  />
                  <button className="add-button" onClick={() => addToBasket(product)}>
                    הוסף לסל
                  </button>
                </div>
              )}
              {inBasket && (
                <button className="remove-button bg-red-500 hover:bg-red-600 p-20 text-white px-3 py-1 rounded-md text-sm transition-all duration-200 flex items-center gap-1"
                  onClick={() => removeFromBasket(product.id)}>
                  הסר מהסל
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
