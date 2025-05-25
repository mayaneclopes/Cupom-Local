// screens/LoginFakeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.0.15:3001';

export default function LoginFakeScreen({ onLogin, navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }

    try {
      const resposta = await axios.post(`${API_URL}/auth/login`, {
        email,
        senha,
      });

      const { token, usuario_id } = resposta.data;
onLogin({ email, token, usuario_id }); // envia o token pra próxima tela
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', error.response?.data?.erro || 'Erro ao fazer login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Entrar" onPress={handleLogin}
      styles={styles.container} />
    
      <Button title="Criar conta" onPress={() => navigation.navigate('Cadastro')} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
});
