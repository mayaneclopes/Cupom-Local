import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '../config';
import Header from '../components/Header';
import Rodape from '../components/Rodape';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatDateBR } from '../utils/formatDate';

export default function CupomDetalhesScreen() {
  const route = useRoute();
  const { cupom, user } = route.params || {};

  if (!cupom) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Cupom não encontrado.</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    console.log('Usuário:', user);
    console.log('Enviando p/ carrinho:', {
      usuario_id: user?.id,
      cupom_id: cupom.id,
    });

    axios
      .post(`${API_URL}/carrinho`, {
        usuario_id: user?.id,
        cupom_id: cupom.id,
      })
      .then(() => {
        Alert.alert('Sucesso', 'Cupom adicionado ao carrinho!');
      })
      .catch(error => {
        console.error('Erro ao adicionar ao carrinho:', error);
        Alert.alert('Erro', 'Não foi possível adicionar ao carrinho.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <ScrollView>
      <Image
        source={{ uri: cupom.imagem_url || 'https://via.placeholder.com/400x200.png?text=Cupom' }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.titulo}>{cupom.titulo}</Text>
              {/* Avaliações - Mock Data */}
        <View style={styles.avaliacoes}>
          <Text style={styles.estrelas}>⭐⭐⭐⭐⭐</Text>
          <Text style={styles.numAvaliacoes}> (23 avaliações)</Text>
        </View>

        <Text style={styles.descricao}>{cupom.descricao}</Text>

        <View style={styles.precoContainer}>
          {cupom.valor_original && (
            <Text style={styles.precoOriginal}>
              de R$ {parseFloat(cupom.valor_original).toFixed(2)}
            </Text>
          )}
          <Text style={styles.precoDesconto}>
            por R$ {parseFloat(cupom.valor).toFixed(2)}
          </Text>
        </View>

        <Text style={styles.validade}>Válido até: {
       formatDateBR(cupom.validade)}.
        </Text>

        <TouchableOpacity style={styles.botaoCarrinho} onPress={handleAddToCart}>
          <Text style={styles.textoBotao}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
       </ScrollView>
      <Rodape/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
    avaliacoes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
