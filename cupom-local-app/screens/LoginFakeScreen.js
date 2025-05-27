// screens/LoginScreen.js
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

const API_URL = 'http://192.168.0.15:3001';

export default function LoginFakeScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha e-mail e senha');
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        email,
        senha,
      });

      const { token, usuario_id } = data;
      onLogin({ email, id: usuario_id, token });
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', error.response?.data?.erro || 'Erro ao fazer login');
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

      {/* Botão Entrar */}
<TouchableOpacity style={styles.button} onPress={handleLogin}>
  <Text style={styles.buttonText }>Entrar</Text>
</TouchableOpacity>

      {/* Links */}
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
