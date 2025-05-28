import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Rodape from '../components/Rodape';
import Header from '../components/Header';
import Categorias from '../components/Categorias';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function CupomListScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
    <View style={styles.container}>
    <Header/>
        <Categorias/>
      <ScrollView showsVerticalScrollIndicator={false}>
   {/* Promo Card Banner */}
<View style={styles.promoCard}>
   <TouchableOpacity onPress={() => console.log('Ir para detalhes Banner Principal')}>
  <Image
    source={require('../assets/dinner.png')}
    style={styles.promoImage}
  />
  </TouchableOpacity>
  <View style={styles.cardInfo}>
     <TouchableOpacity onPress={() => console.log('Ir para detalhes  Banner Principal')}>
    <Text style={styles.cardTitle}>Jantar Romântico para Dois</Text>
    <Text style={styles.cardPrice}>a partir de R$200,00</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bagButton} onPress={() => console.log('Adicionar ao carrinho')}>
      <Image
        source={require('../assets/bag-green.png')}
        style={styles.bagIcon}
      />
    </TouchableOpacity>
  </View>
</View>

{/* Sub-banners clicáveis - add rotass*/}
<View style={styles.subBannerRow}>
  <TouchableOpacity onPress={() => console.log('Ir para Novidades')}>
    <Image source={require('../assets/novidades.png')} style={styles.subBanner} />
  </TouchableOpacity>
  <TouchableOpacity onPress={() => console.log('Ir para 5 Estrelas')}>
    <Image source={require('../assets/5-estrelas.png')} style={styles.subBanner} />
  </TouchableOpacity>
</View>

        {/* Cards de cupons - add rotas*/}
        <View style={styles.cardRow}>
          <View style={styles.card}>
             <TouchableOpacity onPress={() => console.log('Ir p/ detalhes 1')}>
            <Image source={require('../assets/image.png')} style={styles.cardImage} />
            </TouchableOpacity>
            <Text style={[styles.cardTitle, {fontSize: 15}]}>Corte feminino</Text>
            <Text style={styles.cardPrice}>a partir de R$80,00</Text>
 <TouchableOpacity style={[styles.bagButton, {top: 150}]} onPress={() => console.log('Adicionar ao carrinho')}>
      <Image
        source={require('../assets/bag-green.png')}
        style={styles.bagIcon}
      />
    </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <TouchableOpacity onPress={() => console.log('Ir p/ detalhes 2')}>
            <Image source={require('../assets/image-3.png')} style={styles.cardImage} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bagButton, {top: 150}]} onPress={() => console.log('Adicionar ao carrinho')}>
      <Image
        source={require('../assets/bag-green.png')}
        style={styles.bagIcon}
      />
    </TouchableOpacity>
            <Text style={styles.cardTitle}>Banho e tosa</Text>
            <Text style={styles.cardPrice}>por R$60,00</Text>
            <Text style={styles.cardOldPrice}>de R$90,00</Text>
          </View>
        </View>

        {/* Banner inferior */}
      <TouchableOpacity style={styles.bottomBanner} onPress={() => console.log('Ir para categoria especial')}>
        <Image source={require('../assets/maes.png')} style={styles.cardImage} />
</TouchableOpacity>
      </ScrollView>

     <Rodape />
    </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  promoBanner: {
    width: '90%',
    height: 248,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 10,
    borderRadius: 10,
  },
  subBannerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  subBanner: {
    width: 150,
    height: 70,
    borderRadius: 8,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  card: {
    width: 150,
    borderWidth: 1,
    borderColor: '#eaeaea',
    borderRadius: 10,
    padding: 10,
    marginTop: 1,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Light',
    marginTop: 8,
  },
  cardPrice: {
    fontSize: 15,
    color: '#2ecc71',
    fontFamily: 'Poppins-Light',
  },
  cardOldPrice: {
    fontSize: 10,
    color: '#d9d9d9',
    fontFamily: 'Poppins-Light',
    textDecorationLine: 'line-through',
  },
  bottomBanner: {
    backgroundColor: '#f5f5f5',
        resizeMode: 'contain',
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: 'AlexBrush-Regular',
    color: '#7C3AED',
  },
  bottomText: {
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
  },
    promoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#eaeaea',
    borderWidth: 1,
    marginHorizontal: 20,
    marginBottom: 10,
    overflow: 'hidden',
  },
  promoImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardInfo: {
    padding: 10,
    position: 'relative',
  },
  bagButton: {
    position: 'absolute',
    right: 10,
    top: 40,
    backgroundColor: '#FFF',
    padding: 6,
    borderRadius: 20,
    elevation: 2,
  },
  bagIcon: {
    width: 24,
    height: 24,
  },
});
