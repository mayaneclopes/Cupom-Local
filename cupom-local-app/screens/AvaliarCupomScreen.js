import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Rodape from '../components/Rodape';
import axios from 'axios';
import { API_URL } from '../config';

export default function AvaliarCupomScreen({ route, navigation }) {
  const { cupomId, usuarioId } = route.params;

  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [anonimo, setAnonimo] = useState(false);
  const [nota, setNota] = useState(0);

 const enviarAvaliacao = () => {
  if (!titulo.trim() || !mensagem.trim()) {
    Alert.alert('Preencha todos os campos');
    return;
  }

  axios.post(`${API_URL}/avaliacoes`, {
    usuario_id: usuarioId,
    cupom_id: cupomId,
    nota,
    comentario: `${titulo}\n\n${mensagem}`
  })
    .then(() => {
      Alert.alert('Avaliação enviada com sucesso!');
      if (route.params?.onAvaliado) {
        route.params.onAvaliado();
      }
      navigation.goBack();
    })
    .catch((error) => {
      if (error.response?.status === 409) {
        Alert.alert('Atenção', 'Você já avaliou este cupom.');
      } else {
        Alert.alert('Erro ao enviar avaliação');
      }
    });
};

  const handleSubmit = async () => {
  if (!nota || comentario.trim() === '') {
    Alert.alert('Erro', 'Preencha a nota e o comentário.');
    return;
  }

  try {
    await axios.post(`${API_URL}/avaliacoes`, {
      usuario_id: user.id,
      cupom_id: cupom.id,
      nota,
      comentario,
      nota,
    });

    Alert.alert('Obrigado!', 'Avaliação enviada com sucesso!');
    navigation.goBack();
  } catch (error) {
    if (error.response?.status === 409) {
      Alert.alert('Atenção', 'Você já avaliou este cupom.');
    } else {
      Alert.alert('Erro', 'Não foi possível enviar sua avaliação.');
    }
  }
};


  const renderEstrelas = () => {
    return (
      <View style={styles.estrelasContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setNota(star)}>
            <Text style={nota >= star ? styles.estrelaAtiva : styles.estrela}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />

<KeyboardAvoidingView
  style={styles.flex}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  keyboardVerticalOffset={Platform.select({ ios: 90, android: 0 })}
>
        <ScrollView contentContainerStyle={styles.container}>
          {renderEstrelas()}
          
          <Text style={styles.label}>Título da avaliação:</Text>
          <TextInput
            value={titulo}
            onChangeText={setTitulo}
            style={styles.input}
            placeholder="Ex: Ótimo atendimento"
          />

          <Text style={styles.label}>Comentário (até 300 caracteres):</Text>
          <TextInput
            value={mensagem}
            onChangeText={(text) => {
              if (text.length <= 300) setMensagem(text);
            }}
            style={[styles.input, styles.textArea]}
            multiline
            placeholder="Descreva sua experiência"
          />

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Enviar como anônimo</Text>
            <Switch value={anonimo} onValueChange={setAnonimo} />
          </View>

          <TouchableOpacity style={styles.botao} onPress={enviarAvaliacao}>
            <Text style={styles.botaoTexto}>Enviar Avaliação</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <Rodape/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  flex: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#0D1B2A',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  estrelasContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginVertical: 15,
},
estrela: {
  fontSize: 32,
  color: '#ccc',
  marginHorizontal: 4,
},
estrelaAtiva: {
  fontSize: 32,
  color: '#FFD700', // Dourado
  marginHorizontal: 4,
},
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  botao: {
    backgroundColor: '#0D1B2A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
