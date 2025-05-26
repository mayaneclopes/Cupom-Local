import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { styled } from 'nativewind';

const API_URL = 'http://192.168.0.15:3001';

const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

export default function LoginFakeScreen({ onLogin, navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha e-mail e senha');
      return;
    }

    try {
      const resposta = await axios.post(`${API_URL}/auth/login`, { email, senha });
      const { token, usuario_id } = resposta.data;
      onLogin({ email, id: usuario_id, token });
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', error.response?.data?.erro || 'Erro ao fazer login');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-8">
      <Text className="text-3xl font-bold text-purple-800 mb-10">Cupom Local</Text>

      <StyledTextInput
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <StyledTextInput
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base"
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <StyledTouchableOpacity
        className="bg-purple-700 rounded-xl w-full py-3 items-center mb-3"
        onPress={handleLogin}
      >
        <StyledText className="text-white font-semibold uppercase">Entrar</StyledText>
      </StyledTouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text className="text-sm text-gray-500">Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}
