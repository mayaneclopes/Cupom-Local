import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import Rodape from '../components/Rodape';
import { API_URL } from '../config';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VouchersScreen({ user }) {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    if (user?.id) {
      axios.get(`${API_URL}/vouchers/${user.id}`)
        .then(response => setVouchers(response.data))
        .catch(error => console.error('Erro ao buscar vouchers:', error));
    }
  }, [user]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem_url }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.descricao}>{item.descricao}</Text>
        <Text style={styles.status}>Status: {item.status}</Text>
        <Text style={styles.data}>Resgatado em: {new Date(item.data_resgate).toLocaleDateString()}</Text>
      </View>
    </View>
  );

  return (
    
        <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
      <Text style={styles.pageTitle}>Meus Vouchers</Text>

      {vouchers.length === 0 ? (
        <Text style={styles.empty}>Você ainda não possui vouchers.</Text>
      ) : (
        <FlatList
          data={vouchers}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
</ScrollView>
      <Rodape />
      </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  pageTitle: { fontSize: 22, fontWeight: 'bold', margin: 16, color: '#0D1B2A' },
  list: { paddingBottom: 90, paddingHorizontal: 16 },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 16,
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
  },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold' },
  descricao: { fontSize: 14, color: '#555' },
  status: { marginTop: 6, fontSize: 13, color: '#0D1B2A' },
  data: { fontSize: 12, color: '#999' },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#777' },
});
