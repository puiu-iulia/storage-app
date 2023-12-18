import { View, Text } from 'react-native'
import React from 'react'
import { DetailsPageProps } from '../../App'

const ProductDetails = ({ navigation, route }: DetailsPageProps) => {

    const { id } = route.params;
    return (
        <View>
            <Text>ProductDetails</Text>
        </View>
    )
}

export default ProductDetails