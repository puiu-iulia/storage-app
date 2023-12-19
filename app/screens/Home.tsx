import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { ProductsPageProps } from '../../App'
import { useDB } from '../hooks/useDB';
import { useFocusEffect } from '@react-navigation/native';
import { Product } from '../hooks/useDB';

const Home = ({ navigation }: ProductsPageProps) => {

    const { getProducts } = useDB();
    const [products, setProducts] = useState<Product[]>([]);

    useFocusEffect(useCallback(() => {
        fetchProducts();
    }, []));

    const fetchProducts = async () => {
        const result = await getProducts();
        setProducts(result);
    }

    console.log('PRODUCTS', products);

    const renderItem = ({ item }: { item: Product }) => {

        const numberFormat = (value) => 
            new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(value);

        return(
            <View style={styles.item}>
                <Image source={{ uri: item.image ? item.image : 'https://placehold.co/50@2x.png' }} style={{ width: 50, height: 50 }} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text>{numberFormat(item.price)} x {item.quantity}</Text>
            </View>
        )
    };

    return (
        <View style={styles.container}>
            <FlatList 
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {                                                         
        marginHorizontal: 8,
        paddingVertical: 8,
        flex: 1,
    },
    item: {
        backgroundColor: 'white',
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        borderRadius: 5,
        gap: 20
    },
    productName: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default Home