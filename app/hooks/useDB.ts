import * as SQLite from 'expo-sqlite';
import { useEffect } from 'react';
import { ResultSet } from 'expo-sqlite';

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
        const sql = `SELECT * FROM products;`;
        const args = [];
        return db.execAsync([{ sql, args }], false)
            .then((result) => (result[0] as ResultSet).rows) as Promise<Product[]>;
    }

    const insertProduct = (product: Product) => {
        const { name, price, description, image, quantity, category } = product;
        const sql = `INSERT INTO products (name, price, description, image, quantity, category) VALUES (?, ?, ?, ?, ?, ?);`;

        const args = [name, price, description, image, quantity, category];

        return db.execAsync([{ sql, args }], false)
         
    }

    const getAllCategories = () => {
        const sql = `SELECT DISTINCT category FROM products;`;
        const args = [];
        return db.execAsync([{ sql, args }], false)
            .then((result) => (result[0] as ResultSet).rows) as Promise<Product[]>;
    }

    const getProductsByCategory = (category: string) => {
        const sql = `SELECT * FROM products WHERE category = ?;`;
        const args = [category];
        return db.execAsync([{ sql, args }], false)
            .then((result) => (result[0] as ResultSet).rows) as Promise<Product[]>;
    }

    const getProductById = (id: number) => {
        const sql = `SELECT * FROM products WHERE id = ?;`;
        const args = [id];
        return db.execAsync([{ sql, args }], false)
            .then((result) => (result[0] as ResultSet).rows[0]) as Promise<Product>;
    }

    const updateProduct = (product: Product) => {
        const { id, name, price, description, image, quantity, category } = product;
        const sql = `UPDATE products SET name = ?, price = ?, description = ?, image = ?, quantity = ?, category = ? WHERE id = ?;`;

        const args = [name, price, description, image, quantity, category, id];

        return db.execAsync([{ sql, args }], false)
         
    }

    const deleteProduct = (id: number) => {
        const sql = `DELETE FROM products WHERE id = ?;`;
        const args = [id];
        return db.execAsync([{sql, args}], false)
    }


    return {
        getProducts,
        insertProduct,
        getAllCategories,
        getProductsByCategory,
        getProductById,
        updateProduct,
        deleteProduct
    }
}