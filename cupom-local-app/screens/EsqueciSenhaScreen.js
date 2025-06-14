
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EsqueciSenhaScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleRecuperarSenha = () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Erro', 'Digite um e-mail válido.');
    } else {
      Alert.alert('Pronto!', 'Se este e-mail estiver cadastrado, enviaremos instruções para recuperar sua senha.');
      navigation.goBack(); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>

      <Text style={styles.label}>Digite seu e-mail:</Text>
      <TextInput
        style={styles.input}
        placeholder="exemplo@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleRecuperarSenha}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.voltar}>Voltar ao login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0D1B2A', marginBottom: 24 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0D1B2A',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  voltar: { color: '#0D1B2A', textAlign: 'center', marginTop: 12 },
});
