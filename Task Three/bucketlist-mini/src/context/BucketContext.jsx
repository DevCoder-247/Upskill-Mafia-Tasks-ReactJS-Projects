import React, { createContext, useContext, useEffect, useState  } from "react";
import { StaticRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const BucketContext =  createContext();
export const useBuckets = () => useContext(BucketContext);

export function BucketProvider({ children }) {

    const STORAGE_KEY = "BucketList_v1";

    const [items, setItems] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        try{
            const raw = localStorage.getItem(STORAGE_KEY);
            if(raw) setItems(JSON.parse(raw));
        } catch(err) {
            console.error('Failed to read local Storage', e);
        }
    },[]);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (err) {
            console.error('Failed to write in local Storage', err);
        }
    }, [items]);

    const addItem = ({ title, category = '', note = ' ' }) => {
        if(!title || !title.trim()) return false;
        const itm = {
            id: uuidv4(),
            title: title.trim(),
            category: category.trim(),
            note: note.trim(),
            createdAt: new Date().toISOString(),
            done: false,
        };
        setItems(prev => [itm, ...prev]);
        return true;
    };

    const deleteItem = (id) => setItems(prev => prev.filter(i => i.id !== id ));
    const toggleDone = (id) => setItems(prev => prev.map(i => i.id === id ? {...i, done: !i.done} : i));
    const clearAll = () => setItems([]);

    const filteredItems = items.filter(i =>
        i.title.toLowerCase().includes(query.trim().toLowerCase()) ||
        i.category.toLowerCase().includes(query.trim().toLowerCase()) ||
        i.note.toLowerCase().includes(query.trim().toLowerCase())
    );

    return (
        <BucketContext.Provider value={{
            items,
            filteredItems,
            query,
            setQuery,
            addItem,
            deleteItem,
            toggleDone,
            clearAll
        }}>
            {children}
        </BucketContext.Provider>
    )

}