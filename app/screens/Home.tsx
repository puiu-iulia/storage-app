import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { ProductsPageProps } from '../../App'
import { useDB } from '../hooks/useDB';
import { useFocusEffect } from '@react-navigation/native';
import { Product } from '../hooks/useDB';
import DropDownPicker from 'react-native-dropdown-picker';

const Home = ({ navigation }: ProductsPageProps) => {

    const { getProducts, getAllCategories, getProductsByCategory } = useDB();
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useFocusEffect(useCallback(() => {
        fetchProducts();
        fetchAllCategories();
    }, []));


    const fetchProducts = async () => {
        const result = await getProducts();
        setProducts(result);
    }

    const fetchAllCategories = async () => {
        const result = await getAllCategories();
        setCategories([{ label: 'All', value: null }, ...result.map(category => ({ label: category.category, value: category.category }))]);
    }

    const fetchProductsByCategory = async (category: { label: string, value: string }) => {
        if (!category.value) {
            fetchProducts();
            return;
        }
        const result = await getProductsByCategory(category.value);
        setProducts(result);
    }


    const renderItem = ({ item }: { item: Product }) => {

        const numberFormat = (value) =>
            new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(value);

        return (
            <TouchableOpacity onPress={() => navigation.navigate('Details', {id: item.id.toString()})}>
                <View style={styles.item}>
                    <Image source={{ uri: item.image ? item.image : 'https://placehold.co/50@2x.png' }} style={{ width: 50, height: 50 }} />
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text>{numberFormat(item.price)} x {item.quantity}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    return (
        <View style={styles.container}>
            <DropDownPicker
                open={open}
                value={selectedCategory}
                items={categories}
                setOpen={setOpen}
                setValue={setSelectedCategory}
                onSelectItem={fetchProductsByCategory}
                searchable={true}
                setItems={setCategories}
            />
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