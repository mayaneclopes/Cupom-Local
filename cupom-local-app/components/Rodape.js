import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CarrinhoScreen from '../screens/CarrinhoScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function Rodape() {

const navigation = useNavigation();
  const [user, setUser] = useState(null);
  console.log('Navigation disponível:', navigation);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    loadUser();
  }, []);

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.item}>
        <Image source={require('../assets/cashback.png')} style={styles.icon} />
        <Text style={styles.label}>Cashback</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Image source={require('../assets/busca.png')} style={styles.icon} />
        <Text style={styles.label}>Busca</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}
          onPress={() => navigation.navigate('Cupons')}>
        <Image source={require('../assets/logo-mini.png')} style={styles.icon} />
        <Text style={styles.label}>Ofertas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
onPress={() => {
  if (!user || !user.id) {
    console.error("User não definido:", user); 
    return;
  }
  navigation.navigate('Carrinho', { user: user });
}}
      >
        <Image source={require('../assets/bag.png')} style={styles.icon} />
        <Text style={styles.label}>Carrinho</Text>
      </TouchableOpacity>

<TouchableOpacity
  style={styles.item}
  onPress={() => navigation.navigate('MinhaConta')}
>
  <Image source={require('../assets/profile-circle.png')} style={styles.icon} />
  <Text style={styles.label}>Conta</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 65,
    backgroundColor: '#f3f3f3',
    position: 'fixed',
    bottom: 0,
  },
  item: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginTop: 2,
  },
});
