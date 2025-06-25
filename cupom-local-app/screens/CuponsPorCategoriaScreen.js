import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from '../components/Header';
import Rodape from '../components/Rodape';
import { API_URL } from '../config';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CupomPorCategoriaScreen() {
  const route = useRoute();
  const navigation = useNavigation();
const { categoriaId, nomeCategoria } = route.params;
  const [cupons, setCupons] = useState([]);


  useEffect(() => {
    const fetchCupons = async () => {
      try {
        const response = await axios.get(`${API_URL}/cupons/categoria/${categoriaId}`);
        setCupons(response.data);
      } catch (error) {
        console.error('Erro ao buscar cupons por categoria:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCupons();
  }, [categoriaId]);

  const adicionarAoCarrinho = async (cupomId) => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      await axios.post(`${API_URL}/carrinho`, {
        usuario_id: user.id,
        cupom_id: cupomId,
      });
      console.log('Cupom adicionado ao carrinho');
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  const renderCupom = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CupomDetalhes', { cupom: item })}
    >
      <Image source={{ uri: item.imagem_url }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.titulo}</Text>
      <Text style={styles.cardValue}>R$ {parseFloat(item.valor).toFixed(2)}</Text>

      <TouchableOpacity
        style={styles.bagButton}
        onPress={() => adicionarAoCarrinho(item.id)}
      >
        <Image source={require('../assets/bag.png')} style={styles.bagIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <View style={styles.content}>
      <Header />
      <Text style={styles.title}>Categoria: {nomeCategoria}</Text>

      <FlatList
      style={styles.list}
        data={cupons}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
         contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 16 }}
        renderItem={renderCupom}
      />
        </View>
        
        <Rodape />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 10,
    color: '#0D1B2A',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
   list: {
    flex: 1,
   },
 safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
    mainContainer: {
    flex: 1,
    justifyContent: 'space-between', 
  },
    content: {
    flex: 1, 
  },
  flatListContent: {
    paddingBottom: 20, 
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: '48%',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardValue: {
    fontSize: 12,
    color: '#2ecc71',
    marginBottom: 8,
  },
  bagButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  bagIcon: {
    width: 22,
    height: 22,
  },
});
