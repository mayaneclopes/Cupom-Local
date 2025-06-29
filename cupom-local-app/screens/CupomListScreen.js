import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Categorias from '../components/Categorias';
import Rodape from '../components/Rodape';
import { API_URL } from '../config';

export default function CupomListScreen({ user }) {
  const [cupons, setCupons] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(`${API_URL}/cupons`)
      .then(response => {
        setCupons(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar cupons:', error);
      });
  }, []);

  const handleAddToCart = (cupom) => {
    axios.post(`${API_URL}/carrinho`, {
      usuario_id: user.id,
      cupom_id: cupom.id,
    })
    .then(() => {
      console.log('Cupom adicionado ao carrinho!');
    })
    .catch(error => {
      console.error('Erro ao adicionar ao carrinho:', error);
    });
  };

   const handleAddToFavorites = async (cupom) => {
    try {
      const response = await axios.post(`${API_URL}/favoritos`, {
        usuario_id: user.id,
        cupom_id: cupom.id,
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Cupom adicionado aos favoritos!', [
          { text: 'OK' }
        ]);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        Alert.alert('Aviso', 'Este cupom já está nos seus favoritos!', [
          { text: 'OK', style: 'cancel' }
        ]);
      } else {
        console.error('Erro ao favoritar:', error);
        Alert.alert('Erro', 'Não foi possível favoritar o cupom');
      }
    }
  };

  const renderCupom = ({ item: cupom }) => (
    <View style={styles.card}>
      {/* Clique no restante do card leva à tela de detalhes */}
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => navigation.navigate('CupomDetalhes', { cupom, user })}
      >
        <Image
          source={{ uri: cupom.imagem_url }}
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>{cupom.titulo}</Text>
        {cupom.valor != null && !isNaN(cupom.valor) && (
          <Text style={styles.cupomValor}>
            Valor: R$ {Number(cupom.valor).toFixed(2)}
          </Text>
        )}
      </TouchableOpacity>

      {/* Container para os botões de ação */}
      <View style={styles.actionsContainer}>
        {/* Botão para adicionar ao carrinho */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleAddToCart(cupom)}
        >
          <Image source={require('../assets/bag.png')} style={styles.actionIcon} />
        </TouchableOpacity>
        
        {/* Botão para favoritar */}
            <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleAddToFavorites(cupom)}
        >
          <Image source={require('../assets/heart.png')} style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Categorias />

      {/* Sub-banners */}
      <View style={styles.subBannerRow}>
        <TouchableOpacity onPress={() => console.log('Ir para Novidades')}>
          <Image source={require('../assets/novidades.png')} style={styles.subBanner} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Ir para 5 Estrelas')}>
          <Image source={require('../assets/5-estrelas.png')} style={styles.subBanner} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Lista de Cupons */}
        <FlatList
          data={cupons}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={renderCupom}
        />

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
  scrollContainer: {
    paddingBottom: 80, 
  },
  subBannerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  subBanner: {
    width: 150,
    height: 70,
    borderRadius: 8,
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
  cupomValor: {
    fontSize: 15,
    color: '#2ecc71',
    fontFamily: 'Poppins-Light',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionButton: {
    marginLeft: 10,
    backgroundColor: '#FFF',
    padding: 6,
    borderRadius: 20,
    elevation: 2,
  },
  actionIcon: {
    width: 20,
    height: 20,
  },
  bottomBanner: {
    backgroundColor: '#f5f5f5',
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
});