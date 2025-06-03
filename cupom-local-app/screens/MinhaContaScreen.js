import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginFakeScreen from './LoginFakeScreen';
import { CommonActions } from '@react-navigation/native';


export default function MinhaContaScreen({ navigation, user, setUser }) {

 // const user = route.params?.user || {};
  
  // Mocked data (trocar por dados reais)
  const userData = {
    nome: 'Fulano',
    cashback: 42.50,
    economizado: 127.80,
  };

const handleLogout = async () => {
  await AsyncStorage.removeItem('user');
  setUser(null);

  // // Força a navegação para a tela de login após logout
  // navigation.reset({
  //   index: 0,
  //   routes: [{ name: 'Login' }],
  // });
};

if (!user) return null;

  const handleButtonPress = (screenName) => {
    console.log(`Ir para ${screenName}`);
    // Add a navegação real 
    //   // navigation.navigate(screenName);
  };

  return (
    
     <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container}>
      {/* saudação - trocar para nome do usuário */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bem-vindo, {user.nome}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>R$ {userData.cashback.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Saldo Cashback</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>R$ {userData.economizado.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Total Economizado</Text>
          </View>
        </View>
      </View>

      {/* Seção Minhas Compras */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Minhas Compras</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleButtonPress('Favoritos')}
        >
          <Text style={styles.buttonText}>❤️ Meus Favoritos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleButtonPress('Vouchers')}
        >
          <Text style={styles.buttonText}>🎫 Meus Vouchers</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleButtonPress('AvaliarOfertas')}
        >
          <Text style={styles.buttonText}>⭐ Avaliar Ofertas</Text>
        </TouchableOpacity>
      </View>

      {/* Seção - Configurações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configurações</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleButtonPress('MeusDados')}
        >
          <Text style={styles.buttonText}>👤 Meus Dados</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleButtonPress('Pagamentos')}
        >
          <Text style={styles.buttonText}>💳 Formas de Pagamento</Text>
        </TouchableOpacity>
      </View>

      {/* Seção Jurídica */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleButtonPress('TermosUso')}
        >
          <Text style={styles.buttonText}>📑 Termos de Uso</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleButtonPress('PoliticaPrivacidade')}
        >
          <Text style={styles.buttonText}>🔒 Política de Privacidade</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity 
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={[styles.buttonText, styles.logoutText]}>🚪 Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
   safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    backgroundColor: '#0D1B2A',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  welcomeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0D1B2A',
  },
  button: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  buttonText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#E63946',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    borderBottomWidth: 0,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});