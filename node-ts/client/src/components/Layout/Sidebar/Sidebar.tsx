import { useEffect, useState } from 'react';
import DownArrow from '../../svgs/DownArrow';
import SideBarLinkList from './SideBarLinkList';
import { useLocalStorage } from '../../../hooks/useLocalStorage'; // ודא שהנתיב נכון
import '../../../style/Sidebar.css';
import axios from 'axios';
import { log } from 'console';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [basket, setBasket] = useLocalStorage<Product[]>('basket', []);
  interface Product {
    id: number;
    title: string;
    image: string;
    quantity: number;
  }
  useEffect(() => {
    axios.get('http://localhost:8080/basket')
      .then(res => setBasket(res.data))
      .catch(err => console.error(err));
  }, []);

  const removeFromBasket = (id: number) => {
    axios.delete(`http://localhost:8080/basket/${id}`)
      .then(() => {
        setBasket(basket.filter((item: any) => item.id !== id));
        console.log('נמחק מהשרת בהצלחה');
      })
      .catch(err => console.error('שגיאה בשליחת המוצר לשרת', err));
  };
  const updateQuantity = (id: number, delta: number) => {
  console.log('updateQuantity', id, delta);
  
  const updatedBasket = basket
  .map((item: Product) => {
    if (item.id === id) {
      const newQuantity = item.quantity + delta;
      if (newQuantity <= 0) {
        removeFromBasket(id);
        return null;
      }
      return { ...item, quantity: newQuantity };
    }
    return item;
  })
  .filter((item): item is Product => item !== null);

  
    // עדכון בשרת
    axios.put(`http://localhost:8080/basket/${id}`, { quantityDelta: delta })
      .then(() => {
        setBasket(updatedBasket);
        console.log('עודכן בהצלחה');
      })
      .catch(err => console.error('שגיאה בעדכון כמות', err));
  };

  return (
    <nav className={`sidebar ${isSidebarOpen ? 'open' : 'closed'} dark`}>
      <button
        type="button"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="toggle-button"
        title={isSidebarOpen ? 'סגור תפריט' : 'פתח תפריט'}
      >
        <DownArrow
          className={`toggle-icon ${isSidebarOpen ? 'open' : 'closed'}`}
        />
      </button>

      {isSidebarOpen && (
        <div className="sidebar-links mt-2">
          <SideBarLinkList />

          {/* סל קניות */}
          <div className="basket-section mt-4">
            <h3 className="basket-title text-base font-bold mb-2">🛒 סל הקניות</h3>
            {basket.length === 0 ? (
              <p className="text-xs text-gray-400">הסל ריק</p>
            ) : (
              <ul className="basket-list flex flex-col gap-2">
                {basket.map((item: any) => (
                  <li key={item.id} className="basket-item flex items-center justify-between gap-2 text-xs">
                  <img src={item.image} alt={item.title} className="w-6 h-6 object-contain" />
                  <span className="flex-1 line-clamp-1">{item.title}</span>
                
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                    >➖</button>
                
                    <span className="text-xs w-6 text-center">{item.quantity}</span>
                
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                    >➕</button>
                  </div>
                
                  <button onClick={() => removeFromBasket(item.id)} className="text-red-500">
                    הסר ❌
                  </button>
                </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
