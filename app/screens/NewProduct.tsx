import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { ModalPageProps } from '../../App'
import { Product, useDB } from '../hooks/useDB'

const NewProduct = ({ navigation }: ModalPageProps) => {

    const { insertProduct } = useDB();

    const [product, setProduct] = useState<Product>({
        name: 'Hat',
        description: '',
        price: 30,
        image: '',
        quantity: 30,
        category: 'clothing',
    });

    const addProduct = async () => {
        const newProduct = await insertProduct(product);
        console.log('NEW PRODUCT', newProduct)
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder="Name" value={product.name} onChangeText={name => setProduct({ ...product, name })} />
                <TextInput style={styles.input} placeholder="Description" value={product.description} onChangeText={description => setProduct({ ...product, description })} />
                <TextInput style={styles.input} placeholder="Price" value={product.price.toString()} onChangeText={price => setProduct({ ...product, price: Number(price) })} />
                <TextInput style={styles.input} placeholder="Image" value={product.image} onChangeText={image => setProduct({ ...product, image })} />
                <TextInput style={styles.input} placeholder="Quantity" value={product.quantity.toString()} onChangeText={quantity => setProduct({ ...product, quantity: Number(quantity) })} />
                <TextInput style={styles.input} placeholder="Category" value={product.category} onChangeText={category => setProduct({ ...product, category })} />
            </View>
            <Button title="Save" onPress={addProduct} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {                                                         
        marginHorizontal: 20,
    },
    form: {
        gap: 10,
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    }
});

export default NewProduct