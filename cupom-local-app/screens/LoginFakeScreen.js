import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import logoTexto from '../assets/logo-texto.png'; 
import { API_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginFakeScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

const handleLogin = async () => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, { email, senha });
    
    // Verifique a nova estrutura da resposta
    console.log("Resposta completa:", data);
    
    if (!data.token || !data.usuario) {
      throw new Error("Resposta da API incompleta");
    }

    await AsyncStorage.setItem('user', JSON.stringify(data.usuario));
    onLogin(data.usuario); // Garanta que está passando o objeto completo
    
  } catch (error) {
    console.error("Erro detalhado:", {
      message: error.message,
      response: error.response?.data
    });
    Alert.alert('Erro', error.response?.data?.erro || 'Credenciais inválidas');
  }
};


  return (
    <View style={styles.container}>
      {/* Logo ok */}
      <View style={styles.logoContainer}>
        <Image source={logoTexto} style={styles.logoImage} 
        resizeMode= "contain"/>

      </View>

      {/* Formulário ok*/}
      <Text style={styles.label}>E-mail</Text>
      <TextInput style={styles.input} 
      placeholder="seu@email.com" 
      value={email}
      onChangeText={setEmail}
      autoCapitalize="none"
      keyboardType="email-address"/>

      <Text style={[styles.label, 
        { marginTop: 10 }]}>Senha</Text>
      <TextInput style={styles.input}
       placeholder="••••••••" 
       value={senha}
       onChangeText={setSenha}
       secureTextEntry />

      {/* Botão Entrar ok estil e nav*/}
<TouchableOpacity style={styles.button} onPress={handleLogin}>
  <Text style={styles.buttonText }>Entrar</Text>
</TouchableOpacity>

      {/* Links - A FAZER TODOS */}
      <TouchableOpacity onPress={() => {/* esqueci senha - a fazer */}}>
        <Text style={styles.link}>Esqueci minha senha</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={[styles.link, { marginTop: 10 }]}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 80,
  },
  logoImage: {
    width: 202.6,
    height: 90.45,
    marginBottom: 10,
  },
  logoText: {
    color: '#0D1B2A',
    fontSize: 54,
    fontWeight: '800',
    lineHeight: 58,
    textAlign: 'center',
    fontFamily: 'Poppins-ExtraBold',
  },

  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    color: '#000000',
    fontSize: 20,
    fontWeight: '300',
    fontFamily: 'Poppins-Light',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 5,
  },

  button: {
    width: '100%',
    backgroundColor: '#0D1B2A',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '300',
    fontFamily: 'Poppins-Light',
  },

  link: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '300',
    fontFamily: 'Poppins-Light',
    marginTop: 20,
  },
});
