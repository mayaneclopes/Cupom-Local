import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Categorias() {
  const navigation = useNavigation();

  const categorias = [
    { id: 1, icon: require('../assets/frame.png'), label: 'Alimentação' },
    { id: 2, icon: require('../assets/skin-care.png'), label: 'Estética' },
    { id: 3, icon: require('../assets/shop.png'), label: 'Lojas' },
    { id: 4, icon: require('../assets/Pets.png'), label: 'Pets' },
    { id: 5, icon: require('../assets/frame-2.png'), label: 'Outros' },
  ];

  return (
    <View style={styles.categorias}>
      {categorias.map((cat, index) => (
        <TouchableOpacity
          key={index}
          style={styles.categoria}
          onPress={() =>
            navigation.navigate('CuponsPorCategoria', {
              categoriaId: cat.id,
              nomeCategoria: cat.label,
            })
          }
        >
          <View style={styles.iconCircle}>
            <Image source={cat.icon} style={styles.catIcon} />
          </View>
          <Text style={styles.label}>{cat.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  categorias: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  categoria: {
    alignItems: 'center',
    width: 60,
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#0D1B2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  catIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 9,
    color: '#000',
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});
