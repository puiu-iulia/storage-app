import * as SQLite from 'expo-sqlite';
import { useEffect } from 'react';

export interface Product {
    id?: number;
    name: string;
    price: number;
    description: string;
    image: string;
    quantity: number;
    category: string;
}

export const useDB = () => {
    const db = SQLite.openDatabase('shop.db');

    useEffect(() => {
        initDB();
    }, []);

    const initDB = () => {
        const sql = `CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            category TEXT NOT NULL
        );`;

        db.execAsync([{ sql, args: [] }], false).then(() => {
            console.log("Database initialized")
        });
    }

    const getProducts = () => {
        
    }

    return {
        getProducts
    }
}