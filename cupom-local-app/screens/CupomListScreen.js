// screens/CupomListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.0.123:3001'; // seu IP real aqui

export default function CupomListScreen({ onLogout }) {
  const [cupons, setCupons] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/cupons`)
      .then(response => setCupons(response.data))
      .catch(error => console.error('Erro ao buscar cupons:', error));
  }, []);

  const adicionarAoCarrinho = (cupom) => {
    if (!carrinho.find((item) => item.id === cupom.id)) {
      setCarrinho([...carrinho, cupom]);
    }
  };

  const removerDoCarrinho = (id) => {
    setCarrinho(carrinho.filter((item) => item.id !== id));
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Cupons Disponíveis</Text>

      <FlatList
        data={cupons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={estilos.cupom}>
            <Text>{item.titulo}</Text>
            <Text>{item.descricao}</Text>
            <Text>Validade: {item.validade}</Text>
            <Button title="Adicionar" onPress={() => adicionarAoCarrinho(item)} />
          </View>
        )}
      />

      <Text style={estilos.titulo}>Carrinho</Text>

      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={estilos.cupom}>
            <Text>{item.titulo}</Text>
            <Button title="Remover" onPress={() => removerDoCarrinho(item.id)} />
          </View>
        )}
      />

      <Button title="Sair" onPress={onLogout} color="red" />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  cupom: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  }
});
