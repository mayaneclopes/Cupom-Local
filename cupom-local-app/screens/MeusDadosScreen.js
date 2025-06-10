import React, { useEffect, useState } from 'react';
import { View, Button,
    Alert, Text, StyleSheet, ScrollView, ActivityIndicator,
TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

export default function MeusDadosScreen() {
 const navigation = useNavigation();
    const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  const carregarDados = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const userData = JSON.parse(user);

      console.log('Dados do AsyncStorage:', userData);

      if (userData?.id) { 
        const response = await axios.get(`http://192.168.0.15:3001/usuarios/${userData.id}`);
        console.log('Resposta da API:', response.data); 
                setDados(response.data); 
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  carregarDados();
}, []);
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0D1B2A" />
      </View>
    );
  }

  if (!dados) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Não foi possível carregar os dados.</Text>
      </View>
    );
  }

const handleExcluirConta = async () => {
  Alert.alert(
    "Confirmar Exclusão",
    "Tem certeza que deseja excluir sua conta permanentemente?",
    [
      {
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "Excluir",
        onPress: async () => {
          try {
            const user = await AsyncStorage.getItem('user');
            const userData = JSON.parse(user);
            
            await axios.delete(`http://192.168.0.15:3001/usuarios/${userData.id}`);
            await AsyncStorage.clear();
            
            if (props.onLogout) {
              props.onLogout(); 
            }
            
            navigation.replace('Login'); 
          } catch (error) {
            Alert.alert("Erro", error.message);
          }
        }
      }
    ]
  );
};
  
const handleAlterarSenha = () => {
  navigation.navigate('AlterarSenha', { userId: dados.id });
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Meus Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <Text style={styles.value}>{dados.nome}</Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{dados.email}</Text>

      <Text style={styles.label}>CPF</Text>
      <Text style={styles.value}>{dados.cpf_cnpj}</Text>

      <Text style={styles.label}>Endereço</Text>
      <Text style={styles.value}>
        {`${dados.logradouro}, ${dados.numero}, ${dados.bairro}\n${dados.cidade} - ${dados.estado}, ${dados.cep}, ${dados.pais}`}
      </Text>
              <View style={styles.buttonGroup}>
  <TouchableOpacity 
    style={[styles.button, styles.primaryButton]}
    onPress={handleAlterarSenha}
  >
    <Text style={styles.buttonText}>Alterar Senha</Text>
  </TouchableOpacity>

  <TouchableOpacity 
    style={[styles.button, styles.dangerButton]}
    onPress={handleExcluirConta}
  >
    <Text style={styles.buttonText}>Excluir Conta</Text>
  </TouchableOpacity>

  <TouchableOpacity 
    style={[styles.button, styles.secondaryButton]}
    onPress={() => navigation.goBack()}
  >
    <Text style={styles.buttonText}>Voltar</Text>
  </TouchableOpacity>
</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D1B2A',
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  value: {
    marginBottom: 10,
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#E63946',
    textAlign: 'center',
  },
  buttonGroup: {
  marginTop: 30,
  gap: 12,
},
button: {
  padding: 16,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 2,
},
buttonText: {
  color: '#FFF',
  fontWeight: 'bold',
  fontSize: 16,
},
primaryButton: {
  backgroundColor: '#2A9D8F',
},
dangerButton: {
  backgroundColor: '#E63946',
},
secondaryButton: {
  backgroundColor: '#0D1B2A',
},
});
