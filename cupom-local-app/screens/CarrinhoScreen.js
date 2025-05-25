// screens/CarrinhoScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.0.15:3001'; 

export default function CarrinhoScreen({ route, navigation }) {
  const { user } = route.params;
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/carrinho/${user.usuario_id}`)
      .then(res => setCarrinho(res.data))
      .catch(err => console.error('Erro ao buscar carrinho:', err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Carrinho</Text>

      {carrinho.length === 0 ? (
        <Text style={{ textAlign: 'center' }}>Seu carrinho está vazio</Text>
      ) : (
        <FlatList
          data={carrinho}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cupom}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text>{item.descricao}</Text>
              <Text>Validade: {item.validade}</Text>
              <Text>Valor: R$ {item.valor}</Text>
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
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  cupom: {
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  titulo: { fontWeight: 'bold' }
});
