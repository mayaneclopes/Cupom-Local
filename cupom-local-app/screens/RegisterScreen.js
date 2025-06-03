import React, { useState } from 'react';
import {
  View, Platform, Text, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';
import { MaskedTextInput } from 'react-native-mask-text';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    nome: '',
    cpf_cnpj: '',
    email: '',
    senha: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    pais: '',
  });


  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const validateEmail = (email) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    const {
      nome, cpf_cnpj, email, senha,
      logradouro, numero, bairro, cidade, estado, cep, pais
    } = form;

    if (!nome || !cpf_cnpj || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'E-mail inválido.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register`, form);
      Alert.alert('Sucesso', response.data.mensagem);
      navigation.navigate('Login');
   } catch (error) {
  console.error('Erro ao cadastrar usuário:', error.response?.data || error.message);
  Alert.alert('Erro', error.response?.data?.erro || 'Erro ao cadastrar usuário');
}
  };

  return (
        <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput style={styles.input} placeholder="Nome completo" onChangeText={(text) => handleChange('nome', text)} />
<MaskedTextInput
  mask="999.999.999-99"
  placeholder="CPF"
  keyboardType="numeric"
  style={styles.input}
  value={form.cpf_cnpj}
  onChangeText={(text, rawText) =>
    setForm({ ...form, cpf_cnpj: rawText })
  }
/>
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" onChangeText={(text) => handleChange('email', text)} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry onChangeText={(text) => handleChange('senha', text)} />
      <TextInput style={styles.input} placeholder="Logradouro" onChangeText={(text) => handleChange('logradouro', text)} />
      <TextInput style={styles.input} placeholder="Número" onChangeText={(text) => handleChange('numero', text)} />
      <TextInput style={styles.input} placeholder="Bairro" onChangeText={(text) => handleChange('bairro', text)} />
      <TextInput style={styles.input} placeholder="Cidade" onChangeText={(text) => handleChange('cidade', text)} />
      <TextInput style={styles.input} placeholder="Estado (UF)" maxLength={2} onChangeText={(text) => handleChange('estado', text)} />
      <TextInput style={styles.input} placeholder="CEP" keyboardType="numeric" onChangeText={(text) => handleChange('cep', text)} />
      <TextInput style={styles.input} placeholder="País" onChangeText={(text) => handleChange('pais', text)} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Já tem uma conta? Entrar</Text>
      </TouchableOpacity>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center'
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#0D1B2A',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginText: {
    color: '#0D1B2A',
    marginTop: 15,
    textAlign: 'center'
  }
});
