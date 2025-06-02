import React from 'react';
import { View, Text, Button } from 'react-native';
import { API_URL } from '../config';

export default function HomeScreen({ user, onLogout }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bem-vindo, {user.email}!</Text>
      <Button title="Sair" onPress={onLogout} />
    </View>
  );
}
