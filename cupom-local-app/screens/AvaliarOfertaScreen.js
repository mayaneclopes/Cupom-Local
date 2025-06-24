import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Rodape from '../components/Rodape';
import { API_URL } from '../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AvaliarOfertasScreen({ route }) {
  const navigation = useNavigation();
  const [user, setUser] = useState(route.params?.user);
  const [vouchers, setVouchers] = useState([]);

useEffect(() => {
  const carregarUsuario = async () => {
    try {
      const usuarioString = await AsyncStorage.getItem('user');
      if (usuarioString) {
        const usuario = JSON.parse(usuarioString);
        setUser(usuario);

        // 1. Busca vouchers resgatados
        const resVouchers = await axios.get(`${API_URL}/vouchers/${usuario.id}?status=resgatado`);
        
        // 2. Busca avaliações do usuário
        const resAvaliacoes = await axios.get(`${API_URL}/avaliacoes?usuario_id=${usuario.id}`);

        // 3. Marca vouchers já avaliados
        const vouchersAtualizados = resVouchers.data.map(voucher => {
          const avaliado = resAvaliacoes.data.some(
            avaliacao => avaliacao.cupom_id === voucher.cupom_id
          );
          return { ...voucher, avaliado };
        });

        setVouchers(vouchersAtualizados);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  carregarUsuario();
}, []);

  const renderVoucher = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem_url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.description}>{item.descricao}</Text>
<TouchableOpacity
  style={[
    styles.button,
    item.avaliado && styles.buttonAvaliado
  ]}
  onPress={() => !item.avaliado && navigation.navigate('AvaliarCupom', {
    cupomId: item.cupom_id,
    usuarioId: user.id,
  })}
  disabled={item.avaliado}
>
  <Text style={styles.buttonText}>
    {item.avaliado ? 'Avaliado ✓' : 'Avaliar ☆'}
  </Text>
</TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
     
      <Text style={styles.pageTitle}>Minhas Avaliações</Text>

      {vouchers.length === 0 ? (
        <Text style={styles.empty}>Nenhum cupom resgatado disponível para avaliação.</Text>
      ) : (
        <FlatList
          data={vouchers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderVoucher}
          contentContainerStyle={styles.listContent}
        />
      )}

      <Rodape />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   // paddingTop: 30,
    //paddingBottom: 50,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0D1B2A',
    textAlign: 'left',
    marginVertical: 16,
    marginLeft: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
    button: {
    backgroundColor: '#2ecc71', // a avaliar
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonAvaliado: {
    backgroundColor: '#A09D9E', //avaliado
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 40,
  },
});