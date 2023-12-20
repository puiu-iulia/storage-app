import { View, TextInput, Button, StyleSheet } from 'react-native'
import React, { useCallback, useState, useEffect, useLayoutEffect } from 'react'
import { DetailsPageProps } from '../../App'
import { Product, useDB } from '../hooks/useDB'

const ProductDetails = ({ navigation, route }: DetailsPageProps) => {

    const { getProductById, updateProduct, deleteProduct } = useDB();

    const { id } = route.params;

    const [product, setProduct] = useState<Product>()

    useEffect(useCallback(() => {
        fetchProductById();
    }, [id]));

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button title="Delete" onPress={() => handleDelete(id)}/>
        })
    }, [])

    const fetchProductById = async () => {
        const result = await getProductById(Number(id));
        setProduct(result);
    }

    const saveProduct = async () => {
        updateProduct(product);
        navigation.goBack();
    }

    const handleDelete = async (id: string) => {
        await deleteProduct(Number(id));
        console.log("DELETE", id)
        navigation.goBack()
    }


    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder="Name" value={product?.name} onChangeText={name => setProduct({ ...product, name })} />
                <TextInput style={styles.input} placeholder="Description" value={product?.description} onChangeText={description => setProduct({ ...product, description })} />
                <TextInput style={styles.input} placeholder="Price" value={product?.price.toString()} onChangeText={price => setProduct({ ...product, price: Number(price) })} />
                <TextInput style={styles.input} placeholder="Image" value={product?.image} onChangeText={image => setProduct({ ...product, image })} />
                <TextInput style={styles.input} placeholder="Quantity" value={product?.quantity.toString()} onChangeText={quantity => setProduct({ ...product, quantity: Number(quantity) })} />
                <TextInput style={styles.input} placeholder="Category" value={product?.category} onChangeText={category => setProduct({ ...product, category })} />
            </View>
            <Button title="Save" onPress={saveProduct} />
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

export default ProductDetails