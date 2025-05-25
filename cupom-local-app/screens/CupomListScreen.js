// screens/CupomListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.0.15:3001';

export default function CupomListScreen({ navigation, user, onLogout }) {
  const [cupons, setCupons] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/cupons`)
      .then(response => setCupons(response.data))
      .catch(error => console.error('Erro ao buscar cupons:', error));
  }, []);

 const adicionarAoCarrinho = async (cupom) => {
  try {
    console.log('Enviando:', {
  usuario_id: user.id,
  cupom_id: cupom.id
});

    await axios.post(`${API_URL}/carrinho`, {
      usuario_id: user.id,
      cupom_id: cupom.id,
    });

    alert('Cupom adicionado ao carrinho!');
  } catch (error) {
    console.error(error);
    alert('Erro ao adicionar ao carrinho');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cupons Disponíveis</Text>

      <FlatList
        data={cupons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cupom}>
            <Text>{item.titulo}</Text>
            <Text>{item.descricao}</Text>
            <Text>Validade: {item.validade}</Text>
            <Button title="Adicionar ao Carrinho" onPress={() => adicionarAoCarrinho(item)} />
          </View>
        )}
      />

      <Button title="Ver Carrinho" onPress={() => navigation.navigate('Carrinho', { carrinho, user })} />
      <Button title="Sair" onPress={onLogout} color="red" />
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
