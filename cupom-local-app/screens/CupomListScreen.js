import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Rodape from '../components/Rodape';
import Header from '../components/Header';
import Categorias from '../components/Categorias';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function CupomListScreen({ navigation }) {

const [cupons, setCupons] = useState([]);

useEffect(() => {
  axios.get('http://192.168.0.15:3001/cupons') 
    .then(response => {
      setCupons(response.data);
    })
    .catch(error => {
      console.error('Erro ao buscar cupons:', error);
    });
}, []);

  return (
<SafeAreaView style={styles.container}>

    <Header/>
        <Categorias/>
      <ScrollView showsVerticalScrollIndicator={false}>
   {/* Promo Card Banner */}
<FlatList
  data={cupons}
  keyExtractor={(item) => item.id.toString()}
  numColumns={2}
  contentContainerStyle={{ paddingHorizontal: 10 }}
  columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
  renderItem={({ item: cupom }) => (
    <View style={styles.card}>
      <Image source={require('../assets/image.png')} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{cupom.titulo}</Text>
      {cupom.valor != null && !isNaN(cupom.valor) && (
        <Text style={styles.cupomValor}>Valor: R$ {Number(cupom.valor).toFixed(2)}</Text>
      )}
      <TouchableOpacity
        style={styles.bagButton}
        onPress={() => {
          axios.post('http://192.168.0.15:3001/carrinho', {
            usuario_id: 4,
            cupom_id: cupom.id,
          })
          .then(() => {
            console.log('Cupom adicionado ao carrinho!');
          })
          .catch(error => {
            console.error('Erro ao adicionar ao carrinho:', error);
          });
        }}
      >
        <Image source={require('../assets/bag.png')} style={styles.bagIcon} />
      </TouchableOpacity>
    </View>
  )}
/>
{/* Sub-banners clicáveis - add rotass*/}
<View style={styles.subBannerRow}>
  <TouchableOpacity onPress={() => console.log('Ir para Novidades')}>
    <Image source={require('../assets/novidades.png')} style={styles.subBanner} />
  </TouchableOpacity>
  <TouchableOpacity onPress={() => console.log('Ir para 5 Estrelas')}>
    <Image source={require('../assets/5-estrelas.png')} style={styles.subBanner} />
  </TouchableOpacity>
</View>


     {/* <View style={styles.card}>
            <TouchableOpacity onPress={() => console.log('Ir p/ detalhes 2')}>
            <Image source={require('../assets/image-3.png')} style={styles.cardImage} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bagButton, {top: 150}]} onPress={() => console.log('Adicionar ao carrinho')}>
      <Image
        source={require('../assets/bag-green.png')}
        style={styles.bagIcon}
      /> */}
    {/* </TouchableOpacity>
            <Text style={styles.cardTitle}>Banho e tosa</Text>
            <Text style={styles.cardPrice}>por R$60,00</Text>
            <Text style={styles.cardOldPrice}>de R$90,00</Text>
          </View>
        */}

        {/* Banner inferior */}
      <TouchableOpacity style={styles.bottomBanner} onPress={() => console.log('Ir para categoria especial')}>
        <Image source={require('../assets/maes.png')} style={styles.cardImage} />
</TouchableOpacity>
      </ScrollView>

     <Rodape />
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
  flex: 1,
  marginHorizontal: 5,
  borderWidth: 1,
  borderColor: '#eaeaea',
  borderRadius: 10,
  padding: 10,
  marginTop: 1,
  maxWidth: '48%', 
},
  bagButton: {
  position: 'absolute',
  bottom: 10,
  right: 10,
  backgroundColor: '#FFF',
  padding: 6,
  borderRadius: 20,
  elevation: 2,
},
bagIcon: {
  width: 20,
  height: 20,
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
