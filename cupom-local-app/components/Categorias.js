import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

//Atenção: usar onPress={() => ...} p/ rotas futuras

export default function Categorias() {
  const categorias = [
    { icon: require('../assets/frame.png'), label: 'Alimentação' },
    { icon: require('../assets/skin-care.png'), label: 'Estética' },
    { icon: require('../assets/shop.png'), label: 'Lojas' },
    { icon: require('../assets/Pets.png'), label: 'Pets' },
    { icon: require('../assets/frame-2.png'), label: 'Outros' },
  ];

  return (
    <View style={styles.categorias}>
      {categorias.map((cat, index) => (
        <TouchableOpacity key={index} style={styles.categoria}>
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
