import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

export default function CarrinhoScreen({ route, navigation }) {
    console.log("Parâmetros recebidos na rota:", route.params);
   const user = route?.params?.user;
     console.log("Usuário extraído:", user); 
  if (!user?.id) {
    return (
      <View style={styles.container}>
        <Text>Erro: Usuário não identificado.</Text>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(1);
const itensPorPagina = 10; 

const carregarCarrinho = async () => {
  try {
    console.log("[1] Iniciando carregamento..."); 
    setLoading(true);
    const resposta = await axios.get(`${API_URL}/carrinho/${user.id}`);
    console.log("[2] Dados recebidos:", resposta.data); 
    console.log("ID do usuário sendo enviado:", user.id);
    if (resposta.data.length === 0) {
      console.log("[3] Carrinho vazio");    }
    
    setItens(resposta.data);
  } catch (error) {
    console.error("[4] Erro completo:", error.response || error);
    setError("Erro ao carregar carrinho");
  } finally {
    console.log("[5] Finalizando carregamento"); 
    setLoading(false);
  }
};

  const removerDoCarrinho = async (id) => {
    try {
      await axios.delete(`${API_URL}/carrinho/${id}`);
      setItens(prevItens => prevItens.filter(item => item.id !== id));
    } catch (error) {
      console.error('Erro ao remover item:', error);
      Alert.alert('Erro', 'Não foi possível remover o item');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarCarrinho();
    });
    
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0D1B2A" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar novamente" onPress={carregarCarrinho} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrinho de {user.email}</Text>

      {itens.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
          <Button 
            title="Voltar às compras" 
            onPress={() => navigation.goBack()}
            color="#0D1B2A"
          />
        </View>
      ) : (
        <FlatList
          data={itens}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cupom}>
              <Text style={styles.cupomTitulo}>{item.titulo}</Text>
              {item.valor && (
                <Text style={styles.cupomValor}>
                  Valor: R$ {Number(item.valor).toFixed(2)}
                </Text>
              )}
              <Button 
                title="Remover" 
                onPress={() => removerDoCarrinho(item.id)}
                color="#E63946"
              />
            </View>
          )}
          contentContainerStyle={itens.length === 0 && styles.center}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#FFF',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0D1B2A',
    textAlign: 'center',
  },
  cupom: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  cupomTitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#0D1B2A',
  },
  cupomValor: {
    fontSize: 14,
    color: '#2A9D8F',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#E63946',
    marginBottom: 20,
    textAlign: 'center',
  },
});