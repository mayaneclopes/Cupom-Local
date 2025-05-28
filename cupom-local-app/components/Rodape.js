import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Rodape({ navigation }) {
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

      <TouchableOpacity style={styles.item}>
        <Image source={require('../assets/logo-mini.png')} style={styles.icon} />
        <Text style={styles.label}>Ofertas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Image source={require('../assets/bag.png')} style={styles.icon} />
        <Text style={styles.label}>Pedidos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
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
