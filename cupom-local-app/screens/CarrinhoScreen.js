// screens/CarrinhoScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.0.15:3001';

export default function CarrinhoScreen({ route, navigation }) {
  const { user } = route.params;
  const [itens, setItens] = useState([]);

  const carregarCarrinho = async () => {
    try {
      const resposta = await axios.get(`${API_URL}/carrinho/${user.id}`);
      setItens(resposta.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removerDoCarrinho = async (id) => {
    try {
      await axios.delete(`${API_URL}/carrinho/${id}`);
      carregarCarrinho();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    carregarCarrinho();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrinho de {user.email}</Text>

      {itens.length === 0 ? (
        <Text style={{ textAlign: 'center' }}>Carrinho vazio</Text>
      ) : (
        <FlatList
          data={itens}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cupom}>
              <Text>{item.titulo}</Text>
              <Button title="Remover" onPress={() => removerDoCarrinho(item.id)} />
            </View>
          )}
        />
      )}

      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  cupom: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  }
});
