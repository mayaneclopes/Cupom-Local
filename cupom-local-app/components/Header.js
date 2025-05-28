import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo-texto-branco.png')}
          style={styles.logoImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
      header: {
    backgroundColor: '#0D1B2A',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 154.75,
    height: 78.95,
   // marginBottom: 5,
  },
  logoText: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 34,
    fontFamily: 'Poppins-ExtraBold',
  },
});
