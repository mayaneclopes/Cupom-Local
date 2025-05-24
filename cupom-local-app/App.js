import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginFakeScreen from './screens/LoginFakeScreen';
import RegisterScreen from './screens/RegisterScreen';
import CupomListScreen from './screens/CupomListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Cupons">
            {() => <CupomListScreen onLogout={() => setUser(null)} />}
          </Stack.Screen>
        ) : (
          <>
<Stack.Screen name="Login" options={{ headerShown: false }}>
  {(props) => <LoginFakeScreen {...props} onLogin={setUser} />}
</Stack.Screen>
            <Stack.Screen name="Cadastro" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
