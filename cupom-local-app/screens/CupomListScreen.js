// screens/CupomListScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const cuponsSimulados = [
  { id: '1', titulo: '10% de desconto no Supermercado XYZ' },
  { id: '2', titulo: 'Frete grátis na Loja ABC' },
  { id: '3', titulo: 'Cashback de R$5 no Posto 24h' }
];

export default function CupomListScreen({ onLogout }) {
  const [carrinho, setCarrinho] = useState([]);

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
        data={cuponsSimulados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={estilos.cupom}>
            <Text>{item.titulo}</Text>
            <Button title="Adicionar" onPress={() => adicionarAoCarrinho(item)} />
          </View>
        )}
      />

      <Text style={estilos.titulo}>Carrinho</Text>

      {carrinho.length === 0 ? (
        <Text style={{ textAlign: 'center' }}>Nenhum cupom no carrinho</Text>
      ) : (
        <FlatList
          data={carrinho}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={estilos.cupom}>
              <Text>{item.titulo}</Text>
              <Button title="Remover" onPress={() => removerDoCarrinho(item.id)} />
            </View>
          )}
        />
      )}

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
    justifyContent: 'space-between'
  }
});
