import { View, Text } from 'react-native'
import React from 'react'
import { ProductsPageProps } from '../../App'
import { useDB } from '../hooks/useDB';

const Home = ({ navigation }: ProductsPageProps) => {

    const { getProducts } = useDB();

    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}

export default Home