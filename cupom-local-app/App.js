import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import { Text, View } from 'react-native';
import MeusDadosScreen from './screens/MeusDadosScreen';
import LoginFakeScreen from './screens/LoginFakeScreen';
import RegisterScreen from './screens/RegisterScreen';
import CupomListScreen from './screens/CupomListScreen';
import CarrinhoScreen from './screens/CarrinhoScreen';
import MinhaContaScreen from './screens/MinhaContaScreen';
import CupomDetalhesScreen from './screens/CupomDetalhesScreen';
import EsqueciSenhaScreen from './screens/EsqueciSenhaScreen';
import FavoritosScreen from './screens/FavoritosScreen';
import VouchersScreen from './screens/VouchersScreen';


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
  } */

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login">
              {props => <LoginFakeScreen {...props} onLogin={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="Cadastro" component={RegisterScreen} />
                <Stack.Screen
                name="EsqueciSenha"
                component={EsqueciSenhaScreen}
                options={{ headerShown: false }}
              />

          </>
        ) : (
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
              <Stack.Screen name="MeusDados">
                {(props) => (
                  <MeusDadosScreen 
                    {...props} 
                    onLogout={() => setUser(null)} 
                  />
                )}
              </Stack.Screen>
            <Stack.Screen name="Carrinho">
              {props => <CarrinhoScreen {...props} user={user} />}
            </Stack.Screen>
                <Stack.Screen
                  name="CupomDetalhes"
                  component={CupomDetalhesScreen}
                  options={{ title: 'Detalhes do Cupom' }}
                />
                      <Stack.Screen name="Favoritos">
  {props => <FavoritosScreen {...props} user={user} />}
</Stack.Screen>
              <Stack.Screen name="Vouchers" options={{ headerShown: false }}>
  {props => <VouchersScreen {...props} user={user} />}
</Stack.Screen>
            <Stack.Screen name="MinhaConta">
              {props => (
                <MinhaContaScreen
                  {...props}
                  user={user}
                  setUser={setUser}
                />
              )}
            </Stack.Screen>
                      </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}