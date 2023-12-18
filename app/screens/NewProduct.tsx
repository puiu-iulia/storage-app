import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ModalPageProps } from '../../App'
import { Product } from '../hooks/useDB'

const NewProduct = ({ navigation } : ModalPageProps) => {

    const [product, setProduct] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        image: '',
        quantity: 0,
        category: '',
    });
  return (
    <View>
      <Text>NewProduct</Text>
    </View>
  )
}

export default NewProduct