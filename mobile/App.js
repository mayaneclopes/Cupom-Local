import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';

const API_URL = 'http://SEU_IP:3000'; // Substitua pelo IP real

export default function App() {
  const [cupons, setCupons] = useState([]);

  const fetchCupons = async () => {
    try {
      const response = await fetch(`${API_URL}/cupons`);
      const data = await response.json();
      setCupons(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os cupons');
    }
  };

  const addTestCupom = async () => {
    try {
      await fetch(`${API_URL}/cupons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: "Desconto Teste",
          desconto: 20,
          estabelecimento: "Loja Exemplo"
        }),
      });
      fetchCupons();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao criar cupom');
    }
  };

  useEffect(() => { fetchCupons(); }, []);

  return (
    <View style={styles.container}>
      <Button title="Adicionar Cupom Teste" onPress={addTestCupom} />
      
      <FlatList
        data={cupons}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cupomCard}>
            <Text style={styles.cupomNome}>{item.nome}</Text>
            <Text>Desconto: {item.desconto}%</Text>
            <Text>Loja: {item.estabelecimento}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  cupomCard: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3 // Sombra alternativa para Android
  },
  cupomNome: {
    fontWeight: 'bold',
    fontSize: 16
  }
});