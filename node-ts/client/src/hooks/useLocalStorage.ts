import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage<T = any>(key: string, defaultValue?: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch {
        return item as T;
      }
    }
    return defaultValue as T;
  });

  // מקשיב לאירועי שינוי
  useEffect(() => {
    const handler = (e: Event) => {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          setValue(JSON.parse(item));
        } catch {
          setValue(item as T);
        }
      } else {
        setValue(defaultValue as T);
      }
    };

    window.addEventListener(`local-storage-update-${key}`, handler);
    return () => window.removeEventListener(`local-storage-update-${key}`, handler);
  }, [key, defaultValue]);

  const updateValue = useCallback((newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
    // יורה event שהערך השתנה
    window.dispatchEvent(new Event(`local-storage-update-${key}`));
  }, [key]);

  const deleteValue = useCallback(() => {
    localStorage.removeItem(key);
    window.dispatchEvent(new Event(`local-storage-update-${key}`));
  }, [key]);

  return [value, updateValue, deleteValue] as [
    T,
    React.Dispatch<React.SetStateAction<T>>,
    () => void
  ];
}
