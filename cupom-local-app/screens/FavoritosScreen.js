import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import Rodape from '../components/Rodape';
import { useNavigation } from '@react-navigation/native'; 
import { API_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoritosScreen() {
  const [favoritos, setFavoritos] = useState([]);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const carregarUsuario = async () => {
      const usuarioSalvo = await AsyncStorage.getItem('user');
      if (usuarioSalvo) {
        const usuarioParse = JSON.parse(usuarioSalvo);
        setUser(usuarioParse);

        axios.get(`${API_URL}/favoritos/${usuarioParse.id}`)
          .then(response => {
            const cuponsUnicos = response.data.filter(
              (cupom, index, self) =>
                index === self.findIndex((c) => c.id === cupom.id)
            );
            setFavoritos(cuponsUnicos);
          })
          .catch(error => {
            console.error('Erro ao buscar favoritos:', error);
          });
      }
    };
    carregarUsuario();
  }, []);

  const removerFavorito = async (cupomId) => {
  try {
    await axios.delete(`${API_URL}/favoritos/${user.id}/${cupomId}`);
    setFavoritos(prev => prev.filter(c => c.id !== cupomId));
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
  }
};

const adicionarAoCarrinho = async (cupomId) => {
  try {
    await axios.post(`${API_URL}/carrinho`, {
      usuario_id: user.id,
      cupom_id: cupomId,
    });
    console.log('Adicionado ao carrinho');
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
  }
};
  
return (
  <SafeAreaView style={styles.container}>
    <Header />

    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.titulo}>Meus Favoritos</Text>

      {favoritos.length === 0 ? (
        <Text style={styles.nenhum}>
          Você ainda não adicionou cupons aos favoritos.
        </Text>
      ) : (
        favoritos.map((cupom) => (
          <View key={cupom.id} style={styles.card}>
            {/* Botão de Remover */}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removerFavorito(cupom.id)}
            >
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>

           <TouchableOpacity
  onPress={() => navigation.navigate('CupomDetalhes', { cupom })}
  style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
>
  <Image
    source={{ uri: cupom.imagem_url }}
    style={styles.imagem}
  />
  <View style={styles.infoContainer}>
    <Text style={styles.tituloCupom}>{cupom.titulo}</Text>
    <Text style={styles.descricao}>{cupom.descricao}</Text>
    <Text style={styles.preco}>
      R$ {parseFloat(cupom.valor).toFixed(2)}
    </Text>
  </View>
</TouchableOpacity>


            {/* Botão de Adicionar ao Carrinho */}
            <TouchableOpacity
              style={styles.bagButton}
              onPress={() => adicionarAoCarrinho(cupom.id)}
            >
              <Image
                source={require('../assets/bag.png')}
                style={styles.bagIcon}
              />
            </TouchableOpacity>
          </View>
        ))
      )}

      <View style={{ height: 80 }} />
    </ScrollView>

    <Rodape />
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 30,
    flex: 1,
    backgroundColor: '#fff',
  },
  removeButton: {
  position: 'absolute',
  top: 5,
  right: 5,
  backgroundColor: '#D3D3D3',
  width: 20,
  height: 20,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
},
removeButtonText: {
  color: '#fff',
  fontSize: 14,
  fontWeight: 'bold',
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

  scrollViewContent: {
    padding: 16,
    paddingBottom: 100,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0D1B2A'
  },
  nenhum: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 30,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  tituloCupom: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  preco: {
    fontSize: 14,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
});
