import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import { Text, View } from 'react-native';
import LoginFakeScreen from './screens/LoginFakeScreen';
import RegisterScreen from './screens/RegisterScreen';
import CupomListScreen from './screens/CupomListScreen';
import CarrinhoScreen from './screens/CarrinhoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);      
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Poppins-Light':      require('./assets/fonts/Poppins-Light.ttf'),
      'Poppins-ExtraBold':  require('./assets/fonts/Poppins-ExtraBold.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

 /* if (!fontsLoaded) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <Text>Carregando fontes…</Text>
      </View>
    );
  }*/

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Cupons">
              {props => (
                <CupomListScreen
                  {...props}
                  user={user}
                  onLogout={() => setUser(null)}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" options={{ headerShown:false }}>
              {props => <LoginFakeScreen {...props} onLogin={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="Cadastro" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
