import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function CupomDetalhesScreen() {
  const route = useRoute();
  const { cupom } = route.params || {};

  if (!cupom) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Cupom não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: cupom.imagem || 'https://via.placeholder.com/400x200.png?text=Cupom' }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.titulo}>{cupom.titulo}</Text>
        <Text style={styles.descricao}>{cupom.descricao}</Text>

        <View style={styles.precoContainer}>
          <Text style={styles.precoOriginal}>de R$ {parseFloat(cupom.valor_original).toFixed(2)}</Text>
          <Text style={styles.precoDesconto}>por R$ {parseFloat(cupom.valor).toFixed(2)}</Text>
        </View>

        <Text style={styles.validade}>Válido até: {cupom.validade}</Text>

        <TouchableOpacity style={styles.botaoCarrinho}>
          <Text style={styles.textoBotao}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descricao: {
    fontSize: 16,
    marginBottom: 15,
  },
  precoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  precoOriginal: {
    textDecorationLine: 'line-through',
    fontSize: 16,
    color: '#888',
    marginRight: 10,
  },
  precoDesconto: {
    fontSize: 18,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  validade: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  botaoCarrinho: {
    backgroundColor: '#0D1B2A',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
});