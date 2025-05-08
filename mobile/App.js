import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { enableScreens } from 'react-native-screens';
enableScreens(); 
const API_URL = 'http://10.0.2.2:3000'; // Para emulador Android

export default function Home() {
  const [cupons, setCupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCupons = async () => {
    try {
      const response = await axios.get(`${API_URL}/cupons`);
      setCupons(response.data);
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const resgatarCupomSimulado = async () => {
    try {
      await axios.post(`${API_URL}/cupons`, {
        nome: "Cupom Simulado",
        desconto: 15,
        estabelecimento: "Loja Parceira"
      });
      await fetchCupons();
      Alert.alert('Sucesso', 'Cupom resgatado!');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  useEffect(() => { fetchCupons(); }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2A9D8F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cupons Disponíveis</Text>
      
      <Button
        title="➕ Simular Resgate"
        onPress={resgatarCupomSimulado}
        color="#2A9D8F"
      />

      <FlatList
        data={cupons}
        keyExtractor={item => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.cupomCard}>
            <Text style={styles.cupomNome}>{item.nome}</Text>
            <Text style={styles.cupomDesconto}>🔖 {item.desconto}% OFF</Text>
            <Text style={styles.cupomLoja}>🏪 {item.estabelecimento}</Text>
          </View>
        )}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum cupom disponível</Text>
        }
      />
    </View>
  );
}

// Estilos permanecem os mesmos que você já tinha
const styles = StyleSheet.create({
  // ... seus estilos atuais
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6C757D'
  }
});