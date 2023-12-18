import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './app/screens/Home';
import NewProduct from './app/screens/NewProduct';
import ProductDetails from './app/screens/ProductDetails';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


type RootStackParamList = {
  Products: undefined;
  Modal: undefined;
  Details: { id: string };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
export type StackNavigation = NavigationProp<RootStackParamList>;
export type ProductsPageProps = NativeStackScreenProps<RootStackParamList, 'Products'>;
export type ModalPageProps = NativeStackScreenProps<RootStackParamList, 'Modal'>;
export type DetailsPageProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const RootStackNavigation = () => {

  const navigation = useNavigation<StackNavigation>();

  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Products" component={Home} 
        options={{
          headerRight: () => (
            <TouchableOpacity style={{ width: 24}} onPress={() => navigation.navigate('Modal')}>
              <Ionicons name="add" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <RootStack.Screen name="Modal" component={NewProduct} 
        options={{
          presentation: 'modal',
        }}
      />
      <RootStack.Screen name="Details" component={ProductDetails} />
    </RootStack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
}